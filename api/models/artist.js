
'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema; // Permite crear un objeto de tipo Squema...

var ArtistSchema = Schema({
    name: String,
    description: String,
    image: String
});
// exportamos el modelo y le indicamos el nombre de la entidad y va a utilizar el esquema que le indiquemos...
module.exports = mongoose.model('Artist', ArtistSchema);