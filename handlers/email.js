/*
const nodemailer = require("nodemailer");
const util = require("util");
const emailConfig = require("../config/email");
const hbs = require("nodemailer-express-handlebars");


let transporter = nodemailer.createTransport({
    host: emailConfig.host,
    port: emailConfig.port,
    auth: {
          user: emailConfig.user,
          pass: emailConfig.pass
    }
});



//utilizat templater de  handlebars
transporter.use('compile', hbs({
    viewEngine: 'handlebars',
    viewPath: __dirname + '/../views/emails',
    extName: '.handlebars'
}));

exports.enviar = async (opciones) => {
    const infoMail = {
        from: '"DevJobsnode" <no-reply@devjobsnode.com>', // sender address
        to: opciones.usuario.email, // list of receivers
        subject: opciones.subject, // Subject line
        template: opciones.archivo,
        context: {
            url: opciones.url
        }
    };
    
    const sendMail = util.promisify(transporter.sendMail, infoMail);
    return sendMail.call(transporter, infoMail);
};  

*/

const emailConfig = require('../config/email');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const util = require('util');

let transport = nodemailer.createTransport({
    host : emailConfig.host,
    port : emailConfig.port,
    auth: {
        user : emailConfig.user,
        pass: emailConfig.pass
    }
});

// Utilizar templates de Handlebars
transport.use('compile', hbs({
  viewEngine: {
    extName: '.handlebars',
    partialsDir: 'some/path',
    layoutsDir: 'some/path',
    defaultLayout: '',
  },
  viewPath: './views/emails',
  extName: '.handlebars',
}));


exports.enviar = async (opciones) => {

    const opcionesEmail = {
        from:'devJobs <noreply@devjobs.com',
        to: opciones.usuario.email,
        subject : opciones.subject, 
        template: opciones.archivo,
        context: {
            url : opciones.url
        },
    };

    const sendMail = util.promisify(transport.sendMail, transport);
    return sendMail.call(transport, opcionesEmail);
}

