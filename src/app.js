/**
 * Importamos el modulo DOVENT de NPM, donde almacenaremos
 * todas las credenciales necesarias para que nuestro
 * proyecto pueda funcionar.
 */
require('dotenv').config()
/**
 * Importamos los modulos de NPM:
 *  express:
 *      framework principal de nodeJS para diseño web.
 *  morgan:
 *      middleware para identificar el estado HTTP.
 *  cors:
 *      middleware que no permite el intercambio sincrono
 *      y asincrono de la informaciòn.
 *  helmet:
 *      middleware que protege la informaciòn del backend.
 *  path:
 *      middleware que nos permite manipular rutas de
 *      informaciòn.
 *  express-handlebars:
 *      middleware que nos permite usar handlebars como
 *      modular de HTML.
 *  express-session:
 *      middleware que nos permite controlar el almacenamiento
 *      del inicio de sesiones.
 *  passport:
 *      middleware que contiene una libreria para logearse.
 *  express-mysql-session:
 *      middleware que nos permite conectarnos a MYSQL.
 */
const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const path = require('path')
const exphbs = require('express-handlebars')
const session = require('express-session')
const passport = require('passport')
const MySQLStore = require('express-mysql-session')(session)

/**
 * Importamos nuestro archivo "keys" donde se encuentran
 * las credenciales para iniciar sessión
 */
const { database } = require('./keys')

/**
 * Iniciamos el framework EXPRESS
 */
const app = express()

/**
 * Bloqueamos el acceso al motor con el cual
 * corre nuestro poryecto
 */
app.disable('x-powered-by')

/**
 * Importamos el archivo library/passport donde encontraremos
 * la configuración de logeo.
 */
require('./library/passport')

/**
 * Configuramos las herramientas que utilizaremos mediante EXPRESS
 *  port:
 *      inidica el puerto donde correrá nuestro proyectos y se
 *      almacena en la variable "port".
 *  views:
 *      convertimos a la carpeta "views" parte de EXPRESS y
 *      parte de nuestro proyecto en forma de variable "views".
 *  .hbs:
 *      establecemos el sufijo ".hbs" como el predeterminado para
 *      nuestros archivos handlebars para no escribir ".handlebars"
 *      en todos los archivos.
 *  view engine:
 *      configuramos que los archivos ".hbs" sean partes de EXPRESS
 *      y lo almacenamos en la variables "view engine".
 */
app.set('port', process.env.PORT || 7000)
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./library/handlebars'),
}));
app.set('view engine', '.hbs');

/**
 * Inicializamos los middlewares que utilizará EXPRESS
 * 
 * Ejecutamos los middleware:
 *      MORGAN
 *      HELMET
 *      CORS
 *      EXPRESS.
 *          URLENCODED
 *          JSON
 *      SESSION
 *      PASSPORT.
 *          INITIALIZE
 *          SESSION
 */
app.use(morgan('dev'))
app.use(helmet.hidePoweredBy())
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(session({
    secret: 'MySQL',
    reseave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
}))
app.use(passport.initialize());
app.use(passport.session());

/**
 * Establecemos las variables Globales dentro de EXPRESS
 *  user:
 *      variable que indica a los usuarios logeados
 */
app.use((req, res, next) => {
    app.locals.user = req.user;
    next();
});

/**
 * Importamos las carpetas donde se encontrarán las rutas que 
 * utlizaremos para nuestro proyecto.
 * Los String escritos previamente se establecen como rutas 
 * previas en el buscador.
 */
app.use(require('./routes/index.routes'))
app.use(require('./routes/autenticacion.routes'))
app.use('/destinos', require('./routes/destinos.routes'))
app.use('/perfil', require('./routes/perfil.routes'))
app.use('/admin',require('./routes/admin.routes'))

/**
 * Integramos la carpeta "public" como parte de nuestro
 * proyectos EXPRESS
 */
app.use(express.static(path.join(__dirname,'public')))

/**
 * Exportamos el objeto app para que pueda ejecutarlo el archivo
 * "index.js"
 */
module.exports = app