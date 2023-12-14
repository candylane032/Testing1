$('#btn-logout').click(function () {
    Swal.fire({
        title: 'Are you sure to Logout?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel'
    }).then((result) => {
        if (result.isConfirmed) {
            logout();
        }
    });
    return false;
});

var logout = () => {
    $.ajax({
        type: "POST",
        url: "../../routes/router.php",
        data: { choice: 'logout' },
        success: function (data) {
            if (data == "200") {
                localStorage.removeItem("SessionLocalStorage");
                window.location.href = "../../";
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(thrownError);
        }
    });
}