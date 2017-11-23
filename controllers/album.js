'use strict'
var path = require('path');
var fs = require('fs');
var Artist = require('../models/artist');
var Album = require('../models/album.js');
var Song = require('../models/song.js');
var mongosePagination = require('mongoose-pagination');

var album = new Album();

function getAlbum(req, res) {

    var albumId = req.params.id;

    Album.findById({ _id: albumId }).populate({ path: 'artist' }).exec((err, album) => {
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
}

function getAlbums(req, res) {
    var artistId = req.params.artist;

    if (!artistId) {
        // Sacar todos los albums...
        var find = Album.find({}).sort('title');

    }
    else {
        // sacar todos los albums de un artista...
        var find = Album.find({ _id: albumId }).sort('year');
    }

    find.populate({ path: 'artist' }).exec((err, albums) => {
        if (err) {
            res.status(500).send({ message: 'Error en la peticion' });
        }
        else {
            if (!albums) {
                res.status(404).send({ message: 'No hay albums disponibles' });
            }
            else {
                res.status(200).send({ message: albums });
            }
        }
    });
}

function uploadImage(req, res) {
  
    var albumId = req.params.id;
    var file_name = 'Imagen no subida';
  
    if (req.files) {
      var file_path = req.files.image.path;
      console.log(file_path);
      var file_split = file_path.split('\\');
      var file_name = file_split[2];
  
      var ext_split = file_name.split('.');
      var file_ext = ext_split[1];
  
      if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif') {
        Album.findByIdAndUpdate(albumId, {image: file_name}, (err, albumUpdate)=>{
  
          if(err) {
            res.status(404).send({ message: 'No se ha podido actualizar el usuario' });
          }
  
          else {
            res.status(200).send({album:albumUpdate})
          }
  
        });
      }
  
      else {
        res.status(200).send({ message: 'Extension del archivo no valida' });
      }
      console.log(file_name);
      console.log(albumId);
    }
    else {
      res.status(404).send({ message: 'No se ha subido ninguna imagen' });
    }
  }
  
  function getImageFile(req, res){
    var imageFIle = req.params.imageFile;
  
    var pathFIle = './uploads/albums/'+imageFIle;
    fs.exists(pathFIle, function(exists){
      if(exists){
        res.sendFile(path.resolve(pathFIle));
      }
  
      else {
        res.status(404).send({ message: 'No se ha encontrado la imagen' });
      }
    });
  }

function saveAlbum(req, res) {

    var params = req.body;
    album.title = params.title;
    album.description = params.description;
    album.year = params.year;
    album.image = 'null';
    album.artist = params.artist;

    album.save((err, albumStore) => {
        if (err) {
            res.status(500).send({ message: "Error en el servidor" });
        }
        else {
            if (!albumStore) {
                res.status(404).send({ message: "No se ha podido guardar el album" });
            }
            else {
                res.status(500).send({ album: albumStore });
            }
        }
    });
}

function updateAlbum(req, res) {
    var albumId = req.params.id;
    var update = req.body;

    Album.findByIdAndUpdate(albumId, update, (err, albumUpdate) => {
        if (err) {
            res.status(500).send({ message: "Error en la peticion" });
        }
        else {
            if (!albumUpdate) {
                res.status(404).send({ message: "Ha ocurrido un error al actualizar el album" });
            }
            else {
                res.status(200).send({ albumUpdate });
            }
        }
    });
}

function deleteAlbum(req, res) {

    var albumId = req.params.id;

    Album.findOneAndRemove(albumId, (err, albumRemove) => {

        if (err) {
            res.status(500).send({ message: 'Error en la peticion' });
        }
        else {

            if (!albumRemove) {
                res.status(404).send({ message: 'El album no ha sido eliminado' });
            }
            else {
                Song.find({ album: albumRemove._id }).remove((err, songRemove) => {

                    if (err) {
                        res.status(500).send({ message: 'Error al eliminar la cancion' });
                    }
                    else {

                        if (!songRemove) {
                            res.status(404).send({ message: 'la cancion no ha sido eliminada' });
                        }
                        else {
                            res.status(200).send({ album: albumRemove });
                        }
                    }
                });
            }
        }
    });
}



module.exports = {
    getAlbum,
    getAlbums,
    saveAlbum,
    updateAlbum,
    deleteAlbum,
    uploadImage,
    getImageFile
}