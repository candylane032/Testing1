<?php 
    session_start();  
    if(isset($_SESSION['user_id'])){
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
                                More
                            </a>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="recipes.php">Recipes</a></li>
                                <li><a class="dropdown-item" href="gallery.php">Gallery</a></li>
                                <li><a class="dropdown-item" href="services.php">Services</a></li>
                                <li><a class="dropdown-item" href="profile.php">Profile</a></li>
                            </ul>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                <i class="fa-solid fa-basket-shopping fa-lg text-dark"></i>
                            </a>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="purchase.php">Purchase</a></li>
                                <li><a class="dropdown-item" href="basket.php">Reservation</a></li>
                                <li><a class="dropdown-item" href="history.php">History</a></li>
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
                                    <a href="index.php" class="nav__link text-decoration-none">
                                        <i class="bi bi-shop nav__icon"></i>
                                        <span class="nav__name">Home</span>
                                    </a>
                                </li>

                                <li class="nav__item">
                                    <a href="gallery.php" class="nav__link text-decoration-none">
                                        <i class="bi bi-images nav__icon"></i>
                                        <span class="nav__name">Gallery</span>
                                    </a>
                                </li>

                                <li class="nav__item">
                                    <a href="about.php" class="nav__link text-decoration-none">
                                        <i class="bi bi-people-fill nav__icon"></i>
                                        <span class="nav__name">About</span>
                                    </a>
                                </li>

                                <li class="nav__item">
                                    <a href="services.php" class="nav__link text-decoration-none">
                                        <i class="bi bi-gear-wide nav__icon"></i>
                                        <span class="nav__name">Services</span>
                                    </a>
                                </li>

                                <li class="nav__item">
                                    <a href="profile.php" class="nav__link text-decoration-none">
                                        <i class="bi bi-person-circle nav__icon"></i>
                                        <span class="nav__name">Profile</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        <!-- Navbar End-->

        <!-- Start Bottom Tab -->
        <div class="content">
            <div class="bottom-navigation">
                <nav>
                    <div class="nav container">
                        <div class="nav__menu" id="nav-menu">
                            <ul class="nav__list list-unstyled">

                                <li class="nav__item">
                                    <a href="../../pages/customer/home.php" class="nav__link text-decoration-none">
                                        <i class="bi bi-house-door-fill nav__icon"></i>
                                        <span class="nav__name">Home</span>
                                    </a>
                                </li>

                                <li class="nav__item">
                                    <a href="../../pages/customer/gallery.php" class="nav__link text-decoration-none">
                                        <i class="bi bi-images nav__icon"></i>
                                        <span class="nav__name">Gallery</span>
                                    </a>
                                </li>

                                <li class="nav__item">
                                    <a href="../../pages/customer/about.php" class="nav__link text-decoration-none">
                                        <i class="bi bi-people-fill nav__icon"></i>
                                        <span class="nav__name">About</span>
                                    </a>
                                </li>

                                <li class="nav__item">
                                    <a href="../../pages/customer/services.php" class="nav__link text-decoration-none">
                                        <i class="bi bi-gear-wide nav__icon"></i>
                                        <span class="nav__name">Services</span>
                                    </a>
                                </li>

                                <li class="nav__item">
                                    <a href="../../pages/customer/profile.php" class="nav__link text-decoration-none">
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

            <!-- Start Body -->
            <section class="purchaseList pb-5 mt-5">
                <div class="container">
                    <div class="purchase">
                        <div class="inner-wrap row p-3">
                            <h1 class=" mb-4 text-center fw-bold mt-5">My Purchase</h1>
                            <div class="col-12 col-lg-3">
                                <div class="col mb-3">
                                    <input type="search" class="form-control" placeholder="Search Purchase">
                                </div>
                            </div>
                            <div class="col-12 col-lg-12">
                                <table class="table table-light">
                                    <thead>
                                        <th>ID</th>
                                        <th>USERNAME</th>
                                        <th>EMAIL</th>
                                        <th>ADDRESS</th>
                                        <th>DATE</th>
                                        <th>ACTION</th>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td data-label="ID">1</td>
                                            <td data-label="NAME">Karlo</td>
                                            <td data-label="EMAIL">carlngujo@gmail.com</td>
                                            <td data-label="PROFILE PIC">asd</td>
                                            <td data-label="ROLE">Ste</td>
                                            <td data-label="ACTION">
                                                <button data-bs-toggle="modal" data-bs-target="#edit"
                                                    class="btn btn-sm btn-info mx-1">View</button>
                                                <button data-bs-toggle="modal" data-bs-target="#login"
                                                    class="btn btn-sm btn-dark">Add More</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                    <tbody>
                                        <tr>
                                            <td data-label="ID">1</td>
                                            <td data-label="NAME">Karlo</td>
                                            <td data-label="EMAIL">carlngujo@gmail.com</td>
                                            <td data-label="PROFILE PIC">asd</td>
                                            <td data-label="ROLE">Ste</td>
                                            <td data-label="ACTION">
                                                <button data-bs-toggle="modal" data-bs-target="#edit"
                                                    class="btn btn-sm btn-info mx-1">View</button>
                                                <button data-bs-toggle="modal" data-bs-target="#login"
                                                    class="btn btn-sm btn-dark">Add More</button>
                                            </td>
                                        </tr>
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
                    <div class="modal mt-4" id="edit">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content mt-4">
                                <div class="modal-body">
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                                    <div class="form-area bg-white rounded-4">
                                        <h1 class="text-center text-warning">Review Order</h1>
                                        <form>
                                            <div class="mb-2 mt-4">
                                                <input type="text" class="form-control" placeholder="CARL" readonly>
                                            </div>
                                            <div class="mb-2">
                                                <input type="text" class="form-control" placeholder="NGOJO" readonly>
                                            </div>
                                            <div class="mb-2">
                                                <input type="text" class="form-control" placeholder="IBABAO CORDOVA" readonly>
                                            </div>
                                            <div class="mb-2">
                                                <input type="text" class="form-control" placeholder="DANGGIT" readonly>
                                            </div>
                                            <div class="mb-2">
                                                <input type="number" class="form-control" placeholder="3" readonly>
                                            </div>
                                            <div class="mb-2">
                                                <input type="text" class="form-control" placeholder="GCASH" readonly>
                                            </div>
                                            <div class="mb-2">
                                                <input type="text" class="form-control" placeholder="COMPLETED" readonly>
                                            </div>
                                            <div class="mb-2">
                                                <input type="number" class="form-control" placeholder="10-12-2023" readonly>
                                            </div>
                                            <button type="submit" class="mt-3"><a
                                                class="btn-product text-decoration-none text-dark"
                                                href="../../pages/customer/home.php">Cancel Order</a></button>
                                                <button type="submit" class="mt-3"><a
                                                class="btn-product text-decoration-none text-dark"
                                                href="../../pages/customer/home.php">Message</a></button>
                                        </form>
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
    <script src="../../plugins/bundle/script.js"></script>
    <script src="../../plugins/bundle/collapse.js" ></script>
   
    <!-- DOWNLOADED JS -->
    <script src="../../toaster/toastr.min.js"></script>
    <script src="../../sweetalert/alert.js"></script>
    <script src="../../bootstrap/boots.js"></script>
</body>

</html>