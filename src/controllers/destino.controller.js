const pool = require('../database')

const destino = {}

destino.inicio = async (req,res) => {
    res.render('destinos/destinos')
}

destino.crear = async (req, res) => {
    res.render('destinos/destinos_crear')
}

module.exports = destino