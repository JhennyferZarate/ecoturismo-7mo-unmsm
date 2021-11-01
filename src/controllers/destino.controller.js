const pool = require('../database')

const destino = {}

destino.inicio = async (req,res) => {
    res.render('destinos/destinos')
}

module.exports = destino