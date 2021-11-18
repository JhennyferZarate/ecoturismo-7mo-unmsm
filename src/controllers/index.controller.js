const pool = require('../database')
const passport = require('passport');
const index = {}

index.inicioGet = async (req, res) => {
    res.render('index')
}

index.inicioPost = async (req, res) => {
    const user = req.body

    if (user.nombre_perfil){
        console.log(user)
        passport.authenticate('local.signup', {
            successRedirect: '/perfil',
            failureRedirect: '/',
            failureFlash: true
        })
        
    
    } else {
        (req, res, next) => {
            passport.authenticate('local.signin', {
                successRedirect: '/perfil',
                failureRedirect: '/',
                failureFlash: true
            })(req, res, next)
        }
        console.log(user)
    }
}


module.exports = index