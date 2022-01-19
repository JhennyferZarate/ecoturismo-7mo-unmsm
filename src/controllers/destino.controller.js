/**
 * Importamos el archivo con la ruta "/db/destino.query" donde
 * poder utilizar las funciones que nos permite hacer consultas
 * a la base de datos.
 */
const db = require('../db/destino.query')

/**
 * Creamos el objeto que nos permitirá almacena las acciones que
 * relizará en este caso los destinos
 */
const destino = {}

/**
 * Funciones que se conectarán con los métodos GET y POST de destinos.router
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
destino.get_filtro = async (req,res) => {
    const destinos = await db.destinoGetFiltro()
    res.render('busqueda/buscar',{destinos})
}
destino.post_filtro = async (req,res,next) => {
    return res.redirect('/')
}

/**
 * Funciones que se conectarán con los métodos GET y POST de destinos.router
 * en la rutas de futuros destinos:
 *  GET_FUTURO:
 *      funcion que renderiza el formato ".hbs" para ser utilizado en la
 *      vista de futuro destino
 * @param {Request} req 
 *  Permite hacer consultas de requerimiento a la ruta HTTP donde
 *  se encuentre
 * @param {Response} res 
 *  Permite hacer envio de información o respuesta a la ruta HTTP
 *  donde se encuentre
 */
destino.get_futuro = async (req,res) => {
    res.render('destinos/destino_futuro')
}

/**
 * Funciones que se conectarán con los métodos GET y POST de destinos.router
 * en las rutas de inicio:
 *  GET_INICIO:
 *      funcion que importa la información sobre los destinos,usuarios,
 *      recomendaciones y comentarios de la base de datos para enviarlo
 *      como objeto dentro del formato ".hbs" al ser renderizado.
 *  POST_INICIO:
 *      funcion que recibe la informacion enviada por los usuarios
 *      en esta ruta, procesa los comentarios hechos en el destino
 *      donde se encuentran.
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
 * @param {Object} usuarios
 * objeto que contiene los usuarios extraidos de la base de datos que
 * contengan en si mismo el id del destino pasado como parametro
 * @param {Object} recomendaciones
 * objeto que contiene las recomendaciones extraidas de la base de datos
 * que contengan en si mismo el id del destino pasado por parametro
 * @param {Object} comentarios
 * objeto que contiene los comentarios extraidas de la base de datos
 * que contengan en si mismo el id del destino pasado por parametro
 * @param {Object} action
 * objeto que contiene la información si lo que se ha enviado es un
 * comentario.
 * @param {Obejct} nuevo_comentario
 * objeto que almacena la información del comentario enviado, almacenando
 * el id_usuario, id_destino y el contenido del comentario.
 */
destino.get_inicio = async (req,res) => {
    const id_usuario = req.user?.id_usuario ?? 1
    const id_destino = req.params.id
    const destinos = await db.destinoGetDestino(id_destino)
    const usuarios = await db.destinoGetUsuario(id_usuario)
    const recomendaciones = await db.destinoGetRecomendacion(id_destino)
    const comentarios = await db.destinoGetComentario(id_destino)
    res.render('destinos/destinos',{destino: destinos[0],usuario: usuarios[0],recomendaciones,comentarios})
}
destino.post_inicio = async (req,res) => {
    const action = req.body;
    const id_usuario = req.user?.id_usuario ?? 1
    const id_destino = req.params.id
    if(action["comentario"]){
        const nuevo_comentario = {
            id_usuario,
            id_destino,
            contenido_comentario: `${action.comentario}`
        }
        await db.destinoPostComentario(nuevo_comentario)
    }
    if(action["denuncia"] === "") { await db.destinoPostDenuncia(id_destino) }
    if(action["like"] === "") { await db.destinoPostLike(id_destino) }
    res.redirect(`/destinos/${id_destino}`)
}

/**
 * Funciones que se conectarán con los métodos GET y POST de destinos.router
 * en las rutas de crear:
 *  GET_CREAR:
 *      funcion que importa la información sobre las regiones y 
 *      las macroregiones de la base de datos para enviarlo
 *      como objeto dentro del formato ".hbs" al ser renderizado y esta
 *      información ayude a que el usuario identifique cuales son las 
 *      regiones y macroregiones previamente registradas en el proyecto
 *  POST_CREAR:
 *      funcion que recibe la informacion enviada por los usuarios
 *      en esta ruta. Esta información se procesará para validarse, identificar
 *      existencia en la base de datos y proximamente ser almacenada
 *      dentro de la misma.
 * @param {Request} req 
 *  Permite hacer consultas de requerimiento a la ruta HTTP donde
 *  se encuentre
 * @param {Response} res 
 *  Permite hacer envio de información o respuesta a la ruta HTTP
 *  donde se encuentre
 * @param {int} id_usuario
 * valor entero que se extrae de la ruta HTTP que nos permite conocer
 * mediante la variable global user que "id_usuario" contiene
 * @param {string} titulo_destino
 * valor de cadena que contiene la identificacion del destino como su titulo
 * @param {string} region
 * valor de cadena que contiene la información de la region donde se
 * ubica el destino
 * @param {string} macroregion
 * valor de cadena que contiene la información de la macroregion donde se
 * ubica el destino
 * @param {string} ciudad_ubicacion
 * valor de cadena que contiene la información de la ciudad donde se
 * ubica el destino
 * @param {string} recomendacion_1
 * valor de cadena que contiene la primera recomendación para este destino
 * @param {string} recomendacion_2
 * valor de cadena que contiene la segunda recomendación para este destino
 * @param {string} recomendacion_3
 * valor de cadena que contiene la tercera recomendación para este destino
 * @param {string} contenido_destino
 * valor de cadena que contiene la información general del destino.
 * @param {Object} verificar_region
 * este objeto almacena la información de la region luego de que esta haya sido
 * procesada por la funcion a su derecha que devuelve un objeto con la identifcacion
 * de la region a la que se hace referencia
 * @param {Object} verficar_macroregion
 * este objeto almacena la información de la macroregion luego de que esta haya sido
 * procesada por la funcion a su derecha que devuelve un objeto con la identifcacion
 * de la macroregion a la que se hace referencia
 * @param {Object} nueva_ubicacion
 * este objeto almacena la información de la region y la macroregion almacenada previamente
 * utilizando solo los parametros de sus identificadores respetivamente, además incluye
 * la ciudad de la ubicacion.
 * @param {Object} ubicacion
 * este objeto almacena la información sobre la inserción de datos cuando nueva_ubicacion ha 
 * sido almacenada.
 * @param {Object} nuevo_destino
 * este objeto almacena la información del identificador de la inserción de ubicación, luego
 * y junto al titulo del destino con el contenido del destino son agrupados en este nuevo obejto
 * @param {Object} destino
 * este objeto almacena la información sobre la inserción de datos cuando nuevo_destino ha 
 * sido almacenada.
 * @param {Object} nueva_publicacion
 * este objeto almacena la información del identificador del identificador de destino, junto al
 * id_usuario que es el identificador del usuario son almacenados en la base de datos.
 * @returns
 * la funcion post retorna un redirector al perfil del usuario
 */
destino.get_crear = async (req, res) => {
    const regiones = await db.destinoGetRegion()
    const macroregiones = await db.destinoGetMacroregion()
    res.render('destinos/destinos_crear',{regiones,macroregiones})
}
destino.post_crear = async (req, res) => {
    const id_usuario = req.user?.id_usuario ?? 1

    var img_destino
    if(req.file != undefined){
        img_destino = req.file.buffer
    }else {
        img_destino = null
    }

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

    const verficar_region = await db.destinoGetVerificarRegion(region)
    const verficar_macroregion = await db.destinoGetVerificarMacroregion(macroregion)
    const nueva_ubicacion = {
        id_macroregion: verficar_macroregion[0].id_macroregion,
        id_region: verficar_region[0].id_region,
        ciudad_ubicacion
    }
    const ubicacion = await db.destinoPostUbicacion(nueva_ubicacion)
    const nuevo_destino = {
        id_ubicacion: ubicacion.insertId,
        titulo_destino,
        contenido_destino,
        img_destino
    }
    const destiny = await db.destinoPostDestino(nuevo_destino)
    await db.destinoPostRecomendacion(destiny.insertId,recomendacion_1,recomendacion_2,recomendacion_3)
    const nueva_publicacion = {
        id_usuario,
        id_destino: destiny.insertId
    }
    await db.destinoPostPublicacion(nueva_publicacion)
    res.redirect('/perfil')
}

/**
 * exportamos el objeto que contendrá todas las acciones para las
 * rutas HTTP donde sea llamada.
 */
module.exports = destino