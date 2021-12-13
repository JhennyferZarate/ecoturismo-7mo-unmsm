const pool = require('../database')

const admin = {}

admin.get_filtro = async (req,res) => {
    res.render('/busqueda/buscar_admin')
}

admin.post_filtro = async (req,res) => {
}

admin.get_inicio = async (req,res) => {
    res.render('/destinos/destino_admin')
}

admin.post_inicio = async (req,res) => {
}


module.exports = admin