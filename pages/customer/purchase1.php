<?php 
    session_start();  
    if(!isset($_SESSION['user_id'])){
        header('location:../../pages/customer');
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
    <!-- Custom CSS -->
    <link rel="stylesheet" href="../../css/style/global.css">
    <link rel="stylesheet" href="../../css/style/responsive.css">
    <link rel="stylesheet" href="../../toaster/toastr.min.css">
    <link rel="stylesheet" href="../../css/style/customer/customerOrder.css">
    <link rel="icon" type="image/x-icon" href="../../images/CSE.png">
    
    <title>Purchase | Page</title>
</head>

<body>
    <!-- Start navbar -->
    <div class="main-container d-flex">
        <nav class="navbar navbar-expand-lg fixed-top">
            <div class="container">
                <a class="navbar-brand" href="#"><img src="../../images/CSE.png" class="logo" alt="Logo"></a>
                <button aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"
                    class="navbar-toggler" data-bs-target="#navbarSupportedContent" data-bs-toggle="collapse"
                    type="button">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav ms-auto mb-2 mb-lg-0 text-uppercase">
                        <li class="nav-item">
                            <a class="nav-link" href="product.php">Products</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="../../pages/chatCustomer1/chat.php">Contact Us</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="about1.php">About Us</a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                History
                            </a>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="historyOrders.php">Orders</a></li>
                                <li><a class="dropdown-item" href="historyReserves.php">Reserves</a></li>
                            </ul>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                More
                            </a>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="recipes1.php">Recipes</a></li>
                                <li><a class="dropdown-item" href="gallery1.php">Gallery</a></li>
                                <li><a class="dropdown-item" href="services1.php">Services</a></li>
                                <li><a class="dropdown-item" href="profile1.php">Profile</a></li>
                            </ul>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                <i class="fa-solid fa-basket-shopping fa-lg text-dark"></i>
                            </a>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="purchase1.php">Purchase</a></li>
                                <li><a class="dropdown-item" href="basket1.php">Reservation</a></li>
                                <button type="button" class="dropdown-item" id="btn-logout">Logout</button>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <!-- Navbar End-->

        <!-- Start Bottom Tab -->
        <div class="content">
            <div class="bottom-navigation">
                <nav>
                    <div class="nav container">
                        <div class="nav__menu" id="nav-menu">
                            <ul class="nav__list list-unstyled">

                                <li class="nav__item">
                                    <a href="product.php" class="nav__link text-decoration-none">
                                        <i class="bi bi-shop nav__icon"></i>
                                        <span class="nav__name">Home</span>
                                    </a>
                                </li>

                                <li class="nav__item">
                                    <a href="gallery1.php" class="nav__link text-decoration-none">
                                        <i class="bi bi-images nav__icon"></i>
                                        <span class="nav__name">Gallery</span>
                                    </a>
                                </li>

                                <li class="nav__item">
                                    <a href="about1.php" class="nav__link text-decoration-none">
                                        <i class="bi bi-people-fill nav__icon"></i>
                                        <span class="nav__name">About</span>
                                    </a>
                                </li>

                                <li class="nav__item">
                                    <a href="services1.php" class="nav__link text-decoration-none">
                                        <i class="bi bi-gear-wide nav__icon"></i>
                                        <span class="nav__name">Services</span>
                                    </a>
                                </li>

                                <li class="nav__item">
                                    <a href="profile1.php" class="nav__link text-decoration-none">
                                        <i class="bi bi-person-circle nav__icon"></i>
                                        <span class="nav__name">Profile</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
            <!-- End Bottom Tab -->
            <div id="selectUserIdProfile"></div>
            <!-- Start Body -->
            <section class="purchaseList pb-5 mt-5">
                <div class="container">
                    <div class="purchase">
                        <div class="inner-wrap row p-3">
                            <h1 class=" mb-4 text-center fw-bold mt-5">My Purchase</h1>
                            <div class="AddButton text-end mb-2">
                                 <button class="btn btn-success btn-sm"><a class="text-decoration-none text-white" href="../chatCustomer1/chat.php">Message Owner</a></button>
                            </div>
                            <div class="col-12 col-lg-12">
                                <table class="table table-light">
                                    <thead>
                                        <!-- <th>ID</th> -->
                                        <th>PRODUCT NAME</th>
                                        <th>KILO</th>
                                        <th>TOTAL</th>
                                        <th>STATUS</th>
                                        <th>MOP</th>
                                        <th>TIME & DATE</th>
                                        <th>DELIVERY</th>
                                        <th>ACTION</th>
                                    </thead>
                                    <tbody id="displayOrder">
                                        
                                    </tbody>
                                    
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <!-- End Body -->

            <!-- Modal Start -->
            <section>
                <div class="container">
                    <div class="modal mt-4" id="view" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-lg">
                            <div class="modal-content mt-1">
                                <div class="modal-body">
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                                    <div class="form-area bg-white rounded-4">
                                        <h2 class="text-center text-warning mb-3">Review Order</h2>
                                        <div id="viewOrder">
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <!-- Modal End -->
        </div>
    </div>

    <script src="../../plugins/privacy/jquery.js"></script>
    <script src="../../plugins/privacy/logout.js"></script>
    <script src="../../plugins/privacy/customerOrder.js"></script>
    <script src="../../plugins/bundle/script.js"></script>
    <script src="../../plugins/bundle/collapse.js" ></script>

    <!-- DOWNLOADED JS -->
    <script src="../../toaster/toastr.min.js"></script>
    <script src="../../sweetalert/alert.js"></script>
    <script src="../../bootstrap/boots.js"></script>
</body>

</html>