$(document).ready(function () {
    doSelectIdSession();
});

let getsetSessionId;
var setSessionId;
var doSelectIdSession = () => {
    $.ajax({
        type: "POST",
        url: "../../routes/router.php",
        data: { choice: 'DisplayIdSession' },
        success: function (data) {
            // console.log(data)
            var json1 = JSON.parse(data);
            var str1 = "";

            json1.forEach(element1 => {
                str1 += '<div class="autoClick" user_id="' + element1.user_id + '"></div>';
            });

            $('#displayId').append(str1);

            $('.autoClick').each(function () {
                setSessionId = $(this).attr("user_id");
                doRequestDisplayProduct(setSessionId);
                console.log(setSessionId + " autoClick");
                getsetSessionId = setSessionId;
            });


        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(thrownError);
        }
    });
}


var SetIdProductOrder;
var SetIdSessionOrder;
var SetIdProductReserve;
var SetIdSessionReserve;
var SetIdProduct;
var getSetIdProduct;
var doRequestDisplayProduct = (setSessionId) => {
    $.ajax({
        type: "POST",
        url: "../../routes/router.php",
        data: { choice: 'DisplayProduct', user_id: setSessionId },
        success: function (data) {
            // console.log(data);
            var json = JSON.parse(data);
            var str = "";
            let product = 1;

            json.sort(function (a, b) {
                var dateA = new Date(a.created);
                var dateB = new Date(b.created);
                return dateB - dateA;
            });
            json.reverse();

            json.forEach(element => {
                var textColor = element.stock === "Available" ? 'text-success' : 'text-danger';

                str += '<div class="col-12 col-md-12 col-lg-3 mb-2">';
                str += '<div class="card text-center pb-2">';
                str += '<div class="card-body">';
                str += '<h3 class="card-title">' + element.pname + '</h3>';
                str += '<div class="img-area mb-3 text-center" data-bs-target="#m1" data-bs-toggle="modal">';
                str += '<img class="fish object-fit-cover" alt="" src="../../uploads/productImage/' + element.img + '">';
                str += '<div class="overlay">';
                str += '<button product_id="' + element.product_id + '" user_id="' + element.user_id + '" class="btn btn-secondary btn-sm">View Details</button>';
                str += '</div>';
                str += '</div>';
                str += '<p class="price text-decoration-none"><i class="fa-sharp fa-solid fa-peso-sign"></i>' + element.p_price + '/kg' + '</p>';
                str += '<p class="' + textColor + '">' + element.stock + ' </p>';
                str += '<div class="buttonssss">';
                if (element.stock === "Available") {
                    str += '<button product_id="' + element.product_id + '" user_id="' + element.user_id + '" data-bs-toggle="modal" data-bs-target="#order" class="btn-order  mx-2 btn-setId-productOrder">Purchase</button>';
                    str += '<button product_id="' + element.product_id + '" user_id="' + element.user_id + '" data-bs-toggle="modal" data-bs-target="#reserve" class="btn-reserve btn-sm  mx-2 btn-setId-productReserve">Reserve</button>';
                }
                str += '</div>';
                str += '</div>';
                str += '</div>';
                str += '</div>';

                product++;

            });
            $('#DisplayProducts').append(str);
            // $('#viewDescription').append(str2);

            $(document).on('click', '.btn-setId-productOrder', function () {
                SetIdProductOrder = $(this).attr("product_id");
                SetIdSessionOrder = $(this).attr("user_id");
                doRequestDisplayPnamePpricePurchaseModal(SetIdProductOrder, SetIdSessionOrder);

                console.log("SetIdProductOrder: " + SetIdProductOrder + ' ' + "SetIdSessionOrder: " + SetIdSessionOrder);
            });

            $(document).on('click', '.btn-setId-productReserve', function () {
                SetIdProductReserve = $(this).attr("product_id");
                SetIdSessionReserve = $(this).attr("user_id");
                doRequestDisplayPnamePriceReserveModal(SetIdProductReserve, SetIdSessionReserve);
                console.log("SetIdProductReserve: " + SetIdProductReserve + ' ' + "SetIdSessionReserve: " + SetIdSessionReserve);
            });

            $('.btn-setId-productReserve').each(function () {
                SetIdProduct = $(this).attr("product_id");
                SetIdSessionReserve = $(this).attr("user_id");

            });

            $(document).on('click', '.btn', function () {
                viewProdId = $(this).attr("product_id");
                viewUserId = $(this).attr("user_id");
                desc(viewProdId,viewUserId)
            });
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(thrownError);
        }
    });
}

var desc =(viewProdId,viewUserId)=>{
    $.ajax({
        type: "POST",
        url: "../../routes/router.php",
        data: { choice: 'desc',viewProdId: viewProdId, viewUserId: viewUserId },
        success: function (data) {
        var json = JSON.parse(data); 
        str = "";

        $('#viewDescription').empty();
        
        json.forEach(el => {
            str += '<div>'+ el.p_desc +'</div>';
        });
        $('#viewDescription').append(str);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(thrownError);
        }
    });
};

var price;

var doRequestDisplayPnamePpricePurchaseModal = (SetIdProductOrder, SetIdSessionOrder) => {
    $.ajax({
        type: "POST",
        url: "../../routes/router.php",
        data: { choice: 'DisplayPnamePpricePurchaseModal', product_id: SetIdProductOrder, user_id: SetIdSessionOrder },
        success: function (data) {
            // console.log(data);
            var json2 = JSON.parse(data);
            var str2 = "";
            let order = 1;

            json2.forEach(element2 => {
                str2 += '<div>';
                str2 += '<label class="text-dark">Product Name</label>';
                str2 += '<p class="text-dark fw-bold">' + element2.pname + '</p>';
                str2 += '</div>';
                str2 += '<div>';
                str2 += '<label class="text-dark">Product Price</label>';
                str2 += '<p class="text-dark fw-bold getPrice" id="getPrice" price="' + element2.p_price + '">' + element2.p_price + '</p>';
                str2 += '</div>';

                order++;
            });
            $('#selectPnamePrice').append(str2);

            $('#order').on('hidden.bs.modal', function () {
                $('#selectPnamePrice').empty();
            });

            $('.getPrice').each(function () {
                price = $(this).attr("price");
            });
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(thrownError);
        }
    });
}



var Reserveprice;
var doRequestDisplayPnamePriceReserveModal = (SetIdProductReserve, SetIdSessionReserve) => {
    $.ajax({
        type: "POST",
        url: "../../routes/router.php",
        data: { choice: 'DisplayPnamePpricePurchaseModal', product_id: SetIdProductReserve, user_id: SetIdSessionReserve },
        success: function (data) {
            // console.log(data);
            var json3 = JSON.parse(data);
            var str3 = "";
            let reserve = 1;

            json3.forEach(element3 => {
                str3 += '<div>';
                str3 += '<label class="text-dark">Product Name</label>';
                str3 += '<p class="text-dark fw-bold">' + element3.pname + '</p>';
                str3 += '</div>';
                str3 += '<div>';
                str3 += '<label class="text-dark">Product Price</label>';
                str3 += '<p class="text-dark fw-bold getPrice"  price="' + element3.p_price + '">' + element3.p_price + '</p>';
                str3 += '</div>';

                reserve++;
            });
            $('#selectPnamePriceReserve').append(str3);

            $('#reserve').on('hidden.bs.modal', function () {
                $('#selectPnamePriceReserve').empty();
            });

            $('.getPrice').each(function () {
                Reserveprice = $(this).attr("price");
            });
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(thrownError);
        }
    });
}


$('#btn_palceOrder').click(function () {
    checkOrder();
});

var checkOrder = () => {
    var order_kilo = $('#order_kilo').val();
    var p_method = $('#p_method').val();
    var ref_num = $('#ref_num').val();
    var p_method_receipt = $('#p_method_receipt').val();

    if (p_method == "cod") {
        if (order_kilo != "" && isNonNegativeNumber(order_kilo)) {
            doRequestOrderProductByCod(SetIdProductOrder, price);
        } else {
            toastr.error('Please fill in all the required fields & Avoid negative number.');
        }
    } else if (p_method == "gcash" || p_method == "paymaya") {
        if (
            order_kilo != "" &&
            isNonNegativeNumber(order_kilo) &&
            ref_num != "" &&
            isNonNegativeNumber(ref_num) &&
            p_method_receipt != ""
        ) {
            var formData = new FormData();
            formData.append('choice', 'OrderProductBy' + capitalizeFirstLetter(p_method));
            formData.append('product_id', SetIdProductOrder);
            formData.append('total_amount', price);
            formData.append('order_kilo', order_kilo);
            formData.append('p_method', p_method);
            formData.append('ref_num', ref_num);
            formData.append('p_method_receipt', $('#p_method_receipt')[0].files[0]);

            doRequestOrderProductByGcash(formData);
        } else {
            toastr.error('Please fill in all the required fields & Avoid negative number.');
        }
    } else {
        toastr.error('Please fill in all fields correctly!');
    }
}

function isNonNegativeNumber(value) {
    var numericValue = parseFloat(value);
    return !isNaN(numericValue) && numericValue >= 0;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


var doRequestOrderProductByCod = (SetIdProductOrder, price) => {
    $.ajax({
        type: "POST",
        url: "../../routes/router.php",
        data: {
            choice: 'OrderProductByCod',
            product_id: SetIdProductOrder,
            total_amount: price,
            order_kilo: $('#order_kilo').val(),
            p_method: $('#p_method').val()
        },
        success: function (data) {
            // console.log(data);
            if (data == "200") {
                Swal.fire({
                    icon: 'success',
                    title: 'Order Successfully via Cash on Delivery',
                    text: 'Would you like to view your order details and chat with the owner?',
                    confirmButtonText: 'Proceed',
                    showCancelButton: true,
                    cancelButtonText: 'Later',
                    showCloseButton: true,
                    closeButtonText: 'Add More',
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = "../../pages/customer/purchase1.php";
                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                        window.location.href = "../../pages/customer/product.php";
                    } else if (result.dismiss === Swal.DismissReason.close) {
                        window.location.href = "../../pages/customer/product.php";
                    }
                });
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(thrownError);
        }
    });
}

var doRequestOrderProductByGcash = (formData) => {

    $.ajax({
        type: "POST",
        url: "../../routes/router.php",
        data: formData,
        processData: false,
        contentType: false,
        success: function (data) {
            // console.log(data);
            if (data == "200") {
                Swal.fire({
                    icon: 'success',
                    title: 'Order Successfully via Gcash',
                    text: 'Would you like to view your order details and chat with the owner?',
                    confirmButtonText: 'Proceed',
                    showCancelButton: true,
                    cancelButtonText: 'Later',
                    showCloseButton: true,
                    closeButtonText: 'Add More',
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = "../../pages/customer/purchase1.php";
                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                        window.location.href = "../../pages/customer/product.php";
                    } else if (result.dismiss === Swal.DismissReason.close) {
                        window.location.href = "../../pages/customer/product.php";
                    }
                });

            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(thrownError);
        }
    });
}

var doRequestOrderProductByPaymaya = (formData) => {

    $.ajax({
        type: "POST",
        url: "../../routes/router.php",
        data: formData,
        processData: false,
        contentType: false,
        success: function (data) {
            // console.log(data);
            if (data == "200") {
                Swal.fire({
                    icon: 'success',
                    title: 'Order Successfully via Paymaya',
                    text: 'Would you like to view your order details and chat with the owner?',
                    confirmButtonText: 'Proceed',
                    showCancelButton: true,
                    cancelButtonText: 'Later',
                    showCloseButton: true,
                    closeButtonText: 'Add More',
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = "../../pages/customer/purchase1.php";
                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                        window.location.href = "../../pages/customer/product.php";
                    } else if (result.dismiss === Swal.DismissReason.close) {
                        window.location.href = "../../pages/customer/product.php";
                    }
                });
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(thrownError);
        }
    });
}



$('#btn_palceReserve').click(function () {
    checkReserve();
});

var checkReserve = () => {
    var reserve_kilo = $('#reserve_kilo').val();
    var r_p_method = $('#r_p_method').val();
    var r_ref_num = $('#r_ref_num').val();
    var r_p_method_receipt = $('#r_p_method_receipt').val();

    if (r_p_method == "cod") {
        if (reserve_kilo != "" && isNonNegativeNumber1(reserve_kilo)) {
            doRequestReserveProductByCod(SetIdProductReserve, Reserveprice);
        } else {
            toastr.error('Please fill in all the required fields & Avoid negative number.');
        }
    } else if (r_p_method == "gcash" || r_p_method == "paymaya") {
        if (
            reserve_kilo != "" &&
            isNonNegativeNumber1(reserve_kilo) &&
            r_ref_num != "" &&
            isNonNegativeNumber1(r_ref_num) &&
            r_p_method_receipt != ""
        ) {
            var formData = new FormData();
            formData.append('choice', 'ReserveProductBy' + capitalizeFirstLetter(r_p_method));
            formData.append('product_id', SetIdProductReserve);
            formData.append('r_total_amount', Reserveprice);
            formData.append('reserve_kilo', reserve_kilo);
            formData.append('r_p_method', r_p_method);
            formData.append('r_ref_num', r_ref_num);
            formData.append('r_p_method_receipt', $('#r_p_method_receipt')[0].files[0]);

            doRequestReserveProductByGcash(formData);
        } else {
            toastr.error('Please fill in all the required fields & Avoid negative number.');
        }
    } else {
        toastr.error('Please fill in all fields correctly!');
    }
}

function isNonNegativeNumber1(value) {
    var numericValue = parseFloat(value);
    return !isNaN(numericValue) && numericValue >= 0;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}




var doRequestReserveProductByCod = (SetIdProductReserve, Reserveprice) => {
    $.ajax({
        type: "POST",
        url: "../../routes/router.php",
        data: {
            choice: 'ReserveProductByCod',
            product_id: SetIdProductReserve,
            r_total_amount: Reserveprice,
            reserve_kilo: $('#reserve_kilo').val(),
            r_p_method: $('#r_p_method').val(),
        },
        success: function (data) {
            // console.log(data);
            if (data == "200") {
                Swal.fire({
                    icon: 'success',
                    title: 'Reservation Successfully via Cash on Delivery',
                    text: 'Would you like to view your reservation details and chat with the owner?',
                    confirmButtonText: 'Proceed',
                    showCancelButton: true,
                    cancelButtonText: 'Later',
                    showCloseButton: true,
                    closeButtonText: 'Add More',
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = "../../pages/customer/basket1.php";
                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                        window.location.href = "../../pages/customer/product.php";
                    } else if (result.dismiss === Swal.DismissReason.close) {
                        window.location.href = "../../pages/customer/product.php";
                    }
                });
            }

        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(thrownError);
        }
    });
}




var doRequestReserveProductByGcash = (formData) => {

    $.ajax({
        type: "POST",
        url: "../../routes/router.php",
        data: formData,
        processData: false,
        contentType: false,
        success: function (data) {
            // console.log(data);
            if (data == "200") {
                Swal.fire({
                    icon: 'success',
                    title: 'Reservation Successfully via Gcash',
                    text: 'Would you like to view your reservation details and chat with the owner?',
                    confirmButtonText: 'Proceed',
                    showCancelButton: true,
                    cancelButtonText: 'Later',
                    showCloseButton: true,
                    closeButtonText: 'Add More',
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = "../../pages/customer/basket1.php";
                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                        window.location.href = "../../pages/customer/product.php";
                    } else if (result.dismiss === Swal.DismissReason.close) {
                        window.location.href = "../../pages/customer/product.php";
                    }
                });
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(thrownError);
        }
    });
}

var doRequestReserveProductByPaymaya = (formData) => {

    $.ajax({
        type: "POST",
        url: "../../routes/router.php",
        data: formData,
        processData: false,
        contentType: false,
        success: function (data) {
            // console.log(data);
            if (data == "200") {
                Swal.fire({
                    icon: 'success',
                    title: 'Reservation Successfully via Paymaya',
                    text: 'Would you like to view your reservation details and chat with the owner?',
                    confirmButtonText: 'Proceed',
                    showCancelButton: true,
                    cancelButtonText: 'Later',
                    showCloseButton: true,
                    closeButtonText: 'Add More',
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = "../../pages/customer/basket1.php";
                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                        window.location.href = "../../pages/customer/product.php";
                    } else if (result.dismiss === Swal.DismissReason.close) {
                        window.location.href = "../../pages/customer/product.php";
                    }
                });
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(thrownError);
        }
    });
}








var searchProducts = (setSessionId) => {

    var searchQuery = $('#searchInput').val();
    var container = $('#DisplayProducts');

    $.ajax({
        type: "POST",
        url: "../../routes/router.php",
        data: { choice: 'DisplayProduct', user_id: setSessionId },
        success: function (data) {
            // console.log(data);
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
                        return (
                            e.pname.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            e.stock.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
                            e.p_price.toString().toLowerCase().includes(searchQuery.toLowerCase())

                        );
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

    var textColor = e.stock === "Available" ? 'text-success' : 'text-danger';

    str = ''
    str += '<div class="col-12 col-md-12 col-lg-3 mb-2">';
    str += '<div class="card text-center pb-2">';
    str += '<div class="card-body">';
    str += '<h3 class="card-title">' + e.pname + '</h3>';
    str += '<div class="img-area mb-4 text-center">';
    str += '<img class="fish object-fit-cover" alt="" src="../../uploads/productImage/' + e.img + '">';
    str += '<div class="overlay">';
    str += '<button product_id="' + e.product_id + '" user_id="' + e.user_id + '" class="btn btn-secondary btn-sm">View Details</button>';
    str += '</div>';
    str += '</div>';
    str += '<p class="price text-decoration-none"><i class="fa-sharp fa-solid fa-peso-sign"></i>' + e.p_price + '/kg' + '</p>';
    str += '<p class="' + textColor + '">' + e.stock + '</p>';
    str += '<div class="buttonssss">';
    if (e.stock === "Available") {
        str += '<button product_id="' + e.product_id + '" user_id="' + e.user_id + '" data-bs-toggle="modal" data-bs-target="#order" class="btn btn-order  mx-2 btn-setId-productOrder">Purchase</button>';
        str += '<button product_id="' + e.product_id + '" user_id="' + e.user_id + '" data-bs-toggle="modal" data-bs-target="#reserve" class="btn btn-reserve btn-sm  mx-2 btn-setId-productReserve">Reserve</button>';    }
    str += '</div>';
    str += '</div>';
    str += '</div>';
    str += '</div>';

    container.append(str);
    
    $(document).on('click', '.btn', function () {
        viewProdId = $(this).attr("product_id");
        viewUserId = $(this).attr("user_id");
        desc(viewProdId,viewUserId)

    $('#m1').modal('show');

    });
    
}







