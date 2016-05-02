'use strict';
/*****
***** 
*****	TOGGLE VIEW BETWEEN CREATE RECIPE FORM AND REGULAR VIEW
*****
*****/
	function toggleRecipeDisplay() {
		var recipeDisplay = $("#recipe-display");
		var lists = $(".list");
		lists.toggle();
		recipeDisplay.toggle();
	}	




	
/*****
***** 
*****	CALLBACK WHEN RECIPES ARE CLICKED TO RETRIEVE RECIPE DATA.
*****
*****/
function showRecipe() {
	//Data returned from database gets converted to strings,so we convert recipe id string into a number.
	var recipeId = parseInt(this.getAttribute("data-recipeid"),10);
		
	var obj = {
		id: recipeId,
		action: "getrecipe"
	};
	var payload = JSON.stringify(obj);
	$.ajax({
		url: "http://localhost/my_docs/framework/app/controllers/front_page_controller.php",
		method: "POST",
		dataType: "json",
		data: payload,
		error: handleShowRecipeError,
		success: handleShowRecipeSuccess
	});
}

function handleShowRecipeError(request,error) {
	console.log(request.responseText);
	console.log(error);
	alert("Could not retrieve recipe,please try again later.");
}
	
function handleShowRecipeSuccess(data,status,request) {
	console.log(data);
	console.log(request.responseText);
	
	//If data was successfully retrieved,populate the recipeDisplay div with content and make it visible
	if(data.success === true) {
		var recipeDisplay = $("#recipe-display");
		var recipeTitle = $("#recipe-title");
		var recipeIngredients = $("#recipe-ingredients");
		var recipeInstructions = $("#recipe-instructions");
		
		recipeTitle.html(data.title);
		recipeIngredients.html(data.ingredients);
		recipeInstructions.html(data.instructions);
		
		toggleRecipeDisplay();
	} else {
		alert(data.message);
	}
}