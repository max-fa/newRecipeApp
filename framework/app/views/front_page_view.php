<?php
	@require 'C:/xampp/htdocs/my_docs/framework/app/controllers/front_page_controller.php';
	


	class Front_Page_View {
		public static function show_meat_list() {
			$all_recipes = Front_Page_Controller::get_all_recipes();
			
			foreach($all_recipes as $recipe) {
				if($recipe['cat_id'] === 1) {
					echo '<li class="recipe" data-recipeid="' . $recipe["id"] .'" data-user="' . $recipe["user_id"] . '">' . htmlentities($recipe["title"]) . '</li>';
				}
			}
		}
		
		
		public static function show_veggies_list() {
			$all_recipes = Front_Page_Controller::get_all_recipes();
			
			foreach($all_recipes as $recipe) {
				if($recipe['cat_id'] === 2) {
					echo '<li class="recipe" data-recipeid="' . $recipe["id"] .'" data-user="' . $recipe["user_id"] . '">' . htmlentities($recipe["title"]) . '</li>';
				}
			}
		}

		
		public static function show_bread_list() {
			$all_recipes = Front_Page_Controller::get_all_recipes();
			
			foreach($all_recipes as $recipe) {
				if($recipe['cat_id'] === 3) {
					echo '<li class="recipe" data-recipeid="' . $recipe["id"] .'" data-user="' . $recipe["user_id"] . '">' . htmlentities($recipe["title"]) . '</li>';
				}
			}
		}
		
		public static function list_user_options() {
			$recipe_users = Front_Page_Controller::get_recipe_users();
			$listed_users = [];

			foreach($recipe_users as $user) {
				$id = $user["user_id"];
				$username = htmlentities($user["username"]);
				echo "<option value=\"{$id}\">{$username}</option>";
			}
		}
		
		
		public static function check_for_user() {
			//echo $_SERVER['SERVER_NAME'] . $_SERVER['PHP_SELF'] . $_SERVER['REQUEST_METHOD'];
			if( array_key_exists('logged',$_SESSION) ) {
				if($_SESSION['logged'] === true) {
					return true;
				}
			} else {
				return false;
			}
		}
		
		public static function welcome_user() {
			echo 'Logged in as ' . $_SESSION['user_name'];
		}
		
		
		public static function generate_login_button() {
			echo '
				<button id="login-button" toggle-login-form>Login</button>
			';
		}
		
		public static function generate_logout_button() {
			echo '
				<button id="logout-button" ng-click="logout()">Logout</button>
			';
		}
		
		public static function generate_create_recipe_button() {
			echo '
				<button id="create-recipe-button" toggle-create-recipe-form>Create Recipe</button>
			';
		}
		
		public static function generate_create_account_button() {
			echo '
				<button id="create-account-button" toggle-create-account-form>Create Account</button>				
			';
		}
				

		public static function generate_login_form() {
			echo '
			<div id="login-form-container" style="display: none;">
				<form id="login-form" ng-submit="login()">
						<h3><span style="color: blue;">Login</span></h3>
						<label for="username">Username:</label>
						<input type="text" id="username" name="username" ng-model="loginCredentials.username" required>
						<br>
						<br>
						<label for="password">Password:</label>
						<input type="password" id="password" name="password" ng-model="loginCredentials.password" required>
						<br>
						<br>
						<span><button type="submit" id="submit-create-account">Sign In</button></span>
						<span><button type="reset">Reset Form</button></span>
						<span><button type="button" id="exit-login-form" exit-login-form>Exit Form</button></span>
						<br>
						<br>
				</form>			
			</div>
			
			';
		}
		
		
		public static function generate_create_recipe_form() {
			echo '
			<div id="create-recipe-form-container" style="display: none;">
				<form id="create-recipe-form" submit-create-recipe>
						<h3>Create a Recipe</h3>
						<label for="create-recipe-title">Enter recipe title:</label>
						<input type="text" id="create-recipe-title" name="title" ng-model="recipe.title" required>
						<br>
						<br>
						<label for="ingredients">Enter recipe ingredients:</label>
						<textarea cols="35" rows="10" id="ingredients" name="ingredients" ng-model="recipe.ingredients" required></textarea>
						<p>*Please use commas when entering recipe,once added the recipe ingredients will be displayed as you wrote them.</p>
						<br>
						<br>
						<p><label for="instructions">Enter recipe instructions below.</label></p>
						<textarea cols="55" rows="10" id="instructions" name="instructions" ng-model="recipe.instructions" required></textarea>
						<br>
						<br>
						<p><label for="column">Choose under which classification this recipe will be placed under.</label></p>
						<label for="bread-checkbox">Breads</label>
						<input type="radio" id="bread-checkbox" value=3 class="check" name="category" ng-model="recipe.category" required>
						<label for="meatCheckBox">Meat & Fish</label>
						<input type="radio" id="meat-checkbox" value=1 class="check" name="category" ng-model="recipe.category" required>
						<label for="veggieCheckBox">Vegetable-based</label>
						<input type="radio" id="veggie-checkbox" value=2 class="check" name="category" ng-model="recipe.category" required>
						<br>
						<br>
						<span><button type="submit" id="submit-create-recipe">Submit</button></span>
						<span><button type="reset">Reset Form</button></span>
						<span><button type="button" id="exit-create-recipe-form" exit-create-recipe-form>Exit Form</button></span>
						<br>
						<br>
				</form>	
				<p>{{recipe}}</p>
			</div>
			';
		}
		
		
		public static function generate_create_account_form() {
			echo '
			<div id="create-account-form-container" style="display: none;">
				<form id="create-account-form" name="create-account">
						<h3><span style="color: blue;">Create Account</span></h3>
						<label for="username">Username:</label>
						<input type="text" id="username" name="username" required>
						<br>
						<br>
						<label for="password">Password:</label>
						<input type="password" id="password" name="password" required>
						<br>
						<br>
						<input type="hidden"></input>
						<span><button type="submit" id="submit-create-account">Sign Up</button></span>
						<span><button type="reset">Reset Form</button></span>
						<span><button type="button" id="exit-create-account-form" exit-create-account-form>Exit Form</button></span>
						<br>
						<br>
				</form>
			</div>				
			';
		}
		
		public static function generate_member_recipe_box() {
			echo '
		<div id="recipe-display" style="display: none;">
			<h1 id="recipe-title">{{recipeView.title}}</h1>
			<p id="recipe-body">
				<p id="recipe-ingredients">{{recipeView.ingredients}}</p>
				<p id="recipe-instructions">{{recipeView.instructions}}</p>
			</p>
			<button exit-recipe-display>Return to Recipes</button>
			<button id="edit-recipe-button" edit-recipe>Edit</button>
			<button id="delete-recipe-button" delete-recipe>Delete Recipe</button>
		</div>
			';
		}
		
		public static function generate_public_recipe_box() {
			echo '
		<div id="recipe-display" style="display: none;">
			<h1 id="recipe-title">{{recipeView.title}}</h1>
			<p id="recipe-body">
				<p id="recipe-ingredients">{{recipeView.ingredients}}</p>
				<p id="recipe-instructions">{{recipeView.instructions}}</p>
			</p>
			<button exit-recipe-display>Return to Recipes</button>
		</div>
			';
		}		
		
		public static function generate_edit_recipe_box() {
			echo '
		<div id="edit-recipe-box" style="display: none;">
			<form id="edit-recipe-form" name="edit-recipe" submit-edit-recipe>
						<h3>Edit</h3>
						<label for="create-recipe-title">Enter recipe title:</label>
						<input type="text" id="create-recipe-title" name="title" ng-model="edit.title">
						<br>
						<br>
						<label for="ingredients">Enter recipe ingredients:</label>
						<textarea cols="35" rows="10" id="ingredients" name="ingredients" ng-model="edit.ingredients"></textarea>
						<p>*Please use commas when entering recipe,once added the recipe ingredients will be displayed as you wrote them.</p>
						<br>
						<br>
						<p><label for="instructions">Enter recipe instructions below.</label></p>
						<textarea cols="55" rows="10" id="instructions" name="instructions" ng-model="edit.instructions"></textarea>
						<br>
						<br>
						<span><button type="submit" id="submit-create-recipe">Submit</button></span>
						<span><button type="reset">Reset Form</button></span>
						<span><button type="button" id="exit-create-recipe-form" exit-edit-recipe>Exit Form</button></span>
						<br>
						<br>
			</form>
		</div>
			';
		}
		
		
		public static function import_pub_scripts() {
			echo '
		<script src="http://localhost/my_docs/framework/public/client_scripts/modules/app.js"></script>
		<script src="http://localhost/my_docs/framework/public/client_scripts/directives/recipe.js"></script>
		<script src="http://localhost/my_docs/framework/public/client_scripts/directives/exitRecipeDisplay.js"></script>
		<script src="http://localhost/my_docs/framework/public/client_scripts/directives/toggleCreateAccountForm.js"></script>
		<script src="http://localhost/my_docs/framework/public/client_scripts/directives/exitCreateAccountForm.js"></script>
		<script src="http://localhost/my_docs/framework/public/client_scripts/directives/exitLoginForm.js"></script>
		<script src="http://localhost/my_docs/framework/public/client_scripts/directives/toggleLoginForm.js"></script>
		<script src="http://localhost/my_docs/framework/public/client_scripts/controllers/MainController.js"></script>
		<script src="http://localhost/my_docs/framework/public/client_scripts/services/recipeGetter.js"></script>
		<script src="http://localhost/my_docs/framework/public/client_scripts/services/logger.js"></script>
		<script src="http://localhost/my_docs/framework/public/client_scripts/services/userGetter.js"></script>
			';
		}
		
		
		public static function import_member_scripts() {
			echo '
		<script src="http://localhost/my_docs/framework/public/client_scripts/modules/members.js"></script>
		<script src="http://localhost/my_docs/framework/public/client_scripts/directives/recipe.js"></script>
		<script src="http://localhost/my_docs/framework/public/client_scripts/directives/toggleCreateRecipeForm.js"></script>
		<script src="http://localhost/my_docs/framework/public/client_scripts/directives/exitRecipeDisplay.js"></script>
		<script src="http://localhost/my_docs/framework/public/client_scripts/directives/exitCreateRecipeForm.js"></script>
		<script src="http://localhost/my_docs/framework/public/client_scripts/directives/exitEditRecipe.js"></script>
		<script src="http://localhost/my_docs/framework/public/client_scripts/directives/editRecipe.js"></script>
		<script src="http://localhost/my_docs/framework/public/client_scripts/directives/submitCreateRecipe.js"></script>
		<script src="http://localhost/my_docs/framework/public/client_scripts/directives/submitEditRecipe.js"></script>
		<script src="http://localhost/my_docs/framework/public/client_scripts/directives/deleteRecipe.js"></script>
		<script src="http://localhost/my_docs/framework/public/client_scripts/controllers/MainController.js"></script>
		<script src="http://localhost/my_docs/framework/public/client_scripts/services/recipeGetter.js"></script>
		<script src="http://localhost/my_docs/framework/public/client_scripts/services/logger.js"></script>
		<script src="http://localhost/my_docs/framework/public/client_scripts/services/recipeMaker.js"></script>
		<script src="http://localhost/my_docs/framework/public/client_scripts/services/userGetter.js"></script>
			';		
		}
	}