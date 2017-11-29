
'use strict'

var User = require('../models/user');
var bcryp = require('bcrypt-nodejs');
var jwt = require('../services/jwt');
var fs = require('fs');
var path = require('path');

var user = new User();

function pruebas(req, res) {

	res.status(200).send({
		message: 'probando una accion del controlador de usuarios del api rest con node y mongo'
	});

}

// Función para crear nuevos usuarios con req.body capturo todas lo que me llegue por post..
function saveUser(req, res) {

	var params = req.body;

	console.log(params);
	user.name = params.name;
	user.surname = params.surname;
	user.email = params.email;
	user.role = 'ROLE_ADMIN';
	user.image = 'null';

	if (params.password) {
		// Encriptar contraseña y guardo los datos...
		bcryp.hash(params.password, null, null, function (err, hash) {

			user.password = hash;

			if (user.name != null && user.surname != null && user.email != null) {
				// Guardo el usuario en la base de datos....
				User.save((err, userStored) => {

					if (err) {
						res.status(500).send({ message: 'Error al guardar el usuario' });
					}

					else {

						if (!userStored) {
							res.status(500).send({ message: 'No sea ha resgistrado el usuaraio' });
						}

						else {
							res.status(200).send({ user: userStored });
						}
					}
				});
			}

			else {
				res.status(200).send({ message: 'Rellena todos los campos' });
			}
		});
	}
	else {
		res.status(200).send({ message: 'Introduce la ocntrseña' });
	}
}

function loginUser(req, res) {

	let params = req.body;
	var email = params.email;
	var password = params.password;

	User.findOne({ email: email.toLowerCase() }, (err, user) => {

		if (err) {
			res.status(500).send({ message: 'Error en la petición' });
		}

		else {

			if (!user) {
				res.status(404).send({ message: 'El usuario no existe' });
			}
			// Comprobar el password...
			else {
				bcryp.compare(password, user.password, (err, check) => {

					if (check) {
						// Devuelvo los datos del usuario logeado...
						if (params.gethash) {
							// Devolver un token de jwt
							res.status(200).send({
								token: jwt.createToken(user)
							});
						}

						else {
							res.status(200).send({ user });
						}
					}

					else {
						res.status(404).send({ message: 'El usuario no ha podido logearse' });
					}
				});
			}
		}
	});
}

function updateUser(req, res) {

	var userId = req.params.id;
	var update = req.body;

	User.findByIdAndUpdate(userId, update, (err, userUpdate) => {

		if (err) {
			res.status(500).send({ message: 'Error al actualizar el usuario' });
		}

		else {
			if (!userUpdate) {
				res.status(404).send({ message: 'No se ha podido actualizar el usuario' });
			}

			else {
				res.status(200).send({ user: userUpdate });
			}
		}
	});
}

function uploadImage(req, res) {

	var userId = req.params.id;
	var file_name = 'Imagen no subida';

	if (req.files) {
		var file_path = req.files.image.path;
		var file_split = file_path.split('/');
		var file_name = file_split[2];

		var ext_split = file_name.split('.');
		var file_ext = ext_split[1];

		if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif') {
			User.findByIdAndUpdate(userId, {image: file_name}, (err, userUpdate)=>{

				if(err) {
					res.status(404).send({ message: 'No se ha podido actualizar el usuario' });
				}

				else {
					res.status(200).send({image: file_name, user:userUpdate})
				}

			});
		}

		else {
			res.status(200).send({ message: 'Extension del archivo no valida' });
		}
		console.log(file_name);
		console.log(userId);
	}
	else {
		res.status(404).send({ message: 'No se ha subido ninguna imagen' });
	}
}

function getImageFile(req, res){
	var imageFIle = req.params.imageFile;

	var pathFIle = './uploads/users/'+imageFIle;
	fs.exists(pathFIle, function(exists){
		if(exists){
			res.sendFile(path.resolve(pathFIle));
		}

		else {
			res.status(404).send({ message: 'No se ha encontrado la imagen' });
		}
	});
}

module.exports = {

	pruebas,
	saveUser,
	loginUser,
	updateUser,
	uploadImage,
	getImageFile
};