//Vay Dos Forna de agregar el controlador 
/*
//Forma tradicional 
const Vacantes = require("../models/Vacantes");
*/
const mongoose = require('mongoose');
const Vacante = mongoose.model('Vacante');







exports.formularioNuevaVacante = (req,res) => {
        res.render("nueva-vacante", {
            nombrePagina: 'Nueva Vacante',
            tagline: 'Llena el Formulario'
        });
};




exports.agregarVacantes = async (req,res) => {
        const vacante = await Vacante.create(req.body);
        //console.log(vacante);
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
        nombrePagina: vacante.titulo,
        tagline: 'Ecitar el Formulario',
        vacante
    });
};


exports.actualizarVacante = async (req,res) => {
    
        const url = req.params.url
        const nuevaVacante = req.body;
        nuevaVacante.skills=  JSON.parse(nuevaVacante.skills);
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