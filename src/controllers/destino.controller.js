const pool = require('../database')

const destino = {}

destino.get_filtro = async (req,res) => {
    
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
    
    res.render('busqueda/buscar',{destinos})
}

destino.post_filtro = async (req,res) => {
    res.render('busqueda/buscar',{destinos})
}

destino.get_inicio = async (req,res) => {
    
    const id_usuario = req.user.id_usuario
    const id_destino = req.params.id

    console.log(id_destino)
    console.log(id_usuario)

    /**
     * Destino y Usuario
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
        WHERE d.id_destino = ?
    `,[id_destino])
    
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


    res.render('destinos/destinos',{destino: destinos[0],recomendaciones,comentarios})
}

destino.post_inicio = async (req,res) => {
    res.redirect('/')
}

destino.get_crear = async (req, res) => {
    const regiones = await pool.query(
    `
    SELECT
        *
    FROM
        regiones
    `
    )
    console.log(regiones)
    const macroregiones = await pool.query(
        `
        SELECT
            *
        FROM
            macroregiones
        `
        )
    console.log(macroregiones)
    res.render('destinos/destinos_crear',{regiones,macroregiones})
}

destino.post_crear = async (req, res) => {
    
    const id_usuario = req.user.id_usuario

    //console.log(id_usuario)
    
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

    //console.log(req.body)
    //console.log(ciudad_ubicacion)

    /**
     * Reconocer Region
     */

    const verficar_region = await pool.query(
    `
    SELECT
        *
    FROM 
        regiones
    WHERE
        regiones.region = ?
    `,[region])

    //console.log(verficar_region[0].id_region)
    
    /**
     * Reconocer Macroregion
     */
    
    const verficar_macroregion = await pool.query(
        `
        SELECT
            *
        FROM 
            macroregiones
        WHERE
            macroregiones.macroregion = ?
        `,[macroregion])
    
    //console.log(verficar_macroregion[0].id_macroregion)

    /**
     * insertar ubicacion
    */
    const nueva_ubicacion = {
        id_macroregion: verficar_macroregion[0].id_macroregion,
        id_region: verficar_region[0].id_region,
        ciudad_ubicacion
    }
    
    const ubicacion = await pool.query(
    `
    INSERT INTO
        ubicaciones
    SET
        ?
    `,[nueva_ubicacion])

    //console.log(ubicacion.insertId)

    /**
     * Insertar Destino
     */
    
    const nuevo_destino = {
        id_ubicacion: ubicacion.insertId,
        titulo_destino,
        contenido_destino
    }

    const destino = await pool.query(
    `
    INSERT INTO 
        destinos
    SET
        ?
    `,[nuevo_destino])

    /**
     * Insertar recomendaciones
     */
    
    await pool.query(
    `
    INSERT INTO
        recomendaciones (id_destino,recomendacion)
    VALUES
        (${destino.insertId},'${recomendacion_1}'),
        (${destino.insertId},'${recomendacion_2}'),
        (${destino.insertId},'${recomendacion_3}')
    `)

    /**
     * Insertar en Publicaciones
     */
    
    const nueva_publicacion = {
        id_usuario,
        id_destino: destino.insertId
    }

    await pool.query(
    `
    INSERT INTO
        publicaciones
    SET
        ?
    `[nueva_publicacion])

    res.redirect('/perfil')
}

module.exports = destino