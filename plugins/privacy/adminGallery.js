$(document).ready(function () {
    doRequestDisplayGallery();
});



$('#btn-add-gallery').click(function () {
    check();
});


var check = () => {
    var g_image = $('#r_image').val();
    var descript = $('#descript').val();


    if (g_image !== "" && descript !== "") {
        var formData = new FormData();
        formData.append('choice', 'AddGallery');
        formData.append('g_image', $('#g_image')[0].files[0]);
        formData.append('descript', descript);


        doRequestAddGallery(formData);
    } else {
        toastr.error("Please fill in all fields correctly");
    }
};


var doRequestAddGallery = (formData) => {
    $.ajax({
        type: "POST",
        url: "../../routes/router.php",
        data: formData,
        processData: false,
        contentType: false,
        success: (data) => {
            // console.log(data);
            if (data === "200") {
                Swal.fire({
                    icon: 'success',
                    title: 'Image Succesfully Added',
                    showConfirmButton: false,
                    timer: 2000
                }).then(() => {
                    window.location.href = "../../pages/admin/adminGallery.php";
                });
            }
        },
        error: (xhr, ajaxOptions, thrownError) => {
            alert(thrownError);
        },
    });
};


var doRequestDisplayGallery = () => {
    $.ajax({
        type: "POST",
        url: "../../routes/router.php",
        data: { choice: 'DisplayGallery', },

        success: function (data) {
            // console.log(data);
            var json = JSON.parse(data);
            var str = "";
            let gallery = 1;

            json.sort(function (a, b) {
                var dateA = new Date(a.created);
                var dateB = new Date(b.created);
                return dateB - dateA;
            });
            json.reverse();

            json.forEach(element => {

                str += '<div class="col-12 col-md-12 col-lg-4 mb-2">';
                str += '<div class="card text-center pb-2">';
                str += '<div class="card-body">';
                str += '<div class="img-area text-center">';
                str += '<img class="fish" alt="" src="../../uploads/galleryImage/' + element.g_image + '">';
                str += '<div class="pt-2 text-muted">' + element.created + '</div>';
                str += '<div class="d-flex align-items-center justify-content-center">';
                str += '<button gallery_id="' + element.gallery_id + '" data-bs-toggle="modal" data-bs-target="#galleryView" class="btn-status mt-2 mx-2 btn-view-gallery">View</button>';
                str += '<button gallery_id="' + element.gallery_id + '" data-bs-toggle="modal" data-bs-target="#galleryUpdate" class="btn btn-update mt-2 btn-update-gallery"><i class="bi bi-pencil-square"></i></button>';
                str += '</div>';
                str += '</div>';
                str += '</div>';
                str += '</div>';
                str += '</div>';

                gallery++;

            });
            $('#displayGallery').append(str);

            $(document).on('click', '.btn-view-gallery', function () {
                let SetIdGallery = $(this).attr("gallery_id");
                console.log(SetIdGallery);
                doRequestDisplayGalleryModal(SetIdGallery);
            });

            $(document).on('click', '.btn-update-gallery', function () {
                let SetIdGalleryUpdate = $(this).attr("gallery_id");
                console.log(SetIdGalleryUpdate);
                doRequestDisplayGalleryModalUpdate(SetIdGalleryUpdate);
            });
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(thrownError);
        }


    });


}

var doRequestDisplayGalleryModal = (SetIdGallery) => {
    $.ajax({
        type: "POST",
        url: "../../routes/router.php",
        data: { choice: 'DisplayGalleryModal', gallery_id: SetIdGallery },

        success: function (data) {
            // console.log(data);
            var json1 = JSON.parse(data);
            var str1 = "";
            let gallery1 = 1;

            json1.forEach(element1 => {

                str1 += '<div class="mb-2 mt-4 text-center">';
                str1 += '<label>Current Image: ' + element1.g_image + '</label><br>';
                str1 += '<img class="fish w-50 h-25 modalImage rounded" alt="" src="../../uploads/galleryImage/' + element1.g_image + '">';
                str1 += '</div>';
                str1 += '<div class="mb-2 text-center">';
                str1 += '<label>Description:</label>';
                str1 += '<p class="text-break">' + element1.descript + '</p>';
                str1 += '</div>';
                str1 += '<div class="mb-2 text-center">';
                str1 += '<label>Published at</label>';
                str1 += '<p>' + element1.created + '</p>';
                str1 += '</div>';

                gallery1++;

            });
            $('#displayDataGalleryModal').append(str1);

            $('#galleryView').on('hidden.bs.modal', function () {
                $('#displayDataGalleryModal').empty();
            });




        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(thrownError);
        }
    });

}


var doRequestDisplayGalleryModalUpdate = (SetIdGalleryUpdate) => {
    $.ajax({
        type: "POST",
        url: "../../routes/router.php",
        data: { choice: 'DisplayGalleryModalUpdate', gallery_id: SetIdGalleryUpdate },

        success: function (data) {
            // console.log(data);
            var json2 = JSON.parse(data);
            var str2 = "";
            let gallery2 = 1;

            json2.forEach(element2 => {

                str2 += '<div class="mb-2 mt-4">';
                str2 += '<label>Current Image: ' + element2.g_image + '</label><br>';
                str2 += '<input type="file" id="g_image_' + element2.gallery_id + '" value="' + element2.g_image + '" class="form-control" placeholder="Image">';
                str2 += '</div>';
                str2 += '<div class="mb-2 text-muted">';
                str2 += '<label>Description</label>';
                str2 += '<textarea type="text" id="descript_' + element2.gallery_id + '" rows="4" class="form-control text-break" placeholder="Description">' + element2.descript + '</textarea> ';
                str2 += '</div>';
                str2 += '<div class="d-flex align-items-center justify-content-center">';
                str2 += '<button gallery_id="' + element2.gallery_id + '" class="btn btn-sm btn-primary mt-2 update-btn-gallery">UPDATE</button>';
                str2 += '</div>';


                gallery2++;

            });
            $('#displayDataGalleryModalUpdate').append(str2);

            $('#galleryUpdate').on('hidden.bs.modal', function () {
                $('#displayDataGalleryModalUpdate').empty();
            });

            $('.update-btn-gallery').click(function () {
                let galleryId = $(this).attr("gallery_id");
                let newG_image = $('#g_image_' + galleryId).prop('files')[0];
                let newDescript = $('#descript_' + galleryId).val();

                doRequestUpdateGallery(newG_image, newDescript, galleryId);
            });



        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(thrownError);
        }
    });

}


var doRequestUpdateGallery = (newG_image, newDescript, galleryId) => {
    var formData = new FormData();
    formData.append('choice', 'UpdateGallery');
    formData.append('descript', newDescript);
    formData.append('gallery_id', galleryId);

    if (newG_image) {
        formData.append('g_image', newG_image);
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
                    title: 'Updated Succesfully',
                    showConfirmButton: false,
                    timer: 2000
                }).then(() => {
                    window.location.href = "../../pages/admin/adminGallery.php";
                });
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(thrownError);
        }
    });
};






