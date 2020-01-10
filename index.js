//conexion con la BD
const mongoose = require('mongoose');
require("./config/db");


const express = require('express');
const path = require('path');
const route = require('./routes');
require('dotenv').config({path: 'variables.env'});
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const session = require('express-session');
const expressValidator = require('express-validator');
const MongoStore = require('connect-mongo')(session);

//crear un app en express
const app = express();

//Se habilita el bodyParser para los req de datos
app.use(bodyParser.urlencoded({extended: false }));
app.use(bodyParser.json());



//Carpeta de archivos estaticos
// static files
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));
//agregra la caprteta de las vistas 
app.set('views',path.join(__dirname, './views'));
//habilitar flash Menssages
app.use(flash());


//hablilitar handlebars (Templete Engine)

app.engine('handlebars',
    exphbs({
      defaultLayout: 'layout',
      helpers: require('./helpers/handlebars')
    })
);


app.set('view engine', 'handlebars');

//habilitar cookieParser
app.use(cookieParser());

//habilitar session
app.use(session({
  secret: process.env.SECRETO,
  key: process.env.KEY,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection }) 
}))

//declaraciones de los middleware
app.use((req, res, next) => {
    res.locals.mensajes = req.flash();
    //res.locals.usuario = {...req.user} || null;
    next(); 
});
 

app.use('/',route());



const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || '8080'
app.listen(port, host, function () {
  console.log('Server running at http://' + host + ':' + port + '/'); 
});














