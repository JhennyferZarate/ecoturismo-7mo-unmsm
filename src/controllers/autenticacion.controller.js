const pool = require('../database')

const autenticacion = {}

autenticacion.registro = async (req,res) => {
    res.send('registro')
}

autenticacion.ingreso = async (req,res) => {
    res.send('ingreso')
}

autenticacion.salida = async (req,res) => {
    res.send('salida')
}

module.exports = autenticacion