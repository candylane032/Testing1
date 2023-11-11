<?php 
require_once("backend.php");
class profile extends backend 
{
	//profile
    public function doInsertEditProfile($fname,$lname,$gender,$pnumber,$address){
        return self::insertEditProfile($fname,$lname,$gender,$pnumber,$address);
    }

    public function doDisplayDataProfile($user_id){
        return self::displayDataProfile($user_id);
    }

    public function doSetIdProfile($SetIdProfile){
        return self::setIdProfile($SetIdProfile);
    }

    public function doDisplayDataProfileModal($user_id){
        return self::displayDataProfileModal($user_id);
    }

    public function doUpdateProfile($newFname, $newLname, $newGender, $newPnumber, $newAddress){
        return self::updateProfile($newFname, $newLname, $newGender, $newPnumber, $newAddress);
    }

    public function doDisplayDataProfilePic($user_id){
        return self::displayDataProfilePic($user_id);
    }

    public function doDisplayDataProfilePicModal($user_id){
        return self::displayDataProfilePicModal($user_id);
    }

    public function doUpdateProfilePicModal($newP_image, $user_id){
        return self::updateProfilePicModal($newP_image, $user_id);
    }


    private function updateClassification()
    {
        try {
            $database = new database();
            if ($database->getStatus()){
                $stmt = $database->getCon()->prepare("UPDATE users SET classification = ? WHERE user_id = ?");
                $stmt->execute(array('Verified', $this->getId()));
                $database->closeConnection();
            }
        }catch (PDOException $th) {
            echo $th;
        }   
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



    // profile functions
    private function insertEditProfile($fname,$lname,$gender,$pnumber,$address){
        try {
            if ($this->checkIfVallidProfile($fname,$lname,$gender,$pnumber,$address)) {
                $database = new database();
                if ($database->getStatus()) {

                    $user_id = $this->getId();
                    $stmtuser_id= $database->getCon()->prepare($this->ExistUserIdQuery());
                    $stmtuser_id->execute(array($user_id));
                    $countuser_id = $stmtuser_id->fetchColumn();

                    if ($countuser_id > 0) {
                        $database->closeConnection();
                        return "409"; 
                    }


                    $stmt = $database->getCon()->prepare($this->insertEditProfileQuery());
                    $stmt->execute(array($this->getId(),$fname,$lname,$gender,$pnumber,$address,$this->getCurrentDate()));
                    $result = $stmt->fetch();
                    if (!$result) {
                        $this->updateClassification();
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

    private function displayDataProfile($user_id){
        try {
            $database = new database();
            if ($database->getStatus()){
                $stmt = $database->getCon()->prepare($this->displayProfileQuery());
                $stmt->execute(array($user_id));
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


    private function setIdProfile($SetIdProfile) {
        try {
            $database = new database();
            if($database->getStatus()){
                return $_SESSION['profile_id'] = $SetIdProfile;
            }
            else{
                return "Failed";
            }
        } catch (PDOException $th) {
            //throw $th;
            return "501";
        }
    }


    private function displayDataProfileModal($user_id){
        try {
            $database = new database();
            if ($database->getStatus()){
                $stmt = $database->getCon()->prepare($this->displayProfileQuery());
                $stmt->execute(array($user_id));
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


    private function updateProfile($newFname, $newLname, $newGender, $newPnumber, $newAddress){
        try {
            $database = new database();
            if ($database->getStatus()){
                $stmt = $database->getCon()->prepare($this->updateProfileQuery());
                $stmt->execute(array($newFname, $newLname, $newGender, $newPnumber, $newAddress,$this->getCurrentDate(), $_SESSION['profile_id']));
                return "200";
            }else{
                return "404";
            }
            
        } catch (PDOException $th) {
            //throw $th;
            return "501";
        }
    }

    private function displayDataProfilePic($user_id){
        try {
            $database = new database();
            if ($database->getStatus()){
                $stmt = $database->getCon()->prepare($this->displayProfilePicQuery());
                $stmt->execute(array($user_id));
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

    private function displayDataProfilePicModal($user_id){
        try {
            $database = new database();
            if ($database->getStatus()){
                $stmt = $database->getCon()->prepare($this->displayProfilePicQuery());
                $stmt->execute(array($user_id));
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

    private function updateProfilePicModal($newP_image, $user_id){
        try {
            $database = new database();
            if ($database->getStatus()){
                $stmt = $database->getCon()->prepare($this->updateProfilePicQuery());
                $stmt->execute(array($newP_image, $this->getCurrentDate(),$user_id));
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


    private function checkIfVallidProfile($fname,$lname,$gender,$pnumber,$address)
    {
        if ($fname != "" && $lname != "" && $gender != "" && $pnumber != "" && $address != "")
            return true;
        else
            return false;
    }

    private function checkIfVallidinsertUpdateProfile($p_image){
        if ($p_image != "" )
            return true;
        else
            return false;
    }

    private function signInQuery()
    {
        return "SELECT * FROM users WHERE (`username` = ? OR `email` = ?) AND `password` = ?";
    }



    private function insertEditProfileQuery() {
        return "INSERT INTO profile (user_id, `fname`,`lname`,`gender`,`pnumber`,`address`, updated) VALUES (?,?,?,?,?,?,?)";
    }

    private function ExistUserIdQuery () 
    {
        return "SELECT * FROM profile WHERE `user_id` = ?";
    }

    private function displayProfileQuery() {
        return "SELECT * FROM profile WHERE user_id = ?";
    }

    private function updateProfileQuery() {
        return "UPDATE profile  SET fname = ?, lname = ?, gender = ?, pnumber = ?, address = ?, updated = ? WHERE profile_id = ?";
    }

    private function displayProfilePicQuery() {
        return "SELECT * FROM users WHERE user_id = ?";
    }

    private function updateProfilePicQuery(){
        return "UPDATE users SET p_image = ?, created = ? WHERE user_id = ?";
    }

}
?>