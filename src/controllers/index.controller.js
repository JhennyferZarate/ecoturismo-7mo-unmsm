const pool = require('../database')

const index = {}

index.inicio = async (req,res) => {
    res.render('index')
}


module.exports = index