'uese strict'

var express = require('express');
var md_auth = require('../middlewares/autenticate');
var songController = require('../controllers/song');
var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/songs'});

var api = express.Router();

api.get('/song/:id',[md_auth.ensuerAuth],songController.getsong);
api.post('/song',[md_auth.ensuerAuth],songController.saveSong);
api.get('/songs/:albumId?',[md_auth.ensuerAuth],songController.getsongs);
api.put('/song/:id',[md_auth.ensuerAuth],songController.updateSong);
api.delete('/song/:id',[md_auth.ensuerAuth],songController.deletSong);
api.post('/upload-file-song/:id',[md_auth.ensuerAuth,md_upload],songController.uploadFIle);
api.get('/get-song-file/:songFile',songController.getSongFile);


module.exports = api;