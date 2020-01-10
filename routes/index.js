const express = require('express');
const route = express.Router();



//Importar el controladores
const homeController = require("../controllers/homeController");
const vacantesController = require("../controllers/vacantesController");








module.exports = () => {
    

     //Ruta de home
    route.get('/', homeController.mostrarTrabajos );

    
    //crear bacantes 
    route.get('/vacantes/nueva', vacantesController.formularioNuevaVacante );
    route.post('/vacantes/nueva', vacantesController.agregarVacantes );
    
    //Vacante por URL
    route.get('/vacante/:url', vacantesController.vacantePorUrl );
    //editar
    route.get('/vacante/editar/:url', vacantesController.editarVacante );
    route.post('/vacante/editar/:url', vacantesController.actualizarVacante );
    
    
    return route;

};