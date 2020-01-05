const express = require('express');
const route = express.Router();



//Importar el controladores
const homeController = require("../controllers/homeController");








module.exports = () => {
    

     //Ruta de home
    route.get('/', homeController.mostrarTrabajos );

    
    
    
    
    return route;

};