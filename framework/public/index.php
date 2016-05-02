<?php session_start(); ?>
<?php require 'C:/xampp/htdocs/my_docs/framework/app/views/front_page_view.php'; ?>
<?php $logged_in = Front_Page_View::check_for_user(); ?>
<!DOCTYPE html>
<html>
	<head lang="en-US">
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1" >
		<title>The recipe application</title>
		<link rel="stylesheet" href="http://localhost/my_docs/framework/public/css/simplegrid.css"/>
		<link rel="stylesheet" href="http://localhost/my_docs/framework/public/css/frontPage.css"/>
		<script src="http://localhost/my_docs/angular/angular.js"></script>
		<?php
			if($logged_in === false) {
				Front_Page_View::import_pub_scripts();
			} else {
				Front_Page_View::import_member_scripts();
			}
		?>
	</head>
	<body>
		<!--START: HEADER-->
		<?php if($logged_in === false){echo 'Create an account or log in to be able to create your own recipes!';} else{Front_Page_View::welcome_user();}		?>
		<div class="grid" id="header">
			<div class="col-4-12"></div>
			<div class="col-4-12">
				<h1 id="title">My Recipes</h1>
			</div>
			<div class="col-4-12" id="add-recipe-div">

				<?php
					if($logged_in === false) {
						Front_Page_View::generate_create_account_button();
						Front_Page_View::generate_login_button();
					} else {
						Front_Page_View::generate_logout_button();
						Front_Page_View::generate_create_recipe_button();
					}
				?>
			</div>
		</div>
		<!--END: HEADER-->
		<!--START: NAVBAR AND ESSENTIAL BUTTONS-->
		<div class="grid" id="navbar">
			<div class="col-2-12"></div>
			<div class="col-2-12">
				<a href="index.php">Recipes</a>
			</div>
			<div class="col-2-12">
				<a href="techniques.html">Techniques</a>
			</div>
			<div class="col-2-12">
				<a href="ingredients.html">Ingredients</a>
			</div>
			<div class="col-2-12">
				<a href="tools.html">Tools</a>
			</div>
			<div class="col-2-12"></div>
		</div>		
		<!--END: NAVBAR AND ADD RECIPE BUTTON-->
		<!--START: UI TOOLS(FILTER,SEARCH,AND POSSIBLY MORE)-->
		<div class="grid" id="ui-tools">
			<div class="col-2-12"></div>
			<div class="col-4-12">
				<span id="search-prompt">Search For:</span> <input type="search" id="recipe-search">
			</div>
			<div class="col-4-12">
				<span id="recipe-filter-prompt">Filter By:</span> <select name="filter" id="recipe-filter">
					<option value="all">All</option>
					<?php Front_Page_View::list_user_options(); ?>
				</select>
			</div>
			<div class="col-2-12"></div>
		</div>
		<!--END: UI TOOLS(FILTER,SEARCH,AND POSSIBLY MORE)-->
		<!--START: MAIN CONTENT AREA-->
		<div id="main-view" class="grid">
			<div class="col-4-12" id="meat-column">
				<ul id="meatList" class="list">
					<li class="list-header">Meat & Seafood</li>
					<?php Front_Page_View::show_meat_list(); ?>
				</ul>
			</div>
			<div class="col-4-12" id="veggie-column">
				<ul id="veggieList" class="list">
					<li class="list-header">Vegetable Based</li>
					<?php Front_Page_View::show_veggies_list(); ?>
				</ul>
			<!--START: FORMS-->
			<?php
				if($logged_in === false) {
					Front_Page_View::generate_create_account_form();
					Front_Page_View::generate_login_form();
				} else {
					Front_Page_View::generate_create_recipe_form();
				}
				Front_Page_View::generate_recipe_box();
			?>			
			
			<!--END: FORMS-->					
			</div>
			<div class="col-4-12" id="bread-column">
				<ul id="breadList" class="list">
					<li class="list-header">Bread</li>
					<?php Front_Page_View::show_bread_list(); ?>
				</ul>
			</div>
			
		
		</div>
		<!--END: MAIN CONTENT AREA-->
		



		
	</body>
</html>