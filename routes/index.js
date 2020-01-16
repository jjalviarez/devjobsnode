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

    
    //crear vacantes 
    route.get('/vacantes/nueva',authController.usuarioAutenticado, vacantesController.formularioNuevaVacante );
    route.post('/vacantes/nueva',authController.usuarioAutenticado, vacantesController.validarVacante, vacantesController.agregarVacantes );
    
    //Vacante por URL
    route.get('/vacante/:url', vacantesController.vacantePorUrl );
    //editar
    route.get('/vacante/editar/:url',authController.usuarioAutenticado, vacantesController.editarVacante );
    route.post('/vacante/editar/:url',authController.usuarioAutenticado, vacantesController.validarVacante, vacantesController.actualizarVacante );
    //Emilina Vacante    
    route.delete('/vacante/:id', authController.usuarioAutenticado, vacantesController.eliminarVacante);
    
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
    
     //Cerrar sesion
    route.get('/logout', authController.usuarioAutenticado, authController.cerrarSesion);
    
    //sitio de administracion
    route.get('/administracion',authController.usuarioAutenticado,authController.mostrarPanel);
    //editar Perfil
    route.get('/editar-perfil',authController.usuarioAutenticado,usuariosController.formEditarPerfil);
    route.post('/editar-perfil',
    authController.usuarioAutenticado,
    //usuariosController.validarPerfil,
    usuariosController.subirImagen,
    usuariosController.actualizarPerfil);
    
    
    
    return route;

};