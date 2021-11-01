const pool = require('../database')

const index = {}

index.inicio = async (req,res) => {
    res.send('inicio')
}


module.exports = index