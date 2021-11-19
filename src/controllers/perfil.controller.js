const pool = require('../database')

const perfil = {}

perfil.inicio = async (req,res) => {
    //console.log(req.user.id_usuario);
    const id_usuario = req.user.id_usuario
    const Perfil = await pool.query(
        `
            SELECT
                *
            FROM
                perfiles
            INNER
                JOIN usuarios
                    ON perfiles.id_usuario = usuarios.id_usuario
            WHERE usuarios.id_usuario = ?
        `
    ,[id_usuario])
    
    res.render('perfil/perfil', {perfil: Perfil[0]})
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