/**
 * Creamos el objeto que nos permitirá almacena las acciones que
 * relizará en este caso nuestro autenticador
 */
const autenticacion = {}

/**
 * Funciones que se conectarán con los métodos GET y POST de autenticacion.router
 * en la rutas de registro:
 *  GET_REGISTRO:
 *      funcion que renderiza el formato ".hbs" para ser utilizado en la
 *      vista de registro
 * @param {Request} req 
 *  Permite hacer consultas de requerimiento a la ruta HTTP donde
 *  se encuentre
 * @param {Response} res 
 *  Permite hacer envio de información o respuesta a la ruta HTTP
 *  donde se encuentre
 */
autenticacion.get_registro = async (req,res) => {
    res.render('autenticacion/registro')
}

/**
 * Funciones que se conectarán con los métodos GET y POST de autenticacion.router
 * en la rutas de ingreso:
 *  GET_INGRESO:
 *      funcion que renderiza el formato ".hbs" para ser utilizado en la
 *      vista de inicio de sesion
 * @param {Request} req 
 *  Permite hacer consultas de requerimiento a la ruta HTTP donde
 *  se encuentre
 * @param {Response} res 
 *  Permite hacer envio de información o respuesta a la ruta HTTP
 *  donde se encuentre
 */
autenticacion.get_ingreso = async (req,res) => {
    res.render('autenticacion/ingreso')
}

/**
 * Funciones que se conectarán con los métodos GET y POST de autenticacion.router
 * en la ruta de salida:
 *  SALIDA:
 *      descerializa toda la información del usario serializado o registrado
 *      y cierra la sesión del mismo.
 * @param {Request} req 
 *  Permite hacer consultas de requerimiento a la ruta HTTP donde
 *  se encuentre
 * @param {Response} res 
 *  Permite hacer envio de información o respuesta a la ruta HTTP
 *  donde se encuentre
 */
autenticacion.salida = async (req,res) => {
    req.logOut()
    res.redirect('/')
}

/**
 * exportamos el objeto que contendrá todas las acciones para las
 * rutas HTTP donde sea llamada.
 */
module.exports = autenticacion