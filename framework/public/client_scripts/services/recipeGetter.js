'use strict';
mainModule.factory('recipeGetter',['$http',function($http) {
	var recipeGetter = {};
	
	//make an AJAX request to the server for an individual recipe and return the promise object from the $http service to the controller
	recipeGetter.getRecipe = function(id) {
		var payLoad = {
			action: "getrecipe",
			id: id
		};
	
		return $http.post(
			'http://localhost/my_docs/framework/app/controllers/front_page_controller.php',
			payLoad
		);		
	}
	
	
	
	
	
	//fetch all recipes in database
	recipeGetter.getAll = function() {
		var payLoad = {
			action: "getall"
		};
		
		return $http.post(
			'http://localhost/my_docs/framework/app/controllers/front_page_controller.php',
			payLoad
		);
	}
	
	
	
	
	//This method sends an edit request to the php.
	recipeGetter.edit = function(changes,id) {
		var payLoad = {
			action: "edit",
			changes: changes,
			id: id
		};
		return $http.post(
			'http://localhost/my_docs/framework/app/controllers/front_page_controller.php',
			payLoad
		);
	}
	
	recipeGetter.deleteRecipe = function(id) {
		var payLoad = {
			action: "deleterecipe",
			id: id
		};
		
		return $http.post(
			'http://localhost/my_docs/framework/app/controllers/front_page_controller.php',
			payLoad
		);
	}
	
	return recipeGetter;
}]);