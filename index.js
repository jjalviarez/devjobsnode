//conexion con la BD
const mongoose = require('mongoose');
require("./config/db");


const express = require('express');
const path = require('path');
const route = require('./routes');
require('dotenv').config({path: 'variables.env'});
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);





//crear un app en express
const app = express();



//Carpeta de archivos estaticos
app.use(express.static('public'));
//agregra la caprteta de las vistas 
app.set('views',path.join(__dirname, './views'));


//hablilitar handlebars (Templete Engine)

app.engine('handlebars',
    exphbs({
      defaultLayout: 'layout'
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

app.use('/',route());



const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || '8080'
app.listen(port, host, function () {
  console.log('Server running at http://' + host + ':' + port + '/'); 
});














