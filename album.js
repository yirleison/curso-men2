'uese strict'

var express = require('express');
var md_auth = require('../middlewares/autenticate');
var albumController = require('../controllers/album');
var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/albums'});

var api = express.Router();

api.get('/album/:id',md_auth.ensuerAuth,albumController.getAlbum);
api.post('/album',md_auth.ensuerAuth,albumController.saveAlbum);
api.get('/albums/:artist?',md_auth.ensuerAuth,albumController.getAlbums);
api.put('/album/:id',md_auth.ensuerAuth,albumController.updateAlbum);
api.delete('/album/:id',md_auth.ensuerAuth,albumController.deleteAlbum);
api.post('/upload-image-album/:id',[md_auth.ensuerAuth,md_upload],albumController.uploadImage);
api.get('/get-image-album/:imageFile', albumController.getImageFile);

module.exports = api;