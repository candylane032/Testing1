<?php 
  session_start();

  include "../chatAdmin/config.php";
  if(!isset($_SESSION['user_id'])){
    header("location: ../../index.php");
  }
?>


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- DOWNLOADED CSS -->
    <link rel="stylesheet" href="../../bootstrap/boots.css">
	<link rel="stylesheet" href="../../fontawesome/all.min.css">
	<link rel="stylesheet" href="../../fontawesome/fontawesome.min.css">
    <link rel="stylesheet" href="../../bootstrap-icons-1.11.1/bootstrap-icons.css">

    <!-- CSS -->
	<link rel="stylesheet" type="text/css" href="../chatAdmin/chat.css">
    <link rel="stylesheet" href="../chatAdmin/style.css">
    <link rel="stylesheet" href="../../css/style/admin/mobile.css">
    <link rel="icon" type="image/x-icon" href="../../images/logo.png">

    <title>Admin Chat Area | Page</title>


</head>

<body>
    <!-- Start Side bar -->
    <div class="main-container d-flex">
        <div class="sidebar" id="side_nav">
            <div class="header-box p-1">
                <h1 class="text-center fw-bold mt-2">CHARLYN'S SEAFOOD ESSENTIALS</h1>
                <button class="btn d-md-none d-block close-btn px-1 py-0 text-white"><i
                        class="bi bi-justify"></i></button>
            </div>
            <p class="text-center text-white text-uppercase mt-3 session-admin"><?php echo $_SESSION['username']?><span>
                </span></p>
            <hr class="h-color mx-1">
            <div class="py-1">
                <ul class="list-unstyled px-3">
                    <li class="text-white mb-2">
                    <i class="bi bi-bar-chart-fill text-dark"></i><a href="../../pages/admin/adminDash.php" class="a text-decoration-none px-2">
                            Dashboard</a>
                    </li>

                    <li class="text-white mb-2">
                        <i class="bi bi-shop text-dark"></i><a href="../../pages/admin/adminProduct.php" class="a text-decoration-none px-2">
                            Product</a>
                    </li>

                    <li class="text-white mb-2">
                        <i class="bi bi-cart-fill text-dark"></i><a class="a text-decoration-none px-2 "
                        href="../../pages/admin/adminOrder.php">Order</a>
                    </li>

                    <li class="text-white mb-2">
                        <i class="bi bi-basket-fill text-dark"></i><a class="a text-decoration-none px-2 " 
                        href="../../pages/admin/adminBasket.php">Basket</a>
                    </li>
                    <hr class="h-color mx-1">
                    <li class="text-white mb-2">
                        <i class="bi bi-clock-history text-dark"></i><a class="a text-decoration-none px-2 " 
                        href="../../pages/admin/adminHistory.php">History</a>
                    </li>
                    <li class="text-white mb-2">
                        <i class="bi bi-chat-dots-fill text-dark"></i><a class="a text-decoration-none px-2 " 
                        href="../../pages/chatAdmin/chat.php">Message</a>
                    </li>
                    <li class="text-white mb-2">
                        <i class="bi bi-person-fill text-dark"></i><a class="a text-decoration-none px-2 " 
                        href="../../pages/admin/adminProfile.php">Profile</a>
                    </li>
                </ul>

                <hr class="h-color mx-1">
                <ul class="list-unstyled px-3">
                    <button type="button" class="dropdown-item text-uppercase fw-bold" id="btn-logout">Logout<i class="bi bi-box-arrow-right mx-2 text-dark"></i></button>
                </ul>
            </div>
        </div>
        <!-- End Side Bar -->
        <div class="content">
            <nav class="navbar navbar-expand-lg">
                <div class="container">
                    <div class="d-flex justify-content-space-between">
                        <img class="logo" src="../../images/logo.png">
                        <button class="btn px-1 py0 open-btn"><i class="bi bi-justify d-md-none d-block"></i></button>
                    </div>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target=" #navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse px-5" id="navbarSupportedContent">
                        <ul class="navbar-nav d-flex align-items-center ms-auto gap-3">
                            <li class="nav-item">
                                <a class="nav-link home" href="../../pages/admin/adminProduct.php">HOME</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="../../pages/admin/adminGallery.php">GALLERY</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="../../pages/admin/adminRecipe.php">RECIPES</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <!-- Start Body -->
			<div class="body">
        		<div class="wrappers pt-5">
        			<section class="chat-area">
        				<header class="chat-header rounded">
        					<?php 
        						include '../chatAdmin/config.php';
        						$user_id = mysqli_real_escape_string($conn, $_GET['user_id']);
        						$sql = mysqli_query($conn, "SELECT * FROM users WHERE user_id = {$user_id}");
        						if(mysqli_num_rows($sql) > 0) {
        							$row = mysqli_fetch_assoc($sql);
        						}

        					?>
        					<a class="back-icon" href="../chatAdmin/index.php"><i class="bi bi-arrow-left"></i></a>
        					<img  src="../../uploads/profileImage/<?php echo $row['p_image'];?>" class="ClickImage">
        					<div class="details">
        						<span class="fw-bold text-capitalize"><?php echo $row['username'];?></span>
        						<p><?php echo $row['status'];?></p>
        					</div>
        				</header>
        				<div class="chat-box">
        					
        					
        				</div>
        				<form action="#" class="typing-area" autocomplete="off">
        					<input type="text" name="outgoing_id" value="<?php echo $_SESSION['user_id']; ?>" hidden>
        					<input type="text" name="incoming_id" value="<?php echo $user_id; ?>" hidden>
        					<input type="text" name="message" class="input-field rounded-5" placeholder="Type a message here...">
        					<button class="mx-2"><i class="bi bi-telegram"></i></button>
        				</form>
        			</section>
        		</div>
        	</div>
                    <!-- End Body -->
            </div>
    </div>

    <script src="../../plugins/privacy/jquery.js"></script>
	<script src="../chatAdmin/chat.js"></script>
	<script src="../../plugins/privacy/logout.js"></script>
    
    <!-- DOWNLOADED JS -->
    <script src="../../toaster/toastr.min.js"></script>
    <script src="../../sweetalert/alert.js"></script>
    <script src="../../bootstrap/boots.js"></script>

    <script>
        $('.open-btn').on('click', function () {
            $('.sidebar').addClass('active');
        });
        $('.close-btn').on('click', function () {
            $('.sidebar').removeClass('active');
        });
    </script>
</body>

</html>


