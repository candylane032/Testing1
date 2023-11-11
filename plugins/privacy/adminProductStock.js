$(document).ready(function() {
    doRequestDisplayProductStockNotAvailable();
});


var doRequestDisplayProductStockNotAvailable = () => {

    $.ajax({
        type: "POST",
        url: "../../routes/router.php",
        data: { choice: 'DisplayProductNotAvailable', },
        
        success: function(data) {
            console.log(data);
            var json = JSON.parse(data);
            var str = "";
            let product = 1;

            json.forEach(element => {

                str += '<div class="col-12 col-md-12 col-lg-4 mb-2">';
                    str += '<div class="card text-center pb-2">';
                        str += '<div class="card-body">';
                            str += '<h3 class="card-title">'+ element.pname +'</h3>';
                            str += '<div class="img-area mb-4 text-center">';
                                str += '<img class="fish" alt="" src="../'+ element.img +'">';
                            str += '</div>';
                            str += '<p class="price text-decoration-none"><i class="fa-sharp fa-solid fa-peso-sign"></i>'+ element.p_price + '/kg' + '</p>';
                            str += '<p class="text-center text-danger fs-4">'+ element.stock +'</p>';
                            str += '<div class="buttonssss">';
                                str += '<button product_id="' + element.product_id + '" data-bs-toggle="modal" data-bs-target="#updateProductStock" class="btn btn-sm btn-danger mx-1 btn-setId-productStock">Stock</button>';
                            str += '</div>';
                        str += '</div>';
                    str += '</div>';
                str += '</div>';
                    
                product++;

            });   
            $('#DisplayProductsStock').append(str);


            $('.btn-setId-productStock').click(function() {
                let SetIdProductStock = $(this).attr("product_id");
                doRequestDisplayProductStockModal(SetIdProductStock);
            });



        },
        error: function(xhr, ajaxOptions, thrownError) {
            alert(thrownError);
        }


    });
}

var doRequestDisplayProductStockModal = (SetIdProductStock) => {

    $.ajax({
        type: "POST",
        url: "../../routes/router.php",
        data: { choice: 'DisplayProductStockModal', product_id: SetIdProductStock },
        
        success: function(data) {
            console.log(data);
            var json2 = JSON.parse(data);
            var str2 = "";
            let product2 = 1;

            json2.forEach(element2 => {

                str2 += '<div>';
                    str2 += '<h1 class="mb-2">Update Stock Product</h1>';
                    str2 += '<label>Product name</label>';
                    str2 += '<p>' + element2.pname + '</p>';
                    str2 += '<label class="mb-1">Stock</label>';
                    str2 += '<select class="form-control" id="stock_' + element2.product_id + '" value="' + element2.stock + '">';
                        str2 += '<option class="form-control text-success" value="Available">Available</option>';
                        str2 += '<option class="form-control text-success" value="Not Available">Not Available</option>';
                    str2 += '</select>';
                    str2 += '<button product_id="' + element2.product_id + '" class="btn btn-sm btn-info mt-3 btn-update-productStock">Update</button>';
                str2 += '</div>';

                product2++;

            });   
            $('#dispalyUpdateProductStocks').append(str2);

            $('#updateProductStock').on('hidden.bs.modal', function () {
                $('#dispalyUpdateProductStocks').empty();
            });


            $('.btn-update-productStock').click(function() {
                let productId = $(this).attr("product_id");
                let newStock = $('#stock_' + productId).val();
                console.log(newStock);
                console.log(productId);
                doRequestUpdateProductStock(newStock, productId);
            });


            


        },
        error: function(xhr, ajaxOptions, thrownError) {
            alert(thrownError);
        }
    });

    function bindProductStockUpdateClickEvent() {
        $('.btn-update-productStock').click(function() {
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
        data: { choice: 'UpdateProductStock', 
            stock: newStock,
            product_id: productId
        },
        success: function(data) {
            console.log(data);
            if (data == "200") {
                alert("Product Stock Updated Successfully!");
                window.location.href = "../../pages/admin/adminProductStock.php";
            }
            
        }
    });
};


