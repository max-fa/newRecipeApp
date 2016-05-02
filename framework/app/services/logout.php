<?php
//Above starts the session and exit_session() destroys the session variable that indicates that the user has been logged in.
function exit_session() {
	if( array_key_exists('logged',$_SESSION) ) {
		unset($_SESSION['logged']);
		unset($_SESSION['user_id']);
		unset($_SESSION['user_name']);
		return true;
	} else {
		return "You are already logged out!";
	}
}
