const pool = require('../database')

const perfil = {}

perfil.inicio = async (req,res) => {
    res.render('perfil/pefil')
}

perfil.actualizar = async (req,res) => {
    res.render('perfil/perfil_actualizar')
}

perfil.cambiar = async (req, res) => {
    res.render('perfil/perfil_cambiar')
}

// TEST BUSCAR ELIMINARME!
perfil.buscar = async (req, res) => {
    res.render('busqueda/buscar')
}
// FIN TEST BUSCAR ELIMINAME!

module.exports = perfil