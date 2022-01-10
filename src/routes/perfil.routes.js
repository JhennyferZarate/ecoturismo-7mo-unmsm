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
 *  PERFIL
 *      importa los archivos incluidos en la carpeta controladores
 *      y utiliza el achivo "perfil.controller"
 */
const express = require('express')
const router = express.Router()
const perfil = require('../controllers/perfil.controller')

/**
 * Ruta que nos muestra una interfaz donde se mostrará el perfil de la
 * persona que se ha logeado habiendose registrado previamente
 * GET:
 *      obtiene la información general de la persona para mostrarla en su
 *      perfil
 */
router.get('/', perfil.get_inicio)

/**
 * Ruta que nos muestra la interfaz donde el usuario registrado e iniciado
 * sesion previamente puede hacer cambio de sus datos como:
 *      nombres
 *      apellidos
 *      correo electronico
 * GET:
 *      obtiene la información que esta establecida previamente para que
 *      pueda editarla y actualizarla
 * POST:
 *      la información es procesada para su validación y luego su correcto
 *      almacenamiento en la base de datos.
 */
router.get('/cambiar_datos', perfil.get_cambiar_datos)
router.post('/cambiar_datos', perfil.post_cambiar_datos)

/**
 * Ruta que nos muestra la interfaz donde el usuario registrado e iniciado
 * sesion previamente puede hacer cambio de su contraseña, ingresando los datos:
 *      contraseña actual
 *      nueva contraseña
 *      repetir nueva contraseña
 * GET:
 *      obtiene la información general que no tiene que ver con la credencial
 *      de su contraseña
 * POST:
 *      la información es procesada para su validación y luego su correcto
 *      almacenamiento en la base de datos teniendo en cuenta que la nueva
 *      contraseña y la repitencia de contraseña son identicas y válidas.
 */
router.get('/cambiar_pass', perfil.get_cambiar_pass)
router.post('/cambiar_pass', perfil.post_cambiar_pass)

/**
 * Exportamos el objeto router para que el archivo "app.js" pueda ejecutarlos.
 * Este objeto contiene toda la información que será utilizada para crear rutas
 * HTTP.
 */
module.exports = router