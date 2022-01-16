/**
 * Importamos los módulos:
 *  PASSPORT
 *      este modulo nos permitirá iniciar sesion y serializar
 *      toda la información del usuario que se ha logeado
 *  LOCALSTRATEGY
 *      este módulo nos permitrá conectar el llamado del inicio
 *      de sesion y registro donde sea llamado.
 */
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

/**
 * Importaremos dos archivos:
 *  POOL
 *      este archivo contendrá la base de datos y las funciones
 *      internas que este contiene
 *  HELPERS
 *      este archivo contiene las herramientas para encriptar y
 *      comparar strings.
 */
const pool = require('../database');
const helpers = require('./helpers');

/**
 * Funcion que permite a los usuarios iniciar session.
 * Recibe por parametro un email y una contraseña
 * la contraseña es comparada con su correspidiente par realcionado
 * al correo electronico previamente encriptado mediante hashing
 * utilizando el objeto "helpers" que compara la encriptacion
 * devolvemos un callback que permite o no serializar el usuario
 * @param {string} local.signin
 *  paratro string que conecta el llamado con esta funcion
 * @param LocalStrategy
 *      @param {string} email_usuario
 *          email ingresado por el usario al momento de iniciar
 *          session
 *      @param {string} pass_usuario
 *          contraseña ingresada por el usuario al momento de iniciar
 *          session
 */
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

/**
 * Funcion que permite a los usuarios registrarse.
 * Recibe por parametro un email y una contraseña
 * la contraseña es encriptado mediante hashing
 * utilizando el objeto "helpers" que se encripte.
 * Comparamos con el registro de base de datos para confirmar y validar
 * que no haya otro usuario con el mismo email y luego insetamos el 
 * nuevo usuario
 * @param {string} local.signup
 *  paratro string que conecta el llamado con esta funcion
 * @param LocalStrategy
 *      @param {string} email_usuario
 *          email ingresado por el usario al momento de iniciar
 *          session
 *      @param {string} pass_usuario
 *          contraseña ingresada por el usuario al momento de iniciar
 *          session
 */
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

/**
 * Funcion que permite serializar el usuario en el LocalStorage de nuestro proyecto
 * Esto permite que el usuario guarde su información personal y tengo acceso a ciertas
 * rutas.
 */
passport.serializeUser((user, done) => {
    done(null, user.id_usuario)
});

/**
 * Funcion que permite deserializar el usuario en el momento que sea neceasrio para que 
 * pueda usar la información de su pertenencia.
 */
passport.deserializeUser(async(id, done) => {
    const rows = await pool.query('SELECT * FROM usuarios WHERE id_usuario = ?', [id]);
    done(null, rows[0]);
});

module.exports = {passport}