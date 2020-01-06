








exports.mostrarTrabajos = (req,res) => {
        res.render("home", {
            nombrePagina: 'devJobs',
            tagline: 'encuenta y Publica trabajos',
            barra: true,
            boton: true
        });
};






