<?php
require_once("backend.php");
class chatA extends backend 
{
	// public function chatC($userId, $message, $id){
    //     return self::chatCustomer($userId, $message, $id);
    // }

    public function chatA($userId, $message, $id,$msg,$time){
        return self::chatAdmin($userId, $message, $id,$msg,$time);
    }
    public function readChat(){
        return self::getReadChatAdmin();
    }
    public function readChatToAdmin($id){
        return self::getReadChatToAdmin($id);
    }
    public function chatACheckId($userId){
        return self::getChatACheckId($userId);
    }

    public function messageById(){
        return self::sendMessageById();
    }
    public function searchUserss(){
        return self::getSearchUserss();
    }
    public function searchUserssReserve(){
        return self::getsearchUserssReserve();
    }
    public function chatToAdmin($userId, $message, $id){
        return self::toChatToAdmin($userId, $message, $id);
    }

    private function chatAdmin($userId, $message, $id,$msg,$time){
        try {
            $database = new database();
            if ($database->getStatus()){
                $stmt = $database->getCon()->prepare($this->chatAdminQuery());
                $stmt->execute(array($userId, $message, $id,$msg,$time,$this->getCurrentDate()));
                $result = $stmt->fetch();
                $database->closeConnection();
                if(!$result){
                    return '200';
                }else{
                    return '401';
                }
            }else{
                return "403";
            }
        
        } catch (PDOException $th) {
            //throw $th;
            return "501";
        }
    }

    private function toChatToAdmin($userId, $message, $id){
        try {
            $database = new database();
            if ($database->getStatus()){
                $stmt = $database->getCon()->prepare($this->toChatToAdminQuery());
                $stmt->execute(array($userId, $message, $id, $this->getCurrentDate()));
                $result = $stmt->fetch();
                $database->closeConnection();
                if(!$result){
                    return '200';
                }else{
                    return '401';
                }
            }else{
                return "403";
            }
        
        } catch (PDOException $th) {
            //throw $th;
            return "501";
        }
    }

    private function sendMessageById(){
        try {
            $database = new database();
            if ($database->getStatus()){
                $stmt = $database->getCon()->prepare($this->sendMessageByIdQuery());
                $stmt->execute();
                $result = $stmt->fetchAll();
                $database->closeConnection();
                return json_encode($result);
            }else{
                return "403";
            }
        
        } catch (PDOException $th) {
            throw $th;
            // return "501";
        }
    }


    private function getReadChatAdmin(){
        try {
            $database = new database();
            if ($database->getStatus()){
                $stmt = $database->getCon()->prepare($this->getReadChatAdminQuery());
                $stmt->execute();
                $result = $stmt->fetchAll();
                $database->closeConnection();
                return json_encode($result);
            }else{
                return "403";
            }
        
        } catch (PDOException $th) {
            throw $th;
            // return "501";
        }
    }

    private function getReadChatToAdmin(){
        try {
            $database = new database();
            if ($database->getStatus()){
                $stmt = $database->getCon()->prepare($this->getReadChatToAdminQuery());
                $stmt->execute();
                $result = $stmt->fetchAll();
                $database->closeConnection();
                return json_encode($result);
            }else{
                return "403";
            }
        
        } catch (PDOException $th) {
            throw $th;
            // return "501";
        }
    }

    private function getChatACheckId(){
        try {
            $database = new database();
            if ($database->getStatus()){
                $stmt = $database->getCon()->prepare($this->getChatACheckIdQuery());
                $stmt->execute(array());
                $result = $stmt->fetchAll();
                $database->closeConnection();
                return json_encode($result);
            }else{
                return "403";
            }
        
        } catch (PDOException $th) {
            throw $th;
            // return "501";
        }
    }

    private function getSearchUserss(){
        try {
            $database = new database();
            if ($database->getStatus()){
                $stmt = $database->getCon()->prepare($this->getSearchUserssQuery());
                $stmt->execute();
                $result = $stmt->fetchAll();
                $database->closeConnection();
                return json_encode($result);
            }else{
                return "403";
            }
        
        } catch (PDOException $th) {
            throw $th;
            // return "501";
        }
    }

    private function getSearchUserssReserve(){
        try {
            $database = new database();
            if ($database->getStatus()){
                $stmt = $database->getCon()->prepare($this->getSearchUserssReserveQuery());
                $stmt->execute();
                $result = $stmt->fetchAll();
                $database->closeConnection();
                return json_encode($result);
            }else{
                return "403";
            }
        
        } catch (PDOException $th) {
            throw $th;
            // return "501";
        }
    }


    private function getCurrentDate(){
        date_default_timezone_set('Asia/Manila');
        return date("g:i:a - Y/m/d");
    }

    // private function chatCustomerQuery(){
    //     return "INSERT INTO msg(user_id, message, receiverId, created) VALUE (?,?,?,?)";
    // }

    private function chatAdminQuery(){
        return "INSERT INTO msg(user_id, message, receiverId, messageReceived, timeMessageArrived, created) VALUE (?,?,?,?,?,?)";
    }
    private function toChatToAdminQuery(){
        return "INSERT INTO msg(user_id, message, receiverId, created) VALUE (?,?,?,?)";
    }

    private function sendMessageByIdQuery(){
        return "SELECT * FROM msg ORDER BY created ASC";
    }

    private function getReadChatAdminQuery(){
        return "SELECT m.user_id, CONCAT(GROUP_CONCAT(CONCAT(m.message, ' (', m.created, ')\n') ORDER BY m.created DESC), '\n', MAX(m.created), ' (latest)') AS all_messages, MAX(m.created) AS latest_message_time, u.username FROM msg m INNER JOIN users u ON m.user_id = u.user_id GROUP BY m.user_id, m.message ORDER BY latest_message_time ASC;";
    }

    private function getReadChatToAdminQuery(){
        return "SELECT m.user_id, m.message, m.receiverId, m.messageReceived, m.timeMessageArrived, m.created, u.username FROM msg m INNER JOIN users u ON m.user_id = u.user_id ORDER BY m.created ASC";
    }

    private function signInQuery()
    {
        return "SELECT * FROM users WHERE `user_id` = ?";
    }
    private function getChatACheckIdQuery(){
        return "SELECT m.user_id, MAX(m.message) as message, MAX(m.created) AS created, u.username FROM msg m INNER JOIN users u ON m.user_id = u.user_id GROUP BY u.username ORDER BY message desc";
    }
    private function getSearchUserssQuery(){
        return "SELECT orders.order_id, users.username, profile.fname, profile.lname, profile.address, orders.o_payment_status, orders.o_delivery, orders.created FROM orders INNER JOIN profile ON profile.user_id = orders.user_id INNER JOIN users ON users.user_id = profile.user_id WHERE (orders.o_payment_status = 'paid' AND orders.o_delivery = 'preparing') OR (orders.o_payment_status = 'paid' AND orders.o_delivery = 'complete') OR (orders.o_payment_status = 'paid' AND orders.o_delivery = 'on the way') OR (orders.o_payment_status = 'canceled' AND orders.o_delivery = 'canceled') GROUP BY users.username ORDER BY orders.created DESC";
    }
     private function getSearchUserssReserveQuery(){
        return "SELECT r.reserve_id, u.username, p.fname, p.lname, p.address, r.payment_status, r.r_delivery, r.created FROM reserves r INNER JOIN profile p ON p.user_id = r.user_id INNER JOIN users u ON u.user_id = p.user_id WHERE (r.payment_status = 'paid' AND r.r_delivery = 'preparing') OR (r.payment_status = 'paid' AND r.r_delivery = 'complete') OR (r.payment_status = 'paid' AND r.r_delivery = 'on the way') OR (r.payment_status = 'canceled' AND r.r_delivery = 'canceled') GROUP BY u.username ORDER BY r.created DESC";
    }
}

?>
