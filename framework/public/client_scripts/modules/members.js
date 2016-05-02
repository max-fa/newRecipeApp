'use strict';
//declare the app's main module
var mainModule = angular.module('recipeApp',[]);

//declare the app's main controller which requires recipeGetter service .
mainModule.controller('MainController',['$scope','recipeGetter','logger','recipeMaker','userGetter',function($scope,recipeGetter,logger,recipeMaker,userGetter) {
	$scope.title = 'My Recipes';
	$scope.recipes = [];
	$scope.recipeView = {};
	$scope.users = [];
	$scope.searchFilter;
	$scope.userFilter;
	
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
	
	
	
	
	



	/*****
	*****	Use recipeMaker service to send recipe form information to server for persisting
	*****
	*****/
	$scope.recipe = {
		title: "",
		ingredients: "",
		instructions: "",
		category: ""
	};
	
	$scope.createRecipe = function() {
		var payLoad = {
			title: $scope.recipe.title,
			ingredients: $scope.recipe.ingredients,
			instructions: $scope.recipe.instructions,
			category: $scope.recipe.category,
			action: "newrecipe"
		};
		//store $http promise object returned by recipeMaker service
		var createRecipePromise = recipeMaker.send(payLoad);
		
		createRecipePromise.then(
		//success
		function(response) {
			if(response.data.success) {
				alert("Your " + response.data.title + " recipe has been created.");
				var recipe = {
					title: response.data.title,
					ingredients: response.data.ingredients,
					instructions: response.data.instructions,
					cat_id: response.data.cat_id,
					user_id: response.data.user_id,
					id: response.data.id,
				};
				$scope.recipes.push(recipe);
			} else {
				alert(response.data);
				location.reload(true);
			}
		},
		
		//failure
		function(response) {
			alert(response.statusText);
			console.log(response.status);
		}
		);
	}	




	
	/*****
	*****	Edit recipe
	*****
	*****/
	$scope.edit = {
		title: "",
		ingredients: "",
		instructions: ""
	};
	
	$scope.editRecipe = function(recipeId) {
		//Loop through all the fields in the $scope.edit object,which is data-bound to the edit form.
		for(var field in $scope.edit) {
			//check to see what fields are empty
			if($scope.edit[field] === "") {
				//delete the field if empty.
				delete $scope.edit[field];
			}
		}

		//convert id attribute from string to integer for db traversal
		var id = parseInt(recipeId,10);
		
		//call the method
		var editRecipePromise = recipeGetter.edit($scope.edit,id);
		
		//attach promise callbacks
		editRecipePromise.then(
		//success
		function(response) {
			//store new recipe data
			var newRecipe = response.data;
			//loop through all recipes currently on the page.
			$scope.recipes.map(function(recipe) {
				//if any of those recipes are pulled from the same db location as the new recipe,update their properties with data from the new recipe.
				if(recipe.id === newRecipe.id) {
					recipe.title = newRecipe.title;
					recipe.ingredients = newRecipe.ingredients;
					recipe.instructions = newRecipe.instructions;
				}
			});
		},
		
		//failure
		function(response) {
			console.log(response.status + ": " + response.statusText);
		}
		);		
	}
	
	
	
	
	
	/*****
	*****	Delete recipe
	*****
	*****/
		$scope.deleteRecipe = function(recipeId) {
			var id = parseInt(recipeId,10);
			var deleteRecipePromise = recipeGetter.deleteRecipe(id);
			
			deleteRecipePromise.then(
			//success
			function(response) {
				for(var i = 0;i < $scope.recipes.length;i++) {
					var recipe = $scope.recipes[i];
					if(recipe.id === id) {
						$scope.recipes.splice(i,1);
					}
				}
			},
			
			//failure
			function(response) {
				console.log(response.status + ": " + response.statusText);
			}
			);
		}

	
}]);