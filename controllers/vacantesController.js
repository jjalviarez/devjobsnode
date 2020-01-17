//Vay Dos Forna de agregar el controlador 
/*
//Forma tradicional 
const Vacantes = require("../models/Vacantes");
*/
const mongoose = require('mongoose');
const Vacante = mongoose.model('Vacante');
//const Usuario = mongoose.model('Usuario');

const { body, sanitizeBody, validationResult } = require('express-validator');
const multer  = require('multer');
const uuidv1 = require('uuid/v1');

const slug = require('slug');
const shortid = require('shortid');




exports.formularioNuevaVacante = (req,res) => {
        res.render("nueva-vacante", {
            nombrePagina: 'Nueva Vacante',
            tagline: 'Llena el Formulario',
            nuevo: true,
            nombre: req.user.nombre,
            imagen: req.user.imagen,
            cerrarSesion: true,
        });
};




exports.agregarVacantes = async (req,res) => {
        req.body.skills = req.body.skills.split(',');
        const url= slug(req.body.titulo);
        req.body.url = url + '-' + shortid.generate();
        const vacante = await Vacante.create({...req.body, autor: req.user._id});
        res.redirect("/vacante/" + vacante.url);
};




exports.vacantePorUrl = async (req,res,next) => {
    const url = req.params.url
    const vacante = await Vacante.findOne({url}).populate('autor');
    //const usuario = await Usuario.findById(vacante.autor);
    //console.log(vacante);
    if (!vacante) return next();
    res.render("vacante", {
        nombrePagina: vacante.titulo,
        barra: true,
        //usuario,
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
        imagen: req.user.imagen,
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
        imagen: req.user.imagen,
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

//Guardar vacante en la DB
exports.contactar = async (req,res,next) => {
    const url = req.params.url;
    const candidatos = {
        nombre:req.body.nombre,
        email:req.body.email
    };
    if(req.file) {
        candidatos.cv= req.file.filename;
    }
    const vacante = await Vacante.findOneAndUpdate({url},{ $push: { candidatos } },);
    if (!vacante) return next();
    req.flash('correcto', 'Postulación enviada Correctamente');
    return res.redirect("/");
};



//middleware de carga de archivo
exports.subirCV = (req,res,next) => {
    upload(req, res, function (error) {
        if (error) {
            if (error instanceof multer.MulterError) {
                if(error.code === 'LIMIT_FILE_SIZE') {
                    req.flash('error', 'El archivo es muy grande: Máximo 300kb ');
                } else {
                    req.flash('error', error.message);
                }
            }
            else {
                req.flash('error', error.message);
            }
            return res.redirect('back');
        } 
        else {
        return next();
        }
    });
};
//Configuracion del archivo
const configuracionMulter = {
    limits: {
        fileSize : 300000
    },
    fileFilter (req, file, cb) {
        if (file.mimetype.split('/')[1]==='pdf') {
            cb(null, true);
        }
        else {
            cb(new Error('Formato no Valido'));
        }
    },
    storage :  multer.diskStorage({
              destination : (req, file, cb) => {
                cb(null, __dirname + '../../public/uploads/cv');
              },
              filename : (req, file, cb) => {
                const extnsion = file.mimetype.split('/')[1];
                cb(null,uuidv1() + '.' + extnsion);
              }
    })
    
};
//inicializar multer
const upload = multer(configuracionMulter).single('cv');



exports.candidatosPorUrl = async (req,res,next) => {
    const _id = req.params.id
    const autor = req.user._id
    const vacante = await Vacante.findOne({_id,autor });
    if (!vacante) return next();
    res.render("candidatos", {
        nombrePagina: 'Candidatos - ' + vacante.titulo,
        barra: true,
        cerrarSesion: true,
        nombre: req.user.nombre,
        imagen: req.user.imagen,
        candidatos: vacante.candidatos
    });
    
};