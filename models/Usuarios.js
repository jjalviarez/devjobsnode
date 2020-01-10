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
        required: 'Nombre es obligatorio'
    },
    password: {
        type: String,
        required: true,
        trim: true
        
    },
    token: String,
    expira: Date
});

usuariosSchema.pre('save',function (next) {
    
    if(!this.isModified('password')) return next();
    this.password = bcrypt.hashSync(this.password, 10);
    next();
    
    /*
    // si el password ya esta hasheado
    if(!this.isModified('password')) {
        return next(); // deten la ejecución
    }
    // si no esta hasheado
    const hash = bcrypt.hashSync(this.password, 12);
    this.password = hash;
    next();
    */
})

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



