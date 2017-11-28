'uese strict'

var express = require('express');
var md_auth = require('../middlewares/autenticate');
var albumtController = require('../controllers/album');
var multipart = require('connect-multiparty');

var api = express.Router();

api.get('/album/:id',md_auth.ensuerAuth,albumtController.getAlbum);
api.get('/albums/:id?',md_auth.ensuerAuth,albumtController.getAlbums);
api.post('/album',md_auth.ensuerAuth,albumtController.saveAlbum);
api.delete('/album/:id',md_auth.ensuerAuth,albumtController.saveAlbum);

module.exports = api;