/**
 * Importamos el archivo con la ruta "/db/destino.query" donde
 * poder utilizar las funciones que nos permite hacer consultas
 * a la base de datos.
 */
const db = require('../db/destino.query')

/**
 * Creamos el objeto que nos permitirá almacena las acciones que
 * relizará en este caso nuestro administrador.
 */
const admin = {}

/**
 * Funciones que se conectarán con los métodos GET y POST de admin.router
 * en las rutas de filtro:
 *  GET_FILTRO:
 *      funcion que importa la información sobre los destinos
 *      de la base de datos para enviarlo como objeto
 *      dentro del formato ".hbs" al ser renderizado
 *  POST_FILTRO:
 *      funcion que recibe la informacion enviada por los usuarios
 *      en esta ruta, convirtiendose en un callback al no haber
 *      acciones necesarias
 * @param {Request} req 
 *  Permite hacer consultas de requerimiento a la ruta HTTP donde
 *  se encuentre
 * @param {Response} res 
 *  Permite hacer envio de información o respuesta a la ruta HTTP
 *  donde se encuentre
 * @param {Object} destinos
 *  Objeto que almacena toda la informacion de los destinos ordenados
 *  en forma descendente respecto al tiempo, es decir que muestra
 *  los destinos creados en ultima instancia y al final los creados
 *  en primer lugar o antes.
 */
admin.get_filtro = async (req,res) => {
    const destinos = await db.destinoGetFiltro()
    res.render('busqueda/buscar_admin',{destinos})
}
admin.post_filtro = async (req,res,next) => {
    return res.redirect('/admin/filtro_destinos')
}

/**
 * Funciones que se conectarán con los métodos GET y POST de admin.router
 * en las rutas de inicio:
 *  GET_INICIO:
 *      funcion que importa la información sobre los destinos,usuarios,
 *      recomendaciones y comentarios de la base de datos para enviarlo
 *      como objeto dentro del formato ".hbs" al ser renderizado.
 *  POST_INICIO:
 *      funcion que recibe la informacion enviada por los usuarios
 *      en esta ruta, convirtiendose en un callback al no haber
 *      acciones necesarias
 * @param {Request} req 
 *  Permite hacer consultas de requerimiento a la ruta HTTP donde
 *  se encuentre
 * @param {Response} res 
 *  Permite hacer envio de información o respuesta a la ruta HTTP
 *  donde se encuentre
 * @param {int} id_usuario
 * valor entero que se extrae de la ruta HTTP que nos permite conocer
 * mediante la variable global user que "id_usuario" contiene
 * @param {int} id_destino
 * valor entero que se extrae de la ruta HTTP que nos permite conocer
 * mediante el parametro de ruta su identificado previamente establecido
 * @param {Object} destinos
 * objeto que contiene los destinos extraidos de la base de datos que
 * contengan en si mismo el id del destino pasado como parametro
 * @param {Object} recomendaciones
 * objeto que contiene las recomendaciones extraidas de la base de datos
 * que contengan en si mismo el id del destino pasado por parametro
 * @param {Object} comentarios
 * objeto que contiene los comentarios extraidas de la base de datos
 * que contengan en si mismo el id del destino pasado por parametro
 */
admin.get_inicio = async (req,res) => {
    const id_usuario = req.user?.id_usuario ?? 1
    const id_destino = req.params.id
    const destinos = await db.destinoGetDestino(id_destino)
    const usuarios = await db.destinoGetUsuario(id_usuario)
    const recomendaciones = await db.destinoGetRecomendacion(id_destino)
    const comentarios = await db.destinoGetComentario(id_destino)
    res.render('destinos/destino_admin',{destino: destinos[0],usuario: usuarios[0],recomendaciones,comentarios})
}
admin.post_inicio = async (req,res,next) => {
    return res.redirect('/admin/')
}

/**
 * exportamos el objeto que contendrá todas las acciones para las
 * rutas HTTP donde sea llamada.
 */
module.exports = admin