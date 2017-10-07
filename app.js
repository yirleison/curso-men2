// crear servidor

'use strict'

var express = require('express');
var app = express();
var bodyParser = require('body-parser');


//cargar rutas
var user_routes = require('./routes/user');
var artist_routes = require('./routes/artist');

//configurar body parser: para que pueda funcionar el bodyPaerser y para convertir a json lo que llegue por http..
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// configurar las cabeceras Http...
 
// rutas base
app.use('/api', user_routes);
app.use('/api', artist_routes);


module.exports = app;

