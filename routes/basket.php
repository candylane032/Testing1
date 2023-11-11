<?php 
require_once("backend.php");
class basket extends backend 
{
	public function doSelectUserIdProfile($user_id){
        return self::selectUserIdProfile($user_id);
    }

    public function doDisplayReserveBasket($user_id){
        return self::displayReserveBasket($user_id);
    }

    public function doUpdateReservePaymentStatus($reserve_id,$newPaymentStatus){
        return self::updateReservePaymentStatus($reserve_id,$newPaymentStatus);
    }

    public function doDisplayReservesPending(){
        return self::displayReservesPending();
    }

    public function doDisplayReservesById($reserve_id){
        return self::displayReservesById($reserve_id);
    }

    public function doUpdateReservePstatusDelivery($newP_status, $newDelivery, $reserveIdUpdate){
        return self::updateReservePstatusDelivery($newP_status, $newDelivery, $reserveIdUpdate);
    }

    public function doViewReserve($reserve_id){
        return self::viewReserve($reserve_id);
    }


    // private function getId()
    // {
    //     try {
    //         $database = new database();
    //         if ($database->getStatus()) {
    //             $stmt = $database->getCon()->prepare($this->signInQuery());
    //             $stmt->execute(array($_SESSION['username'],$_SESSION['email'],$_SESSION['password']));
    //             $tmp = null;
    //             while ($row = $stmt->fetch()) {
    //                 $tmp = $row['user_id'];
    //             }
    //             $database->closeConnection();
    //             return $tmp;
    //         }
    //     } catch (PDOException $th) {
    //         echo $th;
    //     }        
    // }



    private function selectUserIdProfile($user_id){
    	try {
            $database = new database();
            if ($database->getStatus()){
                $stmt = $database->getCon()->prepare($this->selectUserIdProfileQuery());
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


    private function displayReserveBasket($user_id){
    	try {
            $database = new database();
            if ($database->getStatus()){
                $stmt = $database->getCon()->prepare($this->displayReserveBasketQuery());
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

    private function updateReservePaymentStatus($reserve_id, $newPaymentStatus) {
        try {
            $database = new database();
            if ($database->getStatus()) {
                $stmt = $database->getCon()->prepare($this->updateReservePaymentStatusQuery());
                $stmt->execute(array($this->getCurrentDate(), $reserve_id));
                $affectedRows = $stmt->rowCount();

                if ($affectedRows > 0) {
                    return "200"; 
                } else {
                    return "404"; 
                }
            } else {
                return "404";
            }
        } catch (PDOException $th) {
            return "501"; 
        }
    }

    private function displayReservesPending(){
        try {
            $database = new database();
            if ($database->getStatus()){
                $stmt = $database->getCon()->prepare($this->displayReservesPendingQuery());
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

    private function displayReservesById($reserve_id){
        try {
            $database = new database();
            if ($database->getStatus()){
                $stmt = $database->getCon()->prepare($this->displayReservesByIdQuery());
                $stmt->execute(array($reserve_id));
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

    private function updateReservePstatusDelivery($newP_status, $newDelivery, $reserveIdUpdate){
        try {
            $database = new database();
            if ($database->getStatus()) {
                $stmt = $database->getCon()->prepare($this->updateReservePstatusDeliveryQuery());
                $stmt->execute(array($newP_status, $newDelivery, $this->getCurrentDate(), $reserveIdUpdate)); 
                return "200";
            } else {
                return "404";
            }
        } catch (PDOException $th) {
            return "501";
        }
    }

    private function viewReserve($reserve_id){
        try {
            $database = new database();
            if ($database->getStatus()){
                $stmt = $database->getCon()->prepare($this->viewReserveQuery());
                $stmt->execute(array($reserve_id));
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







    private function getCurrentDate(){
        date_default_timezone_set('Asia/Manila');
        return date("g:i:a - Y/m/d");
    }


    private function selectUserIdProfileQuery(){
        return "SELECT user_id FROM profile WHERE user_id = ?";
    }

    private function displayReserveBasketQuery(){
    	return "SELECT reserves.reserve_id, products.pname, reserves.reserve_kilo, reserves.r_total_amount, reserves.payment_status, reserves.r_p_method, reserves.r_delivery, reserves.created FROM reserves INNER JOIN profile ON profile.user_id = reserves.user_id INNER JOIN products ON products.product_id = reserves.product_id WHERE profile.user_id = ? AND reserves.payment_status = 'pending'";
    }

    private function updateReservePaymentStatusQuery(){
        return "UPDATE reserves SET payment_status = 'Cancelled', created = ? WHERE reserve_id = ?";
    }


    private function displayReservesPendingQuery(){
        return "SELECT reserves.reserve_id, users.username, profile.fname, profile.lname, profile.address, reserves.payment_status, reserves.r_delivery, reserves.created FROM reserves INNER JOIN profile ON profile.user_id = reserves.user_id INNER JOIN users ON users.user_id = profile.user_id WHERE reserves.payment_status = 'pending'";
    }

    private function displayReservesByIdQuery(){
        return "SELECT reserves.reserve_id, profile.fname, profile.lname, profile.address, profile.pnumber, products.pname, products.img, products.p_price, reserves.reserve_kilo, reserves.r_total_amount, reserves.r_p_method_receipt, reserves.r_p_method, reserves.r_ref_num, reserves.payment_status, reserves.r_delivery FROM reserves INNER JOIN profile ON profile.user_id = reserves.user_id INNER JOIN products ON products.product_id = reserves.product_id WHERE reserves.reserve_id = ?";
    }

    private function updateReservePstatusDeliveryQuery(){
        return "UPDATE reserves SET payment_status = ?, r_delivery = ?, created = ? WHERE reserve_id = ?";
    }

    private function viewReserveQuery(){
        return "SELECT profile.fname, profile.lname, profile.address, products.pname, products.img, products.p_price, reserves.reserve_kilo, reserves.r_total_amount, reserves.r_p_method, reserves.r_p_method_receipt, reserves.r_ref_num FROM reserves INNER JOIN profile ON profile.user_id = reserves.user_id INNER JOIN products ON products.product_id = reserves.product_id WHERE reserves.reserve_id = ?";
    }
}

?>