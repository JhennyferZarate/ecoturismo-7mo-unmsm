const express = require('express')
const morgan = require('morgan')
const path = require('path')
const exphbs = require('express-handlebars');
const session = require('express-session')
const MySQLStore = require('express-mysql-session')(session)
const { database } = require('./keys')

const app = express()

//configuracion
app.set('port', process.env.PORT || 7000)
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
}));
app.set('view engine', '.hbs');

//Middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(session({
    secret: 'MySQL',
    reseave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
}))

//Variables globales

//Rutas
app.use(require('./routes/index.routes'))
app.use(require('./routes/autenticacion.routes'))
app.use('/destinos', require('./routes/destinos.routes'))
app.use('/perfil', require('./routes/perfil.routes'))



//Public
app.use(express.static(path.join(__dirname,'public')))

module.exports = app