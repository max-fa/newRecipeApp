'use strict';
//declare the app's main module
var mainModule = angular.module('recipeApp',[]);

//declare the app's main controller which requires recipeGetter service .
mainModule.controller('MainController',['$scope','recipeGetter','logger',function($scope,recipeGetter,logger) {
	$scope.title = 'My Recipes';
	$scope.recipes = [];
	$scope.recipeView = {};
	$scope.init = function() {
		$scope.getAllUsers();
		$scope.getAllRecipes();
	}	
	
	
	
	
	
	/*****
	*****	Use the userGetter service to fetch all users.
	*****
	*****/	
	$scope.getAllUsers = function() {	
		var allUsersPromise = userGetter.getAll();
		allUsersPromise.then(
		//success
		function(response) {
			response.data.map(function(user) {
				$scope.users.push(user);
			});
		},
		
		//failure
		function(response) {
			console.log(response.data);
			console.log(response.status);
		}
		);
	}	
	
	
	
	
	
	/*****
	*****	Use the recipeGetter service to fetch all recipes on pageload.
	*****
	*****/	
	$scope.getAllRecipes = function() {
		var allRecipesPromise = recipeGetter.getAll();
		allRecipesPromise.then(
		//success
		function(response) {
			response.data.map(function(recipe) {
				$scope.recipes.push(recipe);
			});
		},
		
		//failure
		function(response) {
			console.log(response.data);
			console.log(response.status);
		}
		);
	}
	
	
	
	
	
	/*****
	*****	Use the recipeGetter service to fetch an individual recipe.
	*****	This method is invoked when a recipe li is clicked on(via the recipeList custom directive)
	*****/
	$scope.getRecipe = function(id) {
		//parse the recipe id attribute into an integer to be used for database traversal
		var recipePromise = recipeGetter.getRecipe(parseInt(id,10));
		
		//handle the promise object returned from the recipeGetter service
		recipePromise.then(
		//success
		function(response) {
			$scope.recipeView.title = response.data.title;
			$scope.recipeView.ingredients = response.data.ingredients;
			$scope.recipeView.instructions = response.data.instructions;
		},
		
		//failure
		function(response) {
			alert("Recipe could not be found");
		}
		);
	}
	
	
	
	
	
	$scope.loginCredentials = {};
	
	/*****
	*****	Use logger service to send login credentials and logout requests to backend
	*****
	*****/
	$scope.login = function() {
		//store $http promise object returned by logger service
		var loginPromise = logger.login($scope.loginCredentials);
		
		loginPromise.then(
		//success
		function(response) {
			alert(response.data);
			location.reload(true);
		},
		
		//failure
		function(response) {
			alert(response.statusText);
			console.log(response.status);
		}
		);
	}
	
	
	$scope.logout = function() {
		var logoutPromise = logger.logout();
		
		logoutPromise.then(
		//success
		function(response) {
			alert(response.data);
			location.reload(true);
		},
		
		//failure
		function(response) {
			alert(response.statusText);
			console.log(response.status);
		}
		);
	}
	$scope.loginCredentials = {};
	
}]);