const pool = require('../database')

const perfil = {}

perfil.inicio = async (req,res) => {
    res.render('perfil/pefil')
}

module.exports = perfil