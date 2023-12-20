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

$('#btn-reg').click(function () {
    checking();
});

var checking = () => {
    if ($('#username').val() != "" && $('#email').val() != "" && $('#password').val() != "" && $('#cpass').val() != "") {
        if ($('#password').val().length <= 6) {
            toastr.error('Password must contain an uppercase letter and at least one special character..');
        } else if (!hasUpperCase($('#password').val()) || !hasSpecialChar($('#password').val())) {
            toastr.error('Password must contain an uppercase letter and at least one special character.');
        } else if ($('#password').val() != $('#cpass').val()) {
            toastr.error('Password not matched!');
        } else if (!isValidEmail($('#email').val())) {
            toastr.error('Invalid email format. Please use a valid Gmail address.');
        } else {
            req();
        }
    } else {
        toastr.error("Please fill in all the required fields.");
    }
}

function hasUpperCase(str) {
    return /[A-Z]/.test(str);
}

function hasSpecialChar(str) {
    return /[!@#$%^&*(),.?":{}|<>]/.test(str);
}

function isValidEmail(email) {
    var gmailRegex = /^[a-zA-Z0-9_.+-]+@gmail\.com$/;
    return gmailRegex.test(email);
}

var req = () => {
    $.ajax({
        type: "POST",
        url: "../../routes/router.php",
        data: { choice: 'signUp', username: $('#username').val(), email: $('#email').val(), password: $('#password').val() },
        success: function (data) {
            // console.log(data);
            if (data == "ExistUsername") {
                toastr.error("Username Already Taken");
            } else if (data == "ExistEmail") {
                toastr.error("The email you entered is already in use.");
            } else if (data == "InvalidEmail") {
                toastr.error("Your email address is invalid.");
            } else if (data == "200") {
                toastr.success("You have successfully registered");
                setTimeout(function () {
                    window.location.href = "../../pages/customer/login.php";
                }, 2000);
            } else {
                toastr.error(data);
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            toastr.error(thrownError);
        }
    });
}
