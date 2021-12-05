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
        apellido_perfil
    } = req.body

    const nuevoUsuario = {
        email_usuario,
        pass_usuario
    }

    const row = await pool.query(`SELECT * FROM usuarios WHERE email_usuario = ?`, [email_usuario])

    if (row.length > 0) {
        console.log("usuario ya registrado")
        return done(null, false);
    } else {
        nuevoUsuario.pass_usuario = await helpers.encryptPassword(pass_usuario);
        const resultUsuario = await pool.query('INSERT INTO usuarios SET ?', [nuevoUsuario]);
        nuevoUsuario.id_usuario = resultUsuario.insertId;
        
        const nuevoPerfil = {
            id_usuario: nuevoUsuario.id_usuario,
            nombre_perfil,
            apellido_perfil
        }

        await pool.query(`INSERT INTO perfiles SET ?`, [nuevoPerfil])
        return done(null, nuevoUsuario);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id_usuario)
});

passport.deserializeUser(async(id, done) => {
    const rows = await pool.query('SELECT * FROM usuarios WHERE id_usuario = ?', [id]);
    done(null, rows[0]);
});
