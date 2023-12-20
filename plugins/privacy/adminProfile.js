$(document).ready(function () {
    doRequestDisplayProfilePic();
});


var doRequestDisplayProfilePic = () => {
    $.ajax({
        type: "POST",
        url: "../../routes/router.php",
        data: { choice: 'DisplayProfilePic', },

        success: function (data) {
            // console.log(data);
            var json2 = JSON.parse(data);
            var str2 = "";
            let pic2 = 1;

            json2.forEach(element2 => {

                str2 += '<img src="../../uploads/profileImage/' + element2.p_image + '" class="imgProfile mb-3" alt="">';
                str2 += '<div>';
                str2 += '<button user_id="' + element2.user_id + '" data-bs-toggle="modal" data-bs-target="#updateProfileImg" class="btn-status mb-5 btn-setId-profilePic">Edit Profile</button>';
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
            // console.log(data);
            var json3 = JSON.parse(data);
            var str3 = "";
            let pic3 = 1;

            json3.forEach(element3 => {

                str3 += '<h1>Upload Profile Image</h1>';
                str3 += '<div class="mb-1">';
                str3 += '<label>Current Image: ' + element3.p_image + ' </label>';
                str3 += '<input type="file" id="p_image_' + element3.user_id + '" value="' + element3.p_image + '" class="form-control">';
                str3 += '</div">';
                str3 += '<div class="mt-3 text-center">';
                str3 += '<button user_id="' + element3.user_id + '" class="btn-update mt-2 btn-update-profilePic">UPDATE</button>';
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
            // console.log(data);
            if (data == "200") {
                Swal.fire({
                    icon: 'success',
                    title: 'Profile Picture Updated Successfully',
                    showConfirmButton: false,
                    timer: 2000
                }).then(() => {
                    window.location.href = "../../pages/admin/adminProfile.php";
                });
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(thrownError);
        }
    });
}