<?php 
    session_start();  
    if(!isset($_SESSION['user_id']) ){
        header('location:../../');
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
    <link rel="stylesheet" href="../../css/style/customer/profile.css">
    <link rel="icon" type="image/x-icon" href="../../images/logo.png">
    
    
    <title>Profile | Page</title>
</head>

<body>
    <!-- Start navbar -->
    <div class="main-container d-flex">
    <nav class="navbar navbar-expand-lg fixed-top">
            <div class="container">
                <a class="navbar-brand" href="index.php"><img src="../../images/logo.png" class="logo" alt="Logo"></a>
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
                            <a class="nav-link" href="../../pages/chatCustomer/index.php">Contact Us</a>
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
            <!-- End Bottom Tab -->

            <!-- Start Body -->
            <section class="Profile mt-5 pt-5">
                <div class="container">
                    <div class="rounded">
                        <div class="py-2 px-3 bg-white rounded">
                            <h1 class="text-center fw-bold mb-2">My Account</h1>
                            <div id="displayProfilePic">
                                    
                            </div>
                            <div class="pprof">
                                <div class="rowProfile row">
                                    <div class="col-12 col-lg-5">
                                        <div>
                                            <label>Username</label>
                                            <p class="bg-light"><?php echo $_SESSION['username'] ?></p>
                                            <label>Firstname</label>
                                            <p class="text-danger bg-light">Unknown</p>
                                            <label>Gender</label>
                                            <p class="text-danger bg-light">Unknown</p>
                                            <label>Address</label>
                                            <p class="text-danger bg-light">Unknown</p>
                                        </div>
                                    </div>
                                    <div class="col-12 col-lg-5 px-5">
                                        <div class="rowPP">
                                            <label>Email</label>
                                            <p class="bg-light"><?php echo $_SESSION['email'] ?></p>
                                            <label>Lastname</label>
                                            <p class="text-danger bg-light">Unknown</p>
                                            <label>Phone Number</label>
                                            <p class="text-danger bg-light">Unknown</p>
                                        </div>
                                    </div>

                                </div>
                                <div class="rowProfile row">
                                    <div class="col-12 col-lg-3">
                                        <div class="buuton">
                                            <button data-bs-toggle="modal" data-bs-target="#update" id="btn_DisplyDataProfile" class="btn btn-secondary btn-sm mx-1 mb-3"><i class="bi bi-pencil-square"></i></button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
            <!-- End Body -->

            <!-- Modal Start -->
            <section>
                <div class="container">
                    <div class="modal mt-5" id="update">
                        <div class="modal-dialog">
                            <div class="modal-content mt-5">
                                <div class="modal-body">
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                                    <div class="form-area bg-white rounded-4">
                                        <h2 class="text-center">Complete your Information</h2>
                                        <div class="mb-1 mt-4">
                                            <label>Firstname</label>
                                            <input type="text" id="fname" class="form-control" placeholder="Enter First Name">
                                        </div>
                                        <div class="mb-1">
                                            <label>Lastname</label>
                                            <input type="text" id="lname" class="form-control" placeholder="Enter Last Name">
                                        </div>
                                        <div class="mb-1">
                                            <label>Gender</label>
                                            <select class="form-control" id="gender">
                                                <option class="form-control" value="male">male</option>
                                                <option class="form-control" value="female">female</option>
                                            </select>
                                        </div>
                                        <div class="mb-1">
                                            <label>Phone number</label>
                                            <input type="number" id="pnumber" class="form-control" placeholder="Enter Number">
                                        </div>
                                        <div class="mb-1">
                                            <label>Address</label>
                                            <input type="text" id="address" class="form-control" placeholder="Enter Address">
                                        </div>
                                        <div class="mb-1 mt-3 text-center">
                                            <button id="btn_insertEditProfile" class="btn-order">Update</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <!-- Modal End -->


            <!-- Modal Start -->
            <section>
                <div class="container">
                    <div class="modal mt-4" id="updateProfileImg" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content mt-4">
                                <div class="modal-body p-4">
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                    </button>
                                    
                                    <div id="displayDataProfilePicModal">
                                        
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
    <script src="../../plugins/privacy/updateProfilePic.js"></script>
    <script src="../../plugins/bundle/script.js"></script>
    <script src="../../plugins/bundle/collapse.js" ></script>

    <!-- DOWNLOADED JS -->
    <script src="../../toaster/toastr.min.js"></script>
    <script src="../../sweetalert/alert.js"></script>
    <script src="../../bootstrap/boots.js"></script>
</body>

</html>