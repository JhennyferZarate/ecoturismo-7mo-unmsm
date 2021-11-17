const pool = require('../database');
const express = require('express')
const router = express.Router()
const perfil = require('../controllers/perfil.controller')

router.get('/', perfil.inicio)

router.get('/actualizar', perfil.actualizar)

router.get('/cambiar', perfil.cambiar)

router.get('/buscar', perfil.buscar)

module.exports = router