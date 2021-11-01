const pool = require('../database');
const express = require('express')
const router = express.Router()
const perfil = require('../controllers/perfil.controller')

router.get('/', perfil.inicio)

module.exports = router