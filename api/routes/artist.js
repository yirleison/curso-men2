'uese strict'

var express = require('express');
var md_auth = require('../middlewares/autenticate');
var artistController = require('../controllers/artist');
var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/artists'});

var api = express.Router();

api.get('/artist/:id',md_auth.ensuerAuth,artistController.getArtist);
api.post('/artist',md_auth.ensuerAuth,artistController.saveArtist);
api.get('/artists/:page?',artistController.getArtists);
api.put('/artist/:id',md_auth.ensuerAuth,artistController.updateArtist);
api.delete('/artist/:id',md_auth.ensuerAuth,artistController.deleteArtis);
api.post('/upload-image-artist/:id', [md_auth.ensuerAuth,md_upload], artistController.uploadImage);
api.get('/get-image-artist/:imageFile', artistController.getImageFile);


module.exports = api;




