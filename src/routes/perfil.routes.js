const pool = require('../database');
const express = require('express')
const router = express.Router()
const perfil = require('../controllers/perfil.controller')

router.get('/', perfil.get_inicio)

router.get('/cambiar_datos', perfil.get_cambiar_datos)

router.post('/cambiar_datos', perfil.post_cambiar_datos)

router.get('/cambiar_pass', perfil.get_cambiar_pass)

router.post('/cambiar_pass', perfil.post_cambiar_pass)

router.get('/buscar', perfil.buscar)

module.exports = router