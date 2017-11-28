'use strict'

var path = require('path');
var fs = require('fs');
var Artist = require('../models/artist');
var Album = require('../models/album.js');
var Song = require('../models/song.js');
var mongosePagination = require('mongoose-pagination');

var artist = new Artist();

function getArtist(req, res) {

	var artisId = req.params.id;

	Artist.findById({ _id: artisId }, (err, artist) => {
		if (err) {
			res.status(500).send({ message: 'Error en la peticion' });
		}

		else {

			if (!artist) {
				res.status(404).send({ message: 'El artista no existe' });
			}

			else {
				res.status(200).send({ artist });
			}
		}
	});
}

function saveArtist(req, res) {

	var params = req.body;
	artist.name = params.name;
	artist.description = params.description;
	artist.image = 'null';

	artist.save((err, artistStored) => {

		if (err) {
			res.status(500).send({ message: 'Error al guardar el artiste' });
		}

		else {
			if (!artistStored) {
				res.status(404).send({ message: 'EL artista no ha sido guardado' });
			}

			else {
				res.status(200).send({ artist: artistStored });
			}
		}
	});
}

function getArtists(req, res) {
	
	var page = 0;

	if (req.params.page) {
		page = req.params.page;
	}

	else {
		page = 1;
	}

	var itemsPerPage = 3;

	Artist.find().sort('name').paginate(page, itemsPerPage, function (err, artists, total) {

		if (err) {
			res.status(500).send({ message: 'Error en la peticion' });
		}

		else {

			if (!artists) {
				res.status(404).send({ message: 'No se encotraron artistas' });
			}

			else {

				res.status(200).send({
					total_items: total,
					artists: artists
				});
			}
		}
	});
}

function updateArtist(req, res) {

	var artistId = req.params.id;
	var update = req.body;

	Artist.findByIdAndUpdate(artistId, update, (err, artistUpdate) => {
		if (err) {
			res.status(500).send({ message: 'Error en la peticion' });
		}

		else {

			if (!artistUpdate) {
				res.status(404).send({ message: 'No se pudo actualizar el artista' });
			}

			else {
				res.status(200).send({ artistUpdate });
			}
		}
	});

}

function deleteArtis(req, res) {
	var artistId = req.params.id;

	Artist.findByIdAndRemove(artistId, (err, artistRemoved) => {

		if (err) {
			res.status(500).send({ message: 'No se pudo actualizar el artista' });
		}

		else {

			if (!artistRemoved) {
				res.status(404).send({ message: 'No se podido eliminar el artista' });
			}

			else {
        
				res.status(404).send({ artistRemoved });
				Album.find({ artist: artistRemoved._id }).remove((err, albumRemove) => {

					if (err) {
						res.status(500).send({ message: 'Error al eliminar el album' });
					}

					else {

						if(!albumRemove) {
							res.status(404).send({ message: 'El album no ha sido eliminado' });
						}

						else {
							Song.find({album: albumRemove._id}).remove((err, songRemove)=>{

								if (err) {
									res.status(500).send({ message: 'Error al eliminar la cancion' });
								}

								else {

									if(!songRemove) {
										res.status(404).send({ message: 'la cancion no ha sido eliminada' });
									}

									else {
										res.status(200).send({ artist: artistRemoved});
									}
		
								}

							});
						}
					}
				});
			}
		}
	});
}

module.exports = {
	getArtist,
	saveArtist,
	getArtists,
	updateArtist,
	deleteArtis
};