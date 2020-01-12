const express = require('express');
const route = express.Router();



//Importar el controladores
const homeController = require("../controllers/homeController");
const vacantesController = require("../controllers/vacantesController");
const usuariosController = require("../controllers/usuariosController");
const authController = require("../controllers/authController");








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
    
    //crear Cuenta
    //Crear Nueva Cuenta
    route.get('/crear-cuenta',usuariosController.formCrearCuenta);
    route.post('/crear-cuenta',usuariosController.validarregistro,usuariosController.crearCuenta);
    
    
    //Iniciar Sesion
    route.get('/iniciar-sesion',usuariosController.forminiciarSesion);
    route.post('/iniciar-sesion',authController.autenticarUsuario);
    //route.get('/iniciar-sesion/:token',usuariosController.activarCuenta);
    
  //Creat Token para cambio de  Contraseña 
    //route.get('/restablecer', usuariosController.formRestablecerPassword);
    //route.post('/restablecer', authController.enviarToken); 
    
    
    route.get('/administracion',authController.mostrarPanel);
    
    
    return route;

};