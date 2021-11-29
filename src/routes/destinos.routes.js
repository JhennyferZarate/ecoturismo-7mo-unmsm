const pool = require('../database');
const express = require('express')
const router = express.Router()
const destino = require('../controllers/destino.controller')

router.get('/', destino.get_inicio)

router.post('/', destino.post_inicio)

router.get('/crear', destino.get_crear)

router.post('/crear', destino.post_crear)

module.exports = router