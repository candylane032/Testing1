<?php 
require_once("backend.php");
class order extends backend 
{

	public function doSelectUserIdProfile($user_id){
        return self::selectUserIdProfile($user_id);
    }


	public function doDisplayOrder($user_id){
        return self::displayOrder($user_id);
    }

    public function doDisplayOrderPaid($user_id){
        return self::displayOrderPaid($user_id);
    }

    public function doDisplayOrdersUnpaid(){
        return self::displayOrdersUnpaid();
    }

    public function doDisplayOrderById($username){
        return self::displayOrderById($username);
    }

    public function doUpdateOrderPstatusDelivery($newP_status, $newDelivery, $orderIdUpdate){
        return self::updateOrderPstatusDelivery($newP_status, $newDelivery, $orderIdUpdate);
    }

    public function doViewOrder($order_id){
        return self::viewOrder($order_id);
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


    private function displayOrder($user_id){
    	try {
            $database = new database();
            if ($database->getStatus()){
                $stmt = $database->getCon()->prepare($this->displayOrderQuery());
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

    private function displayOrderPaid($user_id){
        try {
            $database = new database();
            if ($database->getStatus()){
                $stmt = $database->getCon()->prepare($this->displayOrderPaidQuery());
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


    private function displayOrdersUnpaid(){
        try {
            $database = new database();
            if ($database->getStatus()){
                $stmt = $database->getCon()->prepare($this->displayOrdersUnpaidQuery());
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


    private function displayOrderById($username){
        try {
            $database = new database();
            if ($database->getStatus()){
                $stmt = $database->getCon()->prepare($this->displayOrderByIdQuery());
                $stmt->execute(array($username));
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


    private function updateOrderPstatusDelivery($newP_status, $newDelivery, $orderIdUpdate) {
        try {
            $database = new database();
            if ($database->getStatus()) {
                $stmt = $database->getCon()->prepare($this->updateOrderPstatusDeliveryQuery());
                $stmt->execute(array($newP_status, $newDelivery, $this->getCurrentDate(), $orderIdUpdate)); 
                return "200";
            } else {
                return "404";
            }
        } catch (PDOException $th) {
            return "501";
        }
    }


    private function viewOrder($order_id){
        try {
            $database = new database();
            if ($database->getStatus()){
                $stmt = $database->getCon()->prepare($this->viewOrderQuery());
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



    private function getCurrentDate(){
        date_default_timezone_set('Asia/Manila');
        return date("g:i:a - Y/m/d");
    }




    private function selectUserIdProfileQuery(){
        return "SELECT user_id FROM profile WHERE user_id = ?";
    }


    private function displayOrderQuery(){
    	return "SELECT orders.order_id, products.pname, orders.order_kilo, orders.total_amount, orders.o_payment_status, orders.p_method, orders.o_delivery, orders.created FROM orders INNER JOIN profile ON profile.user_id = orders.user_id INNER JOIN products ON products.product_id = orders.product_id WHERE profile.user_id = ? AND orders.o_payment_status = 'pending' ORDER BY orders.created DESC";
    }

    private function displayOrderPaidQuery(){
        return "SELECT orders.order_id, products.pname, orders.order_kilo, orders.total_amount, orders.o_payment_status, orders.p_method, orders.o_delivery, orders.created FROM orders INNER JOIN profile ON profile.user_id = orders.user_id INNER JOIN products ON products.product_id = orders.product_id WHERE profile.user_id = ?  AND orders.o_payment_status = 'Paid'";
    }

    private function displayOrdersUnpaidQuery(){
        return "SELECT orders.user_id, users.username, profile.fname, profile.lname, profile.address, orders.o_payment_status, orders.o_delivery, orders.created FROM orders INNER JOIN profile ON profile.user_id = orders.user_id INNER JOIN users ON users.user_id = profile.user_id WHERE orders.o_payment_status = 'pending' GROUP BY users.username ORDER BY orders.created DESC";
    }

    private function displayOrderByIdQuery(){
        return "SELECT orders.order_id, profile.fname, profile.lname, profile.address, profile.pnumber, products.pname, products.img, products.p_price, orders.order_kilo, orders.total_amount, orders.p_method_receipt, orders.p_method, orders.ref_num, orders.o_payment_status, orders.o_delivery, orders.created, users.username FROM orders INNER JOIN profile ON profile.user_id = orders.user_id INNER JOIN products ON products.product_id = orders.product_id INNER JOIN users ON orders.user_id = users.user_id WHERE users.username = ? ORDER BY orders.created DESC";
    }

    private function updateOrderPstatusDeliveryQuery(){
        return "UPDATE orders SET o_payment_status = ?, o_delivery = ?, created = ? WHERE order_id = ?";
    }

    private function viewOrderQuery(){
        return "SELECT profile.fname, profile.lname, profile.address, products.pname, products.img, products.p_price, orders.order_kilo, orders.total_amount, orders.p_method, orders.p_method_receipt, orders.ref_num FROM orders INNER JOIN profile ON profile.user_id = orders.user_id INNER JOIN products ON products.product_id = orders.product_id WHERE orders.order_id = ?";
    }
}

?>