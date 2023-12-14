<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Landing | Page</title>

	<!-- DOWNLOADED CSS -->
	<link rel="stylesheet" href="bootstrap/boots.css">
	<link rel="stylesheet" href="fontawesome/all.min.css">
	<link rel="stylesheet" href="fontawesome/fontawesome.min.css">
	<link rel="stylesheet" href="toaster/toastr.min.css">

	<!-- CUSTOM CSS -->
	<link rel="stylesheet" href="./css/style/landing.css">
	<link rel="stylesheet" href="./css/style/global.css">
	<link rel="stylesheet" href="./css/style/responsive.css">
	<link rel="icon" type="image/x-icon" href="images/logo.png">

</head>

<body>
	<!-- Navbar Start -->
	<nav class="navbar navbar-expand-lg fixed-top">
		<div class="container">
			<a class="navbar-brand" href="#"><img src="images/logo.png" class="logo img-fluid" alt="logo"></a>
			<button aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"
				class="navbar-toggler" data-bs-target="#navbarSupportedContent" data-bs-toggle="collapse" type="button">
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarSupportedContent">
				<ul class="navbar-nav ms-auto mb-2 mb-lg-0 text-uppercase">
					<li class="nav-item">
						<a class="nav-link" href="#">Home</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="#products">Products</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="#about">About Us</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="#services">Services</a>
					</li>
				</ul>
			</div>
		</div>
	</nav>
	<!-- Navbar End -->

	<!-- Carousel Start -->
	<div class="slider">
		<div class="carousel slide" data-bs-ride="carousel" id="carouselExampleIndicators">
			<div class="carousel-indicators">
				<button aria-label="Slide 1" class="active" data-bs-slide-to="0"
					data-bs-target="#carouselExampleIndicators" type="button"></button> <button aria-label="Slide 2"
					data-bs-slide-to="1" data-bs-target="#carouselExampleIndicators" type="button"></button> <button
					aria-label="Slide 3" data-bs-slide-to="2" data-bs-target="#carouselExampleIndicators"
					type="button"></button>
			</div>
			<div class="carousel-inner">
				<div class="carousel-item active">
					<img alt="..." class="d-block w-100 h-100 object-fit-cover" src="images/caro1.jpg">
					<div class="carousel-caption">
						<h5>CHARLYN'S SEAFOOD <br> ESSENTIALS</h5>
						<p>From time to time, treat yourself with some seafood.</p>
						<button class="btn-started"><a class="text-decoration-none text-white"
								href="pages/customer/register.php">Get Started</a></button>
						<button class="btn-in  mt-4 mx-2 px-4"><a class="text-decoration-none text-white"
								href="pages/customer/login.php">Sign In</a></button>
					</div>
				</div>
				<div class="carousel-item">
					<img alt="..." class="d-block w-100 h-100 object-fit-cover" src="images/car-2.jpg">
					<div class="carousel-caption">
						<h5>CHARLYN'S SEAFOOD <br> ESSENTIALS</h5>
						<p>A bad day eating seafood is better than a good day eating anything else.</p>
						<button class="btn-started"><a class="text-decoration-none text-white"
								href="pages/customer/register.php">Get Started</a></button>
						<button class="btn-in  mt-4 mx-2 px-4"><a class="text-decoration-none text-white"
								href="pages/customer/login.php">Sign In</a></button>
					</div>
				</div>
				<div class="carousel-item">
					<img alt="..." class="d-block w-100 h-100 object-fit-cover" src="images/caro3.jpg">
					<div class="carousel-caption">
						<h5>CHARLYN'S SEAFOOD <br> ESSENTIALS</h5>
						<p>Celebrating being alive with Seafood.</p>
						<button class="btn-started"><a class="text-decoration-none text-white"
								href="pages/customer/register.php">Get Started</a></button>
						<button class="btn-in  mt-4 mx-2 px-4"><a class="text-decoration-none text-white"
								href="pages/customer/login.php">Sign In</a></button>
					</div>
				</div>
			</div>
		</div>
		<!-- Carousel End -->

		<!-- Header Start -->
		<section class="about section-padding">
			<div class="container">
				<div class="row">
					<div class="col-lg-8 col-md-12 ps-lg-5 mt-md-5">
						<div class="about-text">
							<h2>Welcome to our Seafood Website</h2>
							<p class="text-start">Where we offer a wide selection of fresh and high-quality seafood
								products, which means a variety of options in one place.
								This is designed to make it easy for you to browse through our extensive range of
								seafood
								products and make your purchase with just a few clicks. <br> <br>
								Thank you for choosing our seafood website as your go-to destination for all your
								seafood
								needs.
							</p>
							<button class="btn-order"><a class="text-decoration-none text-white"
									href="pages/customer/login.php">Order Now</a></button>
						</div>
					</div>
					<div class="col-lg-4 col-md-12 col-12">
						<div class="about-img"><img alt="" class="img-fluid mx-4" src="images/logo.png"></div>
					</div>
				</div>
			</div>
		</section>
		<!-- Header End -->

		<!-- Product Start -->
		<section class="products section-padding" id="products">
			<div class="container">
				<div class="row">
					<div class="col-md-12">
						<div class="section-header text-center pb-5">
							<h1 class="fw-bold">Our Products</h1>
							<p>The available products are high-quality and worth to order, get yours now!</p>
						</div>
					</div>
				</div>
				<div class="row" id="DisplayProducts">


				</div>
			</div>
		</section>

		<section>
			<div class="modal fade" id="productModal">
				<div class="modal-dialog modal-dialog-centered">
					<div class="modal-content">
						<div class="modal-body p-3">
							<h4 class="text-center fw-bold p-2">Description</h4>
							<div id="viewDesc">
							
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
		<!-- Products End -->

		<!-- About Us Start -->
		<section class="services section-padding" id="about">
			<div class="container">
				<div class="row">
					<div class="col-md-12">
						<div class="section-header text-center pb-5">
							<h1 class="fw-bold">About Us</h1>
							<p>The CSE owner always make sure that the products are all in best variations of best
								quality.</p>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-12 col-md-12 col-lg-4">
						<div class="card pb-2">
							<div class="card-body">
								<div class="img-area mb-2 text-center"><img alt="" class="img-fluid w-25"
										src="images/C.png"></div>
								<hr>
								<p class="lead">We aim to offer a hassle-free shopping experience with our user-friendly
									website and reliable delivery service.
									Thank you for choosing us as your seafood provider.</p>
							</div>
						</div>
					</div>
					<div class="col-12 col-md-12 col-lg-4">
						<div class="card pb-2">
							<div class="card-body">
								<div class="img-area mb-2 text-center"><img alt="" class="img-fluid w-25"
										src="images/S.png"></div>
								<hr>
								<p class="lead">We offer a safe online transactions in every seafood product purchase.
								</p>
							</div>
						</div>
					</div>
					<div class="col-12 col-md-12 col-lg-4">
						<div class="card pb-2">
							<div class="card-body">
								<div class="img-area mb-2 text-center"><img alt="" class="img-fluid w-25"
										src="images/E.png"></div>
								<hr>
								<p class="lead">We offer a wide selection of seafood products and we value every
									customer's
									needs.</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
		<!-- About Us End -->

		<!-- Services Start -->
		<section class="services section-padding" id="services">
			<div class="container">
				<div class="row">
					<div class="col-md-12">
						<div class="section-header text-center pb-5">
							<h1 class="fw-bold">Services</h1>
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-12 col-md-12 col-lg-4">
						<div class="card pb-2">
							<div class="card-body">
								<div class="img-area mb-2 text-center"><img alt="" class="img-fluid w-25"
										src="images/motor.png"></div>
								<h2 class="card-title text-center mb-2">Free Delivery</h2>
								<hr>
								<p class="lead">We provide free delivery service for a minimum purchase of (2kg), within
									the
									Cordova area only. However, for customers located outside Cordova,
									a delivery fee will be charged based on your location.</p>
							</div>
						</div>
					</div>
					<div class="col-12 col-md-12 col-lg-4">
						<div class="card pb-2">
							<div class="card-body">
								<div class="img-area mb-2 text-center"><img alt="" class="img-fluid w-25"
										src="images/pickup.png"></div>
								<h2 class="card-title text-center mb-2">Pick-up</h2>
								<hr>
								<p class="lead">We also offer a convenient pick-up option for customers who prefer to
									collect their orders themselves. Simply place your order online or over the phone,
									and
									we will have it ready for you to pick up at your desired time and location.</p>
							</div>
						</div>
					</div>
					<div class="col-12 col-md-12 col-lg-4">
						<div class="card pb-2">
							<div class="card-body">
								<div class="img-area mb-2 text-center"><img alt="" class="img-fluid w-25"
										src="images/scaling.png"></div>
								<h2 class="card-title text-center mb-2">Free Fish Scaling</h2>
								<hr>
								<p class="lead">Enjoy hassle-free seafood preparation with our free scaling service for
									all
									fish purchases.</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<a href="#" class="to-top d-flex align-items-center justify-content-center text-decoration-none  text-white" id="to-top">
				<i class="fa-solid fa-chevron-up"></i>
			</a>
		</section>

		<!-- Services End -->

		<!-- Footer Start -->
		<footer class="foot">
			<div class="container">
				<div class="row">
					<div class="col-lg-3 col-sm-6 mt-5">
						<div class="single-box">
							<img src="images/logo.png" class="logo w-50" alt="">
						</div>
					</div>
					<div class="col-lg-3 col-sm-6 mt-5">
						<div class="single-box">
							<h2>MENU</h2>
							<ul class="list-unstyled text-decoration-none text-white">
								<li><a class="text-decoration-none text-white" href="#">Home</a></li>
								<li><a class="text-decoration-none text-white" href="#products">Products</a></li>
								<li><a class="text-decoration-none text-white" href="#about">About Us</a></li>
								<li><a class="text-decoration-none text-white" href="#services">Services</a></li>
							</ul>
						</div>
					</div>
					<div class="col-lg-3 col-sm-6 mt-5">
						<div class="single-box">
							<h4>We Accept:</h4>
							<ul class="list-unstyled">
								<li>Gcash</li>
								<li>Paymaya</li>
								<li>Cash on Delivery</li>
							</ul>
						</div>
					</div>
					<div class="col-lg-3 col-sm-6 mt-5">
						<div class="single-box">
							<h4>Follow Us:</h4>
							<p class="socials mb-4">
								<a href="https://www.facebook.com/charlyn.ngujo">
									<i class="fa fa-brands fa-facebook fa-lg"></i></a>
								<a href="https://www.tiktok.com/@cseofficial23">
									<i class="fa fa-brands fa-tiktok fa-lg"></i></a>
								<a href="https://www.instagram.com/cseofficial23/">
									<i class="fa fa-brands fa-instagram fa-lg"></i></a>
							</p>
							<div>
								<h4>Contact Us</h4>
								<p><i class="fa-solid fa-phone"></i> 09984018923</p>
							</div>
						</div>
					</div>
					<hr>
					<p class="text-center mt-2">Copyright © 2023 . Charlyn's Seafood Essentials. All Rights Reserved</p>
				</div>
			</div>
		</footer>
		<!-- Footer End -->

		<!-- Custom JS -->
		<script src="./plugins/privacy/jquery.js"></script>
		<script src="./plugins/privacy/landingPage.js"></script>
		<script src="./plugins/bundle/collapse.js"></script>
		<script src="./plugins/bundle/scroll.js"></script>

		<!-- Boostrap JS -->
		<script src="toaster/toastr.min.js"></script>
		<script src="bootstrap/boots.js"></script>
</body>

</html>