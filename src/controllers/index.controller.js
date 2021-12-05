const pool = require('../database')
const index = {}

index.get_inicio = async (req, res) => {

    /**
     * Destinos por las likes
     */
    const Mejores = await pool.query(
        `
        SELECT 
            *
        FROM
            destinos as d
            INNER JOIN publicaciones as pub
                ON d.id_destino = pub.id_destino
        ORDER BY pub.like_publicacion DESC;
        `
        )

    /**
     * Destinos por tiempo de publicacion
     */
    const Ultimos = await pool.query(
        `
        SELECT 
            *
        FROM
            destinos as d
        ORDER BY d.fecha_creacion_destino ASC;
        `
        )
    
    res.render('index',{Mejores,Ultimos})
}

module.exports = index