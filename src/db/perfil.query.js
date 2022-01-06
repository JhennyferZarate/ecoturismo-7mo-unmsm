const pool = require('../database');

const db = {}

/**
 * GET QUERYS
 */
db.perfilGetPerfil = async (id_usuario) => {
    return await pool.query(
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

db.perfilGetDestino = async (id_usuario) => {
    return await pool.query(
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

db.perfilGetCambioDatos = async (id_usuario) => {
    return await pool.query(
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

db.perfilGetUsuarios = async (id_usuario) => {
    return await pool.query(
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
db.perfilPostCambioPerfil = async (nuevo_perfil,id_usuario) => {
    return await pool.query(
    `
    UPDATE
        perfiles
    SET 
        ?
    WHERE
        id_usuario = ?
    `,[nuevo_perfil,id_usuario])
}

db.perfilPostCambioEmail = async (email_usuario,id_usuario) => {
    return await pool.query(
    `
    UPDATE
        usuarios
    SET 
        email_usuario = ?
    WHERE
        id_usuario = ?
    `,[email_usuario,id_usuario])
}

db.perfilPostCambioPass = async (new_pass,id_usuario) => {
    return await pool.query(`
    UPDATE
        usuarios
    SET 
        pass_usuario = ?
    WHERE
        id_usuario = ?
    `,[new_pass,id_usuario])
}

module.exports = pool