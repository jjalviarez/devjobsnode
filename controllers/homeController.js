const mongoose = require('mongoose');
const Vacante = mongoose.model('Vacante');








exports.mostrarTrabajos = async (req,res,next) => {
    const vacantes = await Vacante.find();
    if (!vacantes) return next();
    res.render("home", {
        nombrePagina: 'devJobs',
        tagline: 'encuenta y Publica trabajos',
        barra: true,
        boton: true,
        vacantes
    });
};






