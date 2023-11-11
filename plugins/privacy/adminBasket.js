$(document).ready(function() {
    doRequestDisplayReservesPending();
});

var countdownIntervals = {};
var doRequestDisplayReservesPending = () => {
    $.ajax({
        type: "POST",
        url: "../../routes/router.php",
        data: { choice: 'DisplayReservesPending', },
        success: function(data) {
            console.log(data);
            var json = JSON.parse(data);
            var str = "";
            let basket = 1;

            json.forEach(element => {

                str += '<tr>';
                    str += '<td data-label="ID">' + element.reserve_id + '</td>';
                    str += '<td class="text-capitalize" data-label="UNAME">' + element.username + '</td>';
                    str += '<td class="text-capitalize" data-label="FNAME">' + element.fname + '</td>';
                    str += '<td class="text-capitalize" data-label="LNAME">' + element.lname + '</td>';
                    str += '<td class="text-capitalize" data-label="ADDRESS">' + element.address + '</td>';
                    str += '<td class="text-danger fw-bold text-capitalize" data-label="STATUS">' + element.payment_status + '</td>';
                    str += '<td class="text-success text-capitalize" data-label="DELIVERY">' + element.r_delivery + '</td>';
                    str += '<td data-label="DATE">' + element.created + '</td>';
                    str += '<td id="countdown_' + basket + '" class="text-danger" data-label="COUNTDOWN"></td>';

                    str += '<td data-label="ACTION">';
                        str += '<button reserve_id="'+ element.reserve_id +'" data-bs-toggle="modal" data-bs-target="#reservesbyid" class="btn btn-sm btn-warning mx-1 btn-update-reserves">Update</button>';
                        str += '<button class="btn btn-sm btn-success"><a class="text-decoration-none text-white" href="../chatAdmin/chat.php">Message</a></button>';
                    str += '</td>';

                str += '</tr>';
                
                const storedEndTime = localStorage.getItem('countdownEndTime_' + element.reserve_id);
                let endTime;

                if (storedEndTime) {
                  endTime = new Date(storedEndTime);
                } else {
                  const now = new Date();
                  endTime = new Date(now.getTime() + 1785000);
                  // endTime = new Date(now.getTime() + 50000); // Start a new countdown with 30 seconds
                  localStorage.setItem('countdownEndTime_' + element.reserve_id, endTime);
                }

                startCountdown('countdown_' + basket, endTime, element.reserve_id, element.payment_status);
                basket++;
            });   
            $('#displayReservesPending').append(str);



            $('.btn-update-reserves').click(function() {
                let reserve_Id = $(this).attr("reserve_id");
                
                doRequestDisplayReservesById(reserve_Id);
            });


        },
        error: function(xhr, ajaxOptions, thrownError) {
            alert(thrownError);
        }
    });
    
}


function startCountdown(elementId, endTime, reserveId, newPaymentStatus ) {
  const intervalId = setInterval(function () {
    const now = new Date();
    const timeRemaining = endTime - now;

    if (timeRemaining <= 0) {
      document.getElementById(elementId).innerText = "Countdown Expired";
      if(elementId == "countdown_1") {
        doRequestUpdateReservePaymentStatus(reserveId, newPaymentStatus );
      }
      clearInterval(intervalId);
    } else {
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
    const countdownText = minutes + "m " + seconds + "s";
    document.getElementById(elementId).innerText = countdownText;
    }
  }, 1000);
  countdownIntervals[elementId] = intervalId;
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
    success: function(data) {
      console.log(data);
      if (data === "200") {
        console.log("Countdown Duration Expired");
        window.location.href = "../../pages/admin/adminBasket.php";
      } 
    },
    error: function(xhr, ajaxOptions, thrownError) {
      alert(thrownError);
    },
  });
}




var doRequestDisplayReservesById = (reserve_Id) => {
    $.ajax({

        type: "POST",
        url: "../../routes/router.php",
        data: { choice: 'DisplayReservesById', reserve_id: reserve_Id},
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
                            str1 +='<p>'+ element1.reserve_kilo +'</p>';
                        str1 +='</div>';
                        str1 +='<div>';
                            str1 +='<label class="fw-bold">TOTAL AMOUNT</label>';
                            str1 +='<p>'+ element1.r_total_amount +'</p>';
                        str1 +='</div>';
                        
                    str1 +='</div>';
                    str1 +='<div class="col-12 col-lg-6">';
                        var pmethod = element1.r_p_method;
                        if(pmethod == "cod"){
                            str1 +='<div>';
                                str1 +='<label class="fw-bold">RECEIPT</label>';
                                str1 +='<p>' + element1.r_p_method_receipt + '</p>';
                            str1 +='</div>';
                            str1 +='<div>';
                                str1 +='<label class="fw-bold">PAYMENT METHOD</label>';
                                str1 +='<p class="text-uppercase">' + pmethod + '</p>';
                            str1 +='</div>';
                        }
                        else {
                            str1 +='<div>';
                                str1 +='<label class="fw-bold">RECEIPT IMAGE</label>';
                                str1 +='<p><img class="paymentImg rounded" src="../../uploads/receiptImage/'+ element1.r_p_method_receipt +'"></p>';
                            str1 +='</div>';
                            str1 +='<div>';
                                str1 +='<label class="fw-bold">PAYMENT METHOD</label>';
                                str1 +='<p>' + element1.r_p_method + '</p>';
                            str1 +='</div>';
                        }
                        
                        str1 +='<div>';
                            str1 +='<label class="fw-bold">REFERENCE NUMBER</label>';
                            str1 +='<p>' + element1.r_ref_num + '</p>';
                        str1 +='</div>';
                        str1 +='<div class="mb-3">';
                            str1 +='<label class="fw-bold">PAYMENT STATUS</label>';
                            str1 +='<select class="form-control" id="p_status_' + element1.reserve_id + '" value="' + element1.payment_status + '">';
                                str1 +='<option class="text-danger" value="pending">Pending</option>';
                                str1 +='<option class="text-success" value="Paid">Paid</option>';
                            str1 +='</select>';
                        str1 +='</div>';
                        str1 +='<div>';
                            str1 +='<label class="fw-bold">DELIVERY</label>';
                            str1 +='<select class="form-control" id="delivery_' + element1.reserve_id + '" value="' + element1.r_delivery + '">';
                                str1 +='<option value="waiting">Waiting</option>';
                                str1 +='<option value="preparing">Preparing</option>';
                                str1 +='<option value="On the Way">On the Way</option>';
                                str1 +='<option value="complete">Complete</option>';
                            str1 +='</select>';
                        str1 +='</div>';
                    str1 +='</div>';
                    str1 +='<div>';
                        str1 +='<button reserve_id="'+ element1.reserve_id +'" class="btn btn-sm btn-primary mt-2 d-flex m-auto update-btn-reserveById">UPDATE</button>';
                    str1 +='</div>';
                str1 +='</div>';
                

                orderbyId++;
            });
            $('#displayReservesDataById').append(str1);

            $('#reservesbyid').on('hidden.bs.modal', function () {
                $('#displayReservesDataById').empty();
            });

            $('.update-btn-reserveById').click(function() {
                let reserveIdUpdate = $(this).attr("reserve_id");
                let newP_status = $('#p_status_' + reserveIdUpdate).val();
                let newDelivery = $('#delivery_' + reserveIdUpdate).val();
                doRequestUpdateReservePstatusDelivery(newP_status, newDelivery, reserveIdUpdate);
                
            });


        },
        error: function(xhr, ajaxOptions, thrownError){
            alert(thrownError);
        }
    });
}


var doRequestUpdateReservePstatusDelivery = (newP_status, newDelivery, reserveIdUpdate) => {

    $.ajax({
        type: "POST",
        url: "../../routes/router.php",
        data: { choice: 'UpdateReservePstatusDelivery', 
            payment_status: newP_status,
            r_delivery: newDelivery,
            reserve_id: reserveIdUpdate,
        },
        success: function(data) {
            console.log(data);
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

