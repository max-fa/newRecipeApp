<?php
	//Create connection to database so we can reference it in the methods below.
	$db = new PDO("mysql:dbname=recipesdb;host=localhost;charset=utf8mb4","username","password",[PDO::ATTR_EMULATE_PREPARES=>false]);

	class User {
		public $user_id;
		public $username;
		public $password;
		
		public function __construct($username,$password) {
			if($this->user_id === null) {
				$this->username = $username;
				$this->password = $password;
			} else {
				//Do nothing.
				return;
			}

		}
		
		
		
		//Retrieves a single user based on their primary key(int) or username(string).
		public static function get_user($tag) {
				global $db;
				
				//If the tag parameter is an integer,we know to look for the user by it's primary key.
				if(is_int($tag) === true) {
					$query = $db->prepare('SELECT * FROM users WHERE user_id = :user_id');
					if($query->execute([":user_id"=>$tag]) !== false) {
						$user = $query->fetchObject("User");
						return $user;
					} else {
						return false;
					}
				}
				//If the tag is a string,then we will look for it by it's username field.
				else if(is_string($tag) === true) {
					$query = $db->prepare('SELECT * FROM users WHERE username = :username');
					if($query->execute([":username"=>$tag]) !== false) {
						$user = $query->fetchObject("User");
						return $user;
					} else {
						return false;
					}
				}		
		}
	
	
	
		//get all users in the database to load at the beginning of each user session and return an array of associative arrays that match rows.
		public static function get_all_users() {
			global $db;
			
			$user_arr = [];
			$all_users = $db->query('SELECT * FROM users');
			if($all_users !== false) {
				foreach($db->query('SELECT * FROM users') as $user) {
					array_push($user_arr,$user);
				}
				return $user_arr;
			} else {
				return $all_users;
			}
		}
		
		
		
		//Saves a User object into the table with it's properties providing the values for columns.
		public function save() {
			global $db;
		
			$username = $this->username;
			$password = password_hash($this->password,PASSWORD_DEFAULT);
			
			//Check if a user with the same username already exists.
			//We'll have to send a message to the person attempting to create an account that the username is already taken.
			$existing_user = User::get_user($username);
			if($existing_user === false) {
				//If no user with the same title exists,continue with creating user.
				$query = $db->prepare('INSERT INTO users VALUES(NULL,:username,:password)');
				if($query->execute([":username"=>$username,":password"=>$password]) !== false) {
					return ["success"=>true];
				} else {
					return ["success"=>false,"message"=>"Could not create a new user."];
				}

			} else {
				return ["success"=>false,"message"=>"A user with the username " . $existing_user->username . " already exists.Please choose a new username."];
			}
		}

		
		
		//Deletes the corresponding row to the current User object in the database.
		public function delete() {
			global $db;
			
			$query = $db->prepare('DELETE FROM users WHERE user_id = :user_id');
			if($query->execute([":user_id"=>$this->user_id]) === true) {
				return $query->rowCount();
			} else {
				return 'Cannot delete user,please try again later.';
			}
			
			
		}		
		
		
		
		//Compares the user-entered password with the stored hash.
		public function validate() {
			global $db;
			//Check if a user row exists with a username field equal to that specified by the site visitor
			if(self::get_user($this->username) !== false) {
				$stored_user = self::get_user($this->username);
				//If such a user exists,compare the stored password hash with the plaintext password entered by the site visitor.
				if(password_verify($this->password,$stored_user->password) === true) {
					//If successfull,return a boolean detailing the success of the operation and the validated user object.
					return ["success"=>true,"user"=>$stored_user];
				} else {
					//If password was incorrect,return a boolean detailing the success of validation and a message alerting the user as to what exactly went wrong(incorrect password).
					return ["success"=>false,"message"=>"Password is incorrect. Please try again."];
				}
			} else {
				//If no row in the database with a 'username' field matching what the site visitor entered can be found,return a boolean to show the operation failed
				//and a message alerting the visitor that the username was incorrect.
				return ["success"=>false,"message"=>"User: " . $this->username . " does not exist,please try again later."];
			}
		}
	
	}
	
	/*$user_entered_pw = 'ilovephp';
	$new_pw = password_hash($user_entered_pw,PASSWORD_DEFAULT);
	$user = new User('capihax',$new_pw);*/