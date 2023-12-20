$(document).ready(function () {
    doRequestDisplayRecipes();
});




$('#btn-addInput-recipe').click(() => {
    addRecipeInput();
});

$('#btn-submit-recipe').click(() => {
    check();
});




var check = () => {
    var r_name = $('#r_name').val();
    var r_image = $('#r_image').val();
    var r_type = $('#r_type').val();
    var r_list = [];

    $('#r_list input').each(function () {
        r_list.push($(this).val());
    });

    if (r_name !== "" && r_image !== "" && r_type !== "" && r_list.length > 0) {
        var formData = new FormData();
        formData.append('choice', 'AddRecipe');
        formData.append('r_name', r_name);
        formData.append('r_image', $('#r_image')[0].files[0]);
        formData.append('r_type', r_type);
        formData.append('r_list', r_list.join(','));

        doRequestAddProductRecipe(formData);
    } else {
        toastr.error("Please fill in all fields correctly");
    }
};

function addRecipeInput() {
    var newRecipeIndex = $('#r_list li').length + 1;
    var newRecipePlaceholder = "Recipe " + newRecipeIndex;
    var newRecipeItem = $('<li><input type="text" class="form-control my-1" placeholder="' + newRecipePlaceholder + '"></li>');

    $('#r_list').append(newRecipeItem);
}

var doRequestAddProductRecipe = (formData) => {
    $.ajax({
        type: "POST",
        url: "../../routes/router.php",
        data: formData,
        processData: false,
        contentType: false,
        success: (data) => {
            // console.log(data);
            if (data === "ExistProductName") {
                toastr.error("Product Name Already Added!");
            } else if (data === "ExistProductImage") {
                toastr.error("Product Image Already Added!");
            } else if (data === "200") {
                Swal.fire({
                    icon: 'success',
                    title: 'Recipe Added Succesfully!',
                    showConfirmButton: false,
                    timer: 2000
                }).then(() => {
                    window.location.href = "../../pages/admin/adminRecipe.php";
                });
            }
        },
        error: (xhr, ajaxOptions, thrownError) => {
            alert(thrownError);
        },
    });
};



var doRequestDisplayRecipes = () => {
    $.ajax({
        type: "POST",
        url: "../../routes/router.php",
        data: { choice: 'DisplayRecipes', },

        success: function (data) {

            var json = JSON.parse(data);
            var str = "";
            let recipe = 1;

            json.sort(function (a, b) {
                var dateA = new Date(a.created);
                var dateB = new Date(b.created);
                return dateB - dateA;
            });
            json.reverse();

            json.forEach(element => {

                str += '<div class="col-12 col-md-12 col-lg-4 mb-2">';
                str += '<div class="card text-center pb-2">';
                str += '<div class="card-body">';
                str += '<h3 class="card-title">' + element.r_name + '</h3>';
                str += '<div class="img-area text-center">';
                str += '<img class="fish object-fit-cover" alt="" src="../../uploads/recipeImage/' + element.r_image + '">';
                str += '<div class="d-flex align-items-center justify-content-center">';
                str += '<button recipe_id="' + element.recipe_id + '" data-bs-toggle="modal" data-bs-target="#recipes" class="btn-status mt-3 mx-2 btn-view-recipe">View</button>';
                str += '<button recipe_id="' + element.recipe_id + '" data-bs-toggle="modal" data-bs-target="#recipesUpdate" class="btn-update mt-3 btn-recipe-update"><i class="bi bi-pencil-square"></i></button>';
                str += '</div>';
                str += '</div>';
                str += '</div>';
                str += '</div>';
                str += '</div>';

                recipe++;

            });
            $('#displayRecipes').append(str);

            $(document).on('click', '.btn-view-recipe', function () {
                let SetIdRecipe = $(this).attr("recipe_id");
                console.log(SetIdRecipe);
                doRequestDisplayRecipeModal(SetIdRecipe);
            });

            $(document).on('click', '.btn-recipe-update', function () {
                let SetIdRecipeUpdate = $(this).attr("recipe_id");
                console.log(SetIdRecipeUpdate);
                doRequestDisplayRecipeModalUpdate(SetIdRecipeUpdate);
            });

        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(thrownError);
        }


    });


}


var searchProducts = () => {
    var searchQuery = $('#searchInput').val();
    var container = $('#displayRecipes');

    $.ajax({
        type: "POST",
        url: "../../routes/router.php",
        data: { choice: 'DisplayRecipes' },
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
                            e.r_name.toLowerCase().includes(searchQuery.toLowerCase())

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

    str = ''
    str += '<div class="col-12 col-md-12 col-lg-4 mb-2">';
    str += '<div class="card text-center pb-2">';
    str += '<div class="card-body">';
    str += '<h3 class="card-title">' + e.r_name + '</h3>';
    str += '<div class="img-area text-center">';
    str += '<img class="fish object-fit-cover" alt="" src="../../uploads/recipeImage/' + e.r_image + '">';
    str += '<div class="d-flex align-items-center justify-content-center">';
    str += '<button recipe_id="' + e.recipe_id + '" data-bs-toggle="modal" data-bs-target="#recipes" class="btn-status mt-3 mx-2 btn-view-recipe">View</button>';
    str += '<button recipe_id="' + e.recipe_id + '" data-bs-toggle="modal" data-bs-target="#recipesUpdate" class="btn-update btn-sm mt-3 btn-recipe-update"><i class="bi bi-pencil-square"></i></button>';
    str += '</div>';
    str += '</div>';
    str += '</div>';
    str += '</div>';
    str += '</div>';

    container.append(str);
}





var doRequestDisplayRecipeModal = (SetIdRecipe) => {
    $.ajax({
        type: "POST",
        url: "../../routes/router.php",
        data: { choice: 'DisplayRecipeModal', recipe_id: SetIdRecipe },

        success: function (data) {
            // console.log(data);
            var json1 = JSON.parse(data);
            var str1 = "";
            let recipe1 = 1;

            json1.forEach(element1 => {

                str1 += '<div class="mb-2 mt-4 text-center">';
                str1 += '<label class="fw-bold text-muted">Product Image</label><br>';
                str1 += '<img class="fish modalImage rounded object-fit-cover" alt="" src="../../uploads/recipeImage/' + element1.r_image + '">';
                str1 += '</div>';
                str1 += '<div class="mb-2 text-center">';
                str1 += '<label class="fw-bold text-muted">Product Name</label>';
                str1 += '<p class="text-capitalize">' + element1.r_name + '</p>';
                str1 += '</div>';
                str1 += '<div class="mb-2 text-center">';
                str1 += '<label class="fw-bold text-muted">Type of Recipe</label>';
                str1 += '<p class="text-capitalize">' + element1.r_type + '</p>';
                str1 += '</div>';
                str1 += '<div class="mb-2 text-center">';
                str1 += '<label class="fw-bold text-muted">List of Recipes:</label>';
                str1 += '<ul class="list-inline">';

                element1.r_list.split(',').forEach(function (recipe) {
                    str1 += '<li>' + recipe + '</li>';
                });

                str1 += '</ul>';
                str1 += '</div>';



                recipe1++;

            });
            $('#displayDataRecipeModal').append(str1);

            $('#recipes').on('hidden.bs.modal', function () {
                $('#displayDataRecipeModal').empty();
            });


        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(thrownError);
        }
    });

}



var doRequestDisplayRecipeModalUpdate = (SetIdRecipeUpdate) => {
    $.ajax({
        type: "POST",
        url: "../../routes/router.php",
        data: { choice: 'DisplayRecipeModalUpdate', recipe_id: SetIdRecipeUpdate },

        success: function (data) {
            // console.log(data);
            var json2 = JSON.parse(data);
            var str2 = "";
            let recipe2 = 1;

            json2.forEach(element2 => {

                str2 += '<h1 class="text-center text-info">UPDATE RECIPE</h1>';
                str2 += '<div class="mb-2 mt-4">';
                str2 += '<label>Cuurent Image: ' + element2.r_image + '</label>';
                str2 += '<input type="file" id="r_image_' + element2.recipe_id + '" class="form-control" >';
                str2 += '</div>';
                str2 += '<div class="mb-2">';
                str2 += '<label>Product Name</label>';
                str2 += '<input type="text" id="r_name_' + element2.recipe_id + '" value="' + element2.r_name + '" class="form-control" placeholder="Product Name">';
                str2 += '</div>';
                str2 += '<div class="mb-2">';
                str2 += '<label>Type of Recipe</label>';
                str2 += '<input type="text" id="r_type_' + element2.recipe_id + '" value="' + element2.r_type + '" class="form-control" placeholder="Type of Recipe">';
                str2 += '</div>';
                str2 += '<div class="mb-2">';
                str2 += '<label>List of Recipes</label>';
                str2 += '<ul id="r_list_' + element2.recipe_id + '_ul">';

                element2.r_list.split(',').forEach(function (recipe) {
                    str2 += '<li class="mb-1">';
                    str2 += '<input type="text" id="r_list_' + element2.recipe_id + '_input" value="' + recipe + '" class="form-control" placeholder="Type of Recipe">';
                    str2 += '</li>';
                });

                str2 += '</ul>';
                str2 += '</div>';
                str2 += '<div class="mb-2 d-flex align-items-center justify-content-center">';
                str2 += '<button recipe_id="' + element2.recipe_id + '" class="btn btn-sm btn-secondary mx-2 btn-addRecipeList">Add RecipeList</button>';
                str2 += '<button recipe_id="' + element2.recipe_id + '" class="btn btn-sm btn-primary update-btn-recipe">UPDATE</button>';

                str2 += '</div>';
                recipe2++;

            });
            $('#displayDataRecipeModalUpdate').append(str2);

            $('#recipesUpdate').on('hidden.bs.modal', function () {
                $('#displayDataRecipeModalUpdate').empty();
            });


            $('.update-btn-recipe').click(function () {
                let recipeId = $(this).attr("recipe_id");
                let newR_name = $('#r_name_' + recipeId).val();
                let newR_image = $('#r_image_' + recipeId).prop('files')[0];
                let newR_type = $('#r_type_' + recipeId).val();
                let newR_list = [];
                $('#r_list_' + recipeId + '_ul input').each(function () {
                    newR_list.push($(this).val());
                });

                doRequestUpdateRecipe(newR_name, newR_image, newR_type, newR_list, recipeId);
            });

            $('.btn-addRecipeList').click(function () {
                let addRecipeId = $(this).attr("recipe_id");
                addRecipe(addRecipeId);
            });

            function addRecipe(addRecipeId) {
                var newRecipeIndex = $('#r_list_' + addRecipeId + '_ul li').length + 1;
                var newRecipePlaceholder = "Recipe " + newRecipeIndex;
                var newRecipeItem = $('<li><input type="text" class="form-control my-1" placeholder="' + newRecipePlaceholder + '"></li>');

                $('#r_list_' + addRecipeId + '_ul').append(newRecipeItem);
            }


        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(thrownError);
        }
    });

}


var doRequestUpdateRecipe = (newR_name, newR_image, newR_type, newR_list, recipeId) => {
    var formData = new FormData();
    formData.append('choice', 'UpdateRecipe');
    formData.append('r_name', newR_name);
    formData.append('r_type', newR_type);
    formData.append('r_list', newR_list.join(','));
    formData.append('recipe_id', recipeId);

    if (newR_image) {
        formData.append('r_image', newR_image);
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
                    title: 'Recipe Updated Successfully!',
                    showConfirmButton: false,
                    timer: 2000
                }).then(() => {
                    window.location.href = "../../pages/admin/adminRecipe.php";
                });
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(thrownError);
        }
    });
};