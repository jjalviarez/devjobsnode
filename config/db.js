const mongoose = require('mongoose');
require('dotenv').config({path: 'variables.env'});
mongoose.connect(process.env.BD_URL, {useNewUrlParser: true,  useUnifiedTopology: true});

mongoose.connection.on('error', (error) =>{
    console.log(error);
});
