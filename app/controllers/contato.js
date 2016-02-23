// app/controllers/contato.js

/* 
var ID_CONTATO_INC = 3;

var contatos = [
	{_id: 1, nome: 'Contato Exemplo 1',
	 email: 'cont1@empresa.com.br'},
	{_id: 2, nome: 'Contato Exemplo 2',
	 email: 'cont2@empresa.com.br'},
	{_id: 3, nome: 'Contato Exemplo 3',
	 email: 'cont3@empresa.com.br'}
	 ];
*/

module.exports = function(app) {
	var controller ={};

	var Contato = app.models.contato;

	controller.listaContatos = function(req, res) {
		Contato.find().populate('emergencia').exec()
		.then(
			function(contatos) {
				res.json(contatos);
			},
			function(erro) {
				console.error(erro);
				res.status(500).json(erro);
			}
		);		
	};

	controller.obtemContato = function(req, res) {
		var _id = req.params.id;
		Contato.findById(_id).exec()
			.then(
				function(contato) {
					if(!contato) throw new Error('Contato nao encontrado');
					res.json(contato);
				},
				function(erro) {
					console.log(erro);
					res.status(404).json(erro);
				}
			);
	};

	controller.removeContato = function(req, res) {
		var _id = req.params.id;
		Contato.remove({"_id": _id}).exec()
			.then(
				function() {
					res.status(204).end();
				},
				function(erro) {
					return	console.error(erro);
				}
			);
	};

	controller.salvaContato = function(req, res) {
		var _id = req.body._id;

		req.body.emergencia = req.body.emergencia || null;

		if (_id) {
			Contato.findByIdAndUpdate(_id, req.body).exec()
				.then(
					function(contato) {
						res.json(contato);
					},
					function(erro) {
						console.error(erro);
						res.status(500).json(erro);
					}
			);
		} else {
			Contato.create(req.body)
			.then(
				function(contato) {
					res.status(201).json(contato);
				},
				function(erro) {
					console.log(erro);
					res.status(500).json(erro);
				}
			);
		}
	};

	return controller;
};