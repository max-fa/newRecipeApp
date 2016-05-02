'use strict';
mainModule.directive('deleteRecipe',function() {
	//loop through each recipe list's children(individual recipes) and attach a click handler that calls the scope's getrecipe method.
	function link(scope,element,attrs) {
		var el = $(element);
		//attach the click handler to all recipe lis
		el.click(function(evt) {
			var confirmDelete = confirm("DELETE this recipe?");
			if(confirmDelete === true) {
				var id = this.getAttribute("data-id");
				scope.deleteRecipe(id);
				$("#recipe-display").css('display','none');
				$(".list").css('display','block');				
			}

		});
	}

	return {
		restrict: 'A',
		link: link
	};
});