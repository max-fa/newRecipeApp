'use strict';
mainModule.directive('exitCreateAccountForm',function() {
	//loop through each recipe list's children(individual recipes) and attach a click handler that calls the scope's getrecipe method.
	function link(scope,element,attrs) {
		var el = $(element);
		el.click(function() {
			$("#create-account-form-container").toggle();
			$(".list").css('display','block');
		});
	}

	return {
		restrict: 'A',
		link: link
	};
});