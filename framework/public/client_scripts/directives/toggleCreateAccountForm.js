'use strict';
mainModule.directive('toggleCreateAccountForm',function() {
	//loop through each recipe list's children(individual recipes) and attach a click handler that calls the scope's getrecipe method.
	function link(scope,element,attrs) {
		var el = $(element);
		el.click(function() {
			$("#create-account-form-container").toggle();
			$(".list").toggle();
		});
	}

	return {
		restrict: 'A',
		link: link
	};
});