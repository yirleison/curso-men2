'use-strict'

// Cargo la libreria de mongose...
var mongoose = require('mongoose'); 

var app = require('./app');
// En caso tal que tengamos configurado el puerto en las variables de entorno o si no || lo configuramos aqui..
var port = process.env.PORT || 3981; 

mongoose.connect('mongodb://localhost:27017/curso_mean2',(err, res)=>{

	if(err){
		throw err;
	}
	else {
		console.log("exito me conecte a la base de dtaos");
	}
});
app.listen(port, function(){
	console.log("servidor del api rest de musica escuchando en http://localhost:"+port);
});