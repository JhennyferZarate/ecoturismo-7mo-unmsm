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
 *  INDEX
 *      importa los archivos incluidos en la carpeta controladores
 *      y utiliza el achivo "index.controller"
 */
const express = require('express')
const router = express.Router()
const index = require('../controllers/index.controller')

/**
 * Ruta que nos muestra una interfaz de inicio de nuestro poryectos donde
 * se muestran todos los destinos creados previamente y ordenados por
 * el momento que han sido creado
 * GET:
 *      obtiene la información de la base de datos para ser mostrada en 
 *      la interfaz inicial del proyecto.
 */
router.get('/', index.get_inicio)

/**
 * Exportamos el objeto router para que el archivo "app.js" pueda ejecutarlos.
 * Este objeto contiene toda la información que será utilizada para crear rutas
 * HTTP.
 */
module.exports = router