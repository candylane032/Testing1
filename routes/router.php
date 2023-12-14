<?php
session_start();
require_once("backend.php");
require_once("registerlogin.php");
require_once("profile.php");
require_once("product.php");
require_once("recipe.php");
require_once("gallery.php");
require_once("basket.php");
require_once("order.php");
require_once("history.php");
require_once("chart.php");
require_once("chatA.php");



if (isset($_POST['choice'])) {
    switch ($_POST['choice']) {

        //registerlogin
        case 'signIn':
            $backend = new registerlogin();
            echo $backend->signIn($_POST['username'],$_POST['email'],$_POST['password']);
            break;
        case 'signUp':
            $backend = new registerlogin();
            echo $backend->signUp($_POST['username'],$_POST['email'],$_POST['password']);
            break;


        //profile
        case 'InsertEditProfile':
            $backend = new profile();
            echo $backend->doInsertEditProfile($_POST['fname'],$_POST['lname'],$_POST['gender'],$_POST['pnumber'],$_POST['address']);
            break;
        case 'DisplayProfile':
            $backend = new profile();
            $user_id = $_SESSION['user_id'];
            echo $backend->doDisplayDataProfile($user_id);
            break;
        case 'SetIdProfile':
            $backend = new profile();
            echo $backend->doSetIdProfile($_POST['SetIdProfile']);
            break;
        case 'DisplayProfileModal':
            $backend = new profile();
            $user_id = $_SESSION['user_id'];    
            echo $backend->doDisplayDataProfileModal($user_id);
            break;
        case 'UpdateProfile':
            $backend = new profile();
            echo $backend->doUpdateProfile($_POST['fname'],$_POST['lname'],$_POST['gender'],$_POST['pnumber'],$_POST['address']);
            break;
         case 'DisplayProfilePic':
            $backend = new profile();
            $user_id = $_SESSION['user_id'];
            echo $backend->doDisplayDataProfilePic($user_id);
            break;
        case 'DisplayProfilePicModal':
            $backend = new profile();
            echo $backend->doDisplayDataProfilePicModal($_POST['user_id']);
            break;
        case 'UpdateProfilePicModal':
            $backend = new profile();
            $user_id = $_POST['user_id'];
            $p_image = uploadImageProfile(); 
            echo $backend->doUpdateProfilePicModal($p_image, $user_id);
            break;

        //product
        case 'AddProduct':
            $backend = new product();
            $pname = $_POST['pname'];
            $img = uploadImage(); 
            $p_price = $_POST['p_price'];
            $p_desc = $_POST['p_desc'];
            echo $backend->doAddProduct($pname, $img, $p_price, $p_desc);
            break; 
        case 'DisplayProductAdmin':
            $backend = new product();
            echo $backend->doDisplayDataProductAdmin();
            break;
        case 'DisplayProduct':
            $backend = new product();
            $user_id = $_POST['user_id'];
            echo $backend->doDisplayDataProduct($user_id);
            break;
        case 'SetIdProduct':
            $backend = new product();
            echo $backend->doSetIdProduct($_POST['SetIdProduct']);
            break;
        case 'DisplayProductModal':
            $backend = new product();
            echo $backend->doDisplayDataProductModal($_POST['product_id']);
            break;
        case 'UpdateProduct':
            $backend = new product();
            $pname = $_POST['pname'];
            $p_price = $_POST['p_price'];
            $p_desc = $_POST['p_desc'];
            $product_id = $_POST['product_id'];
            $img = uploadImage(); 
            echo $backend->doUpdateProduct($pname, $img, $p_price, $p_desc,  $product_id);
            break;
        case 'DisplayProductStockModal':
            $backend = new product();
            echo $backend->doDisplayDataProductStockModal($_POST['product_id']);
            break;
        case 'UpdateProductStock':
            $backend = new product();
            echo $backend->doUpdateProductStock($_POST['stock'],$_POST['product_id']);
            break;
        case 'DisplayProductNotAvailable':
            $backend = new product();
            echo $backend->doDisplayDataProductStockNotAvailable();
            break;
        case 'DisplayIdSession':
            $backend = new product();
            $user_id = $_SESSION['user_id'];
            echo $backend->doDisplaySelectIdSession($user_id);
            break;
        case 'DisplayPnamePpricePurchaseModal':
            $backend = new product();
            $product_id = $_POST['product_id'];
            $user_id = $_POST['user_id'];
            echo $backend->doDisplayPnamePnumPurchaseModal($product_id,$user_id);
            break;
        case 'desc':
            $backend = new product();
            $viewProdId = $_POST['viewProdId'];
            $viewUserId = $_POST['viewUserId'];
            echo $backend->desc($viewProdId,$viewUserId);
            break;
        case 'landingdesc':
            $backend = new product();
            $viewProdId = $_POST['viewProdId'];
            echo $backend->landingdesc($viewProdId);
            break;
        case 'OrderProductByCod':
            $backend = new product();
            $product_id = $_POST['product_id'];
            $order_kilo = $_POST['order_kilo'];
            $total_amount = $_POST['total_amount'];
            $p_method = $_POST['p_method'];
            echo $backend->doOrderProductByCod($product_id,$order_kilo,$total_amount,$p_method);
            break;
        case 'OrderProductByGcash':
            $backend = new product();
            $product_id = $_POST['product_id'];
            $order_kilo = $_POST['order_kilo'];
            $total_amount = $_POST['total_amount'];
            $p_method = $_POST['p_method'];
            $ref_num = $_POST['ref_num'];
            $p_method_receipt = uploadImageReceipt(); 
            echo $backend->doOrderProductByGcash($product_id,$order_kilo,$total_amount,$p_method,$ref_num,$p_method_receipt);
            break;
        case 'OrderProductByPaymaya':
            $backend = new product();
            $product_id = $_POST['product_id'];
            $order_kilo = $_POST['order_kilo'];
            $total_amount = $_POST['total_amount'];
            $p_method = $_POST['p_method'];
            $ref_num = $_POST['ref_num'];
            $p_method_receipt = uploadImageReceipt(); 
            echo $backend->doOrderProductByPaymaya($product_id,$order_kilo,$total_amount,$p_method,$ref_num,$p_method_receipt);
            break;
        case 'ReserveProductByCod':
            $backend = new product();
            $product_id = $_POST['product_id'];
            $reserve_kilo = $_POST['reserve_kilo'];
            $r_total_amount = $_POST['r_total_amount'];
            $r_p_method = $_POST['r_p_method'];
            echo $backend->doReserveProductByCod($product_id,$reserve_kilo,$r_total_amount,$r_p_method);
            break;
        case 'ReserveProductByGcash':
            $backend = new product();
            $product_id = $_POST['product_id'];
            $reserve_kilo = $_POST['reserve_kilo'];
            $r_total_amount = $_POST['r_total_amount'];
            $r_p_method = $_POST['r_p_method'];
            $r_ref_num = $_POST['r_ref_num'];
            $r_p_method_receipt = uploadImageReceipts(); 
            echo $backend->doReserveProductByGcash($product_id,$reserve_kilo,$r_total_amount,$r_p_method,$r_ref_num,$r_p_method_receipt);
            break;
        case 'ReserveProductByPaymaya':
            $backend = new product();
            $product_id = $_POST['product_id'];
            $reserve_kilo = $_POST['reserve_kilo'];
            $r_total_amount = $_POST['r_total_amount'];
            $r_p_method = $_POST['r_p_method'];
            $r_ref_num = $_POST['r_ref_num'];
            $r_p_method_receipt = uploadImageReceipts();  
            echo $backend->doReserveProductByPaymaya($product_id,$reserve_kilo,$r_total_amount,$r_p_method,$r_ref_num,$r_p_method_receipt);
            break;



        //recipe
        case 'AddRecipe':
            $backend = new recipe();
            $r_name = $_POST['r_name'];
            $r_image = uploadImageRecipe();
            $r_type = $_POST['r_type']; 
            $r_list = $_POST['r_list'];
            echo $backend->doAddRecipe($r_name, $r_image, $r_type, $r_list);
            break; 
        case 'DisplayRecipes';
            $backend = new recipe();
            echo $backend->doDisplayDataRecipes();
            break;
        case 'DisplayRecipeModal':
            $backend = new recipe();
            echo $backend->doDisplayDataRecipeModal($_POST['recipe_id']);
            break;
        case 'DisplayRecipeModalUpdate':
            $backend = new recipe();
            echo $backend->doDisplayDataRecipeModalUpdate($_POST['recipe_id']);
            break;
        case 'UpdateRecipe':
            $backend = new recipe();
            $r_name = $_POST['r_name'];
            $r_image = uploadImageRecipe();
            $r_type = $_POST['r_type']; 
            $r_list = $_POST['r_list'];
            $recipe_id = $_POST['recipe_id'];
            echo $backend->doUpdateRecipe($r_name, $r_image, $r_type,$r_list, $recipe_id);
            break;

       

        //Gallery
        case 'AddGallery':
            $backend = new gallery();
            $g_image = uploadImageGallery();
            $descript = $_POST['descript']; 
            echo $backend->doAddGallery($g_image, $descript);
            break; 
        case 'DisplayGallery':
            $backend = new gallery();
            echo $backend->doDisplayDataGallery();
            break;
        case 'DisplayGalleryModal':
            $backend = new gallery();
            echo $backend->doDisplayDataGalleryModal($_POST['gallery_id']);
            break;

        case 'DisplayGalleryModalUpdate':
            $backend = new gallery();
            echo $backend->doDisplayDataGalleryModalUpdate($_POST['gallery_id']);
            break;

        case 'UpdateGallery':
            $backend = new gallery();
            $descript = $_POST['descript'];
            $g_image = uploadImageGallery();
            $gallery_id = $_POST['gallery_id'];
            echo $backend->doUpdateGallery($g_image, $descript, $gallery_id);
            break;


        //basket
        case 'SelectUserIdProfile':
            $backend = new basket();
            $user_id = $_SESSION['user_id'];
            echo $backend->doSelectUserIdProfile($user_id);
            break;
        case 'DisplayReserveBasket':
            $backend = new basket();
            $user_id = $_POST['user_id'];
            echo $backend->doDisplayReserveBasket($user_id);
            break;
        case 'UpdateReservePaymentStatus':
            $backend = new basket();
            $reserve_id = $_POST['reserve_id'];
            $payment_status = $_POST['payment_status'];
            echo $backend->doUpdateReservePaymentStatus($reserve_id, $payment_status);
            break;
        case 'DisplayReservesPending':
            $backend = new basket();
            echo $backend->doDisplayReservesPending();
            break;
        case 'DisplayReservesById':
            $backend = new basket();
            $reserve_id = $_POST['reserve_id'];
            echo $backend->doDisplayReservesById($reserve_id);
            break;
        case 'UpdateReservePstatusDelivery':
            $backend = new basket();
            $payment_status = $_POST['payment_status'];
            $r_delivery = $_POST['r_delivery'];
            $reserve_id = $_POST['reserve_id'];
            echo $backend->doUpdateReservePstatusDelivery($payment_status,$r_delivery,$reserve_id);
            break;
        case 'ViewReserve':
            $backend = new basket();
            $reserve_id = $_POST['reserve_id'];
            echo $backend->doViewReserve($reserve_id);
            break;


        //history
        case 'DisplayReserveByIdHistory':
            $backend = new history();
            $reserve_id = $_POST['reserve_id'];
            echo $backend->doDisplayReserveByIdHistory($reserve_id);
            break;
        case 'DisplayReservedPaid':
            $backend = new history();
            echo $backend->doDisplayReservedPaid();
            break;
        case 'SelectUserIdProfileToCancelled':
            $backend = new history();
            $user_id = $_SESSION['user_id'];
            echo $backend->doSelectUserIdProfileToCancelled($user_id);
            break;
        case 'DisplayReserveBasketCancelled':
            $backend = new history();
            $user_id = $_POST['user_id'];
            echo $backend->doDisplayReserveBasketCancelled($user_id);
            break;
        case 'DisplayOrdersPaid':
            $backend = new history();
            echo $backend->doDisplayOrdersPaid();
            break;
        case 'DisplayOrderByIdHistory':
            $backend = new history();
            $order_id = $_POST['order_id'];
            echo $backend->doDisplayOrderByIdHistory($order_id);
            break;



        //order
        case 'SelectUserIdProfileOrder':
            $backend = new order();
            $user_id = $_SESSION['user_id'];
            echo $backend->doSelectUserIdProfile($user_id);
            break;
        case 'DisplayOrder':
            $backend = new order();
            $user_id = $_POST['user_id'];
            echo $backend->doDisplayOrder($user_id);
            break;
        case 'DisplayOrderPaid':
            $backend = new order();
            $user_id = $_POST['user_id'];
            echo $backend->doDisplayOrderPaid($user_id);
            break;
        case 'DisplayOrdersUnpaid':
            $backend = new order();
            echo $backend->doDisplayOrdersUnpaid();
            break;
        case 'DisplayOrderById':
            $backend = new order();
            $order_id = $_POST['order_id'];
            echo $backend->doDisplayOrderById($order_id);
            break;
        case 'UpdateOrderPstatusDelivery':
            $backend = new order();
            $o_payment_status = $_POST['o_payment_status'];
            $o_delivery = $_POST['o_delivery'];
            $order_id = $_POST['order_id'];
            echo $backend->doUpdateOrderPstatusDelivery($o_payment_status,$o_delivery,$order_id);
            break;
        case 'ViewOrder':
            $backend = new order();
            $order_id = $_POST['order_id'];
            echo $backend->doViewOrder($order_id);
            break;

        //chat 
        case 'chatC':
            $backend = new chatA();
            $userId = $_SESSION['user_id'];
            $id = $_POST['id'];
            echo $backend->chatA($userId, $_POST['message'],$id);
            break;
        case 'chatA':
            $backend = new chatA();
            $userId = $_SESSION['user_id'];
            $id = $_POST['messageId'];
            $msg = $_POST['msg'];
            $time = $_POST['time'];
            echo $backend->chatA($userId, $_POST['message'], $id, $msg, $time);        
            break;
        case 'readChat':
            $backend = new chatA();
            echo $backend->readChat();
            break;
        case 'chatACheckId':
            $backend = new chatA();
            $userId = $_SESSION['user_id'];
            echo $backend->chatACheckId($userId);
            break;
        case 'messageById':
            $backend = new chatA();
            $messageId = $_POST['messageId'];
            $msg = $_POST['msg'];
            $time = $_POST['time'];
            echo $backend->messageById($messageId,$msg,$time);
            break;
        case 'searchUserss':
            $backend = new chatA();
            echo $backend->searchUserss();
            break;
        case 'searchUserssReserve':
            $backend = new chatA();
            echo $backend->searchUserssReserve();
            break;
        case 'chatToAdmin':
            $backend = new chatA();
            $userId = $_SESSION['user_id'];
            $id = $_POST['messageId'];
            echo $backend->chatToAdmin($userId, $_POST['message'], $id);        
            break;
        case 'readChatToAdmin':
            $backend = new chatA();
            $userId = $_SESSION['user_id'];
            echo $backend->readChatToAdmin($userId);
            break;

        //chart
        case 'chartToday':
            $backend = new chart();
            echo $backend->chartToday();
            break;
        case 'chartDaily':
            $backend = new chart();
            echo $backend->chartDaily();
            break;
        case 'chartMonthly':
            $backend = new chart();
            echo $backend->chartMonthly();
            break;

        case 'logout':
            $backend = new backend();
            echo $backend->doLogout();
            break;
        
        default:
            echo "404";
            break;

}
}


function uploadImage() {
    $targetDirectory = "../uploads/productImage/"; 
    $targetFile = $targetDirectory. basename($_FILES["img"]["name"]);
    $fileName = ($_FILES["img"]["name"]);
    if (move_uploaded_file($_FILES["img"]["tmp_name"], $targetFile)) {
        if($targetFile){
            return $fileName; 
        }else{
            return "error";
        }
    } else {
        return "error";
    }
}

function uploadImageProfile() {
    $targetDirectory = "../uploads/profileImage/"; 
    $targetFile = $targetDirectory. basename($_FILES["p_image"]["name"]);
    $fileName = ($_FILES["p_image"]["name"]);
    if (move_uploaded_file($_FILES["p_image"]["tmp_name"], $targetFile)) {
        if($targetFile){
            return $fileName; 
        }else{
            return "error";
        }
    } else {
        return "error";
    }
}

function uploadImageRecipe() {
    $targetDirectory = "../uploads/recipeImage/"; 
    $targetFile = $targetDirectory. basename($_FILES["r_image"]["name"]);
    $fileName = ($_FILES["r_image"]["name"]);
    if (move_uploaded_file($_FILES["r_image"]["tmp_name"], $targetFile)) {
        if($targetFile){
            return $fileName; 
        }else{
            return "error";
        }
    } else {
        return "error";
    }
}


function uploadImageGallery() {
    $targetDirectory = "../uploads/galleryImage/"; 
    $targetFile = $targetDirectory. basename($_FILES["g_image"]["name"]);
    $fileName = ($_FILES["g_image"]["name"]);
    if (move_uploaded_file($_FILES["g_image"]["tmp_name"], $targetFile)) {
        if($targetFile){
            return $fileName; 
        }else{
            return "error";
        }
    } else {
        return "error";
    }
}

function uploadImageReceipt() {
    $targetDirectory = "../uploads/receiptImage/"; 
    $targetFile = $targetDirectory. basename($_FILES["p_method_receipt"]["name"]);
    $fileName = ($_FILES["p_method_receipt"]["name"]);
    if (move_uploaded_file($_FILES["p_method_receipt"]["tmp_name"], $targetFile)) {
        if($targetFile){
            return $fileName; 
        }else{
            return "error";
        }
    } else {
        return "error";
    }
}

function uploadImageReceipts() {
    $targetDirectory = "../uploads/receiptImage/"; 
    $targetFile = $targetDirectory. basename($_FILES["r_p_method_receipt"]["name"]);
    $fileName = ($_FILES["r_p_method_receipt"]["name"]);
    if (move_uploaded_file($_FILES["r_p_method_receipt"]["tmp_name"], $targetFile)) {
        if($targetFile){
            return $fileName; 
        }else{
            return "error";
        }
    } else {
        return "error";
    }
}