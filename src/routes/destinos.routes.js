const pool = require('../database');
const express = require('express')
const router = express.Router()
const destino = require('../controllers/destino.controller')

router.get('/filtro_destinos',destino.get_filtro)

router.post('/filtro_destinos',destino.post_filtro)

router.get('/crear', destino.get_crear)

router.get('/futuro', destino.get_futuro)

router.post('/crear', destino.post_crear)
/*
router.get('/likes',destino.get_like)

router.get('/denuncias',destino.get_denuncia)
*/
router.get('/:id', destino.get_inicio)

router.post('/:id', destino.post_inicio)



module.exports = router