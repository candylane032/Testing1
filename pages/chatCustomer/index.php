<?php 
  session_start();

  include "../chatCustomer/config.php";
  if(!isset($_SESSION['user_id'])){
    header("location: ../../index.php");
  }
?>

<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
     <!-- DOWNLOADED CSS -->
    <link rel="stylesheet" href="../../bootstrap/boots.css">
	<link rel="stylesheet" href="../../fontawesome/all.min.css">
	<link rel="stylesheet" href="../../fontawesome/fontawesome.min.css">
    <link rel="stylesheet" href="../../bootstrap-icons-1.11.1/bootstrap-icons.css">
    
	<link rel="stylesheet" type="text/css" href="../chatCustomer/chat.css">
	<link rel="stylesheet" href="../chatCustomer/global.css">
    <link rel="stylesheet" href="../../css/style/responsive.css">
    <link rel="icon" type="image/x-icon" href="../../images/logo.png">

	<title>Chat | Page</title>
	<style>
		.logout {
			cursor: pointer;
		}
	</style>
</head>
<body>
        <nav class="navbar navbar-expand-lg fixed-top">
            <div class="container">
                <a class="navbar-brand" href="../../pages/customer/index.php"><img src="../../images/logo.png" class="logo" alt="Logo"></a>
                <button aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"
                    class="navbar-toggler" data-bs-target="#navbarSupportedContent" data-bs-toggle="collapse"
                    type="button">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav ms-auto mb-2 mb-lg-0 text-uppercase">
                        <li class="nav-item">
                            <a class="nav-link" href="../../pages/customer/index.php">Products</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="../../pages/chatCustomer/index.php">Contact Us</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="../../pages/customer/about.php">About Us</a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                More
                            </a>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="../../pages/customer/recipes.php">Recipes</a></li>
                                <li><a class="dropdown-item" href="../../pages/customer/gallery.php">Gallery</a></li>
                                <li><a class="dropdown-item" href="../../pages/customer/services.php">Services</a></li>
                                <li><a class="dropdown-item" href="../../pages/customer/profile.php">Profile</a></li>
                            </ul>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                <i class="fa-solid fa-basket-shopping fa-lg text-dark"></i>
                            </a>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="../../pages/customer/purchase.php">Purchase</a></li>
                                <li><a class="dropdown-item" href="../../pages/customer/basket.php">Reservation</a></li>
                                <li><a class="dropdown-item" href="../../pages/customer/history.php">History</a></li>
                                <li><a class="dropdown-item" id="btn-logout">Log out</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        

	<div class="body pt-5">
		
		<div class="wrapper mt-5">
			<section class="users">
				<header>
                    <?php 
                        include '../chatCustomer/config.php';
                        $sql = mysqli_query($conn, "SELECT * FROM users WHERE user_id = {$_SESSION['user_id']}");
                        if(mysqli_num_rows($sql) > 0) {
                            $row = mysqli_fetch_assoc($sql);
                        }
                    ?>
					<div class="content d-flex">
						<img src="../../uploads/profileImage/<?php echo $row['p_image'];?>">
						<div class="details">
							<span class="fw-bold text-capitalize"><?php echo $row['username'];?></span>
							<p class="text-success">Active now</p>
						</div>
					</div>
                    <button  type="button" class="btn btn-sm rounded-5 bg-secondary mb-5"><i class="bi bi-bell text-white"></i></button>
				</header>
				<div class="search">
					<span class="text-muted">Click the search Icon and Type Admin to contact</span>
					<input type="text" placeholder="Type Admin to search" class="form-control rounded-3">
					<button><i class="bi bi-search text-white"></i></button>
				</div>
				<div class="users-list overflow-scroll">
					
					
				</div>
			</section>
		</div>
	</div>
	
	<script src="../../plugins/privacy/jquery.js"></script>
	<script src="../chatCustomer/users.js"></script>
    <script src="../../plugins/privacy/logout.js"></script>
    <script src="../../plugins/bundle/collapse.js" ></script>

    <!-- DOWNLOADED JS -->
    <script src="../../toaster/toastr.min.js"></script>
    <script src="../../sweetalert/alert.js"></script>
    <script src="../../bootstrap/boots.js"></script>
</body>
</html>