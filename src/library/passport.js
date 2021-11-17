const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database');
const helpers = require('./helpers');

passport.use('local.signin', new LocalStrategy({
    usernameField: 'email_usuario',
    passwordField: 'pass_usuario',
    passReqToCallback: true
}, async (req, email_usuario, pass_usuario, done) => {
    const rows = await pool.query('SELECT * FROM usuarios WHERE email_usuario = ?', [email_usuario]);
    if (rows.length > 0) {
        const user = rows[0];
        const validPassword = await helpers.matchPassword(pass_usuario, user.pass_usuario)
        if (validPassword) {
            done(null, user);
        } else {
            done(null, false);
        }
    } else {
        return done(null, false);
    }
}));

passport.use('local.signup', new LocalStrategy({
    usernameField: 'email_usuario',
    passwordField: 'pass_usuario',
    passReqToCallback: true
}, async (req, email_usuario, pass_usuario, done) => {
    const {
        nombre_perfil,
        apellido_perfil,
        email_usuario,
        pass_usuario
    } = req.body

    const nuevoUsuario = {
        email_usuario,
        pass_usuario
    }

    const row = await pool.query(`SELECT * FROM usuarios WHERE email_usuario = ?`. [email_usuario])
    
    if (row.length > 0) {
        console.log("usuario ya registrado")
        return done(null, false);
    } else {
        nuevoUsuario.pass_usuario = await helpers.encryptPassword(pass_usuario);

        const resultUsuario = await pool.query('INSERT INTO usuarios SET ?', [nuevoUsuario]);

        const id_usuario = nuevoUsuario.id
        const nuevoPerfil = {
            id_usuario,
            img_perfil: null,
            nombre_perfil,
            apellido_perfil
        }

        await pool.query(`INSERT INTO perfiles SET ?`, [nuevoPerfil])

        nuevoUsuario.id = resultUsuario.insertId;

        return done(null, nuevoUsuario);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async(id, done) => {
    const rows = await pool.query('SELECT * FROM usuarios WHERE id_usuario = ?', [id]);
    done(null, rows[0]);
});