'use strict';
mainModule.filter('byCatId',function(){
	return function(input,category) {
		input.map(function(recipe) {
			if(recipe.cat_id === 3) {
				return recipe;
			}
		});
	}
});