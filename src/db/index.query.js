const pool = require('../database');

const db = {}

db.indexGetMejores = async () => {
    return await pool.query(
    `
    SELECT 
        *
    FROM
        destinos as d
        INNER JOIN publicaciones as pub
            ON d.id_destino = pub.id_destino
    ORDER BY pub.like_publicacion DESC;
    `)
}

db.indexGetUltimos = async () => {
    return await pool.query(
    `
    SELECT 
        *
    FROM
        destinos as d
    ORDER BY d.fecha_creacion_destino ASC;
    `)
}

module.exports = db