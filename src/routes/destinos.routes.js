const pool = require('../database');
const express = require('express')
const router = express.Router()
const destino = require('../controllers/destino.controller')

const multer = require('multer')
const fs = require('fs')
const path = require('path')

/**
 * Guardar en multer
 */
const diskstorage = multer.diskStorage({
    //destination: path.join(__dirname, '../public/images/destinos'),
    filename: (req, file, cb) => {
        cb(null,file.originalname);
    }
});

const fileUpload = multer({
    //storage: diskstorage
}).single('img') 


router.get('/filtro_destinos',destino.get_filtro)

router.post('/filtro_destinos',destino.post_filtro)

router.get('/crear', destino.get_crear)

router.get('/futuro', destino.get_futuro)

router.post('/crear', fileUpload ,destino.post_crear)

router.get('/:id', destino.get_inicio)

router.post('/:id', destino.post_inicio)



module.exports = router