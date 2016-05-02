'use strict';

/*****
***** 
*****	REQUEST USER INFORMATION AND CREATE NEW FILTER OPTION
*****
*****/
function requestUser(userId) {
		
	var obj = {
		id: userId,
		action: "getuser"
	};
	var payload = JSON.stringify(obj);
	$.ajax({
		url: "http://localhost/my_docs/framework/app/controllers/front_page_controller.php",
		method: "POST",
		dataType: "json",
		data: payload,
		error: handleRequestUserError,
		success: handleRequestUserSuccess
	});
}

function handleRequestUserError(request,error) {
	console.log(request.responseText);
	console.log(error);
}

function handleRequestUserSuccess(data,status,request) {
	if(data.userId) {
		var newOption = document.createElement("option");
		newOption.setAttribute("value",data.userId);
		newOption.innerHTML = data.username;
		$("#recipe-filter").append(newOption);		
	} else {
		document.reload();
	}
}





/*****
***** 
*****	DISPLAY NEWLY CREATED RECIPE AND ATTACH CLICK HANDLER TO SHOW FULL CONTENTS.
*****
*****/
	function displayNewRecipe(recipe) {
		//create list item and store recipe information on it.
		var li = document.createElement("li");	
		li.setAttribute("class","recipe");
		li.setAttribute("data-recipeid",recipe.recipeId);
		li.setAttribute("data-user",recipe.user);
		li.innerHTML = recipe.title;
		
		//Append new list item to correct category list.
		switch(recipe.category) {
			case 1:
				document.getElementById("meatList").appendChild(li);
				break;
			case 2:
				document.getElementById("veggieList").appendChild(li);
				break;
			case 3:
				document.getElementById("breadList").appendChild(li);
				break;
			default:
				//do nothing
				break;
		}
		updateFilter( parseInt(recipe.user,10) );
		li.onclick = showRecipe;
	}
	
	
	
	
	
/*****
***** 
*****	UPDATE FILTER SELECT MENU IF A RECIPE WAS CREATED WITH A USER THAT PREVIOUSLY DIDN'T HAVE RECIPES.
*****
*****/	
	function updateFilter(userId) {
		var filterBox = $("#recipe-filter");
		var options = filterBox.children().get();
		var userIsListed = false;
		options.map(function(option) {
			if( parseInt(option.getAttribute("value"),10) !== userId ) {
				//do nothing
			} else {
				userIsListed = true;
			}
		});
		
		if(userIsListed === false) {
			requestUser( parseInt(userId,10) );
		} else {
			//do nothing
		}
	}