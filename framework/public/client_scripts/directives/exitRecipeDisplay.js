'use strict';
mainModule.directive('exitRecipeDisplay',function() {
	//loop through each recipe list's children(individual recipes) and attach a click handler that calls the scope's getrecipe method.
	function link(scope,element,attrs) {
		var el = $(element);
		//attach the click handler to all recipe lis
		el.click(function() {
			scope.recipe = {};
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