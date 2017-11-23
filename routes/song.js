'use strict'

var express = require('express');
var songController = require('../controllers/song');
var md_auth = require('../middlewares/autenticate');

var api = express.Router();

api.get('/song', songController.getSong);

module.exports = api;