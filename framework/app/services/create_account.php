<?php

function create_user($username,$password) {
	//Create new user object and save it
	//We then validate it(in this case,to ensure its successfull persistence in the database,and then we log it in.
	$new_user = new User($username,$password);
	$save_attempt = $new_user->save();
	if($save_attempt["success"] === true) {
		return true;
	} else {
		return $save_attempt["message"];
	}
}
