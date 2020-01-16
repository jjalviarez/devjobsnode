const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const bcrypt = require('bcrypt');

const usuariosSchema = new mongoose.Schema({ 
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true
    },
    nombre: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        trim: true
        
    },
    token: String,
    expira: Date,
    imagen: String
});

usuariosSchema.pre('save',function (next) {
    if(!this.isModified('password')) return next();
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

usuariosSchema.post('save',function (error, doc, next) {
    (error.name == 'MongoError' && error.code == 11000) ? next('Esta Correo ya esta registrado') : next(error);
    
});

usuariosSchema.methods = {
    verificarPassword : function (password) {
        return bcrypt.compareSync(password, this.password);
    }
}

module.exports = mongoose.model('Usuario', usuariosSchema );



/*
//sync
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'otra_contraseña';
//encriptar contraseña
var salt = bcrypt.genSaltSync(saltRounds);
var hash = bcrypt.hashSync(myPlaintextPassword, salt);

//To check a password:
// Load hash from your password DB.
bcrypt.compareSync(myPlaintextPassword, hash); // true
bcrypt.compareSync(someOtherPlaintextPassword, hash); // false
*/



