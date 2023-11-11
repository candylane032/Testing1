$(document).ready(function() {
   doRequestSelectUserIdProfile();
});

var profileUserId;
var doRequestSelectUserIdProfile = () => {
    $.ajax({
        type: "POST",
        url: "../../routes/router.php",
        data: { choice: 'SelectUserIdProfile' },
        success: function(data) {
            console.log(data)
            var json = JSON.parse(data);
            var str = "";

            json.forEach(element => {
                str += '<div class="autoClick" user_id="' + element.user_id + '"></div>';
            });
            $('#selectUserIdProfile').append(str);
            
            $('.autoClick').each(function() {
                profileUserId = $(this).attr("user_id");
                console.log(profileUserId);
                doRequestDisplayReserveBasket(profileUserId);
            });


        },
        error: function(xhr, ajaxOptions, thrownError) {
            alert(thrownError);
        }
    });
}


var productName;
var countdownIntervals = {};

var doRequestDisplayReserveBasket = (profileUserId) => {
  $.ajax({
    type: "POST",
    url: "../../routes/router.php",
    data: {
      choice: 'DisplayReserveBasket',
      user_id: profileUserId,
    },
    success: function (data) {
      console.log(data);
      var json2 = JSON.parse(data);
      var str2 = "";
      let basket = 1;
      json2.forEach((element2) => {
        productName = element2.pname;
        str2 += '<tr>';
          // str2 += '<td data-label="ID" >' + element2.reserve_id + '</td>';
          str2 += '<td class="pname" pname="' + productName + '" data-label="PNAME">' + productName + '</td>';
          str2 += '<td data-label="KILO">' + element2.reserve_kilo + '</td>';
          str2 += '<td data-label="TOTAL AMOUNT">' + element2.r_total_amount + '</td>';
          str2 += '<td class="text-warning fw-bold text-capitalize" >' + element2.payment_status + '</td>';
          str2 += '<td class="text-uppercase" data-label="METHOD">' + element2.r_p_method + '</td>';
          str2 += '<td id="countdown_' + basket + '" class="text-danger" data-label="COUNTDOWN"></td>';
          str2 += '<td class="text-success text-capitalize" data-label="DELIVERY">' + element2.r_delivery + '</td>';
          str2 += '<td data-label="CREATED">' + element2.created + '</td>';
          str2 += '<td data-label="ACTION">';
            str2 += '<button reserve_id="' + element2.reserve_id + '" data-bs-toggle="modal" data-bs-target="#view" class="btn btn-sm btn-info mx-1 btn-View">View</button>';
            // str2 += '<button class="btn btn-sm btn-success"><a class="text-decoration-none text-white" href="../chatCustomer1/chat.php">Message</a></button>';
          str2 += '</td>';
        str2 += '</tr>';

        const storedEndTime = localStorage.getItem('countdownEndTime_' + element2.reserve_id);
        let endTime;

        if (storedEndTime) {
          endTime = new Date(storedEndTime);
        } else {
          const now = new Date();
          endTime = new Date(now.getTime() + 1785000); // Start a new countdown with 1 hour
          // endTime = new Date(now.getTime() + 50000); // Start a new countdown with 30 seconds
          localStorage.setItem('countdownEndTime_' + element2.reserve_id, endTime);
        }

        startCountdown('countdown_' + basket, endTime, element2.reserve_id, element2.payment_status);
        basket++;
      });

      $('#displayBasket').append(str2);


      $('.btn-View').click(function() {
          let reserve_id = $(this).attr("reserve_id");
          
          doRequestViewReserve(reserve_id);
      });
    },
    error: function (xhr, ajaxOptions, thrownError) {
      alert(thrownError);
    },
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
      const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
      const countdownText = hours + "h " + minutes + "m " + seconds + "s";
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
        window.location.href = "../../pages/customer/basket1.php";
      } 
    },
    error: function(xhr, ajaxOptions, thrownError) {
      alert(thrownError);
    },
  });
}





var doRequestViewReserve = (reserve_id) => {
    $.ajax({

        type: "POST",
        url: "../../routes/router.php",
        data: { choice: 'ViewReserve', reserve_id: reserve_id},
        success: function (data) {
            console.log(data);
            var json3 = JSON.parse(data);
            var str3 = "";
            let reserveView = 1;

            json3.forEach(element3 => {

                str3 +='<div class="row mt-2 p-3 mb-3">';
                    str3 +='<div class="col-12 col-lg-6">';
                        str3 +='<div class="mb-3">';
                            str3 +='<label class="fw-bold">FULL NAME</label>';
                            str3 +='<div><span class="text-capitalize">'+ element3.fname +'</span><span class="text-capitalize"> '+ element3.lname +'</span></div>';
                        str3 +='</div>';
                        str3 +='<div class="mb-3">';
                            str3 +='<label class="fw-bold">ADDRESS</label>';
                            str3 +='<div class="text-capitalize">'+ element3.address +'</div>';
                        str3 +='</div>';
                        str3 +='<div class="mb-3">';
                            str3 +='<label class="fw-bold">PRODUCT NAME</label>';
                            str3 +='<div>'+ element3.pname +'</div>';
                        str3 +='</div>';
                        str3 +='<div class="mb-3">';
                            str3 +='<label class="fw-bold">PRODUCT IMAGE</label>';
                            str3 +='<div><img class="orderImg rounded" src="../../uploads/productImage/'+ element3.img +'"></div>';
                        str3 +='</div>';
                        str3 +='<div class="mb-3">';
                            str3 +='<label class="fw-bold">PRODUCT PRICE</label>';
                            str3 +='<div>'+ element3.p_price +'</div>';
                        str3 +='</div>';
                        str3 +='<div class="mb-3">';
                            str3 +='<label class="fw-bold">ORDER KILO</label>';
                            str3 +='<div>'+ element3.reserve_kilo +'</div>';
                        str3 +='</div>';
                        str3 +='<div class="mb-3">';
                            str3 +='<label class="fw-bold">TOTAL AMOUNT</label>';
                            str3 +='<div>'+ element3. r_total_amount +'</div>';
                        str3 +='</div>';
                        
                        
                    str3 +='</div>';
                    str3 +='<div class="col-12 col-lg-6">';
                        str3 +='<div class="mb-3">';
                            str3 +='<label class="fw-bold">PAYMENT METHOD</label>';
                            str3 +='<div class="text-uppercase">' + element3.r_p_method + '</div>';
                        str3 +='</div>';
                        var pmethod = element3.r_p_method;
                        if(pmethod == "cod"){
                            str3 +='<div class="mb-3">';
                                str3 +='<label class="fw-bold">RECEIPT</label>';
                                str3 +='<div>' + element3.r_p_method_receipt + '</div>';
                            str3 +='</div>';
                        }
                        else {
                            str3 +='<div class="mb-3">';
                                str3 +='<label class="fw-bold">RECEIPT IMAGE</label>';
                                str3 +='<div><img class="paymentImg rounded" src="../../uploads/receiptImage/'+ element3.r_p_method_receipt +'"></div>';
                            str3 +='</div>';
                        }
                        str3 +='<div class="mb-3">';
                                str3 +='<label class="fw-bold">REFERENCE NUMBER</label>';
                                str3 +='<div>'+ element3.r_ref_num +'</div>';
                            str3 +='</div>';
                        str3 +='</div>';
                str3 +='</div>';
                   

                reserveView++;
            });
            $('#viewReserve').append(str3);

            $('#view').on('hidden.bs.modal', function () {
                $('#viewReserve').empty();
            });

            


        },
        error: function(xhr, ajaxOptions, thrownError){
            alert(thrownError);
        }
    });
}


