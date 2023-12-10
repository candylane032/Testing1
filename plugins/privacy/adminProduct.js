$(document).ready(function () {
    doRequestDisplayProduct();

});



$('#btn-add-product').click(function () {
    check();
});

var check = () => {
    var pname = $('#pname').val();
    var img = $('#img').val();
    var p_price = parseFloat($('#p_price').val());
    var p_desc = $('#p_desc').val();

    if (pname != "" && img != "" && !isNaN(p_price) && p_price >= 0 && p_desc != "") {
        var formData = new FormData();
        formData.append('choice', 'AddProduct');
        formData.append('pname', pname);
        formData.append('img', $('#img')[0].files[0]);
        formData.append('p_price', p_price);
        formData.append('p_desc', p_desc);

        doRequestAddProduct(formData);
    } else {
        toastr.error("Please fill in all fields correctly, and ensure that the price is a non-negative number.");
    }
}


var doRequestAddProduct = (formData) => {

    $.ajax({
        type: "POST",
        url: "../../routes/router.php",
        data: formData,
        processData: false,
        contentType: false,
        success: function (data) {
            // console.log(data);
            if (data == "ExistProductName") {
                toastr.error("Product Name Already Added!");
            }
            else if (data == "ExistProductImage") {
                toastr.error("Product Image Already Added!");
            }
            else if (data == "200") {
                Swal.fire({
                    icon: 'success',
                    title: 'Product Added Succcesfuly',
                    showConfirmButton: false,
                    timer: 2000
                }).then(() => {
                    window.location.href = "../../pages/admin/adminProduct.php";
                });
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(thrownError);
        }
    });
}





var doRequestDisplayProduct = () => {

    $.ajax({
        type: "POST",
        url: "../../routes/router.php",
        data: { choice: 'DisplayProductAdmin', },

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
                str += '<h3 class="card-title mb-4">' + element.pname + '</h3>';
                str += '<div class="img-area mb-3 text-center">';
                str += '<img class="fish object-fit-cover" alt="" src="../../uploads/productImage/' + element.img + '">';
                str += '</div>';
                str += '<p class="price text-decoration-none"><i class="fa-sharp fa-solid fa-peso-sign"></i>' + element.p_price + '/kg' + '</p>';
                str += '<div class="buttonssss">';
                str += '<p class="' + textColor + '">' + element.stock + '</p>';
                str += '<button product_id="' + element.product_id + '" data-bs-toggle="modal" data-bs-target="#updateProduct" class="btn-update mx-2 btn-setId-product">UPDATE</button>';
                str += '<button product_id="' + element.product_id + '" data-bs-toggle="modal" data-bs-target="#updateProductStock" class="btn-status mx-2 btn-setId-productStock">STATUS</button>';
                str += '</div>';
                str += '</div>';
                str += '</div>';
                str += '</div>';

                product++;

            });
            $('#DisplayProducts').append(str);

            $(document).on('click', '.btn-setId-product', function () {
                let SetIdProduct = $(this).attr("product_id");
                doRequestDisplayProductModal(SetIdProduct);
            });


            $(document).on('click', '.btn-setId-productStock', function () {
                let SetIdProductStock = $(this).attr("product_id");
                doRequestDisplayProductStockModal(SetIdProductStock);
            });


        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(thrownError);
        }


    });

    var doSetIdProduct = (SetIdProduct) => {
        $.ajax({
            type: "POST",
            url: "../../routes/router.php",
            data: { choice: 'SetIdProduct', SetIdProduct: SetIdProduct },
            success: function (data) {
                // console.log(data);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(thrownError);
            }



        });
    }

}





var doRequestDisplayProductModal = (SetIdProduct) => {

    $.ajax({
        type: "POST",
        url: "../../routes/router.php",
        data: { choice: 'DisplayProductModal', product_id: SetIdProduct },

        success: function (data) {
            // console.log(data);
            var json1 = JSON.parse(data);
            var str1 = "";
            let product1 = 1;

            json1.forEach(element1 => {

                str1 += '<h1 class="mb-3 text-center">Update Product</h1> <hr>';
                str1 += '<label>Product Name</label>';
                str1 += '<input type="text" id="pname_' + element1.product_id + '" value="' + element1.pname + '" class="form-control mb-2" placeholder="Product Name">';
                str1 += '<label>Cuurent Image: ' + element1.img + '</label>';
                str1 += '<input type="file" id="img_' + element1.product_id + '" value="' + element1.img + '" class="form-control mb-2" >';
                str1 += '<label>Product Price</label>';
                str1 += '<input type="number" id="p_price_' + element1.product_id + '" value="' + element1.p_price + '" class="form-control mb-3" placeholder="Product Price">';
                str1 += '<input type="text" id="p_desc_' + element1.product_id + '" value="' + element1.p_desc + '" class="form-control mb-3" placeholder="Product Description">';

                str1 += '<button class="btn btn-info btn-sm btn-update-product" product_id="' + element1.product_id + '">SAVE</button>';
                product1++;

            });
            $('#displayDataProductModal').append(str1);

            $('#updateProduct').on('hidden.bs.modal', function () {
                $('#displayDataProductModal').empty();
            });


            $('.btn-update-product').click(function () {
                let productId = $(this).attr("product_id");
                let newPname = $('#pname_' + productId).val();
                let newImg = $('#img_' + productId).prop('files')[0];
                let newP_Price = $('#p_price_' + productId).val();
                let newPdesc = $('#p_desc_' + productId).val();

                if (isNonNegativeNumber(newP_Price)) {
                    doRequestUpdateProduct(newPname, newImg, newP_Price, newPdesc, productId);
                }
                else {
                    toastr.error("Ensure that it is a non-negative number.");
                }
            });


            function isNonNegativeNumber(value) {
                var numericValue = parseFloat(value);
                return !isNaN(numericValue) && numericValue >= 0;
            }


        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(thrownError);
        }
    });


}


var doRequestUpdateProduct = (newPname, newImg, newP_Price, newPdesc, productId) => {
    var formData = new FormData();
    formData.append('choice', 'UpdateProduct');
    formData.append('pname', newPname);
    formData.append('p_price', newP_Price);
    formData.append('p_desc', newPdesc);
    formData.append('product_id', productId);
    

    if (newImg) {
        formData.append('img', newImg);
    }

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
                    title: 'Product Updated Successfully!',
                    showConfirmButton: false,
                    timer: 2000
                }).then(() => {
                    window.location.href = "../../pages/admin/adminProduct.php";
                });
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(thrownError);
        }
    });
};



var doRequestDisplayProductStockModal = (SetIdProductStock) => {

    $.ajax({
        type: "POST",
        url: "../../routes/router.php",
        data: { choice: 'DisplayProductStockModal', product_id: SetIdProductStock },

        success: function (data) {
            // console.log(data);
            var json2 = JSON.parse(data);
            var str2 = "";
            let product2 = 1;

            json2.forEach(element2 => {

                str2 += '<div>';
                str2 += '<h1 class="text-center">Product Status</h1> <hr> ';
                str2 += '<label>Product Name:</label>';
                str2 += '<p class="fw-bold">' + element2.pname + '</p>';
                str2 += '<label class="mb-1">Stock</label>';
                str2 += '<select class="form-control" id="stock_' + element2.product_id + '" value="' + element2.stock + '">';
                str2 += '<option class="form-control text-success" value="Available">Available</option>';
                str2 += '<option class="form-control text-danger" value="Not Available">Not Available</option>';
                str2 += '</select>';
                str2 += '<button product_id="' + element2.product_id + '" class="btn btn-sm btn-info mt-3 btn-update-productStock">UPDATE</button>';
                str2 += '</div>';

                product2++;

            });
            $('#dispalyUpdateProductStocks').append(str2);

            $('#updateProductStock').on('hidden.bs.modal', function () {
                $('#dispalyUpdateProductStocks').empty();
            });


            $('.btn-update-productStock').click(function () {
                let productId = $(this).attr("product_id");
                let newStock = $('#stock_' + productId).val();
                console.log(newStock);
                console.log(productId);
                doRequestUpdateProductStock(newStock, productId);
            });





        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(thrownError);
        }
    });

    function bindProductStockUpdateClickEvent() {
        $('.btn-update-productStock').click(function () {
            let productId = $(this).attr("product_id");
            let newStock = $('#stock_' + productId).val();
            console.log(newStock);
            console.log(productId);
            doRequestUpdateProductStock(newStock, productId);
        });
    }


}

var doRequestUpdateProductStock = (newStock, productId) => {

    $.ajax({
        type: "POST",
        url: "../../routes/router.php",
        data: {
            choice: 'UpdateProductStock',
            stock: newStock,
            product_id: productId
        },
        success: function (data) {
            // console.log(data);
            if (data == "200") {
                Swal.fire({
                    icon: 'success',
                    title: 'Product Stock Updated Successfully!',
                    showConfirmButton: false,
                    timer: 2000
                }).then(() => {
                    window.location.href = "../../pages/admin/adminProduct.php";
                });
            }

        }
    });
};

var searchProducts = () => {
    var searchQuery = $('#searchInput').val();
    var container = $('#DisplayProducts');

    $.ajax({
        type: "POST",
        url: "../../routes/router.php",
        data: { choice: 'DisplayProductAdmin' },
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
    str += '</div>';
    str += '<p class="price text-decoration-none"><i class="fa-sharp fa-solid fa-peso-sign"></i>' + e.p_price + '/kg' + '</p>';
    str += '<p class="' + textColor + '">' + e.stock + '</p>';
    str += '<div class="buttonssss">';
    str += '<button product_id="' + e.product_id + '" data-bs-toggle="modal" data-bs-target="#updateProduct" class="btn-update mx-2 btn-setId-product">UPDATE</button>';
    str += '<button product_id="' + e.product_id + '" data-bs-toggle="modal" data-bs-target="#updateProductStock" class="btn-status  mx-1 btn-setId-productStock">STATUS</button>';
    str += '</div>';
    str += '</div>';
    str += '</div>';
    str += '</div>';

    container.append(str);
}

