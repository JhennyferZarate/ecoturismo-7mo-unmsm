const pool = require('../database')

const autenticacion = {}

autenticacion.registro = async (req,res) => {
    res.render('autenticacion/registro')
}

autenticacion.ingreso = async (req,res) => {
    res.render('autenticacion/ingreso')
}

autenticacion.salida = async (req,res) => {
    res.redirect('/')
}

module.exports = autenticacion