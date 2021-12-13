require('dotenv').config()

const express = require('express')
const morgan = require('morgan')

const cors = require('cors')
const helmet = require('helmet')
const bodyParser = require('body-parser')

const path = require('path') //importar libreria para señalar camino o URL
const exphbs = require('express-handlebars') //importar la libreria express-handlebars como HTML
const session = require('express-session') //almacenar los datos en la memoria del servidor
const passport = require('passport') //importar passport para utilizar su codigo principal
const flash = require('connect-flash') //importar libreria para enviar mensajes a travez de las vistas
const MySQLStore = require('express-mysql-session')(session) //guardar la sesiones en mysql
const { database } = require('./keys') //importar la base de datos del archivo keys

const app = express()
app.disable('x-powered-by')

require('./library/passport')

//configuracion
app.set('port', process.env.PORT || 7000)
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({ //configuración para usar handlebars
    defaultLayout: 'main', //función principan de handlebars
    layoutsDir: path.join(app.get('views'), 'layouts'), //concatenar la dirección de views con layouts ,en html se utiliza  {{(nombre de carpeta)}}
    partialsDir: path.join(app.get('views'), 'partials'), //concatenar la dirección de views con partials
    extname: '.hbs',
    helpers: require('./library/handlebars'),
}));
app.set('view engine', '.hbs');

//Middlewares
app.use(morgan('dev'))

app.use(helmet.hidePoweredBy())
app.use(cors())

app.use(express.urlencoded({extended: false}))

app.use(bodyParser.json())

app.use(express.json())
app.use(session({
    secret: 'MySQL',
    reseave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
}))
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//Global Variables
app.use((req, res, next) => {
    app.locals.user = req.user;
    next();
});

//Variables globales

//Rutas
app.use(require('./routes/index.routes'))
app.use(require('./routes/autenticacion.routes'))
app.use('/destinos', require('./routes/destinos.routes'))
app.use('/perfil', require('./routes/perfil.routes'))
app.use('/admin',require('./routes/admin.routes'))


//Public
app.use(express.static(path.join(__dirname,'public')))

module.exports = app