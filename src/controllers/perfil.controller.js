const db = require('../db/perfil.query')
const helpers = require('../library/helpers');

const perfil = {}

perfil.get_inicio = async (req,res) => {
    const id_usuario = req.user.id_usuario
    /**
     * Información del usuario
     */
    const Perfil = await db.perfilGetInicio(id_usuario)
    
    /**
     * Destinos creados por el usuario
     */
    const destinos = await db.perfilGetDestino(id_usuario)
    res.render('perfil/perfil', {perfil: Perfil[0],destinos})
}

perfil.get_cambiar_datos = async (req,res) => {
    const id_usuario = req.user.id_usuario
    const Perfil = await db.perfilGetCambioDatos(id_usuario)
    res.render('perfil/perfil_cambiar_datos',{perfil:Perfil[0]})
}

perfil.post_cambiar_datos = async (req,res) => {
    const id_usuario = req.user.id_usuario
    const {
        nombre_perfil,
        apellido_perfil,
        email_usuario
    } = req.body
    const nuevo_perfil = {
        nombre_perfil,
        apellido_perfil,
    }
    await db.perfilPostCambioPerfil(nuevo_perfil,id_usuario)
    await db.perfilPostCambioEmail(email_usuario,id_usuario)
    res.redirect('/perfil')
}

perfil.get_cambiar_pass = async (req, res) => {
    res.render('perfil/perfil_cambiar_pass')
}

perfil.post_cambiar_pass = async (req, res) => {
    const id_usuario = req.user.id_usuario
    const {
        pass_usuario,
        nuevo_pass_usuario,
        copia_nuevo_pass_usuario
    } = req.body
    if (nuevo_pass_usuario == copia_nuevo_pass_usuario){
        const rows = await db.perfilGetUsuarios(id_usuario)
        const validPassword = await helpers.matchPassword(pass_usuario, rows[0].pass_usuario)
        if (validPassword){
            const new_pass = await helpers.encryptPassword(nuevo_pass_usuario);
            await db.perfilPosttCambioPass(new_pass,id_usuario)
        } else {
            return res.redirect('/perfil')
        }
        
    } else {
        return res.redirect('/perfil')
    }
    res.redirect('/perfil')
}

// TEST BUSCAR ELIMINARME!
perfil.buscar = async (req, res) => {
    res.render('busqueda/buscar')
}
// FIN TEST BUSCAR ELIMINAME!

module.exports = perfil