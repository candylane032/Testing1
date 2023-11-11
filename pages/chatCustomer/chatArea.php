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
	<link rel="stylesheet" type="text/css" href="../chatCustomer/chat.css">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css">
	<link rel="stylesheet" href="../chatCustomer/global.css">
    <link rel="stylesheet" href="../../css/style/responsive.css">
  <link rel="icon" type="image/x-icon" href="../../images/CSE.png">

	<title>chat</title>
</head>
<body>
<nav class="navbar navbar-expand-lg fixed-top">
            <div class="container-fluid">
                <a class="navbar-brand" href="#"><img src="../../images/CSE.png" class="logo" alt="Logo"></a>
                <button aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"
                    class="navbar-toggler" data-bs-target="#navbarSupportedContent" data-bs-toggle="collapse"
                    type="button">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav ms-auto mb-2 mb-lg-0 text-uppercase">
                        <li class="nav-item">
                            <a class="nav-link" href="index.php">Products</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="../../pages/chatCustomer/chat.php">Contact Us</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="about.php">About Us</a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                Cart
                            </a>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="purchase.php">Purchase</a></li>
                                <li><a class="dropdown-item" href="basket.php">My Basket</a></li>
                                <li><a class="dropdown-item" href="history.php">History</a></li>
                            </ul>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                More
                            </a>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="recipes.php">Recipes</a></li>
                                <li><a class="dropdown-item" href="gallery.php">Gallery</a></li>
                                <li><a class="dropdown-item" href="services.php">Services</a></li>
                                <li><a class="dropdown-item" href="profile.php">Profile</a></li>
                                <li><a class="dropdown-item" id="btn-logout">Log out</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

	<div class="body fixed-top">
		<div class="wrappers">
			<section class="chat-area">
				<header class="chat-header ">
					<?php 
						include '../chatCustomer/config.php';
						$user_id = mysqli_real_escape_string($conn, $_GET['user_id']);
						$sql = mysqli_query($conn, "SELECT * FROM users WHERE user_id = {$user_id}");
						if(mysqli_num_rows($sql) > 0) {
							$row = mysqli_fetch_assoc($sql);
						}

					?>
					<a class="back-icon" href="../chatCustomer/chat.php"><i class="bi bi-arrow-left"></i></a>
					<img src="../chatAdmin/admin.png">
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
                    <button><i class="bi bi-image"></i></button>
				</form>
			</section>
		</div>
	</div>
	

	<script src="../chatCustomer/chat.js"></script>
</body>
</html>