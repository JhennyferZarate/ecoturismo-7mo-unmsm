const pool = require('../database');
const express = require('express')
const router = express.Router()
const destino = require('../controllers/destino.controller')

router.get('/', destino.inicio)

module.exports = router