'use strict'

var express = require('express');
var songController = require('../controllers/song');
var md_auth = require('../middlewares/autenticate');

var multipart = require('connect-multiparty');
//var md_upload = multipart({ uploadDir: './uploads/users'});


// cargo las rutas del express...
var a = express.Router();

a.get('/song/:id', md_auth.ensuerAuth,songController.getSong);
a.post('/song', md_auth.ensuerAuth,songController.saveSong);
a.get('/songs/:album?', md_auth.ensuerAuth,songController.getSongs);
a.put('/song/:id', md_auth.ensuerAuth,songController.updateSong);
a.delete('/song/:id', md_auth.ensuerAuth,songController.deleteSong);

module.exports = a;


