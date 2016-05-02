'use strict';
mainModule.directive('attachRecipeClickHandlers',function() {
	//loop through each recipe list's children(individual recipes) and attach a click handler that calls the scope's getrecipe method.
	function link(scope,element,attrs) {
		var el = $(element);
		//attach the click handler to all recipe lis
		el.children('.recipe').click(function() {
			var id = this.getAttribute("data-recipeid");
			var recipeDisplay = $("#recipe-display");
			var recipeLists = $(".list");
			scope.getRecipe(id);
			scope.$apply();
			$("#recipe-display").toggle();
			$(".list").toggle();
		});
	}

	return {
		restrict: 'A',
		link: link
	};
});