const pool = require('../database');
const express = require('express')
const router = express.Router()
const index = require('../controllers/index.controller')

router.get('/', index.inicioGet)

router.post('/', index.inicioPost)
module.exports = router