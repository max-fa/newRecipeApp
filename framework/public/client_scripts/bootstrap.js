'use strict';
$('document').ready(function() {
	$("#exit-recipe-display").click(toggleRecipeDisplay);
	
	
	
	/*****
	***** 
	*****	SELF-CALLING FUNCTION THAT ATTACHES CLICK HANDLER TO ALL RECIPE LI'S ON THE PAGE.
	*****
	*****/
	(function(showRecipes) {
		//Capture a list of all recipe lis on the page and convert them to an array for easier use.
		var recipes = $(".recipe").get();
		
		//map over all the recipe lis and attach a click handler.
		recipes.map(function(recipe) {
			recipe.onclick = showRecipe;
		});
	})(showRecipe);
});