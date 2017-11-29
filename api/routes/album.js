'uese strict'

var express = require('express');
var md_auth = require('../middlewares/autenticate');
var albumtController = require('../controllers/album');
var multipart = require('connect-multiparty');
var md_upload = multipart({uploadDir: '../uploads/albums'});

var api = express.Router();

api.get('/album/:id',md_auth.ensuerAuth,albumtController.getAlbum);
api.get('/albums/:id?',md_auth.ensuerAuth,albumtController.getAlbums);
api.post('/album',md_auth.ensuerAuth,albumtController.saveAlbum);
api.delete('/album/:id',md_auth.ensuerAuth,albumtController.deleteAlbum);
api.post('/upload-image-album/:id',md_auth.ensuerAuth,albumtController.uploadImage);
api.get('get-image-album/:imageFile',md_auth.ensuerAuth,albumtController.getImageFile);

module.exports = api;