'use strict';
mainModule.factory('recipeMaker',['$http',function($http) {
	var recipeMaker = {};
	
	//make an AJAX request to the server for an individual recipe and return the promise object from the $http service to the controller
	recipeMaker.send = function(recipe) {
		var payLoad = {
			action: "newrecipe",
			title: recipe.title,
			ingredients: recipe.ingredients,
			instructions: recipe.instructions,
			category: recipe.category
		};
		
		return $http.post(
			'http://localhost/my_docs/framework/app/controllers/front_page_controller.php',
			payLoad
		);
	}
		
	
	
	return recipeMaker;
}]);