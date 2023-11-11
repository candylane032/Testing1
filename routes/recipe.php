<?php 
require_once("backend.php");
class recipe extends backend 
{
	//recipe
    public function doAddRecipe($r_name,$r_image,$r_type,$r_list){
        return self::addRecipe($r_name,$r_image,$r_type,$r_list);
    }

    public function doDisplayDataRecipes(){
        return self::displayDataRecipes();
    }

    public function doDisplayDataRecipeModal($recipe_id){
        return self::displayDataRecipeModal($recipe_id);
    }

    public function doDisplayDataRecipeModalUpdate($recipe_id){
        return self::displayDataRecipeModalUpdate($recipe_id);
    }

    public function doUpdateRecipe($newR_name, $newR_image, $newR_type, $newR_list, $recipeId){
        return self::updateRecipe($newR_name, $newR_image, $newR_type, $newR_list, $recipeId);
    }


    private function getId()
    {
        try {
            $database = new database();
            if ($database->getStatus()) {
                $stmt = $database->getCon()->prepare($this->signInQuery());
                $stmt->execute(array($_SESSION['username'],$_SESSION['email'],$_SESSION['password']));
                $tmp = null;
                while ($row = $stmt->fetch()) {
                    $tmp = $row['user_id'];
                }
                $database->closeConnection();
                return $tmp;
            }
        } catch (PDOException $th) {
            echo $th;
        }        
    }


    //recipe
    private function addRecipe($r_name,$r_image,$r_type,$r_list){
        try {
            $r_list = explode(',', $_POST['r_list']);
            if ($this->checkIfVallidAddRecipe($r_name,$r_image,$r_type,$r_list)) {
                $database = new database();
                if ($database->getStatus()) {


                    $stmtProductImage = $database->getCon()->prepare($this->ExistRecipeImageQuery());
                    $stmtProductImage->execute(array($r_image));
                    $countProductImage = $stmtProductImage->fetchColumn();

                    if ($countProductImage > 0) {
                        $database->closeConnection();
                        return "ExistProductImage"; 
                    }

                    $stmt = $database->getCon()->prepare($this->AddRecipeQuery());
                    $stmt->execute(array($this->getId(), $r_name, $r_image, $r_type, implode(',', $r_list), $this->getCurrentDate()));
                    $result = $stmt->fetch();
                    if (!$result) {
                        $database->closeConnection();
                        return "200";
                    }else{
                        $database->closeConnection();
                        return "404";
                    }
                }else{
                    return "403";
                }
            } else {
                return "403";
            }
        } catch (PDOException $th) {
            // return "501";
            return $th;
        }
    }

    private function displayDataRecipes(){
        try {
            $database = new database();
            if ($database->getStatus()){
                $stmt = $database->getCon()->prepare($this->displayRecipesQuery());
                $stmt->execute(array());
                $result = $stmt->fetchAll();
                $database->closeConnection();
                return json_encode($result);
            }else{
                return "403";
            }
        
        } catch (PDOException $th) {
            //throw $th;
            return "501";
        }
    }


    private function displayDataRecipeModal($recipe_id){
        try {
            $database = new database();
            if ($database->getStatus()){
                $stmt = $database->getCon()->prepare($this->displayByIdRecipeQuery());
                $stmt->execute(array($recipe_id));
                $result = $stmt->fetchAll();
                $database->closeConnection();
                return json_encode($result);
            }else{
                return "403";
            }
        } catch (PDOException $th) {
            return "501";
        }
    }

    private function displayDataRecipeModalUpdate($recipe_id){
        try {
            $database = new database();
            if ($database->getStatus()){
                $stmt = $database->getCon()->prepare($this->displayByIdRecipeQuery());
                $stmt->execute(array($recipe_id));
                $result = $stmt->fetchAll();
                $database->closeConnection();
                return json_encode($result);
            }else{
                return "403";
            }
        } catch (PDOException $th) {
            return "501";
        }
    }

    private function updateRecipe($newR_name, $newR_image, $newR_type, $newR_list, $recipeId){
        try {
            $database = new database();
            if ($database->getStatus()){
                $stmt = $database->getCon()->prepare($this->updateRecipeQuery());
                $stmt->execute(array($newR_name, $newR_image, $newR_type,$newR_list,$this->getCurrentDate(),$recipeId));
                return "200";
            }else{
                return "404";
            }
            
        } catch (PDOException $th) {
            //throw $th;
            return "501";
        }
    }

    private function getCurrentDate(){
        date_default_timezone_set('Asia/Manila');
        return date("g:i:a - Y/m/d");
    }

    private function checkIfVallidAddRecipe($r_name,$r_image,$r_type,$r_list){
        if ($r_name != "" && $r_image != "" && $r_type != "" && $r_list != "")
            return true;
        else
            return false;
    }

    private function signInQuery()
    {
        return "SELECT * FROM users WHERE (`username` = ? OR `email` = ?) AND `password` = ?";
    }


    //recipe
    private function AddRecipeQuery(){
        return "INSERT INTO recipes (`user_id`, `r_name`, `r_image`, `r_type`, `r_list`, created) VALUES (?,?,?,?,?,?)";
    }


    private function ExistRecipeImageQuery(){
        return "SELECT * FROM recipes WHERE `r_image` = ?";
    }

    private function displayRecipesQuery() {
        return "SELECT * FROM recipes";
    }

    private function displayByIdRecipeQuery() {
        return "SELECT * FROM recipes WHERE recipe_id = ?";
    }

    private function updateRecipeQuery() {
        return "UPDATE recipes SET r_name = ?, r_image = ?, r_type = ?, r_list = ?, created = ? WHERE recipe_id = ?";
    }
}

?>