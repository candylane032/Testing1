function togglePassword(inputId) {
    const passwordInput = document.getElementById(inputId);
    const icon = passwordInput.nextElementSibling.querySelector('i');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        icon.classList.remove('bi-eye-fill');
        icon.classList.add('bi-eye-slash-fill');
    } else {
        passwordInput.type = 'password';
        icon.classList.remove('bi-eye-slash-fill');
        icon.classList.add('bi-eye-fill');
    }
}

$('#btnlogIn').click(function () {
    if ($('#username').val() !== "" && $('#email').val() !== "" && $('#password').val() !== "") {
        signIn();
    } else {
        toastr.error('Please fill in all the required fields.');
    }
});

var signIn = () => {
    $.ajax({
        type: "POST",
        url: "../../routes/router.php",
        data: {
            choice: 'signIn',
            username: $('#username').val(),
            email: $('#email').val(),
            password: $('#password').val()
        },
        success: function (data) {
            // console.log(data);
            if (data === "InvalidEmail") {
                toastr.error("Invalid email format. Please provide a valid email address.");
            } else if (data === "IncorrectEmail") {
                toastr.error("Incorrect email. Please provide a valid email address.");
            } else {
                var response = JSON.parse(data);
                var p_image = response.p_image;
                if (response.status === "200") {

                    if (response.role === "admin") {
                        toastr.success("Login Successfully.");
                        window.location.href = "../../pages/admin/adminDash.php";
                    } else if (response.role === "customer") {
                        if (response.classification === "Non Verified") {
                            toastr.success("Login successful!");
                            window.location.href = "../../pages/customer/";
                        } else if (response.classification === "Verified") {
                            toastr.success("Login successful!");
                            window.location.href = "../../pages/customer/product.php";
                        } else {
                            toastr.error("Invalid username");
                        }
                    } else {
                        toastr.error("Invalid username");
                    }
                } else if (response.status === "401") {
                    toastr.error("Invalid username or password");
                } else {
                    toastr.error("Invalid Password");
                }
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            toastr.error("An error occurred: " + thrownError);
        }
    });
}

