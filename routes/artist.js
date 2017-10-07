'uese strict'

var express = require('express');
var md_auth = require('../middlewares/autenticate');
var artistController = require('../controllers/artist');
var multipart = require('connect-multiparty');

var api = express.Router();

api.get('/artist/:id',md_auth.ensuerAuth,artistController.getArtist);
api.post('/artist',artistController.saveArtist);
api.get('/artists/:page?',artistController.getArtists);
api.put('/artist/:id',md_auth.ensuerAuth,artistController.updateArtist);
api.delete('/artist/:id',md_auth.ensuerAuth,artistController.deleteArtis);


module.exports = api;




