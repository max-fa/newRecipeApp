'use strict';
mainModule.directive('editRecipe',function() {
	function link(scope,element,attrs) {
		var el = $(element);
		//attach the click handler to all recipe lis
		el.click(function() {
			$("#create-recipe-form-container").css('display','none');
			$("#edit-recipe-box").css('display','block');
			$("#edit-recipe-box > form")[0].setAttribute("data-id",this.getAttribute("data-id"));
			$("#recipe-display").css('display','none');
		});
	}

	return {
		restrict: 'A',
		link: link
	};
});