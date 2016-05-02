'use strict';
mainModule.directive('toggleCreateRecipeForm',function() {
	function link(scope,element,attrs) {
		var el = $(element);
		el.click(function() {
			$("#create-recipe-form-container").toggle();
			$(".list").css('display','none');
			$("#edit-recipe-box").css('display','none');
			$("#recipe-display").css('display','none');
		});
	}

	return {
		restrict: 'A',
		link: link
	};
});