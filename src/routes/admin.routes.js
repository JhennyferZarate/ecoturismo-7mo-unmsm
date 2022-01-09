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
 *      
 */
const express = require('express')
const router = express.Router()
const admin = require('../controllers/admin.controller')

router.get('/filtro_destinos',admin.get_filtro)

router.post('/filtro_destinos',admin.post_filtro)

router.get('/destinos/:id', admin.get_inicio)

router.post('/destinos/:id', admin.post_inicio)



module.exports = router