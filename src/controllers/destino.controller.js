const db = require('../db/destino.query')

const destino = {}

destino.get_filtro = async (req,res) => {
    const destinos = await db.destinoGetFiltro()
    res.render('busqueda/buscar',{destinos})
}

destino.post_filtro = async (req,res,next) => {
    return next
}

destino.get_futuro = async (req,res) => {
    res.render('destinos/destino_futuro')
}

destino.get_inicio = async (req,res) => {
    const id_usuario = req.user.id_usuario
    const id_destino = req.params.id
    /**
     * Destinos
     */
    const destinos = await db.destinoGetDestino(id_destino)
    /**
     * Usuarios
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
    res.render('destinos/destinos',{destino: destinos[0],usuario: usuarios[0],recomendaciones,comentarios})
}

destino.post_inicio = async (req,res) => {
    const action = req.body;
    const id_usuario = req.user.id_usuario
    const id_destino = req.params.id
    if(action["comentario"]){
        const nuevo_comentario = {
            id_usuario,
            id_destino,
            contenido_comentario
        }
        await db.destinoPostComentario(nuevo_comentario)
    }
    if(action["denuncia"] === "") { await db.destinoPostDenuncia(id_destino) }
    if(action["like"] === "") { await db.destinoPostLike(id_destino) }
    res.redirect(`/destinos/${id_destino}`)
}

destino.get_crear = async (req, res) => {
    const regiones = await db.destinoGetRegion()
    const macroregiones = await db.destinoGetMacroregion()
    res.render('destinos/destinos_crear',{regiones,macroregiones})
}

destino.post_crear = async (req, res) => {
    const id_usuario = req.user.id_usuario
    const {
        titulo_destino,
        region,
        macroregion,
        ciudad_ubicacion,
        recomendacion_1,
        recomendacion_2,
        recomendacion_3,
        contenido_destino
    } = req.body
    /**
     * Reconocer Region
     */
    const verficar_region = await db.destinoGetVerificarRegion(region)
    /**
     * Reconocer Macroregion
     */
    const verficar_macroregion = await db.destinoGetVerificarMacroregion(macroregion)
    /**
     * insertar ubicacion
    */
    const nueva_ubicacion = {
        id_macroregion: verficar_macroregion[0].id_macroregion,
        id_region: verficar_region[0].id_region,
        ciudad_ubicacion
    }
    const ubicacion = await db.destinoPostUbicacion(nueva_ubicacion)
    /**
     * Insertar Destino
     */
    const nuevo_destino = {
        id_ubicacion: ubicacion.insertId,
        titulo_destino,
        contenido_destino
    }
    await db.destinoPostDestino(nuevo_destino)
    /**
     * Insertar recomendaciones
     */
    await db.destinoPostRecomendacion(destino.insertId,recomendacion_1,recomendacion_2,recomendacion_3)
    /**
     * Insertar en Publicaciones
     */
    const nueva_publicacion = {
        id_usuario,
        id_destino: destino.insertId
    }
    await db.destinoPostPublicacion(nueva_publicacion)
    res.redirect('/perfil')
}

module.exports = destino