<?php 
require_once("backend.php");
class history extends backend 
{
	public function doSelectUserIdProfileToCancelled($user_id){
        return self::selectUserIdProfile($user_id);
    }

    public function doDisplayReserveBasketCancelled($user_id){
    	return self::displayReserveBasketCancelled($user_id);
    }

    public function doDisplayOrdersPaid(){
        return self::displayOrdersPaid();
    }

    public function doDisplayOrderByIdHistory($order_id){
        return self::displayOrderByIdHistory($order_id);
    }



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


    private function displayReserveBasketCancelled($user_id){
    	try {
            $database = new database();
            if ($database->getStatus()){
                $stmt = $database->getCon()->prepare($this->displayReserveBasketCancelledQuery());
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

    private function displayOrdersPaid(){
        try {
            $database = new database();
            if ($database->getStatus()){
                $stmt = $database->getCon()->prepare($this->displayOrdersPaidQuery());
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

    private function displayOrderByIdHistory($order_id){
        try {
            $database = new database();
            if ($database->getStatus()){
                $stmt = $database->getCon()->prepare($this->displayOrderByIdHistoryQuery());
                $stmt->execute(array($order_id));
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


    private function selectUserIdProfileQuery(){
        return "SELECT user_id FROM profile WHERE user_id = ?";
    }


    private function displayReserveBasketCancelledQuery(){
    	return "SELECT reserves.reserve_id, products.pname, reserves.reserve_kilo, reserves.r_total_amount, reserves.payment_status, reserves.r_p_method, reserves.r_delivery, reserves.created FROM reserves INNER JOIN profile ON profile.user_id = reserves.user_id INNER JOIN products ON products.product_id = reserves.product_id WHERE profile.user_id = ? AND reserves.payment_status IN ('Cancelled', 'Paid')";
    }

    private function displayOrdersPaidQuery(){
        return "SELECT orders.order_id, users.username, profile.fname, profile.lname, profile.address, orders.o_payment_status, orders.o_delivery, orders.created FROM orders INNER JOIN profile ON profile.user_id = orders.user_id INNER JOIN users ON users.user_id = profile.user_id WHERE orders.o_payment_status = 'Paid' AND  orders.o_delivery = 'complete' ";
    }

    private function displayOrderByIdHistoryQuery(){
        return "SELECT orders.order_id, profile.fname, profile.lname, profile.address, profile.pnumber, products.pname, products.img, products.p_price, orders.order_kilo, orders.total_amount, orders.p_method_receipt, orders.p_method, orders.ref_num, orders.o_payment_status, orders.o_delivery FROM orders INNER JOIN profile ON profile.user_id = orders.user_id INNER JOIN products ON products.product_id = orders.product_id WHERE orders.order_id = ?";
    }

}

?>