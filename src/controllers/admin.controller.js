const pool = require('../database')

const admin = {}

admin.get_filtro = async (req,res) => {
    const destinos = await pool.query(
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

    const destinos = await pool.query(
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

    /**
     * Usuario
     */
    const usuarios = await pool.query(
        `
            SELECT
                *
            FROM	
                perfiles
            WHERE id_usuario = ?
        `,[id_usuario])

    /**
     * Comentarios
     */
    const recomendaciones = await pool.query(
    `
        SELECT
            *
        FROM
            recomendaciones as r
        INNER JOIN destinos as d
            ON r.id_destino = d.id_destino
        WHERE d.id_destino = ?
    `,[id_destino])

    /**
     * Comentarios
     */
    const comentarios = await pool.query(
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

    comentarios.map(comentario => {
        if(comentario.id_usuario == id_usuario){
            comentario.eliminacion = `<form action="/destinos/{{destino.id_destino}}" method="POST">
                <button name="denuncia" class="btn btn-primary-eco float-end"  type="submit">
                        <i class="fas fa-exclamation-triangle"></i> Denunciar publicación
                </button>
            </form>`
            console.log(comentario)
        }
    })
        
    res.render('destinos/destino_admin',{destino: destinos[0],usuario: usuarios[0],recomendaciones,comentarios})
}

admin.post_inicio = async (req,res) => {
}


module.exports = admin