const express = require('express');
const path = require('path');
const route = require('./routes');

const exphbs = require('express-handlebars');





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

app.use('/',route());



const host = '0.0.0.0';
const port = '8080';
app.listen(port, host, function () {
  console.log('Server running at http://' + host + ':' + port + '/'); 
});














