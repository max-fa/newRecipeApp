'use strict';
$('document').ready(function() {
	//Create an array of all the options in the filter select element.
	var filterBox = $("#recipe-filter");
	filterBox.change(filter);
	
	//attach a click handler to be called whenever the user interacts with the input element for searching for recipes
	var searchBox = $("#recipe-search");
	searchBox.on("input",search);
	
	var filteredOut;
	
	
	
	
	
	//uses regular expressions to match user input with recipe titles.
	function search() {
		var allRecipes = $(".recipe").get();
		
		var searchInput = this.value;
		var searchParam = new RegExp(searchInput);
		
		//map over the array containing the recipe lis and if their innerHTML doesn't match the user input at all,hide them.If user input and innerHTML do match,show them.
		allRecipes.map(function(recipe) {
			if(searchParam.exec(recipe.innerHTML) !== null) {
				$(recipe).css('display','list-item');
				
			} else {
				$(recipe).css('display','none');
			}
		});
	}
	
	
	
	
	
	//based on the value of the select menu it filters out recipes
	function filter() {
		//the 'this' variable is set to the select option that was clicked on(selected) above.
		if(this.value === "all") {
			filterAll();
		} else {
			filterByUser(this.value);
		}
	}
	
	function filterAll() {
		$(".recipe").css('display','list-item');
	}
	
	function filterByUser(userId) {
		//map over the recipe lis and if their data-user attribute matches the specified filter id,keep them visible while the rest are hidden.
		$(".recipe").map(function() {
			if(this.getAttribute("data-user") !== userId) {
				$(this).css('display','none');
			} else {
				$(this).css('display','list-item');
			}
		});
	}
});