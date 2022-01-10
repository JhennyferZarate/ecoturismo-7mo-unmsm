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
 *  ADMIN
 *      importa los archivos incluidos en la carpeta controladores
 *      y utiliza el achivo "admin.controller"
 */
const express = require('express')
const router = express.Router()
const admin = require('../controllers/admin.controller')

/**
 * Ruta que nos muestra una interfaz donde filtramos los destinos
 * Estas rutas solo son accesibles para los usuarios administradores
 * GET:
 *      obtiene la información para mostrar los destinos y filtrarlos
 * POST:
 *      manda la información ingresas en los filtros para poder filtrar
 *      los destinos existentes 
 */
router.get('/filtro_destinos',admin.get_filtro)
router.post('/filtro_destinos',admin.post_filtro)

/**
 * Ruta que nos muestra la interfaz de los destinos creados por lo usuarios
 * Estas rutas solo son accesibles para los usuarios administradores
 * GET:
 *      obtiene la información tanto del destinos como de la persona que lo
 *      ha creado, incluyendo los comentarios que terceros puedan realizar
 *      en el destino.
 * POST:
 *      la información se envia a la base de datos y es almacenada. Esta
 *      información pasa por filtros y validaciones.
 */
router.get('/destinos/:id', admin.get_inicio)
router.post('/destinos/:id', admin.post_inicio)

/**
 * Exportamos el objeto router para que el archivo "app.js" pueda ejecutarlos.
 * Este objeto contiene toda la información que será utilizada para crear rutas
 * HTTP.
 */
module.exports = router