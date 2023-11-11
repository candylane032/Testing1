<?php
require_once("database.php");
class backend
{
    

    public function doLogout(){
        return self::Logout();
    }



    private function Logout()
    {
        try {
            if (isset($_SESSION['username'])) {
                $database = new database();
                if ($database->getStatus()) {
                    $username = $_SESSION['username'];
                    $updateStmt = $database->getCon()->prepare("UPDATE users SET status = 'Offline now' WHERE username = ?");
                    $updateStmt->execute(array($username));
                    session_unset();
                    session_destroy();
                    $database->closeConnection();
                    return "200";
                } else {
                    return "403";
                }
            } else {
                return "403"; 
            }
        } catch (PDOException $th) {
            return "501";
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

    
}
?>
