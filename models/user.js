'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema; // Permite crear un objeto de tipo Squema...

var UserSchema = Schema({
    name: String,
    surname: String,
    email: String,
    password: String,
    role: String,
    image: String
});
// exportamos el modelo y le indicamos el nombre de la entidad y va a utilizar el esquema que le indiquemos...
module.exports = mongoose.model('User',UserSchema);
