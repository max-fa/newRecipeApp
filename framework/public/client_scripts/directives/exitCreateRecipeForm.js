'use strict';
mainModule.directive('exitCreateRecipeForm',function() {
	//loop through each recipe list's children(individual recipes) and attach a click handler that calls the scope's getrecipe method.
	function link(scope,element,attrs) {
		var el = $(element);
		el.click(function() {
			$("#create-recipe-form-container").css('display','none');
			$(".list").css('display','block');
		});
	}

	return {
		restrict: 'A',
		link: link
	};
});