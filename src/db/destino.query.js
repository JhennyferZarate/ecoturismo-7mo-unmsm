const pool = require('../database');

const db = {}

/**
 * GET QUERYS
 */
db.destinoGetFiltro = async () => {
    return pool.query(
    `
    SELECT
        *
    FROM
        destinos as d
            INNER JOIN publicaciones as pub
                ON d.id_destino = pub.id_destino
            INNER JOIN ubicaciones as u
                ON d.id_ubicacion = u.id_ubicacion
            INNER JOIN regiones as r
                ON u.id_region = r.id_region
            INNER JOIN macroregiones as m
                ON u.id_macroregion = m.id_macroregion
            INNER JOIN perfiles as p
                ON pub.id_usuario = p.id_usuario
    `)
}

db.destinoGetDestino = async (id_destino) => {
    return pool.query(
    `
    SELECT
        *
    FROM	
        destinos AS d
    INNER JOIN publicaciones AS pub
        ON d.id_destino = pub.id_destino
    INNER JOIN perfiles as p
        ON pub.id_usuario = p.id_usuario
    INNER JOIN ubicaciones as u
        ON d.id_ubicacion = u.id_ubicacion
    WHERE d.id_destino = ?
    `,[id_destino])
}

db.destinoGetUsuario = async (id_usuario) => {
    return pool.query(
    `
    SELECT
        *
    FROM	
        perfiles
    WHERE id_usuario = ?
    `,[id_usuario])
}

db.destinoGetRecomendacion = async (id_destino) => {
    return pool.query(
    `
    SELECT
        *
    FROM
        recomendaciones as r
    INNER JOIN destinos as d
        ON r.id_destino = d.id_destino
    WHERE d.id_destino = ?
    `,[id_destino])
}

db.destinoGetComentario = async (id_destino) => {
    return pool.query(
    `
    SELECT
        *
    FROM
        destinos as d
    INNER JOIN comentarios as c
        ON c.id_destino = d.id_destino
    INNER JOIN perfiles as p
        ON p.id_usuario = c.id_usuario
    WHERE d.id_destino = ?
    order by c.fecha_creacion_comentario ASC
    `,[id_destino])
}

db.destinoGetRegion = async () => {
    return pool.query(
    `
    SELECT
        *
    FROM
        regiones
    `)
}

db.destinoGetMacroregion = async () => {
    return pool.query(
    `
    SELECT
        *
    FROM
        macroregiones
    `)
}

db.destinoGetVerificarRegion = async () => {
    return pool.query(
    `
    SELECT
        *
    FROM 
        regiones
    WHERE
        regiones.region = ?
    `,[region])
}

db.destinoGetVerificarMacroregion = async () => {
    return pool.query(
    `
    SELECT
        *
    FROM 
        macroregiones
    WHERE
        macroregiones.macroregion = ?
    `,[macroregion])
}


/**
 * POST QUERYS
 */
db.destinoPostComentario = async (nuevo_comentario) => {
    return pool.query(
    `
    INSERT INTO
        comentarios
    SET
        ?
    `,[nuevo_comentario])
}

db.destinoPostDenuncia= async (id_destino) => {
    return pool.query(
    `
    UPDATE
        publicaciones AS pub
    SET
        pub.denuncia_publicacion = pub.denuncia_publicacion + 1
    WHERE
        id_destino = ?
    `,[id_destino])
}

db.destinoPostLike = async (id_destino) => {
    return pool.query(
    `
    UPDATE
        publicaciones AS pub
    SET
        pub.like_publicacion = pub.like_publicacion + 1
    WHERE
        id_destino = ?
    `,[id_destino])
}

db.destinoPostUbicacion = async (nueva_ubicacion) => {
    return pool.query(
    `
    INSERT INTO
        ubicaciones
    SET
        ?
    `,[nueva_ubicacion])
}

db.destinoPostDestino = async (nuevo_destino) => {
    return pool.query(
    `
    INSERT INTO 
        destinos
    SET
        ?
    `,[nuevo_destino])
}

db.destinoPostRecomendacion = async (id,recomendacion_1,recomendacion_2,recomendacion_3) => {
    return pool.query(
    `
    INSERT INTO
        recomendaciones (id_destino,recomendacion)
    VALUES
        (${id},'${recomendacion_1}'),
        (${id},'${recomendacion_2}'),
        (${id},'${recomendacion_3}')
    `)
}

db.destinoPostPublicacion = async (nueva_publicacion) => {
    return pool.query(
    `
    INSERT INTO
        publicaciones
    SET
        ?
    `[nueva_publicacion])
}

module.exports = db