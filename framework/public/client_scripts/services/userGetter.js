'use strict';
mainModule.factory('userGetter',['$http',function($http) {
	var userGetter = {};
	
	//make an AJAX request to the server for an individual user and return the promise object from the $http service to the controller
	userGetter.getUser = function(id) {
		var payLoad = {
			action: "getuser",
			id: id
		};
	
		return $http.post(
			'http://localhost/my_docs/framework/app/controllers/front_page_controller.php',
			payLoad
		);		
	}
	
	
	
	
	
	//fetch all users in database
	userGetter.getAll = function() {
		var payLoad = {
			action: "getallusers"
		};
		
		return $http.post(
			'http://localhost/my_docs/framework/app/controllers/front_page_controller.php',
			payLoad
		);
	}
	
	
	//Below commented out temporarily until I figure out how to expose such functionality in the user interface.
	/*
	//This method sends an edit request to the php.
	userGetter.edit = function(changes,id) {
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
	
	userGetter.deleteUser = function(id) {
		var payLoad = {
			action: "deleteuser",
			id: id
		};
		
		return $http.post(
			'http://localhost/my_docs/framework/app/controllers/front_page_controller.php',
			payLoad
		);
	}
	*/
	
	return userGetter;
}]);