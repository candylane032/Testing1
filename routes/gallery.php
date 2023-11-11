<?php 
require_once("backend.php");
class gallery extends backend 
{
	public function doAddGallery($g_image,$descript){
        return self::addGallery($g_image,$descript);
    }

    public function doDisplayDataGallery(){
        return self::displayDataGallery();
    }

    public function doDisplayDataGalleryModal($gallery_id){
        return self::displayDataGalleryModal($gallery_id);
    }

     public function doDisplayDataGalleryModalUpdate($gallery_id){
        return self::displayDataGalleryModalUpdate($gallery_id);
    }

    public function doUpdateGallery($newG_image, $newDescript, $galleryId){
        return self::updateGallery($newG_image, $newDescript, $galleryId);
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


    private function addGallery($g_image,$descript){
        try {
            if ($this->checkIfVallidAddGallery($g_image,$descript)) {
                $database = new database();
                if ($database->getStatus()) {

                    $stmt = $database->getCon()->prepare($this->AddGalleryQuery());
                    $stmt->execute(array($this->getId(), $g_image, $descript, $this->getCurrentDate()));
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

    private function displayDataGallery(){
        try {
            $database = new database();
            if ($database->getStatus()){
                $stmt = $database->getCon()->prepare($this->displayGalleryQuery());
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


    private function displayDataGalleryModal($gallery_id){
        try {
            $database = new database();
            if ($database->getStatus()){
                $stmt = $database->getCon()->prepare($this->displayByIdGalleryQuery());
                $stmt->execute(array($gallery_id));
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

    private function displayDataGalleryModalUpdate($gallery_id){
        try {
            $database = new database();
            if ($database->getStatus()){
                $stmt = $database->getCon()->prepare($this->displayByIdGalleryQuery());
                $stmt->execute(array($gallery_id));
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

    private function updateGallery($newG_image, $newDescript, $galleryId){
        try {
            $database = new database();
            if ($database->getStatus()){
                $stmt = $database->getCon()->prepare($this->updateGalleryQuery());
                $stmt->execute(array($newG_image, $newDescript,$this->getCurrentDate(),$galleryId));
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

    private function checkIfVallidAddGallery($g_image,$descript){
        if ($g_image != "" && $descript != "")
            return true;
        else
            return false;
    }

    private function signInQuery()
    {
        return "SELECT * FROM users WHERE (`username` = ? OR `email` = ?) AND `password` = ?";
    }



    private function AddGalleryQuery(){
        return "INSERT INTO gallery (`user_id`, `g_image`, `descript`, created) VALUES (?,?,?,?)";
    }

    private function displayGalleryQuery() {
        return "SELECT * FROM gallery ";
    }

    private function displayByIdGalleryQuery() {
        return "SELECT * FROM gallery WHERE gallery_id = ?";
    }

    private function updateGalleryQuery() {
        return "UPDATE gallery SET g_image = ?, descript = ?, created = ? WHERE gallery_id = ?";
    }
}