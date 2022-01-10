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
 *  DESTINO
 *      importa los archivos incluidos en la carpeta controladores
 *      y utiliza el achivo "destino.controller"
 *  MULTER
 *      importamos el modulo multer que permite procesar imagenes,
 *      con esto podemos convertir imagenes a binario y poder alcemanarlas
 */
const express = require('express')
const router = express.Router()
const destino = require('../controllers/destino.controller')
const multer = require('multer')

/**
 * Ejecutar los métodos de multer para poder almacenar las imagenes
 * y estas se puedan procesar.
 * Especialmente se procesan los formatos "img" o imagen.
 */
multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null,file.originalname);
    }
});

/**
 * Ruta que nos muestra una interfaz donde filtramos los destinos para
 * los usuarios
 * GET:
 *      obtiene la información para mostrar los destinos y filtrarlos
 * POST:
 *      manda la información ingresas en los filtros para poder filtrar
 *      los destinos existentes
 */
router.get('/filtro_destinos',destino.get_filtro)
router.post('/filtro_destinos',destino.post_filtro)

/**
 * Ruta que nos muestra una interfaz donde se pueden proponer destinos 
 * futuros, estos van a ser procesados por los administradores del proyecto
 * y se crearán nuevos destinos o ubicaciones.
 * GET:
 *      obtiene la información para generar procesar futuros destinos.
 */
router.get('/futuro', destino.get_futuro)

/**
 * Ruta que nos muestra una interfaz donde creamos los destinos
 * GET:
 *      obtiene la información para poder identificar las caracteristicas
 *      de las nuevos destinos que se van a crear.
 * POST:
 *      manda la información ingresada en el formulario de registro de destino
 *      para valdiada y luego ser almacenado en la base de datos.
 */
router.post('/crear',  multer({}).single('img') ,destino.post_crear)
router.get('/crear', destino.get_crear)

/**
 * Ruta que nos muestra la interfaz de los destinos creados por los usuarios
 * GET:
 *      obtiene la información tanto del destinos como de la persona que lo
 *      ha creado, incluyendo los comentarios que terceros puedan realizar
 *      en el destino.
 * POST:
 *      la información se envia a la base de datos y es almacenada. Esta
 *      información pasa por filtros y validaciones.
 */
router.get('/:id', destino.get_inicio)
router.post('/:id', destino.post_inicio)

/**
 * Exportamos el objeto router para que el archivo "app.js" pueda ejecutarlos.
 * Este objeto contiene toda la información que será utilizada para crear rutas
 * HTTP.
 */
module.exports = router