const pool = require('../database')
const index = {}

index.inicioGet = async (req, res) => {
    res.render('index')
}

module.exports = index