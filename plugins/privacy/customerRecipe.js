$(document).ready(function () {
    doRequestDisplayRecipes();

});


var doRequestDisplayRecipes = () => {
    $.ajax({
        type: "POST",
        url: "../../routes/router.php",
        data: { choice: 'DisplayRecipes', },

        success: function (data) {
            // console.log(data);
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
                str += '<button recipe_id="' + element.recipe_id + '" data-bs-toggle="modal" data-bs-target="#recipes" class="btn btn-info btn-sm mt-3 mx-2 btn-view-recipe">View</button>';

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
    str += '<button recipe_id="' + e.recipe_id + '" data-bs-toggle="modal" data-bs-target="#recipes" class="btn btn-info btn-sm mt-3 mx-2 btn-view-recipe">View</button>';
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
                str1 += '<label class="fw-bold">Product Image</label><br>';
                str1 += '<img class="w-50 h-25 object-fit-cover rounded modalImage" alt="" src="../../uploads/recipeImage/' + element1.r_image + '">';
                str1 += '</div>';
                str1 += '<div class="mb-2 text-center ">';
                str1 += '<label class="fw-bold">Product Name:</label>';
                str1 += '<div class="text-capitalize">' + element1.r_name + '</div>';
                str1 += '</div>';
                str1 += '<div class="mb-2 text-center ">';
                str1 += '<label class="fw-bold">Type of Recipe</label>';
                str1 += '<div class="text-capitalize">' + element1.r_type + '</div>';
                str1 += '</div>';
                str1 += '<div class="mb-2 text-center">';
                str1 += '<label class="fw-bold">List of Recipes:</label>';
                str1 += '<ul class="nano text-capitalize">';

                element1.r_list.split(',').forEach(function (recipe) {
                    str1 += '<li class="list-inline">' + recipe + '</li>';
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


