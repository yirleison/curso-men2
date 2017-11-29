
'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema; // Permite crear un objeto de tipo Squema...

var AlbumSchema = Schema({
    title: String,
    description: String,
    year: Number,
    image: String,
    artist: {type: Schema.ObjectId, ref: 'Artist'}
});
// exportamos el modelo y le indicamos el nombre de la entidad y va a utilizar el esquema que le indiquemos...
module.exports = mongoose.model('Album', AlbumSchema);