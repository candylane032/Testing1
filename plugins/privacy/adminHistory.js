$(document).ready(function () {
    doRequestDisplayOrdersPaid();
    doRequestDisplayReservedPaid();
});

$(document).ready(function() {
    $('.text-capitalize').each(function() {
      var text = $(this).text();
      var capitalizedText = text.toLowerCase().replace(/\b\w/g, function (l) {
        return l.toUpperCase();
      });
      $(this).text(capitalizedText);
    });
  });
  
var doRequestDisplayOrdersPaid = () => {
    $.ajax({
        type: "POST",
        url: "../../routes/router.php",
        data: { choice: 'DisplayOrdersPaid', },
        success: function (data) {

            var json = JSON.parse(data);
            var str = "";

            json.forEach(element => {

                str += '<tr>';
                str += '<td class="text-capitalize" data-label="UNAME">' + element.username + '</td>';
                str += '<td class="text-capitalize" data-label="FNAME">' + element.fname + '</td>';
                str += '<td class="text-capitalize" data-label="LNAME">' + element.lname + '</td>';
                str += '<td class="text-capitalize" data-label="ADDRESS">' + element.address + '</td>';
                str += '<td class="text-success" data-label="STATUS">' + element.o_payment_status + '</td>';
                str += '<td class="text-success text-capitalize" data-label="DELIVERY">' + element.o_delivery + '</td>';
                str += '<td data-label="DATE">' + element.created + '</td>';
                str += '<td data-label="ACTION">';
                str += '<button order_id="' + element.order_id + '" data-bs-toggle="modal" data-bs-target="#recent" class="btn-update mx-1 btn-recent-update-orderHistory"><i class="bi bi-pencil-square"></i></button>';
                str += '</td>';

                str += '</tr>';

            });
            $('#displayUsersPurchase').append(str);

            $('.btn-recent-update-orderHistory').click(function () {
                let orderId = $(this).attr("order_id");

                doRequestDisplayOrderByIdHistory(orderId);
            });


        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(thrownError);
        }
    });

}



var doRequestDisplayOrderByIdHistory = (orderId) => {
    $.ajax({

        type: "POST",
        url: "../../routes/router.php",
        data: { choice: 'DisplayOrderByIdHistory', order_id: orderId },
        success: function (data) {
            // console.log(data);
            var json1 = JSON.parse(data);
            var str1 = "";
            let orderbyId = 1;

            json1.forEach(element1 => {

                str1 += '<div class="rowOrder row mt-2 p-3 mb-3">';
                str1 += '<div class="col-12 col-lg-6">';
                str1 += '<div>';
                str1 += '<label class="fw-bold">FULL NAME</label>';
                str1 += '<p class="text-capitalize"><span>' + element1.fname + '</span><span> ' + element1.lname + '</span></p>';
                str1 += '</div>';
                str1 += '<div>';
                str1 += '<label class="fw-bold">ADDRESS</label>';
                str1 += '<p class="text-capitalize">' + element1.address + '</p>';
                str1 += '</div>';
                str1 += '<div>';
                str1 += '<label class="fw-bold">PHONE NUMBER</label>';
                str1 += '<p>' + element1.pnumber + '</p>';
                str1 += '</div>';
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
                str1 += '<div class="mb-3">';
                str1 += '<label class="fw-bold">PAYMENT STATUS</label>';
                str1 += '<select class="form-control" id="p_status_' + element1.order_id + '" value="' + element1.o_payment_status + '">';
                str1 += '<option value="pending">Pending</option>';
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
                str1 += '<button order_id="' + element1.order_id + '" class="btn-status mt-4 d-flex m-auto update-btn-orderById">UPDATE</button>';
                str1 += '</div>';
                str1 += '</div>';


                orderbyId++;
            });
            $('#displayOrderDataByIdHistory').append(str1);

            $('#recent').on('hidden.bs.modal', function () {
                $('#displayOrderDataByIdHistory').empty();
            });

            $('.update-btn-orderById').click(function () {
                let orderIdUpdate = $(this).attr("order_id");
                console.log(orderIdUpdate)
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
            if (data == "200") {
                Swal.fire({
                    icon: 'success',
                    title: 'Product Updated Succcesfuly',
                    showConfirmButton: false,
                    timer: 2000
                }).then(() => {
                    window.location.href = "../../pages/admin/adminHistory.php";
                });
            }

        }
    });
}

// reserved
var doRequestDisplayReservedPaid = () => {
    $.ajax({
        type: "POST",
        url: "../../routes/router.php",
        data: { choice: 'DisplayReservedPaid', },
        success: function (data) {
            // console.log(data);
            var json = JSON.parse(data);
            var str = "";

            json.forEach(element => {

                str += '<tr>';
                str += '<td class="text-capitalize" data-label="UNAME">' + element.username + '</td>';
                str += '<td class="text-capitalize" data-label="FNAME">' + element.fname + '</td>';
                str += '<td class="text-capitalize" data-label="LNAME">' + element.lname + '</td>';
                str += '<td class="text-capitalize" data-label="ADDRESS">' + element.address + '</td>';
                str += '<td class="' + (element.payment_status === 'canceled' ? 'text-danger text-capitalize text-decoration-line-through' : 'text-success  text-capitalize') + '" data-label="STATUS">' + element.payment_status + '</td>';
                str += '<td class="' + (element.r_delivery === 'canceled' ? 'text-danger text-capitalize text-decoration-line-through' : 'text-success  text-capitalize') + '" data-label="DELIVERY">' + element.r_delivery + '</td>';
                str += '<td data-label="DATE">' + element.created + '</td>';
                str += '<td data-label="ACTION">';
                str += '<button reserve_id="' + element.reserve_id + '" data-bs-toggle="modal" data-bs-target="#recent" class="btn-update mx-1 btn-recent-update-reserveHistory"><i class="bi bi-pencil-square"></i></button>';
                str += '</td>';
                
                str += '</tr>';

            });
            $('#displayUsersReserve').append(str);



            $('.btn-recent-update-reserveHistory').click(function () {
                let reserveId = $(this).attr("reserve_id");

                doRequestDisplayReserveByIdHistory(reserveId);
            });


        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(thrownError);
        }
    });

}

var doRequestDisplayReserveByIdHistory = (reserveId) => {
    $.ajax({

        type: "POST",
        url: "../../routes/router.php",
        data: { choice: 'DisplayReserveByIdHistory', reserve_id: reserveId },
        success: function (data) {
            var json1 = JSON.parse(data);
            var str1 = "";
            let reservebyId = 1;

            json1.forEach(element1 => {

                str1 += '<div class="rowOrder row mt-2 p-3 mb-3">';
                str1 += '<div class="col-12 col-lg-6">';
                str1 += '<div>';
                str1 += '<label class="fw-bold">FULL NAME</label>';
                str1 += '<p class="text-capitalize"><span>' + element1.fname + '</span><span> ' + element1.lname + '</span></p>';
                str1 += '</div>';
                str1 += '<div>';
                str1 += '<label class="fw-bold">ADDRESS</label>';
                str1 += '<p class="text-capitalize">' + element1.address + '</p>';
                str1 += '</div>';
                str1 += '<div>';
                str1 += '<label class="fw-bold">PHONE NUMBER</label>';
                str1 += '<p>' + element1.pnumber + '</p>';
                str1 += '</div>';
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
                    str1 += '<p class="text-uppercase">' + pmethod + '</p>';
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
                str1 += '<div class="mb-3">';
                str1 += '<label class="fw-bold">PAYMENT STATUS</label>';
                str1 += '<select class="form-control" id="p_status_' + element1.reserve_id + '" value="' + element1.payment_status + '">';
                str1 += '<option value="pending">Pending</option>';
                str1 += '<option class="text-success" value="Paid">Paid</option>';
                str1 += '</select>';
                str1 += '</div>';
                str1 += '<div>';
                str1 += '<label class="fw-bold">DELIVERY</label>';
                str1 += '<select class="form-control" id="delivery_' + element1.reserve_id + '" value="' + element1.r_delivery + '">';
                str1 += '<option value="waiting">Waiting</option>';
                str1 += '<option value="preparing">Preparing</option>';
                str1 += '<option value="On the Way">On the Way</option>';
                str1 += '<option value="complete">Complete</option>';
                str1 += '</select>';
                str1 += '</div>';
                str1 += '</div>';
                str1 += '<div>';
                str1 += '<button reserve_id="' + element1.reserve_id + '" class="btn-status mt-4 d-flex m-auto update-btn-reserveById">UPDATE</button>';
                str1 += '</div>';
                str1 += '</div>';


                reservebyId++;
            });
            $('#displayOrderDataByIdHistory').append(str1);

            $('#recent').on('hidden.bs.modal', function () {
                $('#displayOrderDataByIdHistory').empty();
            });

            $('.update-btn-reserveById').click(function () {
                let reserveIdUpdate = $(this).attr("reserve_id");
                let newRP_status = $('#p_status_' + reserveIdUpdate).val();
                let new_delivery = $('#delivery_' + reserveIdUpdate).val();
                doRequestUpdateReservePstatusDelivery(newRP_status, new_delivery, reserveIdUpdate);

            });


        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(thrownError);
        }
    });
}


var doRequestUpdateReservePstatusDelivery = (newRP_status, new_delivery, reserveIdUpdate) => {

    $.ajax({
        type: "POST",
        url: "../../routes/router.php",
        data: {
            choice: 'UpdateReservePstatusDelivery',
            payment_status: newRP_status,
            r_delivery: new_delivery,
            reserve_id: reserveIdUpdate,
        },
        success: function (data) {
            if (data == "200") {
                Swal.fire({
                    icon: 'success',
                    title: 'Product Updated Succcesfuly',
                    showConfirmButton: false,
                    timer: 2000
                }).then(() => {
                    window.location.href = "../../pages/admin/adminHistory.php";
                });
            }

        }
    });
}

//Purchase
var searchUsersPurchase = () => {
    var searchQuery = $('#searchInputPurchase').val();
    var container = $('#displayUsersPurchase');

    $.ajax({
        type: "POST",
        url: "../../routes/router.php",
        data: { choice: 'searchUserss' },
        success: function (data) {
            var json = JSON.parse(data);

            container.empty();
            if (searchQuery === '') {
                json.forEach(function (e) {
                    displayUsersPurchase(container, e);
                });
            } else {
                var filteredData = json.filter(function (e) {
                    return (
                        e.username.toLowerCase().includes(searchQuery.toLowerCase())
                    );
                });

                if (filteredData.length === 0) {
                    container.append("<p>No matching products found.</p>");
                } else {
                    filteredData.forEach(function (e) {
                        displayUsersPurchase(container, e);
                    });
                }
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert("An error occurred: " + thrownError);
        }
    });
}


var displayUsersPurchase = (container, e) => {
    var str = '';

    str += '<tr>';

    str += '<td class="text-capitalize" data-label="UNAME">' + e.username + '</td>';
    str += '<td class="text-capitalize" data-label="FNAME">' + e.fname + '</td>';
    str += '<td class="text-capitalize" data-label="LNAME">' + e.lname + '</td>';
    str += '<td class="text-capitalize" data-label="ADDRESS">' + e.address + '</td>';
    str += '<td class="text-success" data-label="STATUS">' + e.o_payment_status + '</td>';
    str += '<td class="text-success text-capitalize" data-label="DELIVERY">' + e.o_delivery + '</td>';
    str += '<td data-label="DATE">' + e.created + '</td>';
    str += '<td data-label="ACTION">';
    str += '<button order_id="' + e.order_id + '" data-bs-toggle="modal" data-bs-target="#recent" class="btn-update mx-1 btn-recent-update-orderHistory"><i class="bi bi-pencil-square"></i></button>';
    str += '</td>';
    str += '</tr>';

    container.append(str);
    
    $('.btn-recent-update-orderHistory').click(function () {
        let orderId = $(this).attr("order_id");

        doRequestDisplayOrderByIdHistory(orderId);
    });
}

//Reserve
var searchUsersReserve = () => {
    var searchQuery = $('#searchInputReserve').val();
    var container = $('#displayUsersReserve');

    $.ajax({
        type: "POST",
        url: "../../routes/router.php",
        data: { choice: 'searchUserssReserve' },
        success: function (data) {
            var json = JSON.parse(data);

            container.empty();
            if (searchQuery === '') {
                json.forEach(function (e) {
                    displayUsersReserve(container, e);
                });
            } else {
                var filteredData = json.filter(function (e) {
                    return (
                        e.username.toLowerCase().includes(searchQuery.toLowerCase())
                    );
                });

                if (filteredData.length === 0) {
                    container.append("<p>No matching products found.</p>");
                } else {
                    filteredData.forEach(function (e) {
                        displayUsersReserve(container, e);
                    });
                }
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert("An error occurred: " + thrownError);
        }
    });
}


var displayUsersReserve = (container, e) => {
    var str = '';
    str += '<tr>';

    str += '<td class="text-capitalize" data-label="UNAME">' + e.username + '</td>';
    str += '<td class="text-capitalize" data-label="FNAME">' + e.fname + '</td>';
    str += '<td class="text-capitalize" data-label="LNAME">' + e.lname + '</td>';
    str += '<td class="text-capitalize" data-label="ADDRESS">' + e.address + '</td>';
    str += '<td class="text-success text-capitalize" data-label="STATUS">' + e.payment_status + '</td>';
    str += '<td class="text-success text-capitalize" data-label="DELIVERY">' + e.r_delivery + '</td>';
    str += '<td data-label="DATE">' + e.created + '</td>';
    str += '<td data-label="ACTION">';
    str += '<button reserve_id="' + e.reserve_id + '" data-bs-toggle="modal" data-bs-target="#recent" class="btn-update mx-1 btn-recent-update-reserveHistory"><i class="bi bi-pencil-square"></i></button>';
    str += '</td>';
    str += '</tr>';

    container.append(str);
    $('.btn-recent-update-reserveHistory').click(function () {
        let reserveId = $(this).attr("reserve_id");

        doRequestDisplayReserveByIdHistory(reserveId);
    });
}