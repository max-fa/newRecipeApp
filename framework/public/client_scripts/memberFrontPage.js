'use strict';
//This is the js for users who have logged in(members).
$('document').ready(function() {
	//Call the php script to log the user out when he clicks the 'logout' button.
	$('#logout-button').click(logout);
	
	//toggling the create recipe form's visibility with the 'create recipe' button.
	$('#create-recipe-button').click(toggleCreateRecipeForm);
	
	//hiding the create recipe form with it's 'exit form' button.
	$('#exit-create-recipe-form').click(toggleCreateRecipeForm);
	
	//handle create recipe form submission
	$('#create-recipe-form').submit(createRecipe);
	
	
	
	
	
/*****
***** 
*****	HANDLE CREATE RECIPE FORM SUBMIT EVENT
*****
*****/
	function createRecipe(evt) {
		evt.preventDefault();
		var title = this.title.value;
		var ingredients = this.ingredients.value;
		var instructions = this.instructions.value;
		var category = checkCategory();
		
		//Create and stringify object containing form data.
		var obj = {
			title: title,
			ingredients: ingredients,
			instructions: instructions,
			category: category,
			action: 'newrecipe'
		};
		var payload = JSON.stringify(obj);
		
		//Make request
		$.ajax({
			url: "http://localhost/my_docs/framework/app/controllers/front_page_controller.php",
			method: "POST",
			data: payload,
			dataType: "json",
			error: handleCreateRecipeError,
			success: handleCreateRecipeSuccess
		});
	}
	
	//Check the create-recipe form for the recipe category checkbox that the user selected.
	function checkCategory()	{
		//Define some variables that this function'll need.
		var category;
		var formInputs = document.getElementsByTagName("input");
		
		//Loop through all the input elements of the form
		for(var i = 0;i < formInputs.length;i++)	{
			//We're looking for form controls that are checkboxes here.
			if(formInputs[i].type === "radio")	{
				var radiobox = formInputs[i];
				//We the look to see which checkbox the user selected and return a number based on which one.
				if(radiobox.checked === true)	{
					switch(radiobox.value) {
						case 'meat':
							category = 1;
							break;
						case 'veggies':
							category = 2;
							break;
						case 'bread':
							category = 3;
							break;
						default:
							//Do nothing
							break;
					}
				}
			}
		}
		//return the number identifying which category the user selected.
		return category;
	}	
	
	//callback for failed proccessing of create recipe request
	function handleCreateRecipeError(request,err) {
		alert("Cannot create a new recipe right now.Please try again later: this is most likely an issue on our end of things and will be resolved promptly.");
		console.log(request.responseText);
		console.log(err);
	}
		
	//callback for successfull proccessing of create recipe request
	function handleCreateRecipeSuccess(data,status,request) {
		if(data.success === true) {
			alert("Your " + data.title + " recipe has been successfully saved.");
			
			var recipe = {
				title: data.title,
				recipeId: data.id,
				category: data.category,
				user: data.user
			};
			displayNewRecipe(recipe);
		} else {
			alert(data.message);
		}
		console.log(status);
		console.log(request.responseText);
		console.log(data);
		//Toggle view
		toggleCreateRecipeForm();
	}		
	
	
	
	
	
/*****
***** 
*****	HANDLE LOGOUT BUTTON CLICK EVENT
*****
*****/
	function logout() {
		var obj = {
			action: "logout"
		};
		var payload = JSON.stringify(obj);
		$.ajax({
			url: "http://localhost/my_docs/framework/app/controllers/front_page_controller.php",
			method: "POST",
			dataType: "json",
			data: payload,
			error: handleLogoutError,
			success: handleLogoutSuccess
		});
	}
	
	//callback for failed proccessing of logout request
	function handleLogoutError(request,err) {
		alert("Cannot logout,if logging out is imperative to your browsing experience,then we suggest clearing your browser cookies or closing all tabs the browser is running to successfully logout.");
		console.log(request.responseText);
		console.log(err);
	}
		
	//callback for successfull proccessing of logout request
	function handleLogoutSuccess(data,status,request) {
		alert(data);
		console.log(status);
		console.log(request.responseText);
		location.reload(true);
	}





/*****
***** 
*****	TOGGLE VIEW BETWEEN CREATE RECIPE FORM AND REGULAR VIEW
*****
*****/
	function toggleCreateRecipeForm() {
		var createRecipeFormContainer = $("#create-recipe-form-container");
		var lists = $(".list");
		
		
		//check if the other form is displayed.if so,hide it and show this one.
		if(createRecipeFormContainer.css('display') !== 'none') {
			createRecipeFormContainer.toggle();
			lists.toggle();
		} else {
			createRecipeFormContainer.toggle();
			lists.toggle();		
		}
		

	}	
	
});
	