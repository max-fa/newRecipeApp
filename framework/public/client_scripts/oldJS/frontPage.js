'use strict';
//This is the js for non-members
$('document').ready(function() {
	//toggling the login form's visibility with the 'login' button.
	$('#login-button').click(toggleLoginForm);
	
	//hiding the login form with it's 'exit form' button.
	$('#exit-login-form').click(toggleLoginForm);
	
	//toggling the create account form's visibility with the 'create account' button.
	$('#create-account-button').click(toggleCreateAccountForm);
	
	//hiding the create account form with it's 'exit form' button.
	$('#exit-create-account-form').click(toggleCreateAccountForm);
	
	//handle login form submission
	$('#login-form').submit(validateLogin);
	
	//handle create account form submission
	$('#create-account-form').submit(validateCreateAccount);
	
	
	
/*****
***** 
*****	HANDLE CREATE ACCOUNT FORM SUBMIT EVENT
*****
*****/
	function validateCreateAccount(evt) {
		evt.preventDefault();
		var username = this.username.value;
		var password = this.password.value;
		
		var obj = {
			username: username,
			password: password,
			action: "newuser"
		};
		var payload = JSON.stringify(obj);
		$.ajax({
			url: "http://localhost/my_docs/framework/app/controllers/front_page_controller.php",
			method: "POST",
			data: payload,
			dataType: "json",
			contentType: "applicaton/json",
			error: handleCreateAccountError,
			success: handleCreateAccountSuccess			
		});
	}
	
	//callback for failed proccessing of create account form
	function handleCreateAccountError(request,err) {
		alert("Cannot create account,please try again later.");
		console.log(request.responseText);
		console.log(err);
	}
		
	//callback for successfull proccessing of create account form
	function handleCreateAccountSuccess(data,status,request) {
		alert(data);
		console.log(status);
		console.log(request.responseText);
		location.reload(true);
	}	
	
	
	
	
	
/*****
***** 
*****	HANDLE LOGIN FORM SUBMIT EVENT
*****
*****/
	function validateLogin(evt) {
		evt.preventDefault();
		var username = this.username.value;
		var password = this.password.value;
		
		var obj = {
			username: username,
			password: password,
			action: "login"
		};
		var payload = JSON.stringify(obj);
		$.ajax({
			url: "http://localhost/my_docs/framework/app/controllers/front_page_controller.php",
			method: "POST",
			data: payload,
			dataType: "json",
			contentType: "applicaton/json",
			error: handleLoginError,
			success: handleLoginSuccess
		});
	}
	
	//callback for failed proccessing of login form
	function handleLoginError(request,err) {
		alert("Cannot login,please try again later.");
		console.log(request.responseText);
		console.log(err);
	}
		
	//callback for successfull proccessing of login form
	function handleLoginSuccess(data,status,request) {
		alert(data);
		console.log(status);
		console.log(request.responseText);
		location.reload(true);
	}
	
	
	
	
	
	//toggle the view between the two forms or the main view and one of the forms.
	function toggleLoginForm() {
		var loginFormContainer = $("#login-form-container");
		var lists = $(".list");
		var createAccountFormContainer = $("#create-account-form-container");
		
		
		//check if the other form is displayed.if so,hide it and show this one.
		if(createAccountFormContainer.css('display') !== 'none') {
			createAccountFormContainer.toggle();
			loginFormContainer.toggle();
		} else {
			loginFormContainer.toggle();
			lists.toggle();
		}		

		
	}
	
	
	//toggle the view between the two forms or the main view and one of the forms.
	function toggleCreateAccountForm() {
		var createAccountFormContainer = $("#create-account-form-container");
		var lists = $(".list");
		var loginFormContainer = $("#login-form-container");
		
		
		//check if the other form is displayed.if so,hide it and show this one.
		if(loginFormContainer.css('display') !== 'none') {
			loginFormContainer.toggle();
			createAccountFormContainer.toggle();
		} else {
			createAccountFormContainer.toggle();
			lists.toggle();		
		}
		

	}
});



