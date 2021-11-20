const pool = require('../database');
const express = require('express')
const router = express.Router()
const perfil = require('../controllers/perfil.controller')

router.get('/', perfil.inicio)

router.get('/cambiar_datos', perfil.cambiar_datos)

router.get('/cambiar_pass', perfil.cambiar_pass)

router.get('/buscar', perfil.buscar)

module.exports = router