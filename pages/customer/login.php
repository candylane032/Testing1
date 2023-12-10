<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Login | Page</title>

	 <!-- DOWNLOADED CSS -->
	<link rel="stylesheet" href="../../bootstrap/boots.css">
	<link rel="stylesheet" href="../../fontawesome/all.min.css">
	<link rel="stylesheet" href="../../fontawesome/fontawesome.min.css">
	<link rel="stylesheet" href="../../bootstrap-icons-1.11.1/bootstrap-icons.css">

	<!-- CUSTOM CSS -->
	<link rel="stylesheet" href="../../css/style/global.css">
	<link rel="stylesheet" href="../../css/style/landing.css">
	<link rel="stylesheet" href="../../css/style/responsive.css">
	<link rel="stylesheet" href="../../css/style/customer/register.css">
	<link rel="stylesheet" href="../../toaster/toastr.min.css">
    <link rel="icon" type="image/x-icon" href="../../images/logo.png">

</head>
<body>
	<!-- Navbar Start -->
	<nav class="navbar navbar-expand-lg fixed-top">
		<div class="container">
			<a class="navbar-brand" href="./"><img src="../../images/logo.png" class="logo" alt=""></a>
			<button aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"
				class="navbar-toggler" data-bs-target="#navbarSupportedContent" data-bs-toggle="collapse" type="button">
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarSupportedContent">
				<ul class="navbar-nav ms-auto mb-2 mb-lg-0 text-uppercase">
					<li class="nav-item">
						<a class="nav-link" href="../.././">Home</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="">Products</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="">About Us</a>
					</li>
					<li class="nav-item">
						<a class="nav-link" href="">Services</a>
					</li>

				</ul>
			</div>
		</div>
	</nav>
	<!-- Navbar End -->
	
	<!-- Login Start -->
	<section class="register section-padding">
		<div class="container mt-3">
			<div class="register-wrap p-3">
				<div class="row mt-5">
					<div class="col-lg-4 m-auto bg-white wrapper">
						<h1 class="text-center fw-bold pt-3">Sign in</h1>
						<p class="text-center text-muted">Welcome back! <br> Log in to your account to purchase available products.</p>
						<div class="input-group mb-3">
							<span class="input-group-text"><i class="bi bi-person-fill"></i></span>
							<input type="text" id="username" class="form-control" placeholder="Username">
						</div>
						<div class="input-group mb-3">
							<span class="input-group-text"><i class="bi bi-envelope-fill"></i></span>
							<input type="email" id="email" class="form-control" placeholder="Email">
						</div>
						<div class="input-group mb-3">
							<span class="input-group-text"><i class="bi bi-lock-fill"></i></span>
							<input type="password" id="password" class="form-control" placeholder="Password">
							<span class="input-group-text " onclick="togglePassword('password')"><i class="bi bi-eye-fill"></i></span>
						</div>
						<div class="mb-3 text-center">
						<div class="col  mb-2">
							<button id="btnlogIn" class="btn-in text-white">Login</button>
						</div>
							<p class="mt-3">Don't Have an Account? <i class="bi bi-arrow-right"></i><a class="fw-bold text-decoration-none" href="register.php"> Register</a></p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Login End -->
	<script src="../../plugins/privacy/jquery.js"></script>
	<script src="../../plugins/privacy/login.js"></script>
	<script src="../../plugins/bundle/collapse.js" ></script>
	
	 <!-- DOWNLOADED JS -->
	 <script src="../../toaster/toastr.min.js"></script>
    <script src="../../sweetalert/alert.js"></script>
    <script src="../../bootstrap/boots.js"></script>
</body>
</html>