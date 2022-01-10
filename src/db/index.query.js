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
db.indexGetMejores = async () => {
    return pool.query(
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
db.indexGetUltimos = async () => {
    return pool.query(
    `
    SELECT 
        *
    FROM
        destinos as d
    ORDER BY d.fecha_creacion_destino ASC;
    `)
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