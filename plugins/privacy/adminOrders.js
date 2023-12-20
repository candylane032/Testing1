$(document).ready(function () {
    doRequestDisplayOrdersUnpaid();
});


var doRequestDisplayOrdersUnpaid = () => {
    $.ajax({
        type: "POST",
        url: "../../routes/router.php",
        data: { choice: 'DisplayOrdersUnpaid', },
        success: function (data) {
            // console.log(data);
            var json = JSON.parse(data);
            var str = "";
            // let order = 1;

            var uniqueUsernames = {};
            var uniqueFnames = {};

            json.forEach(element => {
                if (!uniqueUsernames.hasOwnProperty(element.username)) {
                    str += '<tr>';
                    // str += '<td data-label="Count">' + order + '</td>';
                    str += '<td class="text-capitalize" data-label="UNAME">' + element.username + '</td>';
                    str += '<td class="text-capitalize" data-label="FNAME">' + element.fname + '</td>';
                    str += '<td class="text-capitalize" data-label="LNAME">' + element.lname + '</td>';
                    str += '<td class="text-capitalize" data-label="ADDRESS">' + element.address + '</td>';
                    str += '<td data-label="DATE">' + element.created + '</td>';
                    str += '<td data-label="ACTION">';
                    str += '<button username="' + element.username + '" data-bs-toggle="modal" data-bs-target="#orderbyid" class="btn-update mx-1 btn-update-order"><i class="bi bi-pencil-square"></i></button>';
                    str += '<button class="btn-status mx-1"><a class="text-decoration-none text-white" href="../chatAdmin/index.php"><i class="bi bi-chat-dots"></i></a></button>';
                    str += '</td>';
                    str += '</tr>';

                    uniqueUsernames[element.username] = true;
                    uniqueFnames[element.fname] = true;
                    // order++;
                }
                
            });
            $('#displayOrdersUnPaid').append(str);



            $('.btn-update-order').click(function () {
                let userUsername = $(this).attr("username");

                doRequestDisplayOrderById(userUsername);
            });


        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(thrownError);
        }
    });

}


var doRequestDisplayOrderById = (userUsername) => {
    $.ajax({

        type: "POST",
        url: "../../routes/router.php",
        data: { choice: 'DisplayOrderById', username: userUsername },
        success: function (data) {
            // console.log(data);
            var json1 = JSON.parse(data);
            var str1 = "";
            let orderbyId = 1;

            var fnames = {};
            var lnames = {};

            json1.forEach(element1 => {

                str1 += '<div class="rowOrder row mt-2 p-3 mb-3">';
                str1 += '<div class="col-12 col-lg-6">';
                str1 += '<div>';
                if (!fnames.hasOwnProperty(element1.fname) && !lnames.hasOwnProperty(element1.lname)) {
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

                    fnames[element1.fname] = true;
                    lnames[element1.lname] = true;
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
                str1 += '<p>' + element1.order_kilo + '</p>';
                str1 += '</div>';
                str1 += '<div>';
                str1 += '<label class="fw-bold">TOTAL AMOUNT</label>';
                str1 += '<p>' + element1.total_amount + '</p>';
                str1 += '</div>';

                str1 += '</div>';
                str1 += '<div class="col-12 col-lg-6">';
                var pmethod = element1.p_method;
                if (pmethod == "cod") {
                    str1 += '<div>';
                    str1 += '<label class="fw-bold">RECEIPT</label>';
                    str1 += '<p>' + element1.p_method_receipt + '</p>';
                    str1 += '</div>';
                    str1 += '<div>';
                    str1 += '<label class="fw-bold">PAYMENT METHOD</label>';
                    str1 += '<p class="text-uppercase">' + pmethod + '</p>';
                    str1 += '</div>';
                }
                else {
                    str1 += '<div>';
                    str1 += '<label class="fw-bold">RECEIPT IMAGE</label>';
                    str1 += '<p><img class="paymentImg rounded" src="../../uploads/receiptImage/' + element1.p_method_receipt + '"></p>';
                    str1 += '</div>';
                    str1 += '<div>';
                    str1 += '<label class="fw-bold">PAYMENT METHOD</label>';
                    str1 += '<p class="text-uppercase">' + element1.p_method + '</p>';
                    str1 += '</div>';
                }

                str1 += '<div>';
                str1 += '<label class="fw-bold">REFERENCE NUMBER</label>';
                str1 += '<p>' + element1.ref_num + '</p>';
                str1 += '</div>';

                var textColorStatus = element1.o_payment_status === "pending" ? 'text-warning' : 'text-success';

                str1 += '<label >Payment Status: <span class="' + textColorStatus + ' fw-bold">' + element1.o_payment_status + '</span></label><br><br>';
                var textColorDelivery;

                switch (element1.o_delivery) {
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

                str1 += '<label>Delivery Status: <span class="' + textColorDelivery + ' fw-bold">' + element1.o_delivery + '</span></label><br><br>';
                str1 += '<label>Date & Time: <span class=" fw-bold">' + element1.created + '</span></label><br><br>';

                str1 += '<div class="mb-3">';
                str1 += '<label class="fw-bold">PAYMENT STATUS</label>';
                str1 += '<select class="form-control" id="p_status_' + element1.order_id + '" value="' + element1.o_payment_status + '">';
                str1 += '<option class="text-danger" value="pending">Pending</option>';
                str1 += '<option class="text-success" value="Paid">Paid</option>';
                str1 += '</select>';
                str1 += '</div>';
                str1 += '<div>';
                str1 += '<label class="fw-bold">DELIVERY</label>';
                str1 += '<select class="form-control" id="delivery_' + element1.order_id + '" value="' + element1.o_delivery + '">';
                str1 += '<option value="waiting">Waiting</option>';
                str1 += '<option value="preparing">Preparing</option>';
                str1 += '<option value="On the Way">On the Way</option>';
                str1 += '<option value="complete">Complete</option>';
                str1 += '</select>';
                str1 += '</div>';
                str1 += '</div>';
                str1 += '<div>';
                str1 += '<button order_id="' + element1.order_id + '" class="btn-update mt-4 d-flex m-auto update-btn-orderById">UPDATE</button>';
                str1 += '</div>';
                str1 += '</div>';


                orderbyId++;
            });
            $('#displayOrderDataById').append(str1);

            $('#orderbyid').on('hidden.bs.modal', function () {
                $('#displayOrderDataById').empty();
            });

            $('.update-btn-orderById').click(function () {
                let orderIdUpdate = $(this).attr("order_id");
                let newP_status = $('#p_status_' + orderIdUpdate).val();
                let newDelivery = $('#delivery_' + orderIdUpdate).val();
                doRequestUpdateOrderPstatusDelivery(newP_status, newDelivery, orderIdUpdate);

            });


        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(thrownError);
        }
    });
}

var doRequestUpdateOrderPstatusDelivery = (newP_status, newDelivery, orderIdUpdate) => {

    $.ajax({
        type: "POST",
        url: "../../routes/router.php",
        data: {
            choice: 'UpdateOrderPstatusDelivery',
            o_payment_status: newP_status,
            o_delivery: newDelivery,
            order_id: orderIdUpdate,
        },
        success: function (data) {
            // console.log(data);
            if (data == "200") {
                Swal.fire({
                    icon: 'success',
                    title: 'Order Updated Successfully!',
                    showConfirmButton: false,
                    timer: 2000
                }).then(() => {
                    window.location.href = "../../pages/admin/adminOrder.php";
                });
            }

        }
    });
}

var orderSearch = () => {
    var searchQuery = $('#orderSearchInput').val().toLowerCase(); // Convert the search query to lowercase
    var container = $('#displayOrdersUnPaid');

    $.ajax({
        type: "POST",
        url: "../../routes/router.php",
        data: { choice: 'DisplayOrdersUnpaid' },
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
        str += '<td data-label="DATE">' + e.created + '</td>';
        str += '<td data-label="ACTION">';
        str += '<button username="' + e.username + '" data-bs-toggle="modal" data-bs-target="#orderbyid" class="btn-update mx-1 btn-update-order"><i class="bi bi-pencil-square"></i></button>';
        str += '<button class="btn-status mx-1"><a class="text-decoration-none text-white" href="../chatAdmin/index.php"><i class="bi bi-chat-dots"></i></a></button>';
        str += '</td>';
        str += '</tr>';

    

    container.append(str);

    $('.btn-update-order').click(function () {
        let userUsername = $(this).attr("username");

        doRequestDisplayOrderById(userUsername);
    });

}