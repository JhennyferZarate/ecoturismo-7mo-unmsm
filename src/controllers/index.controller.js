const pool = require('../database')
const passport = require('passport');
const index = {}

index.inicioGet = async (req, res) => {
    res.render('index')
}

index.inicioPost = async (req, res) => {
    const user = req.body

    if (user.nombre_perfil){
        passport.authenticate('local.signup', {
            successRedirect: '/perfil',
            failureRedirect: '/',
            failureFlash: true
        })
    } else {
        passport.authenticate('local.signin', {
            successRedirect: '/perfil',
            failureRedirect: '/',
            failureFlash: true
        })(req, res, next)
    }
    res.redirect('/')
}


module.exports = index