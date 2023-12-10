$(document).ready(function () {
    doRequestDisplayProfile();
    doRequestDisplayProfilePic();
    doRequestDisplayProfileModal();
});



var doRequestDisplayProfilePic = () => {
    $.ajax({
        type: "POST",
        url: "../../routes/router.php",
        data: { choice: 'DisplayProfilePic', },

        success: function (data) {
            console.log(data);
            var json2 = JSON.parse(data);
            var str2 = "";
            let pic2 = 1;

            json2.forEach(element2 => {

                str2 += '<img src="../../uploads/profileImage/' + element2.p_image + '" class="imgProfile mb-3" alt="">';
                str2 += '<div>';
                str2 += '<button user_id="' + element2.user_id + '" data-bs-toggle="modal" data-bs-target="#updateProfileImg" class="btn-reserve mb-5 btn-setId-profilePic">Change Profile</button>';
                str2 += '</div>';


            });
            $('#displayProfilePic').append(str2);

            $('.btn-setId-profilePic').click(function () {
                let SetIdProductPic = $(this).attr("user_id");
                doSetIdProfilePicModal(SetIdProductPic);
            });

        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(thrownError);
        }
    });



}

var doSetIdProfilePicModal = (SetIdProductPic) => {

    $.ajax({
        type: "POST",
        url: "../../routes/router.php",
        data: { choice: 'DisplayProfilePicModal', user_id: SetIdProductPic },

        success: function (data) {
            console.log(data);
            var json3 = JSON.parse(data);
            var str3 = "";
            let pic3 = 1;

            json3.forEach(element3 => {

                str3 += '<h3 class="text-center text-muted">Upload Profile Image</h3>';
                str3 += '<div class="mb-1">';
                str3 += '<input type="file" id="p_image_' + element3.user_id + '" value="' + element3.p_image + '" class="form-control">';
                str3 += '</div">';
                str3 += '<div class="mb-1 mt-3">';
                str3 += '<button user_id="' + element3.user_id + '" class="btn btn-sm btn-order btn-update-profilePic">UPDATE</button>';
                str3 += '</div">';

                pic3++;

            });
            $('#displayDataProfilePicModal').append(str3);

            $('#updateProfileImg').on('hidden.bs.modal', function () {
                $('#displayDataProfilePicModal').empty();
            });

            $('.btn-update-profilePic').click(function () {
                let userId = $(this).attr("user_id");
                let newP_image = $('#p_image_' + userId).prop('files')[0];
                doRequestUpdateProfilePicModal(newP_image, userId);
            });



        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(thrownError);
        }
    });


}


var doRequestUpdateProfilePicModal = (newP_image, userId) => {
    var formData = new FormData();
    formData.append('choice', 'UpdateProfilePicModal');
    formData.append('user_id', userId);

    if (newP_image) {
        formData.append('p_image', newP_image);
    }

    $.ajax({
        type: "POST",
        url: "../../routes/router.php",
        data: formData,
        processData: false,
        contentType: false,
        success: function (data) {
            console.log(data);
            if (data == "200") {
                Swal.fire({
                    icon: 'success',
                    title: 'Profile Picture Updated Successfully!',
                    showConfirmButton: false,
                    timer: 2000
                }).then(() => {
                    window.location.href = "../../pages/customer/profile1.php";
                });
            }

        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(thrownError);
        }
    });
}




$('#btn_insertEditProfile').click(function () {
    checkInfo();
});


var checkInfo = () => {
    var fname = $('#fname').val();
    var lname = $('#lname').val();
    var gender = $('#gender').val();
    var pnumber = $('#pnumber').val();
    var address = $('#address').val();

    if (fname != "" && lname != "" && gender != "" && isValidPhoneNumber(pnumber) && isNonNegativeNumber(pnumber) && address != "") {
        doRequestInsertEditProfile();
    } else {
        toastr.error('Please fill in all fields correctly, ensure that the phone number is 11 digits, and it is a non-negative number.');
    }
}


function isValidPhoneNumber(pnumber) {

    var digits = pnumber.replace(/\D/g, '');
    return digits.length === 11;
}

function isNonNegativeNumber(value) {
    var numericValue = parseFloat(value);
    return !isNaN(numericValue) && numericValue >= 0;
}


var doRequestInsertEditProfile = () => {

    $.ajax({
        type: "POST",
        url: "../../routes/router.php",
        data: {
            choice: 'InsertEditProfile',
            fname: $('#fname').val(),
            lname: $('#lname').val(),
            gender: $('#gender').val(),
            pnumber: $('#pnumber').val(),
            address: $('#address').val(),
        },
        success: function (data) {
            console.log(data);
            if (data == "409") {
                console.log("Exist Id");
            } else if (data == "200") {
                Swal.fire({
                    icon: 'success',
                    title: 'Profile Information Updated Successfully',
                    showConfirmButton: false,
                    timer: 2000
                }).then(() => {
                    window.location.href = "../../pages/customer/profile1.php";
                });
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(thrownError);
        }
    });
}


var doRequestDisplayProfile = () => {

    $.ajax({
        type: "POST",
        url: "../../routes/router.php",
        data: { choice: 'DisplayProfile', },

        success: function (data) {

            var json = JSON.parse(data);
            var str = "";
            let profile = 1;

            json.forEach(element => {

                str += '<div class="rowProfile row">';
                str += '<div class="col-12 col-lg-5">';
                str += '<label class="fw-bold text-muted">First Name</label>';
                str += '<p class="text-capitalize bg-light">' + element.fname + '</p>';
                str += '<label class="fw-bold text-muted">Gender</label>';
                str += '<p class="text-capitalize bg-light">' + element.gender + '</p>';
                str += '<label class="fw-bold text-muted">Address</label>';
                str += '<p class="text-capitalize bg-light">' + element.address + '</p>';

                str += '</div>';
                str += '<div class="col-12 col-lg-5">';
                str += '<label class="fw-bold text-muted">Last Name</label>';
                str += '<p class="text-capitalize bg-light">' + element.lname + '</p>';
                str += '<label class="fw-bold text-muted">Phone Number</label>';
                str += '<p class="bg-light">' + element.pnumber + '</p>';

                str += '</div>';
                str += '</div>';
                str += '<div class="rowProfile row">';
                str += '<div class="col-12 col-lg-10">';
                str += '<button data-bs-toggle="modal" data-bs-target="#update" profile_id=' + element.profile_id + ' class="btn btn-sm bg-secondary Button-display-profile">' + '<i class="bi bi-pencil-square"></i>' + '</button>';
                str += '</div>';
                str += '</div>';
                profile++;

            });
            $('#displayDataProfile').append(str);


            $('.Button-display-profile').click(function () {
                let SetIdProfile = $(this).attr("profile_id");
                doSetIdProfile(SetIdProfile);
            });


        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(thrownError);
        }
    });


    var doSetIdProfile = (SetIdProfile) => {
        $.ajax({
            type: "POST",
            url: "../../routes/router.php",
            data: { choice: 'SetIdProfile', SetIdProfile: SetIdProfile },
            success: function (data) {
                console.log(data);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(thrownError);
            }



        });
    }
}



var doRequestDisplayProfileModal = () => {

    $.ajax({
        type: "POST",
        url: "../../routes/router.php",
        data: { choice: 'DisplayProfileModal', },

        success: function (data) {
            console.log(data);
            var json1 = JSON.parse(data);
            var str1 = "";
            let profile1 = 1;

            json1.forEach(element1 => {

                str1 += '<h2 class="text-center">Update Profile</h2>';
                str1 += '<div class="mb-1 mt-4">';
                str1 += '<label class="fw-bold">First Name</label>';
                str1 += '<input type="text" id="fname" value="' + element1.fname + '" class="form-control text-capitalize" placeholder="Enter First Name">';
                str1 += '</div>';
                str1 += '<div class="mb-1">';
                str1 += '<label class="fw-bold">Last Name</label>';
                str1 += '<input type="text" id="lname" value="' + element1.lname + '" class="form-control text-capitalize" placeholder="Enter Last Name">';
                str1 += '</div>';
                str1 += '<div class="mb-1">';
                str1 += '<label class="fw-bold">Gender</label>';
                str1 += '<select class="form-control text-capitalize" value="' + element1.gender + '" id="gender">';
                str1 += '<option class="form-control text-capitalize" value="male">male</option>';
                str1 += '<option class="form-control text-capitalize" value="female">female</option>';
                str1 += '</select>';
                str1 += '</div>';
                str1 += '<div class="mb-1">';
                str1 += '<label class="fw-bold">Phone number</label>';
                str1 += '<input type="number" id="pnumber" value="' + element1.pnumber + '" class="form-control" placeholder="Enter Number">';
                str1 += '</div>';
                str1 += '<div class="mb-1">';
                str1 += '<label class="fw-bold">Address</label>';
                str1 += '<input type="text" id="address" value="' + element1.address + '" class="form-control text-capitalize" placeholder="Enter Address">';
                str1 += '</div>';
                str1 += '<div class="mb-1 text-center">';
                str1 += '<button id="btn-update-profile" class="btn-order mt-3 text-white">SAVE</button>';
                str1 += '</div>';



                profile1++;

            });
            $('#displayDataProfileModal').append(str1);

            var checkInfoUpdate = () => {
                let newFname = $('#fname').val();
                let newLname = $('#lname').val();
                let newGender = $('#gender').val();
                let newPnumber = $('#pnumber').val();
                let newAddress = $('#address').val();

                if (isValidPhoneNumber1(newPnumber) && isNonNegativeNumber1(newPnumber)) {
                    doRequestNewUpdateProfile(newFname, newLname, newGender, newPnumber, newAddress);
                } else {
                    toastr.error('Please fill in all fields correctly, ensure that the phone number is 11 digits, and it is a non-negative number.');
                }
            }


            function isValidPhoneNumber1(pnumber) {

                var digits = pnumber.replace(/\D/g, '');
                return digits.length === 11;
            }

            function isNonNegativeNumber1(value) {
                var numericValue = parseFloat(value);
                return !isNaN(numericValue) && numericValue >= 0;
            }



            $('#btn-update-profile').click(function () {
                checkInfoUpdate();
            });

        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(thrownError);
        }
    });


}




var doRequestNewUpdateProfile = (newFname, newLname, newGender, newPnumber, newAddress) => {
    $.ajax({
        type: "POST",
        url: "../../routes/router.php",
        data: {
            choice: 'UpdateProfile',
            fname: newFname,
            lname: newLname,
            gender: newGender,
            pnumber: newPnumber,
            address: newAddress
        },
        success: function (data) {
            console.log(data);
            if (data == "200") {
                Swal.fire({
                    icon: 'success',
                    title: 'Profile Information Updated Successfully',
                    showConfirmButton: false,
                    timer: 2000
                }).then(() => {
                    window.location.href = "../../pages/customer/profile1.php";
                });
            }

        }
    });
};

