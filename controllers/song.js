

'use strict'
var path = require('path');
var fs = require('fs');
var Artist = require('../models/artist');
var Album = require('../models/album.js');
var Song = require('../models/song.js');
var mongosePagination = require('mongoose-pagination');

var song = new Song();

function getSong(req, res) {

	var songId = req.params.id;
	Song.findById(songId).populate({ path: 'album' }).exec((err, song) => {
		if (err) {
			res.status(500).send({ message: 'Error en la peticion' });
		}
		else {
			if (!song) {
				res.status(404).send({ message: 'La cancion no existe' });
			}
			else {
				res.status(200).send({ song });
			}
		}
	});
}

function getSongs(req, res) {
	var albumId = req.params.album;

	if (!albumId) {
		var find = Song.find({}).sort('number');
	}
	else {
		var find = Song.find(albumId).sort('album');
	}

	find.populate({
		path: 'album',
		populate: {
			path: 'artist',
			model: 'Artist'
		}
	}).exec((err, songs) => {
		if (err) {
			res.status(500).send({ message: 'Error en la peticion' });
		}
		else {
			if (!songs) {
				res.status(404).send({ message: 'No existen canciones' });
			}
			else {
				res.status(200).send({ songs });
			}
		}
	});
}

function updateSong(req, res) {
	var sonId = req.params.id;
	var update = req.body;

	Song.findByIdAndUpdate(sonId, update, (err, songUpdate) => {
		if (err) {
			res.status(500).send({ message: 'Error en la peticion' });
		}
		else {
			if (!songUpdate) {
				res.status(404).send({ message: 'No se ha actualizado la cancion' });
			}
			else {
				res.status(200).send({ song: songUpdate });
			}
		}
	});
}

function deleteSong(req, res) {
	var songId = req.params.id;

	Song.findByIdAndRemove(songId, (err, songRemove) => {
		if (err) {
			res.status(500).send({ message: 'Error en la peticion' });
		}
		else {
			if (!songRemove) {
				res.status(404).send({ message: 'No se ha podido eliminar la cancion' });
			}
			else {
				res.status(200).send({ song: songRemove });
			}
		}
	});
}

function saveSong(req, res) {

	var params = req.body;
	song.number = params.number;
	song.name = params.name;
	song.duration = params.duration;
	song.file = null;
	song.album = params.album;

	song.save((err, songStored) => {

		if (err) {
			res.status(500).send({ message: 'Error en el servidor' });
		}
		else {
			if (!songStored) {
				res.status(404).send({ message: 'No se ha guardado la cancion' });
			}
			else {
				res.status(200).send({ song: songStored });
			}
		}
	});
}

module.exports = {
	getSong,
	saveSong,
	getSongs,
	updateSong,
	deleteSong
}

