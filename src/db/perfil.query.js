/**
 * GET QUERYS
 * Lorem Ipsum is simply dummy text of the printing and typesetting 
 * industry. Lorem Ipsum has been the industry's standard dummy text 
 * ever since the 1500s, when an unknown printer took a galley of 
 * type and scrambled it to make a type specimen book. It has 
 * survived not only five centuries, but also the leap into electronic
 *  typesetting, remaining essentially unchanged. It was popularised 
 * in the 1960s with the release of Letraset sheets containing Lorem 
 * Ipsum passages, and more recently with desktop publishing software
 *  like Aldus PageMaker including versions of Lorem Ipsum.
 */
const pool = require('../database');

/**
 * GET QUERYS
 * Lorem Ipsum is simply dummy text of the printing and typesetting 
 * industry. Lorem Ipsum has been the industry's standard dummy text 
 * ever since the 1500s, when an unknown printer took a galley of 
 * type and scrambled it to make a type specimen book. It has 
 * survived not only five centuries, but also the leap into electronic
 *  typesetting, remaining essentially unchanged. It was popularised 
 * in the 1960s with the release of Letraset sheets containing Lorem 
 * Ipsum passages, and more recently with desktop publishing software
 *  like Aldus PageMaker including versions of Lorem Ipsum.
 */
const db = {}

/**
 * GET QUERYS
 */
/**
 * GET QUERYS
 * Lorem Ipsum is simply dummy text of the printing and typesetting 
 * industry. Lorem Ipsum has been the industry's standard dummy text 
 * ever since the 1500s, when an unknown printer took a galley of 
 * type and scrambled it to make a type specimen book. It has 
 * survived not only five centuries, but also the leap into electronic
 *  typesetting, remaining essentially unchanged. It was popularised 
 * in the 1960s with the release of Letraset sheets containing Lorem 
 * Ipsum passages, and more recently with desktop publishing software
 *  like Aldus PageMaker including versions of Lorem Ipsum.
 */
db.perfilGetPerfil = async (id_usuario) => {
    return pool.query(
    `
    SELECT
        *,
        count(id_destino) as N_publicaciones
    FROM
        perfiles
        INNER JOIN usuarios
            ON perfiles.id_usuario = usuarios.id_usuario
        INNER JOIN publicaciones
            ON perfiles.id_usuario = publicaciones.id_usuario
    WHERE 
        perfiles.id_usuario = ?;
    `
    ,[id_usuario])
}

/**
 * GET QUERYS
 * Lorem Ipsum is simply dummy text of the printing and typesetting 
 * industry. Lorem Ipsum has been the industry's standard dummy text 
 * ever since the 1500s, when an unknown printer took a galley of 
 * type and scrambled it to make a type specimen book. It has 
 * survived not only five centuries, but also the leap into electronic
 *  typesetting, remaining essentially unchanged. It was popularised 
 * in the 1960s with the release of Letraset sheets containing Lorem 
 * Ipsum passages, and more recently with desktop publishing software
 *  like Aldus PageMaker including versions of Lorem Ipsum.
 */
db.perfilGetDestino = async (id_usuario) => {
    return pool.query(
    `
    SELECT
        d.*
    FROM
        destinos as d
    INNER JOIN publicaciones as pub
        ON pub.id_destino = d.id_destino
    INNER JOIN perfiles as p
        ON pub.id_usuario = p.id_usuario
    WHERE p.id_usuario = ?
    order by d.fecha_creacion_destino ASC
    `
    ,[id_usuario])
}

/**
 * GET QUERYS
 * Lorem Ipsum is simply dummy text of the printing and typesetting 
 * industry. Lorem Ipsum has been the industry's standard dummy text 
 * ever since the 1500s, when an unknown printer took a galley of 
 * type and scrambled it to make a type specimen book. It has 
 * survived not only five centuries, but also the leap into electronic
 *  typesetting, remaining essentially unchanged. It was popularised 
 * in the 1960s with the release of Letraset sheets containing Lorem 
 * Ipsum passages, and more recently with desktop publishing software
 *  like Aldus PageMaker including versions of Lorem Ipsum.
 */
db.perfilGetCambioDatos = async (id_usuario) => {
    return pool.query(
    `
    SELECT
        *
    FROM
        perfiles
        INNER JOIN usuarios
            ON perfiles.id_usuario = usuarios.id_usuario
    WHERE 
        perfiles.id_usuario = ?;
    `
    ,[id_usuario])
}

/**
 * GET QUERYS
 * Lorem Ipsum is simply dummy text of the printing and typesetting 
 * industry. Lorem Ipsum has been the industry's standard dummy text 
 * ever since the 1500s, when an unknown printer took a galley of 
 * type and scrambled it to make a type specimen book. It has 
 * survived not only five centuries, but also the leap into electronic
 *  typesetting, remaining essentially unchanged. It was popularised 
 * in the 1960s with the release of Letraset sheets containing Lorem 
 * Ipsum passages, and more recently with desktop publishing software
 *  like Aldus PageMaker including versions of Lorem Ipsum.
 */
db.perfilGetUsuarios = async (id_usuario) => {
    return pool.query(
    `
    SELECT 
        *
    FROM
        usuarios
    WHERE
        id_usuario = ?            
    `,[id_usuario])
}

/**
 * POST QUERYS
 */
/**
 * GET QUERYS
 * Lorem Ipsum is simply dummy text of the printing and typesetting 
 * industry. Lorem Ipsum has been the industry's standard dummy text 
 * ever since the 1500s, when an unknown printer took a galley of 
 * type and scrambled it to make a type specimen book. It has 
 * survived not only five centuries, but also the leap into electronic
 *  typesetting, remaining essentially unchanged. It was popularised 
 * in the 1960s with the release of Letraset sheets containing Lorem 
 * Ipsum passages, and more recently with desktop publishing software
 *  like Aldus PageMaker including versions of Lorem Ipsum.
 */
db.perfilPostCambioPerfil = async (nuevo_perfil,id_usuario) => {
    return pool.query(
    `
    UPDATE
        perfiles
    SET 
        ?
    WHERE
        id_usuario = ?
    `,[nuevo_perfil,id_usuario])
}

/**
 * GET QUERYS
 * Lorem Ipsum is simply dummy text of the printing and typesetting 
 * industry. Lorem Ipsum has been the industry's standard dummy text 
 * ever since the 1500s, when an unknown printer took a galley of 
 * type and scrambled it to make a type specimen book. It has 
 * survived not only five centuries, but also the leap into electronic
 *  typesetting, remaining essentially unchanged. It was popularised 
 * in the 1960s with the release of Letraset sheets containing Lorem 
 * Ipsum passages, and more recently with desktop publishing software
 *  like Aldus PageMaker including versions of Lorem Ipsum.
 */
db.perfilPostCambioEmail = async (email_usuario,id_usuario) => {
    return pool.query(
    `
    UPDATE
        usuarios
    SET 
        email_usuario = ?
    WHERE
        id_usuario = ?
    `,[email_usuario,id_usuario])
}

/**
 * GET QUERYS
 * Lorem Ipsum is simply dummy text of the printing and typesetting 
 * industry. Lorem Ipsum has been the industry's standard dummy text 
 * ever since the 1500s, when an unknown printer took a galley of 
 * type and scrambled it to make a type specimen book. It has 
 * survived not only five centuries, but also the leap into electronic
 *  typesetting, remaining essentially unchanged. It was popularised 
 * in the 1960s with the release of Letraset sheets containing Lorem 
 * Ipsum passages, and more recently with desktop publishing software
 *  like Aldus PageMaker including versions of Lorem Ipsum.
 */
db.perfilPostCambioPass = async (new_pass,id_usuario) => {
    return pool.query(`
    UPDATE
        usuarios
    SET 
        pass_usuario = ?
    WHERE
        id_usuario = ?
    `,[new_pass,id_usuario])
}

/**
 * GET QUERYS
 * Lorem Ipsum is simply dummy text of the printing and typesetting 
 * industry. Lorem Ipsum has been the industry's standard dummy text 
 * ever since the 1500s, when an unknown printer took a galley of 
 * type and scrambled it to make a type specimen book. It has 
 * survived not only five centuries, but also the leap into electronic
 *  typesetting, remaining essentially unchanged. It was popularised 
 * in the 1960s with the release of Letraset sheets containing Lorem 
 * Ipsum passages, and more recently with desktop publishing software
 *  like Aldus PageMaker including versions of Lorem Ipsum.
 */
module.exports = db