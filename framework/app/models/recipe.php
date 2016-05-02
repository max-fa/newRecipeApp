<?php
	//Create connection to database so we can reference it in the methods below.
	$db = new PDO("mysql:dbname=recipesdb;host=localhost;charset=utf8mb4","username","password",[PDO::ATTR_EMULATE_PREPARES=>false]);
	
	
	class Recipe {
		//Note that the id property will be a string because PDO returns all mysql results as strings.
		public $id;
		public $title;
		public $ingredients;
		public $instructions;
		public $cat_id;
		public $user_id;
		
		public function __construct($title,$ingredients,$instructions,$cat_id,$user_id) {
			//If id is null then we know that recipe is not coming from the database.
			if($this->id === null) {
				$this->title = $title;
				$this->ingredients = $ingredients;
				$this->instructions = $instructions;
				$this->cat_id = $cat_id;	
				$this->user_id = $user_id;
			} else {
				return;
			}

		}
		
		public function get_id() {
			return $this->id;
		}
	

		
		//get recipe based on tag passed into function
		//if query is successfull,return the result along with boolean
		//if not,then return error and boolean
		public static function get_recipe($tag) {
			global $db;
			
			//If the tag parameter is an integer,we know to look for the recipe by it's primary key.
			if(is_int($tag) === true) {
				$query = $db->prepare('SELECT * FROM recipes WHERE id = :id');
				$query->execute([":id"=>$tag]);
				$recipe = $query->fetchObject("Recipe");
				if($recipe !== false) {
					return ["success"=>true,"recipe"=>$recipe];
				} else {
					return ["success"=>false,"message"=>"Could not find recipe with id: " . $tag . ".Please try again later."];
				}
			}
			//If the tag is a string,then we will look for it by it's title field.
			else if(is_string($tag) === true) {
				$query = $db->prepare('SELECT * FROM recipes WHERE title = :title');
				$query->execute([":title"=>$tag]);
				$recipe = $query->fetchObject("Recipe");
				if($recipe !== false) {
					return ["success"=>true,"recipe"=>$recipe];
				} else {
					return ["success"=>false,"message"=>"Could not find recipe with title: " . $recipe . ".Please try again later."];
				}
			}
		}
		
		
		
		//get all recipes in the database to load at the beginning of each user session and return an array of associative arrays that matches rows.
		public static function get_all_recipes() {
			global $db;
			
			$recipe_arr = [];
			$all_recipes = $db->query('SELECT * FROM recipes');
			if($all_recipes !== false) {
				foreach($db->query('SELECT * FROM recipes') as $recipe) {
					array_push($recipe_arr,$recipe);
				}
				return $recipe_arr;
			} else {
				return $all_recipes;
			}
		}
		
		
		
		//return the number of rows in the recipes table.
		public static function recipe_count() {
			global $db;
			
			$row = $db->query('SELECT COUNT(*) FROM recipes'); 
			$count = $row->fetch();
			return $count["COUNT(*)"];
		}
		
		
		
		//Saves a Recipe object into the table with it's properties providing the values for columns.
		public function save() {
			global $db;
		
			$title = $this->title;
			$ingredients = $this->ingredients;
			$instructions = $this->instructions;
			$cat_id = $this->cat_id;
			$user_id = $this->user_id;
			
			//Check if a recipe with the same title already exists.
			$existing_recipe = self::get_recipe($title);
			//We now know that there is no recipe with the same title.
			if($existing_recipe["success"] === false) {
				$query = $db->prepare('INSERT INTO recipes VALUES(NULL,:title,:ingredients,:instructions,:cat_id,:user_id)');
				if($query->execute([":title"=>$title,":ingredients"=>$ingredients,":instructions"=>$instructions,":cat_id"=>$cat_id,":user_id"=>$user_id]) !== false) {
					return ["success"=>true];
				} else {
					return ["success"=>false,"message"=>"Could not save your recipe.This is an error on our end.Please try again later."];
				}
			//We now know that there is a recipe with the same title.
			} else {
				return ["success"=>false,"message"=>"A recipe with the title: " . $existing_recipe["recipe"] . " already exists,please choose a different title."];
			}
		}
		
		
		
		//Deletes the corresponding row to the current Recipe object in the database.
		public function delete() {
			global $db;
			
			$query = $db->prepare('DELETE FROM recipes WHERE id = :id');
			$query->execute([":id"=>$this->id]);
			return $query->rowCount();
			//echo $this->id;
		}
	
	
		
        //accepts an associative array with keys matching the properties you want to edit,changes it's properties according to the array values,and saves them into the database.
		public function edit($changes) {
			global $db;
			
			foreach($changes as $field=>$value) {
				switch($field) {
					case "title":
						$this->title = $value;
						break;
					case "ingredients":
						$this->ingredients = $value;
						break;
					case "instructions":
						$this->instructions = $value;
						break;
					case "cat_id":
						$this->cat_id = $value;
						break;
					case "user_id":
						$this->user_id = $value;
						break;
				}
			}
			
			$query = $db->prepare('UPDATE recipes SET title = :title,ingredients = :ingredients,instructions = :instructions,cat_id = :cat_id,user_id = :user_id WHERE id = :id');
			$query->execute([
				":title"=>$this->title,
				":ingredients"=>$this->ingredients,
				":instructions"=>$this->instructions,
				":cat_id"=>$this->cat_id,
				":user_id"=>$this->user_id,
				":id"=>$this->id
			]);
		}
	}
	
	
	/*
	A rough first draft on how the view will handle the results from the get_all_recipes method.
	function sort_recipe($recipe) {
		if($recipe["cat_id"] === "3") {
			echo "Breader!\n";
		}
	}
	$all_recipes = Recipe::get_all_recipes();
	array_map("sort_recipe",$all_recipes);
	*/
	
	/*$attack = '<div id="attackdiv"><script src="malscript.js"></script></div>';
	$ingredients = "nothing";
	$instructions = "prepares work wellssy";
	$cat = 1;
	$user = 1;
	$recipe = new Recipe($attack,$ingredients,$instructions,$cat,$user);
	$recipe->save();*/
	
	