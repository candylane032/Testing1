<?php 
    session_start();  
    if(!isset($_SESSION['user_id'])){
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
    <link rel="stylesheet" href="../../css/style/customer/product.css">
    <link rel="stylesheet" href="../../toaster/toastr.min.css">
    <link rel="icon" type="image/x-icon" href="../../images/CSE.png">
    
    <title>Products | Page</title>
    <!-- <style>
        .btn-info {
            display: flex;
            margin: auto;
        }
    </style> -->
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

            <!-- Start Body -->
            <section class="products pb-5 mt-2" id="products">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12 mt-5">
                            <div class="section-header text-center mb-4">
                                <h1 class="fw-bold mt-5">Our Products </h1>
                            </div>
                        </div>
                        <div class="col mb-3">
                            <input type="text" id="searchInput" class="form-control" placeholder="Search products..." onkeyup="searchProducts(setSessionId)">                        
                        </div>
                    </div>
                    <div id="displayId"></div>
                    <div id="displayIdReserve"></div>
                    <div class="row" id="DisplayProducts">
                        
                    </div>
                </div>
            </section>
            <!-- End Body -->
            
            <!-- Modal Start -->
            <section>
                <div class="container">
                    <div class="modal mt-4" id="order" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">

                                <div class="modal-body p-4">
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                                    <div class="text-danger">
                                        <h2 class="text-center text-dark fw-bold mb-3">Buy Product</h2>
                                        <div id="selectPnamePrice">
                                            
                                        </div>
                                        <div class="mb-2">
                                            <label class="text-dark ">Kilo</label>
                                            <input type="number" id="order_kilo" class="form-control" placeholder="Kilo">
                                        </div> 
                                        <div class="mb-2">
                                            <label class="text-dark">Total Amount: <span class="text-dark fw-bold" id="t_amount"></span></label>
                                        </div> 
                                        <div class="mb-2">
                                            <label class="text-dark">Payment Method (if Gcash or Paymaya kindly send the receipt)</label>
                                            <select class="form-control mb-3 p_method" id="p_method">
                                                <option value="cod">Cash On Delivery (COD)</option>
                                                <option value="gcash">Gcash</option>
                                                <option value="paymaya">Paymaya</option>
                                            </select>
                                        </div>
                                        <div class="mb-2">
                                            <div class="qrlabel">
                                                <label class="payment text-dark">Payment</label>
                                            </div>
                                            <div class="qr">
                                                <img class="qrcode" src="../../images/qrgcash.jpg">
                                                <img class="qrcode" src="../../images/qrpaymaya.png">
                                            </div>
                                        </div>
                                        <div class="mb-2">
                                            <label class="refLabel text-dark text-break">After you pay enter your Ref No# (Gcash or Paymaya)</label>
                                            <input type="number" id="ref_num" class="form-control ref_num" placeholder="Enter your Ref No# (Gcash or Paymaya)">
                                        </div>
                                        <div class="mb-2">
                                            <label class="Receipt text-dark">Receipt of (Gcash or Paymaya)</label>
                                            <input type="file" name="" id="p_method_receipt" class="form-control p_method_receipt" placeholder="Image">
                                        </div>
                                        <div>
                                            <button id="btn_palceOrder" class="btn btn-info btn-sm mt-3">Place Order</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div class="container">
                    <div class="modal mt-4" id="reserve" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-body p-3">
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                                    <div class=" text-danger">
                                        <h2 class="text-center text-dark fw-bold mb-3">Reserve Product</h2>
                                        <div id="selectPnamePriceReserve">
                                            
                                        </div>
                                        <div class="mb-2">
                                            <label class="text-dark ">Kilo</label>
                                            <input type="number" id="reserve_kilo" class="form-control" placeholder="Kilo">
                                        </div> 
                                        <div class="mb-2">
                                            <label class="text-dark">Total Amount: <span class="text-dark fw-bold" id="r_amount"></span></label>
                                        </div> 
                                        <div class="mb-2">
                                            <label class="text-dark">Payment Method (if Gcash or Paymaya kindly send the receipt)</label>
                                            <select class="form-control mb-3" id="r_p_method">
                                                <option value="cod">Cash On Delivery (COD)</option>
                                                <option value="gcash">Gcash</option>
                                                <option value="paymaya">Paymaya</option>
                                            </select>
                                        </div>
                                        <div class="mb-2">
                                            <div class="qrlabel">
                                                <label class="paymentReserve text-dark">Payment</label>
                                            </div>
                                            <div class="qr">
                                                <img class="qrcodeReserve" src="../../images/qrgcash.jpg">
                                                <img class="qrcodeReserve" src="../../images/qrpaymaya.png">
                                            </div>
                                        </div>
                                        <div class="mb-2">
                                            <label class="refLabelReserve text-dark text-break">After you pay enter your Ref No# (Gcash or Paymaya)</label>
                                            <input type="number" id="r_ref_num" class="form-control " placeholder="Enter your Ref No# (Gcash or Paymaya)">
                                        </div>
                                        <div class="mb-2">
                                            <label class="ReceiptReserve text-dark">Receipt of (Gcash or Paymaya)</label>
                                            <input type="file" id="r_p_method_receipt" class="form-control" placeholder="Image">
                                        </div>
                                        <div>
                                            <button id="btn_palceReserve" class="btn btn-info btn-sm mt-3">Place Reserve</button>
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
    <script src="../../plugins/privacy/customerProduct.js"></script>

    <!-- Custom JS -->
    <script src="../../plugins/bundle/script.js"></script>
    <script src="../../plugins/bundle/scriptCustomer.js"></script>
    <script src="../../plugins/bundle/collapse.js" ></script>
    <!-- DOWNLOADED JS -->
    <script src="../../toaster/toastr.min.js"></script>
    <script src="../../sweetalert/alert.js"></script>
    <script src="../../bootstrap/boots.js"></script>
    <script>
        $(document).ready(function(){
            if(!localStorage.getItem('SessionLocalStorage')){

                toastr.success('Login Successfully.');

                localStorage.setItem('SessionLocalStorage', 'true');
            }
        })

        $('#btn-logout').click(function(){
            localStorage.removeItem('SessionLocalStorage');
        })
    </script>
    <!-- End Bootstrap -->
</body>

</html>