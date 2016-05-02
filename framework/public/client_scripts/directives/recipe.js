'use strict';
mainModule.directive('recipe',function() {
	function link(scope,element,attrs) {
		var el = $(element);
		//attach the click handler to all recipe lis
		el.click(function() {
			var id = this.getAttribute("data-recipeid");
			scope.getRecipe(id);
			scope.$apply();
			$("#recipe-display").css('display','block');
			if( $("#edit-recipe-button")[0] !== undefined ) {
				$("#edit-recipe-button")[0].setAttribute("data-id",id);
			}
			if( $("#delete-recipe-button")[0] !== undefined ) {
				$("#delete-recipe-button")[0].setAttribute("data-id",id);
			}
			$(".list").css('display','none');
		});
	}

	return {
		restrict: 'A',
		link: link
	};
});