$(document).ready(function () {
    doRequestDisplayGallery();
});


var doRequestDisplayGallery = () => {
    $.ajax({
        type: "POST",
        url: "../../routes/router.php",
        data: { choice: 'DisplayGallery', },

        success: function (data) {

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
                str += '<div class="pt-2">' + element.created + '</div>';
                str += '<div class="d-flex align-items-center justify-content-center">';
                str += '<button gallery_id="' + element.gallery_id + '" data-bs-toggle="modal" data-bs-target="#galleryView" class="btn btn-info btn-sm mt-2 mx-2 btn-view-gallery">View</button>';

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


var searchProducts = () => {
    var searchQuery = $('#searchInput').val();
    var container = $('#displayGallery');

    $.ajax({
        type: "POST",
        url: "../../routes/router.php",
        data: { choice: 'DisplayGallery' },
        success: function (data) {
            try {
                var json = JSON.parse(data);
                json.sort(function (a, b) {
                    var dateA = new Date(a.created);
                    var dateB = new Date(b.created);
                    return dateB - dateA;
                });
                json.reverse();
                container.empty();
                if (searchQuery === '') {
                    json.forEach(function (e) {
                        displaySearch(container, e);
                    });
                } else {
                    var filteredData = json.filter(function (e) {
                        return (
                            e.created.toLowerCase().includes(searchQuery.toLowerCase())
                        );
                    });

                    if (filteredData.length === 0) {
                        container.append("<p>No matching products found.</p>");
                    } else {
                        filteredData.forEach(function (e) {
                            displaySearch(container, e);
                        });
                    }
                }
            } catch (error) {
                console.error("Error parsing JSON data: " + error);
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert("An error occurred: " + thrownError);
        }
    });
}


function displaySearch(container, e) {

    str = ''
    str += '<div class="col-12 col-md-12 col-lg-4 mb-2">';
    str += '<div class="card text-center pb-2">';
    str += '<div class="card-body">';
    str += '<div class="img-area text-center">';
    str += '<img class="fish" alt="" src="../../uploads/galleryImage/' + e.g_image + '">';
    str += '<div class="pt-2">' + e.created + '</div>';
    str += '<div class="d-flex align-items-center justify-content-center">';
    str += '<button gallery_id="' + e.gallery_id + '" data-bs-toggle="modal" data-bs-target="#galleryView" class="btn btn-info btn-sm mt-2 mx-2 btn-view-gallery">View</button>';

    str += '</div>';
    str += '</div>';
    str += '</div>';
    str += '</div>';
    str += '</div>';

    container.append(str);
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

                str1 += '<div class="mb-3 text-center">';
                str1 += '<img class="w-50 h-25 object-fit-cover modalImage" alt="" src="../../uploads/galleryImage/' + element1.g_image + '">';
                str1 += '</div>';
                str1 += '<div class="mb-2 text-center ">';
                str1 += '<label class="fw-bold">Description:</label>';
                str1 += '<div class="text-break">' + element1.descript + '</div>';
                str1 += '</div>';
                str1 += '<div class="mb-2 text-center">';
                str1 += '<label class="fw-bold">Date:</label>';
                str1 += '<div>' + element1.created + '</div>';
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
