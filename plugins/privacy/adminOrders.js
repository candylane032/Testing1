$(document).ready(function() {
    doRequestDisplayOrdersUnpaid();
});


var doRequestDisplayOrdersUnpaid = () => {
    $.ajax({
        type: "POST",
        url: "../../routes/router.php",
        data: { choice: 'DisplayOrdersUnpaid', },
        success: function(data) {
            console.log(data);
            var json = JSON.parse(data);
            var str = "";
            let orderUnpaid = 1;

            json.forEach(element => {

                str += '<tr>';
                    str += '<td data-label="ID">' + element.order_id + '</td>';
                    str += '<td class="text-capitalize" data-label="UNAME">' + element.username + '</td>';
                    str += '<td class="text-capitalize" data-label="FNAME">' + element.fname + '</td>';
                    str += '<td class="text-capitalize" data-label="LNAME">' + element.lname + '</td>';
                    str += '<td class="text-capitalize" data-label="ADDRESS">' + element.address + '</td>';
                    str += '<td class="text-danger text-capitalize" data-label="STATUS">' + element.o_payment_status + '</td>';
                    str += '<td class="text-success text-capitalize" data-label="DELIVERY">' + element.o_delivery + '</td>';
                    str += '<td data-label="DATE">' + element.created + '</td>';
                    str += '<td data-label="ACTION">';
                        str += '<button order_id="'+ element.order_id +'" data-bs-toggle="modal" data-bs-target="#orderbyid" class="btn btn-sm btn-warning mx-1 btn-update-order">Update</button>';
                        str += '<button class="btn btn-sm btn-success"><a class="text-decoration-none text-white" href="../chatAdmin/chat.php">Message</a></button>';
                    str += '</td>';

                str += '</tr>';
                
                
                orderUnpaid++;
            });   
            $('#displayOrdersUnPaid').append(str);



            $('.btn-update-order').click(function() {
                let orderId = $(this).attr("order_id");
                
                doRequestDisplayOrderById(orderId);
            });


        },
        error: function(xhr, ajaxOptions, thrownError) {
            alert(thrownError);
        }
    });
    
}


var doRequestDisplayOrderById = (orderId) => {
    $.ajax({

        type: "POST",
        url: "../../routes/router.php",
        data: { choice: 'DisplayOrderById', order_id: orderId},
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
                            str1 +='<p><span class="text-capitalize">'+ element1.fname +'</span><span class="text-capitalize"> '+ element1.lname +'</span></p>';
                        str1 +='</div>';
                        str1 +='<div>';
                            str1 +='<label class="fw-bold">ADDRESS</label>';
                            str1 +='<p class="text-capitalize">'+ element1.address +'</p>';
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
                                str1 +='<p class="text-uppercase">' + pmethod + '</p>';
                            str1 +='</div>';
                        }
                        else {
                            str1 +='<div>';
                                str1 +='<label class="fw-bold">RECEIPT IMAGE</label>';
                                str1 +='<p><img class="paymentImg rounded" src="../../uploads/receiptImage/'+ element1.p_method_receipt +'"></p>';
                            str1 +='</div>';
                            str1 +='<div>';
                                str1 +='<label class="fw-bold">PAYMENT METHOD</label>';
                                str1 +='<p class="text-uppercase">' + element1.p_method + '</p>';
                            str1 +='</div>';
                        }
                        
                        str1 +='<div>';
                            str1 +='<label class="fw-bold">REFERENCE NUMBER</label>';
                            str1 +='<p>' + element1.ref_num + '</p>';
                        str1 +='</div>';
                        str1 +='<div class="mb-3">';
                            str1 +='<label class="fw-bold">PAYMENT STATUS</label>';
                            str1 +='<select class="form-control" id="p_status_' + element1.order_id + '" value="' + element1.o_payment_status + '">';
                                str1 +='<option class="text-danger" value="pending">Pending</option>';
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
                        str1 +='<button order_id="'+ element1.order_id +'" class="btn btn-sm btn-primary mt-2 d-flex m-auto update-btn-orderById">UPDATE</button>';
                    str1 +='</div>';
                str1 +='</div>';
                

                orderbyId++;
            });
            $('#displayOrderDataById').append(str1);

            $('#orderbyid').on('hidden.bs.modal', function () {
                $('#displayOrderDataById').empty();
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
