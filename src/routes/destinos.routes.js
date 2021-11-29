const pool = require('../database');
const express = require('express')
const router = express.Router()
const destino = require('../controllers/destino.controller')

router.get('/filtro_destinos',destino.get_filtro)

router.post('/filtro_destinos',destino.post_filtro)

router.get('/:id', destino.get_inicio)

router.post('/:id', destino.post_inicio)

router.get('/crear', destino.get_crear)

router.post('/crear', destino.post_crear)

module.exports = router