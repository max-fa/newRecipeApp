<?php
function initiate_session($user) {
	if( array_key_exists('logged',$_SESSION) && array_key_exists('user_id',$_SESSION) ) {
		return false;
	} else {
		$_SESSION['logged'] = true;
		$_SESSION['user_id'] = $user->user_id;
		$_SESSION['user_name'] = $user->username;
		return true;
	}
}