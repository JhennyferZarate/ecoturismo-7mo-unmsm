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
    /*
    const destinos = await pool.query(
    `
    SELECT
        *
    FROM
        destinos
            RIGHT JOIN publicaciones
                ON destinos.id_destino = publicaciones.id_destino
            RIGHT JOIN comentarios
                ON destinos.id_destino = comentarios.id_destino
            LEFT JOIN perfiles
                ON publicaciones.id_usuario = perfiles.id_usuario
    WHERE
        destinos.id_destino = ?
    `,[id_destino])
    */
    res.render('destinos/destinos')
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

    const datos = {
        titulo_destino,
        region,
        macroregion,
        ciudad_ubicacion,
        recomendacion_1,
        recomendacion_2,
        recomendacion_3,
        contenido_destino
    }

    console.log(datos)

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
    `,[datos.region])

    //console.log(verficar_region)
    
    if (verficar_region == false){
        //console.log("vacio")

    } else {
        //console.log("lleno")
    }

    /**
     * Reconocer Macroregion
     */

    /**
     * insertar region y macroregion
     */

    /**
     * insertar ubicacion
    */
    
    /**
     * insertar recomendaciones
     */



    /*
    const nueva_region = await pool.query(
    `
    INSERT INTO
        regiones (region)
    VALUES 
        (?)
    `,[region])

    const nueva_macroregion = await pool.query(
    `
    INSERT INTO
        macroregiones (macroregion)
    VALUES
        (?)
    `,[macroregion])

    const ubicacion = {
        id_macroregion: nueva_macroregion.insertId,
        id_region: nueva_region.insertId,
        ciudad_ubicacion
    }

    const nueva_ubicacion = await pool.query(
    `
    INSERT INTO
        ubicaciones
    SET
        ?
    `,[ubicacion])

    const destino = {
        id_ubicacion: nueva_ubicacion.insertId,
        titulo_destino,
        contenido_destino
    }

    const nuevo_destino = await pool.query(
    `
    INSERT INTO 
        destinos
    SET
        ?
    `,[destino])

    const nuevas_recomendaciones = await pool.query(
    `
    INSERT INTO
        recomendaciones (id_destino,recomendacion)
    VALUES
        (${nuevo_destino.insertId},'${recomendacion_1}'),
        (${nuevo_destino.insertId},'${recomendacion_2}'),
        (${nuevo_destino.insertId},'${recomendacion_3}')
    `)
    
    const publicacion = {
        id_usuario,
        id_destino: nuevo_destino.insertId
    }

    const nueva_publicacion = await pool.query(
    `
    INSERT INTO
        publicaciones
    SET
        ?
    `[publicacion])
    */
    
    res.redirect('/perfil')
}

module.exports = destino