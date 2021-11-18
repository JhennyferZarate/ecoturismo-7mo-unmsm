const pool = require('../database')

const autenticacion = {}

autenticacion.get_registro = async (req,res) => {
    res.render('autenticacion/registro')
}

autenticacion.get_ingreso = async (req,res) => {
    res.render('autenticacion/ingreso')
}

autenticacion.salida = async (req,res) => {
    req.logOut()
    res.redirect('/')
}

module.exports = autenticacion