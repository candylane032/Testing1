$(document).ready(function () {
    doRequestSelectUserIdProfile();
});


var profileUserId;
var doRequestSelectUserIdProfile = () => {
    $.ajax({
        type: "POST",
        url: "../../routes/router.php",
        data: { choice: 'SelectUserIdProfileOrder' },
        success: function (data) {
            console.log(data)
            var json = JSON.parse(data);
            var str = "";

            json.forEach(element => {
                str += '<div class="autoClick" user_id="' + element.user_id + '"></div>';
            });
            $('#selectUserIdProfile').append(str);

            $('.autoClick').each(function () {
                profileUserId = $(this).attr("user_id");
                console.log(profileUserId);
                doRequestDisplayOrder(profileUserId); element1.p_method
            });


        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(thrownError);
        }
    });
}


var doRequestDisplayOrder = (profileUserId) => {
    $.ajax({
        type: "POST",
        url: "../../routes/router.php",
        data: { choice: 'DisplayOrder', user_id: profileUserId },
        success: function (data) {
            console.log(data);
            var json1 = JSON.parse(data);
            var str1 = "";
            let order = 1;

            json1.forEach(element1 => {
                str1 += '<tr>';
                str1 += '<td data-label="PNAME">' + element1.pname + '</td>';
                str1 += '<td data-label="KILO">' + element1.order_kilo + '</td>';
                str1 += '<td data-label="TOTAL AMOUNT">' + element1.total_amount + '</td>';
                str1 += '<td class="text-warning text-capitalize">' + element1.o_payment_status + '</td>';
                str1 += '<td class="text-uppercase" data-label="METHOD">' + element1.p_method + '</td>';
                str1 += '<td  data-label="CREATED">' + element1.created + '</td>';
                str1 += '<td class="text-success text-capitalize" data-label="DELIVERY">' + element1.o_delivery + '</td>';
                str1 += '<td data-label="ACTION">';
                str1 += '<button order_id="' + element1.order_id + '" data-bs-toggle="modal" data-bs-target="#view" class="btn-reserve mx-1 btn-View">View</button>';
                str1 += '</td>';
                str1 += '</tr>';

                order++;
            });
            $('#displayOrder').append(str1);

            $('.btn-View').click(function () {
                let order_id = $(this).attr("order_id");

                doRequestViewOrder(order_id);
            });

        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(thrownError);
        }
    });
}




var doRequestViewOrder = (order_id) => {
    $.ajax({

        type: "POST",
        url: "../../routes/router.php",
        data: { choice: 'ViewOrder', order_id: order_id },
        success: function (data) {
            console.log(data);
            var json2 = JSON.parse(data);
            var str2 = "";
            let orderView = 1;

            json2.forEach(element2 => {

                str2 += '<div class="row mt-2 p-3 mb-3">';
                str2 += '<div class="col-12 col-lg-6">';
                str2 += '<div class="mb-3">';
                str2 += '<label class="fw-bold text-muted">FULL NAME</label>';
                str2 += '<div><span class="text-capitalize">' + element2.fname + '</span><span class="text-capitalize"> ' + element2.lname + '</span></div>';
                str2 += '</div>';
                str2 += '<div class="mb-3">';
                str2 += '<label class="fw-bold text-muted">ADDRESS</label>';
                str2 += '<div class="text-capitalize">' + element2.address + '</div>';
                str2 += '</div>';
                str2 += '<div class="mb-3">';
                str2 += '<label class="fw-bold text-muted">PRODUCT NAME</label>';
                str2 += '<div class="text-capitalize">' + element2.pname + '</div>';
                str2 += '</div>';
                str2 += '<div class="mb-3">';
                str2 += '<label class="fw-bold text-muted">PRODUCT IMAGE</label>';
                str2 += '<div><img class="orderImg rounded object-fit-cover" src="../../uploads/productImage/' + element2.img + '"></div>';
                str2 += '</div>';
                str2 += '<div class="mb-3">';
                str2 += '<label class="fw-bold text-muted">PRODUCT PRICE</label>';
                str2 += '<div>' + element2.p_price + '</div>';
                str2 += '</div>';
                str2 += '<div class="mb-3">';
                str2 += '<label class="fw-bold text-muted">ORDER KILO</label>';
                str2 += '<div>' + element2.order_kilo + '</div>';
                str2 += '</div>';
                str2 += '<div class="mb-3">';
                str2 += '<label class="fw-bold text-muted">TOTAL AMOUNT</label>';
                str2 += '<div>' + element2.total_amount + '</div>';
                str2 += '</div>';


                str2 += '</div>';
                str2 += '<div class="col-12 col-lg-6">';
                str2 += '<div class="mb-3">';
                str2 += '<label class="fw-bold text-muted">PAYMENT METHOD</label>';
                str2 += '<div class="text-uppercase">' + element2.p_method + '</div>';
                str2 += '</div>';
                var pmethod = element2.p_method;
                if (pmethod == "cod") {
                    str2 += '<div class="mb-3">';
                    str2 += '<label class="fw-bold">RECEIPT</label>';
                    str2 += '<div>' + element2.p_method_receipt + '</div>';
                    str2 += '</div>';
                }
                else {
                    str2 += '<div class="mb-3">';
                    str2 += '<label class="fw-bold">RECEIPT IMAGE</label>';
                    str2 += '<div><img class="paymentImg rounded" src="../../uploads/receiptImage/' + element2.p_method_receipt + '"></div>';
                    str2 += '</div>';
                }
                str2 += '<div class="mb-3">';
                str2 += '<label class="fw-bold">REFERENCE NUMBER</label>';
                str2 += '<div>' + element2.ref_num + '</div>';
                str2 += '</div>';
                str2 += '</div>';
                str2 += '</div>';


                orderView++;
            });
            $('#viewOrder').append(str2);

            $('#view').on('hidden.bs.modal', function () {
                $('#viewOrder').empty();
            });




        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(thrownError);
        }
    });
}
