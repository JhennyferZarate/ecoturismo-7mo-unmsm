const pool = require('../database')

const perfil = {}

perfil.inicio = async (req,res) => {
    res.send('perfil')
}

module.exports = perfil