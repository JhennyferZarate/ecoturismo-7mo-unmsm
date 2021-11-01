const pool = require('../database')

const destino = {}

destino.inicio = async (req,res) => {
    res.send('destinos')
}

module.exports = destino