<?php
	session_start();
	@require 'C:/xampp/htdocs/my_docs/framework/app/models/recipe.php';
	@require 'C:/xampp/htdocs/my_docs/framework/app/models/user.php';
	@require 'C:/xampp/htdocs/my_docs/framework/app/services/login.php';
	@require 'C:/xampp/htdocs/my_docs/framework/app/services/logout.php';
	@require 'C:/xampp/htdocs/my_docs/framework/app/services/create_account.php';
	//Above starts the session and includes the login service.


	
	class Front_Page_Controller {
		//gets all recipes stored in the database.
		public static function get_all_recipes() {
			$all_recipes = Recipe::get_all_recipes();
			return $all_recipes;
		}
		
		//gets all users stored in the database.
		public static function get_all_users() {
			$all_users = User::get_all_users();
			return $all_users;
		}
		
		//get user information(not password)
		public static function get_user($id) {
			@$user_attempt = User::get_user($id);
			if($user_attempt !== false) {
				$user = [
					"userId"=>$user_attempt->user_id,
					"username"=>$user_attempt->username
				];
				echo json_encode($user);
			} else {
				echo json_encode(false);
			}
		}
		
		//Loop through all users and recipes and,if they have matching primary key and user_id,store the user in the $recipe_users array.
		public static function get_recipe_users() {
			$all_users = self::get_all_users();
			$all_recipes = self::get_all_recipes();
			$recipe_users = [];
			
			//Loop through all users and recipes and if recipes user_id matches that of the user, store the user in the recipe_users array.
			foreach($all_users as $user) {
				foreach($all_recipes as $recipe) {
					if($recipe["user_id"] === $user["user_id"]) {
						array_push($recipe_users,$user);
					}
				}
			}
			
			//Remove duplicate values in recipe_users array
			$unique_recipe_users = array_unique($recipe_users,SORT_REGULAR);
			
			return $unique_recipe_users;
		}
		
		public static function get_recipe($tag) {
			@$recipe = Recipe::get_recipe($tag);
			if($recipe["success"] === true) {
				echo json_encode([
					"success"=>true,
					"title"=>$recipe["recipe"]->title,
					"ingredients"=>$recipe["recipe"]->ingredients,
					"instructions"=>$recipe["recipe"]->instructions,
				]);
			} else {
				echo json_encode($recipe["message"]);
			}
		}
		
		//create a new entry in the recipes table from user-entered data.
		public static function create_recipe($request) {
			$title = $request["title"];
			$ingredients = $request["ingredients"];
			$instructions = $request["instructions"];
			$category = intval($request["category"]);
			$user = $_SESSION["user_id"];
			
			$recipe = new Recipe($title,$ingredients,$instructions,$category,$user);
			$save_attempt = $recipe->save();
			//if recipe was successfully saved,return the recipe in all its glory.
			if($save_attempt["success"] === true) {
				@$retrieve_recipe = Recipe::get_recipe($recipe->title);
				if($retrieve_recipe["success"] === true) {
				$recipe = $retrieve_recipe["recipe"];
				$recipe_info = [
					"title"=>$recipe->title,
					"ingredients"=>$recipe->ingredients,
					"instructions"=>$recipe->instructions,
					"id"=>$recipe->get_id(),
					"cat_id"=>$recipe->cat_id,
					"user_id"=>$recipe->user_id,
					"success"=>true
				];
				echo json_encode($recipe_info);					
				} else {
					echo json_encode($retrieve_recipe["message"]);
				}

			} else {
				echo json_encode($save_attempt["message"]);
			}
		}
		
		//edit a recipe
		public static function edit_recipe($request) {
			@$recipe = Recipe::get_recipe($request["id"]);
			$recipe["recipe"]->edit($request["changes"]);
			echo json_encode( @Recipe::get_recipe($request["id"])["recipe"] );
		}
		
		//delete a recipe
		public static function delete_recipe($id) {
			@$recipe = Recipe::get_recipe($id);
			$recipe["recipe"]->delete();
			echo json_encode("success");
		}
		
		
		//Log the user in using the login service
		public static function login($username,$password) {
			
			//Create a new user object and validate it.
			@$user = new User($username,$password);
			@$validate_attempt = $user->validate();
			
			//If validation was successfull,then log the user in.
			if($validate_attempt["success"] === true) {
				$login_attempt = initiate_session($validate_attempt["user"]);
				//check for success of login attempt
				if($login_attempt === true) {
					echo json_encode("You have been successfully logged in.");
				} else {
					echo json_encode("You are already logged in.");
				}
			} else {
				echo json_encode($validate_attempt["message"]);
			}			
		}
		
		
		
		//Log the user out using the logout service
		public static function logout() {
			//call the clear the session of user-specific data.
			$logout = exit_session();
			
			//message the client based on the outcome of the exit_session() function.
			if($logout === true) {
				echo json_encode("You have been successfully logged out.");
			} else {
				echo json_encode($logout);
			}
		}
		
		
		
		//Create a new account
		public static function create_account($request) {
			//create a new user(not just an object,but,save it and everything)
			$create_attempt = create_user($request["username"],$request["password"]);
			
			//If the new account was successfully created,log the user in,if not: echo back the specific message.
			if($create_attempt === true) {
				self::login($request["username"],$request["password"]);
			} else {
				echo json_encode($create_attempt);
			}
		}
	}
	
	
	
	
	
	
	
	
	
	//Read incoming requests and decide what to do with them.
	$request = json_decode(file_get_contents('php://input'),true);
	switch($request["action"]) {
		case "login":
			Front_Page_Controller::login($request["username"],$request["password"]);
			break;
		case "logout":
			Front_Page_Controller::logout();
			break;
		case "newuser":
			Front_Page_Controller::create_account($request);
			break;
		case "newrecipe":
			Front_Page_Controller::create_recipe($request);
			break;
		case "getrecipe":
			Front_Page_Controller::get_recipe($request["id"]);
			break;
		case "getall":
			echo json_encode(Front_Page_Controller::get_all_recipes());
			break;
		case "getuser":
			Front_Page_Controller::get_user($request["id"]);
			break;
		case "edit":
			Front_Page_Controller::edit_recipe($request);
			break;
		case "deleterecipe":
			Front_Page_Controller::delete_recipe($request["id"]);
			break;
		case "getallusers":
			echo json_encode(Front_Page_Controller::get_all_users());
			break;
		default:
			break;
	}
	