<?php
require_once("backend.php");
class registerlogin extends backend 
{
    public function signIn($username,$email,$password){
        return self::login($username,$email,$password);
    }
    public function signUp($username,$email,$password){
        return self::register($username,$email,$password);
    }

    private function login($username, $email, $password) {
        try {
            if ($this->checkIfVallid($username, $email, $password)) {
                $database = new database();
                if ($database->getStatus()) {
                    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                        $database->closeConnection();
                        return "InvalidEmail"; 
                    }

                    $tmp = md5($password);
                    $stmt = $database->getCon()->prepare($this->signInQuery());
                    $stmt->execute(array($username, $email, $tmp));
                    $result = $stmt->fetch();
                    if ($result) {

                        $p_image = $result['p_image'];

                        if ($email !== $result['email']) {
                            $database->closeConnection();
                            return "IncorrectEmail";
                        }
                        
                        $role = $this->getUserRole($username);

                        
                        $classification = $this->getUserClassification($username);

                        $_SESSION['username'] = $username;
                        $_SESSION['email'] = $email;
                        $_SESSION['password'] = $tmp;
                        $_SESSION['user_id'] = $result['user_id'];
                        $_SESSION['p_image'] = $p_image;

                        $this->updateActiveStatus($username);

                        $database->closeConnection();

                        
                        return json_encode(["status" => "200", "role" => $role, "classification" => $classification, "p_image" => $p_image]);
                    } else {
                        $database->closeConnection();
                        return "401"; 
                    }
                } else {
                    return "401"; 
                }
            } else {
                return "403"; 
            }
        } catch (PDOException $th) {
            return "501"; 
        }
    }


    private function register($username, $email, $password) {
        try {
            $database = new database();
            if ($database->getStatus()) {

                $stmtEmail = $database->getCon()->prepare($this->ExistEmailQuery());
                $stmtEmail->execute(array($email));
                $countEmail = $stmtEmail->fetchColumn();

                
                $stmtUsername = $database->getCon()->prepare($this->ExistUsernameQuery());
                $stmtUsername->execute(array($username));
                $countUsername = $stmtUsername->fetchColumn();

                if ($countEmail > 0) {
                    $database->closeConnection();
                    return "ExistEmail"; // Email already in use
                }

                if ($countUsername > 0) {
                    $database->closeConnection();
                    return "ExistUsername"; // Username already in use
                }

                if (!filter_var($email, FILTER_VALIDATE_EMAIL) || !strpos($email, '@gmail.com')) {
                    $database->closeConnection();
                    return "InvalidEmail";
                }

                
                $stmt = $database->getCon()->prepare($this->signUpQuery());
                $stmt->execute(array($username, $email, md5($password), $this->getCurrentDate()));
                $result = $stmt->fetch();

                if (!$result) {
                    $_SESSION['username'] = $username;
                    $_SESSION['email'] = $email;
                    $_SESSION['password'] = $password;
                    $database->closeConnection();
                    return "200";
                } else {
                    $database->closeConnection();
                    return "404"; 
                }
            } else {
                return "403";
            }
        } catch (PDOException $th) {
            return $th;
        }
    }



    
    private function updateActiveStatus($username)
    {
        try {
            $database = new database();
            if ($database->getStatus()) {
                $updateStmt = $database->getCon()->prepare("UPDATE users SET status = 'Active now' WHERE username = ?");
                $updateStmt->execute(array($username));
                $database->closeConnection();
                return "200";
            } else {
                 return "403";
            }
        } catch (PDOException $th) {
            return $th;
        }
    }

    private function getUserRole($username)
    {
        try {
            $database = new database();
            if ($database->getStatus()) {
                $stmt = $database->getCon()->prepare("SELECT role FROM users WHERE username = ?");
                $stmt->execute([$username]);
                $result = $stmt->fetch();

                if ($result) {
                    $role = $result['role'];
                    $database->closeConnection();
                    return $role;
                }
            }
            $database->closeConnection();
        } catch (PDOException $th) {
            return "501";
        }

        return ""; 
    }

    private function getUserClassification($username)
    {
        try {
            $database = new database();
            if ($database->getStatus()) {
                $stmt = $database->getCon()->prepare("SELECT classification FROM users WHERE username = ?");
                $stmt->execute([$username]);
                $result = $stmt->fetch();

                if ($result) {
                    $classification = $result['classification'];
                    $database->closeConnection();
                    return $classification;
                }
            }
            $database->closeConnection();
        } catch (PDOException $th) {
            return "501";
        }

        return "";
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



    private function getCurrentDate(){
        date_default_timezone_set('Asia/Manila');
        return date("g:i:a - Y/m/d");
    }



    private function checkIfVallid($username, $email, $password)
    {
        if ($username != "" && $email != "" && $password != "")
            return true;
        else
            return false;
    }


    private function signInQuery()
    {
        return "SELECT * FROM users WHERE (`username` = ? OR `email` = ?) AND `password` = ?";
    }


    private function signUpQuery(){
        return "INSERT INTO users (`username`,`email`,`password`, created) VALUES (?,?,?,?)";
    }

    private function ExistUsernameQuery()
    {
        return "SELECT * FROM users WHERE `username` = ?";
    }
    private function ExistEmailQuery()
    {
        return "SELECT * FROM users WHERE `email` = ?";
    }

}

?>