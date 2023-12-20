$(document).ready(function () {
    doRequestDisplayReservesPending();
});

var doRequestDisplayReservesPending = () => {
    $.ajax({
        type: "POST",
        url: "../../routes/router.php",
        data: { choice: 'DisplayReservesPending', },
        success: function (data) {
            var json = JSON.parse(data);
            var str = "";
            let basket = 1;

            var uniqueUsernames = {};
            var uniqueFnames = {};

            json.forEach(element => {
                if(!uniqueUsernames.hasOwnProperty(element.username)){
                    str += '<tr>';
                    str += '<td class="text-capitalize" data-label="UNAME">' + element.username + '</td>';
                    str += '<td class="text-capitalize" data-label="FNAME">' + element.fname + '</td>';
                    str += '<td class="text-capitalize" data-label="LNAME">' + element.lname + '</td>';
                    str += '<td class="text-capitalize" data-label="ADDRESS">' + element.address + '</td>';
                    str += '<td data-label="DATE">' + element.created + '</td>';
                    str += '<td data-label="ACTION">';
                    str += '<button username="' + element.username + '" data-bs-toggle="modal" data-bs-target="#reservesbyid" class="btn-update mx-1 btn-update-reserves"><i class="bi bi-pencil-square"></i></button>';
                    str += '<button class="btn-status mx-1"><a class="text-decoration-none text-white" href="../chatAdmin/index.php"><i class="bi bi-chat-dots"></i></a></button>';
                    str += '</td>';
                    str += '</tr>';

                    uniqueUsernames[element.username] = true;
                    uniqueFnames[element.fname] = true;

                }
                basket++;
            });
            $('#displayReservesPending').append(str);



            $('.btn-update-reserves').click(function () {
                let userUsername = $(this).attr("username");

                doRequestDisplayReservesById(userUsername);
            });


        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(thrownError);
        }
    });

}

var doRequestUpdateReservePaymentStatus = (reserveId, payment_stat) => {
    $.ajax({
        type: "POST",
        url: "../../routes/router.php",
        data: {
            choice: 'UpdateReservePaymentStatus',
            reserve_id: reserveId,
            payment_status: payment_stat,
        },
        success: function (data) {
            // console.log(data);
            if (data === "200") {
                console.log("Countdown Duration Expired");
                window.location.href = "../../pages/admin/adminBasket.php";
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(thrownError);
        },
    });
}

var doRequestDisplayReservesById = (userUsername) => {
    $.ajax({

        type: "POST",
        url: "../../routes/router.php",
        data: { choice: 'DisplayReservesById', username: userUsername },
        success: function (data) {
            // console.log(data);
            var json1 = JSON.parse(data);
            var str1 = "";
            let orderbyId = 1;

            var uniqueFnames = {};
            json1.forEach(element1 => {

                str1 += '<div class="rowOrder row mt-2 p-3 mb-3">';
                str1 += '<div class="col-12 col-lg-6">';
                str1 += '<div>';
            if(!uniqueFnames.hasOwnProperty(element1.fname)){    
                str1 += '<label class="fw-bold">FULL NAME</label>';
                str1 += '<p><span class="text-capitalize">' + element1.fname + '</span><span class="text-capitalize"> ' + element1.lname + '</span></p>';
                str1 += '</div>';
                str1 += '<div>';
                str1 += '<label class="fw-bold">ADDRESS</label>';
                str1 += '<p class="text-capitalize">' + element1.address + '</p>';
                str1 += '</div>';
                str1 += '<div>';
                str1 += '<label class="fw-bold">PHONE NUMBER</label>';
                str1 += '<p>' + element1.pnumber + '</p>';
                str1 += '</div>';

                uniqueFnames[element1.fname] = true;
            }
                str1 += '<div>';
                str1 += '<label class="fw-bold">PRODUCT NAME</label>';
                str1 += '<p>' + element1.pname + '</p>';
                str1 += '</div>';
                // str1 += '<div>';
                // str1 += '<label class="fw-bold">PRODUCT IMAGE</label>';
                // str1 += '<p><img class="orderImg rounded object-fit-cover" src="../../uploads/productImage/' + element1.img + '"></p>';
                // str1 += '</div>';
                str1 += '<div>';
                str1 += '<label class="fw-bold">PRODUCT PRICE</label>';
                str1 += '<p>' + element1.p_price + '</p>';
                str1 += '</div>';
                str1 += '<div>';
                str1 += '<label class="fw-bold">ORDER KILO</label>';
                str1 += '<p>' + element1.reserve_kilo + '</p>';
                str1 += '</div>';
                str1 += '<div>';
                str1 += '<label class="fw-bold">TOTAL AMOUNT</label>';
                str1 += '<p>' + element1.r_total_amount + '</p>';
                str1 += '</div>';

                str1 += '</div>';
                str1 += '<div class="col-12 col-lg-6">';
                var pmethod = element1.r_p_method;
                if (pmethod == "cod") {
                    str1 += '<div>';
                    str1 += '<label class="fw-bold">RECEIPT</label>';
                    str1 += '<p>' + element1.r_p_method_receipt + '</p>';
                    str1 += '</div>';
                    str1 += '<div>';
                    str1 += '<label class="fw-bold">PAYMENT METHOD</label>';
                    str1 += '<p class="text-uppercase"ancelled>' + pmethod + '</p>';
                    str1 += '</div>';
                }
                else {
                    str1 += '<div>';
                    str1 += '<label class="fw-bold">RECEIPT IMAGE</label>';
                    str1 += '<p><img class="paymentImg rounded" src="../../uploads/receiptImage/' + element1.r_p_method_receipt + '"></p>';
                    str1 += '</div>';
                    str1 += '<div>';
                    str1 += '<label class="fw-bold">PAYMENT METHOD</label>';
                    str1 += '<p class="text-uppercase">' + element1.r_p_method + '</p>';
                    str1 += '</div>';
                }

                str1 += '<div>';
                str1 += '<label class="fw-bold">REFERENCE NUMBER</label>';
                str1 += '<p>' + element1.r_ref_num + '</p>';
                str1 += '</div>';

                var textColorStatus = element1.payment_status === "pending" ? 'text-warning' : 'text-success';

                str1 += '<label >Payment Status: <span class="' + textColorStatus + ' fw-bold">' + element1.payment_status + '</span></label><br><br>';
                var textColorDelivery;

                switch (element1.r_delivery) {
                    case "waiting":
                        textColorDelivery = 'text-info';
                        break;
                    case "preparing":
                        textColorDelivery = 'text-warning';
                        break;
                    case "On the Way":
                        textColorDelivery = 'text-primary';
                        break;
                    default:
                        textColorDelivery = 'text-success';
                }

                str1 += '<label>Delivery Status: <span class="' + textColorDelivery + ' fw-bold">' + element1.r_delivery + '</span></label><br><br>';
                str1 += '<label>Date & Time: <span class=" fw-bold">' + element1.created + '</span></label><br><br>';

                str1 += '<div class="mb-3">';
                str1 += '<label class="fw-bold">PAYMENT STATUS</label>';
                str1 += '<select class="form-control" id="p_status_' + element1.reserve_id + '" value="' + element1.payment_status + '">';
                str1 += '<option class="text-warning" value="pending">Pending</option>';
                str1 += '<option class="text-success" value="paid">Paid</option>';
                str1 += '<option class="text-danger" value="canceled">Canceled</option>';
                str1 += '</select>';
                str1 += '</div>';
                str1 += '<div>';
                str1 += '<label class="fw-bold">DELIVERY</label>';
                str1 += '<select class="form-control" id="delivery_' + element1.reserve_id + '" value="' + element1.r_delivery + '">';
                str1 += '<option value="waiting">Waiting</option>';
                str1 += '<option value="preparing">Preparing</option>';
                str1 += '<option value="on the way">On the Way</option>';
                str1 += '<option value="complete">Complete</option>';
                str1 += '<option value="canceled">Canceled</option>';
                str1 += '</select>';
                str1 += '</div>';
                str1 += '</div>';
                str1 += '<div>';
                str1 += '<button reserve_id="' + element1.reserve_id + '" class="btn-update mt-2 d-flex m-auto update-btn-reserveById">UPDATE</button>';
                str1 += '</div>';
                str1 += '</div>';


                orderbyId++;
            });
            $('#displayReservesDataById').append(str1);

            $('#reservesbyid').on('hidden.bs.modal', function () {
                $('#displayReservesDataById').empty();
            });

            $('.update-btn-reserveById').click(function () {
                let reserveIdUpdate = $(this).attr("reserve_id");
                let newP_status = $('#p_status_' + reserveIdUpdate).val();
                let newDelivery = $('#delivery_' + reserveIdUpdate).val();
                doRequestUpdateReservePstatusDelivery(newP_status, newDelivery, reserveIdUpdate);

            });


        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(thrownError);
        }
    });
}


var doRequestUpdateReservePstatusDelivery = (newP_status, newDelivery, reserveIdUpdate) => {

    $.ajax({
        type: "POST",
        url: "../../routes/router.php",
        data: {
            choice: 'UpdateReservePstatusDelivery',
            payment_status: newP_status,
            r_delivery: newDelivery,
            reserve_id: reserveIdUpdate,
        },
        success: function (data) {
            // console.log(data);
            if (data == "200") {
                Swal.fire({
                    icon: 'success',
                    title: 'Reservation Updated Successfully!',
                    showConfirmButton: false,
                    timer: 2000
                }).then(() => {
                    window.location.href = "../../pages/admin/adminBasket.php";
                });
            }

        }
    });
}

var reserveSearch = () => {
    var searchQuery = $('#reserveSearchInput').val().toLowerCase(); // Convert the search query to lowercase
    var container = $('#displayReservesPending');

    $.ajax({
        type: "POST",
        url: "../../routes/router.php",
        data: { choice: 'DisplayReservesPending' },
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
                        // Use includes() directly on lowercase strings for case-insensitive comparison
                        return e.username.toLowerCase().includes(searchQuery);
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

   
    str = '';

    
        str += '<tr>';
        str += '<td class="text-capitalize" data-label="UNAME">' + e.username + '</td>';
        str += '<td class="text-capitalize" data-label="FNAME">' + e.fname + '</td>';
        str += '<td class="text-capitalize" data-label="LNAME">' + e.lname + '</td>';
        str += '<td class="text-capitalize" data-label="ADDRESS">' + e.address + '</td>';
        str += '<td data-label="DATE">' + element.created + '</td>';
        str += '<td data-label="ACTION">';
        str += '<button username="' + e.username + '" data-bs-toggle="modal" data-bs-target="#reservesbyid" class="btn-update mx-1 btn-update-reserves"><i class="bi bi-pencil-square"></i></button>';
        str += '<button class="btn-status mx-1"><a class="text-decoration-none text-white" href="../chatAdmin/index.php"><i class="bi bi-chat-dots"></i></a></button>';
        str += '</td>';
        str += '</tr>';

    

    container.append(str);

    $('.btn-update-reserves').click(function () {
        let userUsername = $(this).attr("username");

        doRequestDisplayReservesById(userUsername);
    });

}



