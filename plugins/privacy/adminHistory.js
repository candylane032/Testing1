$(document).ready(function() {
    doRequestDisplayOrdersPaid();
});


var doRequestDisplayOrdersPaid = () => {
    $.ajax({
        type: "POST",
        url: "../../routes/router.php",
        data: { choice: 'DisplayOrdersPaid', },
        success: function(data) {
            console.log(data);
            var json = JSON.parse(data);
            var str = "";
            let orderUnpaid = 1;

            json.forEach(element => {

                str += '<tr>';
                    str += '<td data-label="ID">' + element.order_id + '</td>';
                    str += '<td data-label="UNAME">' + element.username + '</td>';
                    str += '<td data-label="FNAME">' + element.fname + '</td>';
                    str += '<td data-label="LNAME">' + element.lname + '</td>';
                    str += '<td data-label="ADDRESS">' + element.address + '</td>';
                    str += '<td class="text-success fw-bold" data-label="STATUS">' + element.o_payment_status + '</td>';
                    str += '<td class="text-success" data-label="DELIVERY">' + element.o_delivery + '</td>';
                    str += '<td data-label="DATE">' + element.created + '</td>';
                    str += '<td data-label="ACTION">';
                        str += '<button order_id="'+ element.order_id +'" data-bs-toggle="modal" data-bs-target="#recent" class="btn btn-sm btn-warning mx-1 btn-recent-update-orderHistory">Update</button>';
                    str += '</td>';

                str += '</tr>';
                
                
                orderUnpaid++;
            });   
            $('#displayOrdersPaid').append(str);



            $('.btn-recent-update-orderHistory').click(function() {
                let orderId = $(this).attr("order_id");
                
                doRequestDisplayOrderByIdHistory(orderId);
            });


        },
        error: function(xhr, ajaxOptions, thrownError) {
            alert(thrownError);
        }
    });
    
}



var doRequestDisplayOrderByIdHistory = (orderId) => {
    $.ajax({

        type: "POST",
        url: "../../routes/router.php",
        data: { choice: 'DisplayOrderByIdHistory', order_id: orderId},
        success: function (data) {
            console.log(data);
            var json1 = JSON.parse(data);
            var str1 = "";
            let orderbyId = 1;

            json1.forEach(element1 => {

                str1 +='<div class="rowOrder row mt-2 p-3 mb-3">';
                    str1 +='<div class="col-12 col-lg-6">';
                        str1 +='<div>';
                            str1 +='<label class="fw-bold">FULL NAME</label>';
                            str1 +='<p><span>'+ element1.fname +'</span><span> '+ element1.lname +'</span></p>';
                        str1 +='</div>';
                        str1 +='<div>';
                            str1 +='<label class="fw-bold">ADDRESS</label>';
                            str1 +='<p>'+ element1.address +'</p>';
                        str1 +='</div>';
                        str1 +='<div>';
                            str1 +='<label class="fw-bold">PHONE NUMBER</label>';
                            str1 +='<p>'+ element1.pnumber +'</p>';
                        str1 +='</div>';
                        str1 +='<div>';
                            str1 +='<label class="fw-bold">PRODUCT NAME</label>';
                            str1 +='<p>'+ element1.pname +'</p>';
                        str1 +='</div>';
                        str1 +='<div>';
                            str1 +='<label class="fw-bold">PRODUCT IMAGE</label>';
                            str1 +='<p><img class="orderImg rounded" src="../../uploads/productImage/'+ element1.img +'"></p>';
                        str1 +='</div>';
                        str1 +='<div>';
                            str1 +='<label class="fw-bold">PRODUCT PRICE</label>';
                            str1 +='<p>'+ element1.p_price +'</p>';
                        str1 +='</div>';
                        str1 +='<div>';
                            str1 +='<label class="fw-bold">ORDER KILO</label>';
                            str1 +='<p>'+ element1.order_kilo +'</p>';
                        str1 +='</div>';
                        str1 +='<div>';
                            str1 +='<label class="fw-bold">TOTAL AMOUNT</label>';
                            str1 +='<p>'+ element1.total_amount +'</p>';
                        str1 +='</div>';
                        
                    str1 +='</div>';
                    str1 +='<div class="col-12 col-lg-6">';
                        var pmethod = element1.p_method;
                        if(pmethod == "cod"){
                            str1 +='<div>';
                                str1 +='<label class="fw-bold">RECEIPT</label>';
                                str1 +='<p>' + element1.p_method_receipt + '</p>';
                            str1 +='</div>';
                            str1 +='<div>';
                                str1 +='<label class="fw-bold">PAYMENT METHOD</label>';
                                str1 +='<p>' + pmethod + '</p>';
                            str1 +='</div>';
                        }
                        else {
                            str1 +='<div>';
                                str1 +='<label class="fw-bold">RECEIPT IMAGE</label>';
                                str1 +='<p><img class="paymentImg rounded" src="../../uploads/receiptImage/'+ element1.p_method_receipt +'"></p>';
                            str1 +='</div>';
                            str1 +='<div>';
                                str1 +='<label class="fw-bold">PAYMENT METHOD</label>';
                                str1 +='<p>' + element1.p_method + '</p>';
                            str1 +='</div>';
                        }
                        
                        str1 +='<div>';
                            str1 +='<label class="fw-bold">REFERENCE NUMBER</label>';
                            str1 +='<p>' + element1.ref_num + '</p>';
                        str1 +='</div>';
                        str1 +='<div class="mb-3">';
                            str1 +='<label class="fw-bold">PAYMENT STATUS</label>';
                            str1 +='<select class="form-control" id="p_status_' + element1.order_id + '" value="' + element1.o_payment_status + '">';
                                str1 +='<option value="pending">Pending</option>';
                                str1 +='<option class="text-success" value="Paid">Paid</option>';
                            str1 +='</select>';
                        str1 +='</div>';
                        str1 +='<div>';
                            str1 +='<label class="fw-bold">DELIVERY</label>';
                            str1 +='<select class="form-control" id="delivery_' + element1.order_id + '" value="' + element1.o_delivery + '">';
                                str1 +='<option value="waiting">Waiting</option>';
                                str1 +='<option value="preparing">Preparing</option>';
                                str1 +='<option value="On the Way">On the Way</option>';
                                str1 +='<option value="complete">Complete</option>';
                            str1 +='</select>';
                        str1 +='</div>';
                    str1 +='</div>';
                    str1 +='<div>';
                        str1 +='<button order_id="'+ element1.order_id +'" class="btn btn-sm btn-warning mt-4 d-flex m-auto update-btn-orderById">Update</button>';
                    str1 +='</div>';
                str1 +='</div>';
                

                orderbyId++;
            });
            $('#displayOrderDataByIdHistory').append(str1);

            $('#recent').on('hidden.bs.modal', function () {
                $('#displayOrderDataByIdHistory').empty();
            });

            $('.update-btn-orderById').click(function() {
                let orderIdUpdate = $(this).attr("order_id");
                let newP_status = $('#p_status_' + orderIdUpdate).val();
                let newDelivery = $('#delivery_' + orderIdUpdate).val();
                doRequestUpdateOrderPstatusDelivery(newP_status, newDelivery, orderIdUpdate);
                
            });


        },
        error: function(xhr, ajaxOptions, thrownError){
            alert(thrownError);
        }
    });
}


var doRequestUpdateOrderPstatusDelivery = (newP_status, newDelivery, orderIdUpdate) => {

    $.ajax({
        type: "POST",
        url: "../../routes/router.php",
        data: { choice: 'UpdateOrderPstatusDelivery', 
            o_payment_status: newP_status,
            o_delivery: newDelivery,
            order_id: orderIdUpdate,
        },
        success: function(data) {
            console.log(data);
            if (data == "200") {
                alert("Updated Successfully!");
                window.location.href = "../../pages/admin/adminOrder.php";
            }
            
        }
    });
}

