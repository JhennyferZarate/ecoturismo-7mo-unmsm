/**
 * Importamos el archivo con la ruta "/db/index.query" donde
 * poder utilizar las funciones que nos permite hacer consultas
 * a la base de datos.
 */
const db = require('../db/index.query')

/**
 * Creamos el objeto que nos permitirá almacena las acciones que
 * relizará en este caso nuestro index.
 */
const index = {}

/**
 * Funciones que se conectarán con los métodos GET y POST de index.router
 * en las rutas de inicio:
 *  GET_FILTRO:
 *      funcion que importa la información sobre los mejores destinos y los
 *      ultimos destinos creados de la base de datos para enviarlo como objeto
 *      dentro del formato ".hbs" al ser renderizado.
 * @param {Request} req 
 *  Permite hacer consultas de requerimiento a la ruta HTTP donde
 *  se encuentre
 * @param {Response} res 
 *  Permite hacer envio de información o respuesta a la ruta HTTP
 *  donde se encuentre
 * @param {Object} Mejores
 *  Objeto que almacena toda la informacion de los destinos con mejores
 *  comentarios y likes ordenados en forma ascendentes respecto a la cantidad de likes, 
 *  es decir que muestra los destinos con las likes y al final los destinos
 *  con menos likes.
 * @param {Object} Ultimos
 * Objeto que almacena toda la informacion de los destinos con mejores
 *  comentarios y likes ordenados en forma descendente respecto al tiempo, 
 *  es decir que muestra los destinos creados en ultima instancia y al final 
 *  los creados en primer lugar o antes.
 */
index.get_inicio = async (req, res) => {
    const Mejores = await db.indexGetMejores()
    const Ultimos = await db.indexGetUltimos()
    res.render('index',{Mejores,Ultimos})
}

/**
 * exportamos el objeto que contendrá todas las acciones para las
 * rutas HTTP donde sea llamada.
 */
module.exports = index