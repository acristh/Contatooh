// config/database.js

var mongoose = require('mongoose');

module.exports = function(uri) {
	
	mongoose.set('debug', true);

	mongoose.connect(uri);

	mongoose.connection.on('connected', function() {
		console.log('Mongoose! Conectado em ' + uri);
	});

	mongoose.connection.on('disconnected', function() {
		console.log('Mongoose! Desconectado de '+ uri);
	});

	mongoose.connection.on('error', function() {
		console.log('Mongoose! Erro na conexao: ' + erro);
	});

	process.on('SIGINT', function(){
		mongoose.connection.close(function() {
			console.log('Mongoose! Desconectado pelo termino da aplicaçao');

			process.exit(0);
		});
	});
}