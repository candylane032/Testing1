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
                doRequestDisplayOrderPaid(profileUserId);
            });


        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(thrownError);
        }
    });
}


var doRequestDisplayOrderPaid = (profileUserId) => {
    $.ajax({
        type: "POST",
        url: "../../routes/router.php",
        data: { choice: 'DisplayOrderPaid', user_id: profileUserId },
        success: function (data) {
            // console.log(data);
            var json1 = JSON.parse(data);
            var str1 = "";

            json1.forEach(element1 => {
                str1 += '<tr>';
                str1 += '<td data-label="PRODUCT NAME">' + element1.pname + '</td>';
                str1 += '<td data-label="KILO">' + element1.order_kilo + '</td>';
                str1 += '<td data-label="TOTAL AMOUNT">' + element1.total_amount + '</td>';
                str1 += '<td class="text-success">' + element1.o_payment_status + '</td>';
                str1 += '<td class="text-uppercase" data-label="METHOD">' + element1.p_method + '</td>';
                str1 += '<td class="text-success text-capitalize" data-label="DELIVERY">' + element1.o_delivery + '</td>';
                str1 += '<td data-label="CREATED">' + element1.created + '</td>';
                str1 += '</tr>';

            });
            $('#displayOrderPaid').append(str1);


        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(thrownError);
        }
    });
}

