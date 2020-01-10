const mongoose = require('mongoose');
const Usuario = mongoose.model('Usuario');
const { body, sanitizeBody, validationResult, check } = require('express-validator');





exports.formCrearCuenta = (req,res) => {
    res.render('crearCuenta', {
        nombrePagina: 'Crear Cuenta',
        tagline: 'Publica ahora'
    });
};





exports.crearCuenta = async (req,res,next) => {
    const {email, password, nombre, confirmar} = req.body;
    try {
        await Usuario.create(req.body);
        
        //Enviar correo
        
        //const url= 'https://' + req.headers.host + "/iniciar-sesion/" + token;
        
        //Enviar el correo
        /*
        await enviarEmail.enviar({
            usuario: {email},
            url, 
            subject: 'Activar usuario',
            archivo: 'confirmar-cuenta'
        });
        */
        
        //req.flash('correcto', 'Se envio un mensaje a tu correo Para Activar Tu cuenta');
        res.redirect('/iniciar-sesion');
    } catch (error) {
        //req.flash('error', error.errors.map(error => error.message))
        res.render('crearCuenta', {
            //mensajes: req.flash(),
            nombrePagina: 'Crear Cuenta',
            email, 
            password,
            nombre,
            confirmar
        });
        
        
    }
};


exports.validarregistro = async  (req,res,next) => {
    const {email, password, nombre, confirmar} = req.body;
    const rules = [
        sanitizeBody('nombre').escape().run(req),
        sanitizeBody('email').escape().run(req),
        sanitizeBody('password').escape().run(req),
        sanitizeBody('confirmar').escape().run(req),
        body('nombre','El nombre es Obligatorio').notEmpty().run(req),
        body('email','El email debe ser valido').isEmail().run(req),
        body('password','El password no puede ir vacío').notEmpty().run(req),
        body('confirmar','Confirmar password no puede ir vacío').notEmpty().run(req),
        body('confirmar','El password es diferente').equals(req.body.password).run(req)
    ];
    await Promise.all(rules);
    const errores = validationResult(req);
    //console.log(errores);
    //res.send(errores);
    if(errores.isEmpty()){
        return next();
    }
    req.flash('error', errores.array().map(error => error.msg));
    res.render('crearCuenta', {
            mensajes: req.flash(),
            nombrePagina: 'Crear Cuenta',
            email, 
            password,
            nombre,
            confirmar
    });
    return ;
};


//body('nombre').not().isEmpty().trim().escape()
/*
exports.validarRegistro = async (req, res, next) => {
    const rules = [
        sanitizeBody('nombre').escape(),
        sanitizeBody('email').escape(),
        sanitizeBody('password').escape(),
        sanitizeBody('confirmar').escape(),
        body('nombre').not().isEmpty().withMessage('El nombre es Obligatorio'),
        body('email').isEmail().withMessage('El email debe ser valido'),
        body('password').not().isEmpty().withMessage('El password no puede ir vacío'),
        body('confirmar').not().isEmpty().withMessage('Confirmar password no puede ir vacío'),
        body('confirmar').equals(req.body.password).withMessage('El password es diferente')
    ];
    await Promise.all(rules.map( validation => validation.run(req)));
    const errores = validationResult(req);
 
    if(errores.isEmpty()){
        return next();
    }
    req.flash('error', errores.array().map(error => error.msg));
    res.render('crear-cuenta', {
        nombrePagina: 'Crea tu cuenta en devJobs',
        tagline: 'Comienza a publicar tus vacantes gratis, solo debes crear una cuenta',
        mensajes: req.flash()
    });
    return;
};
*/

exports.forminiciarSesion = (req,res) => {
    
    res.render('iniciarSesion', {
        nombrePagina: 'Iniciar Sesion',
        tagline: 'ingresa  ahora'
    });
};


/*


exports.formRestablecerPassword = (req,res) => {
    
    res.render('restablecer', {
        nombrePagina: 'Restablecer Contraseña'
    });
    
    
};



exports.activarCuenta = async (req,res) =>{
    
    const usuario =  await Usuarios.findOne({
                where: {
                        token: req.params.token
                }
    });
    
    if(!usuario) {
        req.flash('error', 'No existe Ceunta');
        return res.redirect("/crear-cuenta");
    }
    else {
        usuario.activo= 1;
        usuario.token = null;
        await usuario.save();
        req.flash('correcto', 'Ceunta Activada');
        return res.redirect("/iniciar-sesion");
    }
    
};

*/

