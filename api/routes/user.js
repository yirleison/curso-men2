'use strict'

var express = require('express');
var UserController = require('../controllers/user');
var md_auth = require('../middlewares/autenticate');
var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/users'});


// cargo las rutas del express...
var api = express.Router();

api.post('/register', UserController.saveUser);
api.post('/login', UserController.loginUser);
api.post('/upload-image-user/:id', [md_auth.ensuerAuth,md_upload], UserController.uploadImage);
api.put('/update-user/:id', md_auth.ensuerAuth, UserController.updateUser);
api.get('/get-image-user/:imageFile', UserController.getImageFile);


module.exports = api;
