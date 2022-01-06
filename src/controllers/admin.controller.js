const db = require('../db/destino.query')

const admin = {}

admin.get_filtro = async (req,res) => {
    const destinos = await db.destinoGetFiltro()
    res.render('busqueda/buscar_admin',{destinos})
}

admin.post_filtro = async (req,res) => {
}

admin.get_inicio = async (req,res) => {
    const id_usuario = req.user.id_usuario
    const id_destino = req.params.id
    /**
     * Destino
     */
    const destinos = await db.destinoGetDestino(id_destino)
    /**
     * Usuario
     */
    const usuarios = await db.destinoGetUsuario(id_usuario)
    /**
     * Comentarios
     */
    const recomendaciones = await db.destinoGetRecomendacion(id_destino)
    /**
     * Comentarios
     */
    const comentarios = await db.destinoGetComentario(id_destino)
    res.render('destinos/destino_admin',{destino: destinos[0],usuario: usuarios[0],recomendaciones,comentarios})
}

admin.post_inicio = async (req,res) => {
}

module.exports = admin