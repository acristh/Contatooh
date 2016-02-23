// public/js/controllers/ContatoController.js

angular.module('contatooh').controller('ContatoController',
	function ($scope, $routeParams, Contato) {
		
		if($routeParams.contatoId){
			Contato.get({id: $routeParams.contatoId},
				function(contato) {
					$scope.contato = contato; 
				},
				function(erro) {
					$scope.mensagem = { 
						texto: 'Contato nao existe. Novo contato.'
					};
					console.log(erro);
				}); 
		} else{
			$scope.contato = new Contato();
		}

		$scope.salva = function() {
			$scope.contato.$save()
				.then(function () {
					$scope.mensagem = {texto: 'Salvo com sucesso'};
					// Limpa o form
					$scope.contato = new Contato();
				})
				.catch(function(erro) {
					$scope.mensagem = {texto: 'Nao foi possivel salvar'};
				});
		};

		Contato.query(function(contatos) {
			$scope.contatos = contatos;
		});
	});