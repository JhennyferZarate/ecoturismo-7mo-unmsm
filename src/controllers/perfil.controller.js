/**
 * Importamos el archivo con la ruta "/db/perfil.query" donde
 * poder utilizar las funciones que nos permite hacer consultas
 * a la base de datos.
 */
const db = require('../db/perfil.query')
const app = require('../app')

/**
 * Importaremos el archivo:
 *  HELPERS
 *      este archivo contiene las herramientas para encriptar y
 *      comparar strings encryptados.
 */
const helpers = require('../library/helpers');

/**
 * Creamos el objeto que nos permitirá almacena las acciones que
 * relizará en este caso los de perfil
 */
const perfil = {}

/**
 * Funciones que se conectarán con los métodos GET y POST de perfil.router
 * en las rutas de inicio:
 *  GET_INICIO:
 *      funcion que importa la información sobre los destinos y el perfil
 *      del usuario desde la base de datos para enviarlo
 *      como objeto dentro del formato ".hbs" al ser renderizado.
 * @param {Request} req 
 *  Permite hacer consultas de requerimiento a la ruta HTTP donde
 *  se encuentre
 * @param {Response} res 
 *  Permite hacer envio de información o respuesta a la ruta HTTP
 *  donde se encuentre
 * @param {int} id_usuario
 * valor entero que se extrae de la ruta HTTP que nos permite conocer
 * mediante la variable global user que "id_usuario" contiene
 * @param {Object} destinos
 * objeto que contiene los destinos extraidos de la base de datos que
 * contengan en si mismo el id del destino pasado como parametro
 * @param {Object} Perfil
 * objeto que contiene los datos del usuario extraidos de la base de 
 * datos que contengan en si mismo el id del destino pasado como parametro
 */
perfil.get_inicio = async (req,res) => {
    const id_usuario = req.user?.id_usuario ?? 1
    const Perfil = await db.perfilGetPerfil(id_usuario)
    const destinos = await db.perfilGetDestino(id_usuario)
    res.render('perfil/perfil', {perfil: Perfil[0],destinos})
}

/**
 * Funciones que se conectarán con los métodos GET y POST de destinos.router
 * en las rutas de inicio:
 *  GET_CAMBIAR_DATOS:
 *      funcion que importa la información sobre el usuario registrado
 *      desde la base de datos para enviarlo como objeto dentro del 
 *      formato ".hbs" al ser renderizado.
 *  POST_CAMBIAR_DATOS:
 *      funcion que recibe la informacion enviada por los usuarios
 *      en esta ruta, recibe la información de cambio de datos y 
 *      se actualizan.
 * @param {Request} req 
 *  Permite hacer consultas de requerimiento a la ruta HTTP donde
 *  se encuentre
 * @param {Response} res 
 *  Permite hacer envio de información o respuesta a la ruta HTTP
 *  donde se encuentre
 * @param {int} id_usuario
 * valor entero que se extrae de la ruta HTTP que nos permite conocer
 * mediante la variable global user que "id_usuario" contiene
 * @param {string} nombre_perfil
 * cadena que regisra el nombre del usuario que actualiza sus datos
 * @param {string} apellido_perfil
 * cadena que regisra el apellido del usuario que actualiza sus datos
 * @param {string} email_perfil
 * cadena que regisra el email del usuario que actualiza sus datos
 * @param {Object} Perfil
 * objeto que almacena la información del perfil del usuario desde la
 * base de datos y que se filtra con el id_usuario.
 * @param {Object} nuevo_perfil
 * objeto que almacena la información del nuevo usuario que se registra
 * teniendo en cuenta el nombre_perfil, apellido_perfil y email_perfil.
 */
perfil.get_cambiar_datos = async (req,res) => {
    const id_usuario = req.user?.id_usuario ?? 1
    const Perfil = await db.perfilGetCambioDatos(id_usuario)
    res.render('perfil/perfil_cambiar_datos',{perfil:Perfil[0]})
}
perfil.post_cambiar_datos = async (req,res) => {
    const id_usuario = req.user?.id_usuario ?? 1
    const {
        nombre_perfil,
        apellido_perfil,
        email_usuario
    } = req.body
    const nuevo_perfil = {
        nombre_perfil,
        apellido_perfil,
    }
    await db.perfilPostCambioPerfil(nuevo_perfil,id_usuario)
    await db.perfilPostCambioEmail(email_usuario,id_usuario)
    res.redirect('/perfil')
}

/**
 * Funciones que se conectarán con los métodos GET y POST de destinos.router
 * en las rutas de cambiar pass:
 *  GET_CAMBIAR_PASS:
 *      funcion que importa la información sobre el usuario registrado
 *      desde la base de datos para enviarlo como objeto dentro del 
 *      formato ".hbs" al ser renderizado.
 *  POST_CAMBIAR_PASS:
 *      funcion que recibe la informacion enviada por los usuarios
 *      en esta ruta, recibe la información de cambio de contraseña y 
 *      se actualizan.
 * @param {Request} req 
 *  Permite hacer consultas de requerimiento a la ruta HTTP donde
 *  se encuentre
 * @param {Response} res 
 *  Permite hacer envio de información o respuesta a la ruta HTTP
 *  donde se encuentre
 * @param {int} id_usuario
 * valor entero que se extrae de la ruta HTTP que nos permite conocer
 * mediante la variable global user que "id_usuario" contiene
 * @param {string} pass_usuario
 * cadena que regisra la contraseña del usuario que actualiza sus datos
 * @param {string} nuevo_pass_usuario
 * cadena que regisra la nueva contraseña del usuario que actualiza sus datos
 * @param {string} copia_nuevo_pass_usuario
 * cadena que regisra la copia de la nueva contraseña del usuario que
 * actualiza sus datos
 * @param {boolean} validPassword
 * valor boleando que establece que la contraseña y la nueva contraseña son
 * iguales
 * @param {string} new_pass
 * cadena que almacena la nueva contraseña encriptada
 */
perfil.get_cambiar_pass = async (req, res) => {
    res.render('perfil/perfil_cambiar_pass')
}
perfil.post_cambiar_pass = async (req, res) => {
    const id_usuario = req.user?.id_usuario ?? 1
    const {
        pass_usuario,
        nuevo_pass_usuario,
        copia_nuevo_pass_usuario
    } = req.body
    if (nuevo_pass_usuario == copia_nuevo_pass_usuario){
        const rows = await db.perfilGetUsuarios(id_usuario)
        const validPassword = await helpers.matchPassword(pass_usuario, rows[0].pass_usuario)
        if (validPassword){
            const new_pass = await helpers.encryptPassword(nuevo_pass_usuario);
            await db.perfilPosttCambioPass(new_pass,id_usuario)
        } else {
            return res.redirect('/perfil')
        }
        
    } else {
        return res.redirect('/perfil')
    }
    res.redirect('/perfil')
}

/**
 * Funciones que se conectarán con los métodos GET y POST de destinos.router
 * en las rutas de buscar:
 *  BUSCAR:
 *      funcion que rederiza la busqueda de destinos pasando por parametro el
 *      formato ".hbs" al ser renderizado.
 * @param {Request} req 
 *  Permite hacer consultas de requerimiento a la ruta HTTP donde
 *  se encuentre
 * @param {Response} res 
 *  Permite hacer envio de información o respuesta a la ruta HTTP
 *  donde se encuentre
 */
perfil.buscar = async (req, res) => {
    res.render('busqueda/buscar')
}

/**
 * exportamos el objeto que contendrá todas las acciones para las
 * rutas HTTP donde sea llamada.
 */
module.exports = perfil