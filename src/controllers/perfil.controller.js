const pool = require('../database')
const helpers = require('../library/helpers');

const perfil = {}

perfil.get_inicio = async (req,res) => {
    const id_usuario = req.user.id_usuario

    /**
     * Información del usuario
     */
    const Perfil = await pool.query(
        `
        SELECT
            *,
            count(id_destino) as N_publicaciones
        FROM
            perfiles
            RIGHT JOIN usuarios
                ON perfiles.id_usuario = usuarios.id_usuario
            LEFT JOIN publicaciones
                ON perfiles.id_usuario = publicaciones.id_usuario
        WHERE 
            perfiles.id_usuario = ?;
        `
    ,[id_usuario])
    
    /**
     * Destinos creados por el usuario
     */
    const destinos = await pool.query(
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

    res.render('perfil/perfil', {perfil: Perfil[0],destinos})
}

perfil.get_cambiar_datos = async (req,res) => {
    const id_usuario = req.user.id_usuario

    const Perfil = await pool.query(
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

    res.render('perfil/perfil_cambiar_datos',{perfil:Perfil[0]})
}

perfil.post_cambiar_datos = async (req,res) => {
    const id_usuario = req.user.id_usuario

    const {
        nombre_perfil,
        apellido_perfil,
        email_usuario
    } = req.body

    const nuevo_perfil = {
        nombre_perfil,
        apellido_perfil,
    }

    await pool.query(`
        UPDATE
            perfiles
        SET 
            ?
        WHERE

            id_usuario = ?
    `,[nuevo_perfil,id_usuario])

    await pool.query(`
        UPDATE
            usuarios
        SET 
            email_usuario = ?
        WHERE
            id_usuario = ?
    `,[email_usuario,id_usuario])

    res.redirect('/perfil')
}

perfil.get_cambiar_pass = async (req, res) => {
    res.render('perfil/perfil_cambiar_pass')
}

perfil.post_cambiar_pass = async (req, res) => {
    const id_usuario = req.user.id_usuario
    console.log(req.body);
    const {
        pass_usuario,
        nuevo_pass_usuario,
        copia_nuevo_pass_usuario
    } = req.body
    console.log(nuevo_pass_usuario)
    console.log(copia_nuevo_pass_usuario)
    if (nuevo_pass_usuario == copia_nuevo_pass_usuario){

        const rows = await pool.query(`
            SELECT 
                *
            FROM
                usuarios
            WHERE
                id_usuario = ?            
        `,[id_usuario]);
        console.log(rows);
        const validPassword = await helpers.matchPassword(pass_usuario, rows[0].pass_usuario)
        if (validPassword){
            console.log(nuevo_pass_usuario)
            const new_pass = await helpers.encryptPassword(nuevo_pass_usuario);
            console.log(new_pass)
            await pool.query(`
            UPDATE
                usuarios
            SET 
                pass_usuario = ?
            WHERE
                id_usuario = ?
            `,[new_pass,id_usuario])
        } else {
            console.log("contraseñas distintas")
            return res.redirect('/perfil')
        }
        
    } else {
        console.log("copia distinta")
        return res.redirect('/perfil')
    }
    res.redirect('/perfil')
}

// TEST BUSCAR ELIMINARME!
perfil.buscar = async (req, res) => {
    res.render('busqueda/buscar')
}
// FIN TEST BUSCAR ELIMINAME!

module.exports = perfil