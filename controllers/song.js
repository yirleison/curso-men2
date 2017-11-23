import { model } from 'mongoose';

'use strict'
var path = require('path');
var fs = require('fs');
var Artist = require('../models/artist');
var Album = require('../models/album.js');
var Song = require('../models/song.js');
var mongosePagination = require('mongoose-pagination');

var song = new Song();

function getSong(req, res) {
    
       // var albumId = req.params.id;
    
        /*Album.findById({ _id: albumId }).populate({ path: 'artist' }).exec((err, album) => {
            if (err) {
                res.status(500).send({ message: 'Error en la peticion' });
            }
    
            else {
    
                if (!album) {
                    res.status(404).send({ message: 'El album no existe' });
                }
    
                else {
                    res.status(200).send({ album });
                }
            }
        });
        */
        res.status(200).send({ message: 'Probando el controlador de song' });
    }

    module.exports = {
        getSong
    }