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
    <!-- CSS -->
    <link rel="stylesheet" href="../../css/style/admin/global.css">
    <link rel="stylesheet" href="../../css/style/admin/mobile.css">
    <link rel="stylesheet" href="../../toaster/toastr.min.css">
    <link rel="icon" type="image/x-icon" href="../../images/logo.png">
    <title>Admin Gallery | Page</title>

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
            <p class="username text-center mt-3"><?php echo $_SESSION['username']; ?><span>
                </span></p>
            <hr class="h-color mx-1">
            <div class="py-1">
                <ul class="list-unstyled px-3">
                    <li class="text-white mb-2">
                    <i class="bi bi-bar-chart-fill"></i><a href="../../pages/admin/adminDash.php" class="a text-decoration-none px-2">
                            Dashboard</a>
                    </li>

                    <li class="text-white mb-2">
                        <i class="bi bi-shop"></i><a href="../../pages/admin/adminProduct.php" class="a text-decoration-none px-2">
                            Product</a>
                    </li>

                    <li class="text-white mb-2">
                        <i class="bi bi-cart-fill"></i><a class="a text-decoration-none px-2 "
                        href="../../pages/admin/adminOrder.php">Order</a>
                    </li>

                    <li class="text-white mb-2">
                        <i class="bi bi-basket-fill"></i><a class="a text-decoration-none px-2 " 
                        href="../../pages/admin/adminBasket.php">Basket</a>
                    </li>
                    <hr class="h-color mx-1">
                    <li class="text-white mb-2">
                        <i class="bi bi-clock-history"></i><a class="a text-decoration-none px-2 " 
                        href="../../pages/admin/adminHistory.php">History</a>
                    </li>
                    <li class="text-white mb-2">
                        <i class="bi bi-chat-dots-fill"></i><a class="a text-decoration-none px-2 " 
                        href="../../pages/chatAdmin/index.php">Message</a>
                    </li>
                    <li class="text-white mb-2">
                        <i class="bi bi-person-fill"></i><a class="a text-decoration-none px-2 " 
                        href="../../pages/admin/adminProfile.php">Profile</a>
                    </li>
                </ul>

                <hr class="h-color mx-1">
                <ul class="list-unstyled px-3">
                    <button type="button" class="dropdown-item text-uppercase fw-bold" id="btn-logout">Logout<i class="bi bi-box-arrow-right mx-2"></i></button>
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
            <section class="gallery " id="gallery">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="section-header text-center mb-4">
                                <h1 class="fw-bold mt-4">Gallery</h1>
                            </div>
                        </div>
                        <div class="col-md-6 col-sm-12 mb-3">
                        </div>
                        <div class="col-md-6 col-sm-12 mb-4">
                            <div class="AddButton text-end">
                                 <button data-bs-toggle="modal" data-bs-target="#addProductGallery" id="add" class="btn btn-primary btn-md">Add</button>
                            </div>
                        </div>
                
                    </div>
                    <div class="row" id="displayGallery">
                        
                    </div>

                </div>
            </section>


            <section>
                <div class="container">
                    <div class="modal mt-4" id="addProductGallery">
                        <div class="modal-dialog modal-dialog-centered ">
                            <div class="modal-content mt-4">
                                <div class="modal-body p-4">
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                                    <div class="form-area bg-white rounded-4">
                                        <h2 class="text-center text-info">Add Image</h2>
                                        <div class="mb-2 ">
                                            <label>Image</label>
                                            <input type="file" id="g_image" class="form-control" placeholder="Image">
                                        </div>

                                        <div class="mb-2">
                                            <label>Description</label>
                                            <textarea type="text" id="descript" class="form-control" placeholder="Description"></textarea> 
                                        </div>
                                        <div class="mt-3 d-flex align-items-center justify-content-center">
                                            <button id="btn-add-gallery" class="btn btn-sm btn-primary">Add Now</button>
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
                    <div class="modal mt-5" id="galleryView" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content mt-5">
                                <div class="modal-body">
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                                    <div class="form-area bg-white rounded-4" id="displayDataGalleryModal">
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div class="container">
                    <div class="modal mt-5" id="galleryUpdate" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">>
                        <div class="modal-dialog">
                            <div class="modal-content mt-5">
                                <div class="modal-body">
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                                        aria-label="Close"></button>
                                    <div class="form-area bg-white rounded-4" id="displayDataGalleryModalUpdate">
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    </div>


    <script src="../../plugins/privacy/jquery.js"></script>
    <script src="../../plugins/privacy/logout.js"></script>
    <script src="../../plugins/privacy/adminGallery.js"></script>
    
    <!-- DOWNLOADED JS -->
    <script src="../../toaster/toastr.min.js"></script>
    <script src="../../sweetalert/alert.js"></script>
    <script src="../../bootstrap/boots.js"></script>

    <script>
        $(document).ready(function () {
            $('.open-btn').on('click', function () {
                $('.sidebar').addClass('active');
            });

            $('.close-btn').on('click', function () {
                $('.sidebar').removeClass('active');
            });

            $(document).on('click', function (event) {
               
                if (!$(event.target).closest('.sidebar, .open-btn').length) {
                    
                    $('.sidebar').removeClass('active');
                }
            });
        });
    </script>
</body>

</html>