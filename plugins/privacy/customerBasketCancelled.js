$(document).ready(function() {
   doRequestSelectUserIdProfile();
});

var profileUserId;
var doRequestSelectUserIdProfile = () => {
   $.ajax({
      type: "POST",
      url: "../../routes/router.php",
      data: { choice: 'SelectUserIdProfileToCancelled' },
      success: function(data) {
         console.log(data);
         var json = JSON.parse(data);
         var str = "";

         json.forEach(element => {
             str += '<div class="autoClick" user_id="' + element.user_id + '"></div>';
         });
         $('#selectUserIdProfile').append(str);
            
         $('.autoClick').each(function() {
            profileUserId = $(this).attr("user_id");
            console.log(profileUserId);
               doRequestDisplayReserveBasketCancelled(profileUserId);
         });


      },
      error: function(xhr, ajaxOptions, thrownError) {
         alert(thrownError);
      }
   });
}



var productName;

var doRequestDisplayReserveBasketCancelled = (profileUserId) => {
   $.ajax({
      type: "POST",
      url: "../../routes/router.php",
      data: {
         choice: 'DisplayReserveBasketCancelled',
         user_id: profileUserId,
      },
      success: function (data) {
         console.log(data);
         var json2 = JSON.parse(data);
         var str2 = "";
         let basket = 1;
         json2.forEach((element2) => {

            productName = element2.pname;

            var textColor = element2.payment_status === "Cancelled" ? 'text-danger' : 'text-success';

            str2 += '<tr>';
               // str2 += '<td data-label="ID" >' + element2.reserve_id + '</td>';
               str2 += '<td class="pname" pname="' + productName + '" data-label="PNAME">' + productName + '</td>';
               str2 += '<td data-label="KILO">' + element2.reserve_kilo + '</td>';
               str2 += '<td data-label="TOTAL AMOUNT">' + element2.r_total_amount + '</td>';
               str2 += '<td class="' + textColor + ' fw-bold"  >' + element2.payment_status + '</td>';
               str2 += '<td class="text-uppercase" data-label="METHOD">' + element2.r_p_method + '</td>';
               str2 += '<td class="text-success text-capitalize" data-label="DELIVERY">' + element2.r_delivery + '</td>';
               str2 += '<td data-label="CREATED">' + element2.created + '</td>';
            str2 += '</tr>';

            basket++;
         });

         $('#displayBasketCancelled').append(str2);
      },
      error: function (xhr, ajaxOptions, thrownError) {
         alert(thrownError);
      },
   });
}