
'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema; // Permite crear un objeto de tipo Squema...

var Songchema = Schema({
    number: String,
    name: String,
    duration: String,
    file: String,
    album: {type: Schema.ObjectId, ref: 'Album'}
});
// exportamos el modelo y le indicamos el nombre de la entidad y va a utilizar el esquema que le indiquemos...
module.exports = mongoose.model('Song', Songchema);


