const pool = require('../database')
const express = require('express')
const passport = require('passport')
const router = express.Router()
const autenticacion = require('../controllers/autenticacion.controller')

router.get('/registro', autenticacion.get_registro)

router.post('/registro',passport.authenticate('local.signup', {
    successRedirect: '/',
    failureRedirect: '/registro',
    failureFlash: true
}));

router.get('/ingreso', autenticacion.get_ingreso)

router.post('/ingreso', (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/',
        failureRedirect: '/ingreso',
        failureFlash: true
    })(req, res, next);
})

router.get('/salida', autenticacion.salida)

module.exports = router