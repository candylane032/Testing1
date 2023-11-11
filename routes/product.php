<?php 
require_once("backend.php");
class product extends backend 
{
	public function doAddProduct($pname,$img,$p_price){
        return self::addProdcut($pname,$img,$p_price);
    }

    public function doDisplayDataProductAdmin(){
        return self::displayDataProductAdmin();
    }


    public function doDisplayDataProduct($user_id){
        return self::displayDataProduct($user_id);
    }

    public function doSetIdProduct($SetIdProduct){
        return self::setIdProduct($SetIdProduct);
    }

    public function doDisplayDataProductModal($product_id){
        return self::displayDataProductModal($product_id);
    }

    public function doUpdateProduct($newPname, $newImg, $newP_Price, $productId){
        return self::updateProduct($newPname, $newImg, $newP_Price, $productId);
    }

    public function doDisplayDataProductStockModal($product_id){
        return self::displayDataProductStockModal($product_id);
    }

    public function doUpdateProductStock($newStock, $productId){
        return self::updateProductStock($newStock, $productId);
    }

    public function doDisplayDataProductStockNotAvailable(){
        return self::displayDataProductStockNotAvailable();
    }


    public function doDisplaySelectIdSession($user_id){
        return self::displaySelectIdSession($user_id);
    }

    public function doDisplayPnamePnumPurchaseModal($product_id,$user_id){
        return self::displayPnamePnumPurchaseModal($product_id,$user_id);
    }

    public function doOrderProductByCod($product_id,$order_kilo,$total_amount,$p_method){
        return self::orderProductByCod($product_id,$order_kilo,$total_amount,$p_method);
    }

    public function doOrderProductByGcash($product_id,$order_kilo,$total_amount,$p_method,$ref_num,$p_method_receipt){
        return self::orderProductByGcash($product_id,$order_kilo,$total_amount,$p_method,$ref_num,$p_method_receipt);
    }

    public function doOrderProductByPaymaya($product_id,$order_kilo,$total_amount,$p_method,$ref_num,$p_method_receipt){
        return self::orderProductByPaymaya($product_id,$order_kilo,$total_amount,$p_method,$ref_num,$p_method_receipt);
    }

    public function doReserveProductByCod($product_id,$reserve_kilo,$r_total_amount,$r_p_method){
        return self::reserveProductByCod($product_id,$reserve_kilo,$r_total_amount,$r_p_method);
    }

    public function doReserveProductByGcash($product_id,$reserve_kilo,$r_total_amount,$r_p_method,$r_ref_num,$r_p_method_receipt)
    {
        return self::reserveProductByGcash($product_id,$reserve_kilo,$r_total_amount,$r_p_method,$r_ref_num,$r_p_method_receipt);
    }

    public function doReserveProductByPaymaya($product_id,$reserve_kilo,$r_total_amount,$r_p_method,$r_ref_num,$r_p_method_receipt)
    {
        return self::reserveProductByPaymaya($product_id,$reserve_kilo,$r_total_amount,$r_p_method,$r_ref_num,$r_p_method_receipt);
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


    private function addProdcut($pname,$img,$p_price){
        try {
            if ($this->checkIfVallidAddProduct($pname,$img,$p_price)) {
                $database = new database();
                if ($database->getStatus()) {

                    $stmtProductName = $database->getCon()->prepare($this->ExistProductNameQuery());
                    $stmtProductName->execute(array($pname));
                    $countProductName = $stmtProductName->fetchColumn();

                    if ($countProductName > 0) {
                        $database->closeConnection();
                        return "ExistProductName"; 
                    }

                    $stmtProductImage = $database->getCon()->prepare($this->ExistProductImageQuery());
                    $stmtProductImage->execute(array($img));
                    $countProductImage = $stmtProductImage->fetchColumn();

                    if ($countProductImage > 0) {
                        $database->closeConnection();
                        return "ExistProductImage"; 
                    }


                    $stmt = $database->getCon()->prepare($this->insertAddProductQuery());
                    $stmt->execute(array($this->getId(),$pname,$img,$p_price,$this->getCurrentDate()));
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


    private function displayDataProductAdmin(){
        try {
            $database = new database();
            if ($database->getStatus()){
                $stmt = $database->getCon()->prepare($this->displayProductAdminQuery());
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


    private function displayDataProduct($user_id){
        try {
            $database = new database();
            if ($database->getStatus()){
                $stmt = $database->getCon()->prepare($this->displayProductQuery());
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


    private function setIdProduct($SetIdProduct){
        try {
            $database = new database();
            if($database->getStatus()){
                return $_SESSION['product_id'] = $SetIdProduct;
            }
            else{
                return "Failed";
            }
        } catch (PDOException $th) {
            //throw $th;
            return "501";
        }
    }


    private function displayDataProductModal($product_id){
        try {
            $database = new database();
            if ($database->getStatus()){
                $stmt = $database->getCon()->prepare($this->displayByIdProductQuery());
                $stmt->execute(array($product_id));
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

    private function updateProduct($newPname, $newImg, $newP_Price, $productId){
        try {
            $database = new database();
            if ($database->getStatus()){
                $stmt = $database->getCon()->prepare($this->updateProductQuery());
                $stmt->execute(array($newPname, $newImg, $newP_Price,$this->getCurrentDate(),$productId));
                return "200";
            }else{
                return "404";
            }
            
        } catch (PDOException $th) {
            //throw $th;
            return "501";
        }
    }


    private function displayDataProductStockModal($product_id){
        try {
            $database = new database();
            if ($database->getStatus()){
                $stmt = $database->getCon()->prepare($this->displayByIdProductStockQuery());
                $stmt->execute(array($product_id));
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

    private function updateProductStock($newStock, $productId){
        try {
            $database = new database();
            if ($database->getStatus()){
                $stmt = $database->getCon()->prepare($this->updateProductStockQuery());
                $stmt->execute(array($newStock,$this->getCurrentDate(),$productId));
                return "200";
            }else{
                return "404";
            }
            
        } catch (PDOException $th) {
            //throw $th;
            return "501";
        }
    }


    private function displayDataProductStockNotAvailable(){
        try {
            $database = new database();
            if ($database->getStatus()){
                $stmt = $database->getCon()->prepare($this->displayProductNotAvailableQuery());
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

    private function displaySelectIdSession($user_id) {
        try {
            $database = new database();
            if ($database->getStatus()){
                $stmt = $database->getCon()->prepare($this->displaySelectIdSessionQuery());
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

    private function displayPnamePnumPurchaseModal($product_id,$user_id){
        try {
            $database = new database();
            if ($database->getStatus()){
                $stmt = $database->getCon()->prepare($this->displayPnamePnumPurchaseModalQuery());
                $stmt->execute(array($product_id,$user_id));
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


    private function orderProductByCod($product_id,$order_kilo,$total_amount,$p_method){
        try {
            $order_total = $order_kilo * $total_amount;
            if ($this->checkIfVallidOrderProductCOD($product_id,$order_kilo,$total_amount,$p_method)) {
                $database = new database();
                if ($database->getStatus()) {

                    $stmt = $database->getCon()->prepare($this->orderProductByCodQuery());
                    $stmt->execute(array($this->getId(),$product_id,$order_kilo,$order_total,$p_method,$this->getCurrentDate()));
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

    private function orderProductByGcash($product_id,$order_kilo,$total_amount,$p_method,$ref_num,$p_method_receipt){
        try {
            $order_total = $order_kilo * $total_amount;
            if ($this->checkIfVallidOrderProductGcash($product_id,$order_kilo,$total_amount,$p_method,$ref_num,$p_method_receipt)) {
                $database = new database();
                if ($database->getStatus()) {

                    $stmt = $database->getCon()->prepare($this->orderProductByGcashQuery());
                    $stmt->execute(array($this->getId(),$product_id,$order_kilo,$order_total,$p_method,$ref_num,$p_method_receipt,$this->getCurrentDate()));
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

    private function orderProductByPaymaya($product_id,$order_kilo,$total_amount,$p_method,$ref_num,$p_method_receipt){
        try {
            $order_total = $order_kilo * $total_amount;
            if ($this->checkIfVallidOrderProductGcash($product_id,$order_kilo,$total_amount,$p_method,$ref_num,$p_method_receipt)) {
                $database = new database();
                if ($database->getStatus()) {

                    $stmt = $database->getCon()->prepare($this->orderProductByPaymayaQuery());
                    $stmt->execute(array($this->getId(),$product_id,$order_kilo,$order_total,$p_method,$ref_num,$p_method_receipt,$this->getCurrentDate()));
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


    private function reserveProductByCod($product_id,$reserve_kilo,$r_total_amount,$r_p_method){
        try {
            $reserve_total = $reserve_kilo * $r_total_amount;
            if ($this->checkIfVallidReserveProductCOD($product_id,$reserve_kilo,$r_total_amount,$r_p_method)) {
                $database = new database();
                if ($database->getStatus()) {

                    $stmt = $database->getCon()->prepare($this->reserveProductByCodQuery());
                    $stmt->execute(array($this->getId(),$product_id,$reserve_kilo,$reserve_total,$r_p_method,$this->getCurrentDate()));
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


    private function reserveProductByGcash($product_id,$reserve_kilo,$r_total_amount,$r_p_method,$r_ref_num,$r_p_method_receipt){
        try {
            $reserve_total = $reserve_kilo * $r_total_amount;
            if ($this->checkIfVallidReserveProductGcash($product_id,$reserve_kilo,$r_total_amount,$r_p_method,$r_ref_num,$r_p_method_receipt)) {
                $database = new database();
                if ($database->getStatus()) {

                    $stmt = $database->getCon()->prepare($this->reserveProductByGcashQuery());
                    $stmt->execute(array($this->getId(),$product_id,$reserve_kilo,$reserve_total,$r_p_method,$r_ref_num,$r_p_method_receipt,$this->getCurrentDate()));
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

    private function reserveProductByPaymaya($product_id,$reserve_kilo,$r_total_amount,$r_p_method,$r_ref_num,$r_p_method_receipt){
        try {
            $reserve_total = $reserve_kilo * $r_total_amount;
            if ($this->checkIfVallidReserveProductPaymaya($product_id,$reserve_kilo,$r_total_amount,$r_p_method,$r_ref_num,$r_p_method_receipt)) {
                $database = new database();
                if ($database->getStatus()) {

                    $stmt = $database->getCon()->prepare($this->reserveProductByPaymayaQuery());
                    $stmt->execute(array($this->getId(),$product_id,$reserve_kilo,$reserve_total,$r_p_method,$r_ref_num,$r_p_method_receipt ,$this->getCurrentDate()));
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







    private function getCurrentDate(){
        date_default_timezone_set('Asia/Manila');
        return date("g:i:a - Y/m/d");
    }


    private function checkIfVallidAddProduct($pname,$img,$p_price){
        if ($pname != "" && $img != "" && $p_price != "")
            return true;
        else
            return false;
    }


    private function checkIfVallidOrderProductCOD($product_id,$order_kilo,$total_amount,$p_method){
        if ($product_id != "" && $order_kilo != "" && $p_method != "")
            return true;
        else
            return false;
    }

    private function checkIfVallidOrderProductGcash($product_id,$order_kilo,$total_amount,$p_method,$ref_num,$p_method_receipt){
        if ($product_id != "" && $order_kilo != "" && $p_method != "" && $ref_num != "" && $p_method_receipt != "")
            return true;
        else
            return false;
    }


    private function checkIfVallidReserveProductCOD($product_id,$reserve_kilo,$r_total_amount,$r_p_method){
        if ($product_id != "" && $reserve_kilo != "" && $r_total_amount != "" && $r_p_method != "")
            return true;
        else
            return false;
    }

    private function checkIfVallidReserveProductGcash($product_id,$reserve_kilo,$r_total_amount,$r_p_method,$r_ref_num,$r_p_method_receipt)
    {
        if ($product_id != "" && $reserve_kilo != "" && $r_total_amount != "" && $r_p_method != "" && $r_ref_num != "" && $r_p_method_receipt != "")
            return true;
        else
            return false;
    }

    private function checkIfVallidReserveProductPaymaya($product_id,$reserve_kilo,$r_total_amount,$r_p_method,$r_ref_num,$r_p_method_receipt)
    {
        if ($product_id != "" && $reserve_kilo != "" && $r_total_amount != "" && $r_p_method != "" && $r_ref_num != "" && $r_p_method_receipt != "")
            return true;
        else
            return false;
    }

    private function signInQuery()
    {
        return "SELECT * FROM users WHERE (`username` = ? OR `email` = ?) AND `password` = ?";
    }


    private function insertAddProductQuery(){
        return "INSERT INTO products (`user_id`, `pname`,`img`,`p_price`, created) VALUES (?,?,?,?,?)";
    }

    private function ExistProductNameQuery(){
        return "SELECT * FROM products WHERE `pname` = ?";
    }

    private function ExistProductImageQuery(){
        return "SELECT * FROM products WHERE `img` = ?";
    }

    private function displayProductAdminQuery() {
        return "SELECT * FROM products";
        
    }

    private function displayProductQuery() {
        return "SELECT products.product_id, products.pname, products.img, products.p_price, products.stock, profile.user_id FROM products INNER JOIN profile ON products.product_id = products.product_id WHERE profile.user_id = ?";
        
    }


    private function displayByIdProductQuery() {
        return "SELECT * FROM products WHERE product_id = ?";
    }

    private function updateProductQuery() {
        return "UPDATE products SET pname = ?, img = ?, p_price = ?, created = ? WHERE product_id = ?";
    }

    private function displayByIdProductStockQuery(){
        return "SELECT product_id, pname, stock FROM products WHERE product_id = ?";   
    }

    private function updateProductStockQuery() {
        return "UPDATE products SET stock = ?, created = ? WHERE product_id = ?";
    }

    private function displayProductNotAvailableQuery() {
        return "SELECT pname, img, p_price, stock, product_id FROM products WHERE stock = 'Not Available'";
    }

    private function displaySelectIdSessionQuery(){
        return "SELECT user_id FROM profile WHERE user_id = ?";
    }

    private function displayPnamePnumPurchaseModalQuery() {
        return "SELECT products.pname, products.p_price, profile.pnumber FROM products INNER JOIN profile WHERE products.product_id = ? AND profile.user_id = ?";
    }

    private function orderProductByCodQuery(){
        return "INSERT INTO orders (`user_id`, `product_id`,`order_kilo`,`total_amount`,`p_method`, created) VALUES (?,?,?,?,?,?)";
    }

    private function orderProductByGcashQuery(){
        return "INSERT INTO orders (`user_id`, `product_id`,`order_kilo`,`total_amount`,`p_method`,`ref_num`,`p_method_receipt`, created) VALUES (?,?,?,?,?,?,?,?)";
    }

    private function orderProductByPaymayaQuery(){
        return "INSERT INTO orders (`user_id`, `product_id`,`order_kilo`,`total_amount`,`p_method`,`ref_num`,`p_method_receipt`, created) VALUES (?,?,?,?,?,?,?,?)";
    }

    private function reserveProductByCodQuery(){
        return "INSERT INTO reserves (`user_id`, `product_id`,`reserve_kilo`,`r_total_amount`,`r_p_method`, created) VALUES (?,?,?,?,?,?)";
    }

    private function reserveProductByGcashQuery(){
        return "INSERT INTO reserves (`user_id`, `product_id`,`reserve_kilo`,`r_total_amount`,`r_p_method`,`r_ref_num`,`r_p_method_receipt`, created) VALUES (?,?,?,?,?,?,?,?)";
    }

    private function reserveProductByPaymayaQuery(){
        return "INSERT INTO reserves (`user_id`, `product_id`,`reserve_kilo`,`r_total_amount`,`r_p_method`,`r_ref_num`,`r_p_method_receipt` , created) VALUES (?,?,?,?,?,?,?,?)";
    }



}


?>