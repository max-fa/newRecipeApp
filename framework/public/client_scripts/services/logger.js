'use strict';
mainModule.factory('logger',['$http',function($http) {
	var logger = {};
	
	//make an AJAX request to the server for an individual recipe and return the promise object from the $http service to the controller
	logger.login = function(credentials) {
		var payLoad = {
			action: "login",
			username: credentials.username,
			password: credentials.password
		};
		
		return $http.post(
			'http://localhost/my_docs/framework/app/controllers/front_page_controller.php',
			payLoad
		);
	}
	
	logger.logout = function() {
		var payLoad = {
			action: "logout"
		};
		
		return $http.post(
			'http://localhost/my_docs/framework/app/controllers/front_page_controller.php',
			payLoad
		);
	}
	
	logger.checkPermissions = function(id) {
		
	}
		
	
	
	return logger;
}]);