const pool = require('../database')

const perfil = {}

perfil.inicio = async (req,res) => {
    // console.log(req.user.id_usuario);
    
    const id_usuario = req.user.id_usuario
    const Perfil = await pool.query(
        `
        SELECT
            *,
            count(id_destino) as N_publicaciones
        FROM
            perfiles
            RIGHT JOIN usuarios
                ON perfiles.id_usuario = usuarios.id_usuario
            LEFT JOIN publicaciones
                ON perfiles.id_usuario = publicaciones.id_usuario
        WHERE 
            perfiles.id_usuario = 1;
        `
    ,[id_usuario])
    
    res.render('perfil/perfil', {perfil: Perfil[0]})
    //res.render('perfil/perfil')
}

perfil.cambiar_datos = async (req,res) => {
    const id_usuario = req.user.id_usuario

    const {
        
    } = req.body;
    res.render('perfil/perfil_actualizar')
}

perfil.cambiar_pass = async (req, res) => {
    res.render('perfil/perfil_cambiar')
}

// TEST BUSCAR ELIMINARME!
perfil.buscar = async (req, res) => {
    res.render('busqueda/buscar')
}
// FIN TEST BUSCAR ELIMINAME!

module.exports = perfil