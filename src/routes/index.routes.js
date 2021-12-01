const pool = require('../database');
const express = require('express')
const router = express.Router()
const index = require('../controllers/index.controller')

router.get('/', index.get_inicio)

module.exports = router