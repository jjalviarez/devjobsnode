//Vay Dos Forna de agregar el controlador 
/*
//Forma tradicional 
const Vacantes = require("../models/Vacantes");
*/
const mongoose = require('mongoose');
const Vacante = mongoose.model('Vacante');

const { body, sanitizeBody, validationResult } = require('express-validator');






exports.formularioNuevaVacante = (req,res) => {
        res.render("nueva-vacante", {
            nombrePagina: 'Nueva Vacante',
            tagline: 'Llena el Formulario',
            nuevo: true,
            nombre: req.user.nombre,
            cerrarSesion: true,
        });
};




exports.agregarVacantes = async (req,res) => {
        req.body.skills = req.body.skills.split(',');
        const vacante = await Vacante.create({...req.body, autor: req.user._id});
        res.redirect("/vacante/" + vacante.url);
};




exports.vacantePorUrl = async (req,res,next) => {
    const url = req.params.url
    const vacante = await Vacante.findOne({url});
    //console.log(vacante + ' ' + url);
    if (!vacante) return next();
    res.render("vacante", {
        nombrePagina: vacante.titulo,
        barra: true,
        vacante
    });
    
};


exports.editarVacante = async (req,res,next) => {
    const url = req.params.url
    const vacante = await Vacante.findOne({url});
    if(!vacante) return next();
    res.render("nueva-vacante", {
        nombrePagina: 'Editar Vacante',
        tagline: 'Editar el Formulario',
        vacante,
        nombre: req.user.nombre,
        cerrarSesion: true,
    });
};


exports.actualizarVacante = async (req,res) => {
    
        const url = req.params.url;
        const nuevaVacante = req.body;
        nuevaVacante.skills=  req.body.skills.split(',');
        const vacante = await Vacante.findOneAndUpdate(
            {url},
            nuevaVacante,{
            new: true,
            runValidators: true
        });
        //console.log(vacante);
        res.redirect("/vacante/" + url);
        //res.send('Aqui se actualiza');
};

exports.validarVacante = async  (req,res,next) => {
    const rules = [
        sanitizeBody('titulo').escape().run(req),
        sanitizeBody('empresa').escape().run(req),
        sanitizeBody('ubicacion').escape().run(req),
        sanitizeBody('salario').escape().run(req),
        sanitizeBody('contrato').escape().run(req),
        sanitizeBody('skills').escape().run(req),
        body('titulo','El titulo es obligatorio').notEmpty().run(req),
        body('empresa','El nombre de la empresa es obligatorio').notEmpty().run(req),
        body('ubicacion','La ubicacion es obligatorio').notEmpty().run(req),
        body('contrato','Selecionar un contrato').notEmpty().run(req),
        body('skills','Selecione una habilidad').notEmpty().run(req),
    ];
    await Promise.all(rules);
    const errores = validationResult(req);
    //console.log(errores);
    //res.send(errores);
    if(errores.isEmpty()){
        return next();
    }
    req.flash('error', errores.array().map(error => error.msg));
    res.render('nueva-vacante', {
        mensajes: req.flash(),
        nombrePagina: (req.params.url) ? 'Editar Vacante' : 'Nueva Vacante',
        tagline: (req.params.url) ? 'Editar el Formulario' : 'Llena el Formulario',
        nuevo: (req.params.url) ? false : true,
        cerrarSesion: true,
        nombre: req.user.nombre,
        vacante: req.body
    });
    return ;
};



exports.eliminarVacante = async (req,res,next) => {
    const resultado = await Vacante.findOneAndDelete({_id:req.params.id, autor: req.user._id});
    if (!resultado) {
         return next();   
    }
    res.status(200).send('Vacante Eminada Correctamenre');
};