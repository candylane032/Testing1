
// $('#btn-logout').click(function(){
//     if(confirm('Are you sure to logout?')) {
//         logout();
//     }
//     return false;
// });

// var logout =()=>{
//     $.ajax({
//         type: "POST",
//         url: "../../routes/router.php",
//         data: {choice:'logout'},
//         success: function(data){
//             console.log(data);
//             if (data == "200") {
                
//                 window.location.href = "../../";
//             }
//         }, 
//         error: function (xhr, ajaxOptions, thrownError) {
//             alert(thrownError);
//         }
//     });
// }

$('#btn-logout').click(function() {
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

var logout =()=>{
    $.ajax({
        type: "POST",
        url: "../../routes/router.php",
        data: {choice:'logout'},
        success: function(data){
            if (data == "200") {
                // alert(data)
                // localStorage.setItem('isloggedin','404');
    localStorage.removeItem("SessionLocalStorage");
                window.location.href = "../../";
            }
        }, 
        error: function (xhr, ajaxOptions, thrownError) {
            alert(thrownError);
        }
    });
}