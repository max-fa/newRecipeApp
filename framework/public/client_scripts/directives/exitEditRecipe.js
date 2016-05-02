'use strict';
mainModule.directive('exitEditRecipe',function() {
	//loop through each recipe list's children(individual recipes) and attach a click handler that calls the scope's getrecipe method.
	function link(scope,element,attrs) {
		var el = $(element);
		//attach the click handler to all recipe lis
		el.click(function() {
			$("#edit-recipe-box").css('display','none');
			$(".list").css('display','block');
		});
	}

	return {
		restrict: 'A',
		link: link
	};
});