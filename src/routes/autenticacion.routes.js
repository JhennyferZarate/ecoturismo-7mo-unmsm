const pool = require('../database')
const express = require('express')
const router = express.Router()
const autenticacion = require('../controllers/autenticacion.controller')

router.get('/registro', autenticacion.registro)

router.get('/ingreso', autenticacion.ingreso)

router.get('/salida', autenticacion.salida)

module.exports = router