/**
 * Importamos los modulos:
 *  EXPRESS.
 *      ROUTER
 *      este modulo nos permite crear rutas HTTP que nos permite
 *      establecer las caracteristicas de acción
 *      GET
 *          obtener información
 *      POST
 *          enviar información
 *      PUT
 *          actulizar información
 *      DELETE
 *          eliminar información
 *  PASSPORT
 *      importación del modulo passport que nos da las credenciales
 *      para utilizar el módulo "passport", este modulo nos permitirá
 *      iniciar sesión y cerrar sesión
 *  AUTENTICACION
 *      importa los archivos incluidos en la carpeta controladores
 *      y utiliza el achivo "autenticacion.controller"
 */
const express = require('express')
const passport = require('passport')
const router = express.Router()
const autenticacion = require('../controllers/autenticacion.controller')

/**
 * Ruta que nos muestra una interfaz donde se registran los usuarios.
 * Estos archivos esta conectados al archivo "./libray/passport.js" donde
 * se encuentra la lógica para validar el registro de usuarios.
 * GET:
 *      obtiene la información para mostrar la interfaz de registro de usuarios
 * POST:
 *      envia la información del formulario de registro para poder almacenarlo
 *      en la base de datos y poder logearse luego.
 */
router.get('/registro', autenticacion.get_registro)
router.post('/registro',passport.authenticate('local.signup', {
    successRedirect: '/',
    failureRedirect: '/registro',
    failureFlash: true
}));

/**
 * Ruta que nos muestra una interfaz donde se inicia sesión.
 * Estos archivos esta conectados al archivo "./libray/passport.js" donde
 * se encuentra la lógica para validar el inicio de sessión.
 * GET:
 *      obtiene la información para mostrar la iterfaz de inicio de sesion
 * POST:
 *      envia la información ingresada en el formulario de ingreso para poder
 *      validarlo con la base de datos.
 */
router.get('/ingreso', autenticacion.get_ingreso)
router.post('/ingreso', (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/',
        failureRedirect: '/ingreso',
        failureFlash: true
    })(req, res, next);
})

/**
 * GET:
 *      obtiene ruta donde se ejecuta la función para cerrar sesión
 */
router.get('/salida', autenticacion.salida)

/**
 * Exportamos el objeto router para que el archivo "app.js" pueda ejecutarlos.
 * Este objeto contiene toda la información que será utilizada para crear rutas
 * HTTP.
 */
module.exports = router