$(document).ready(function () {
    users = () => {
        $.ajax({
            type: "POST",
            url: "../../../routes/router.php",
            data: { choice: 'chatACheckId' },
            success: function (data) {
                // console.log(data)
                var json = JSON.parse(data);
                console.log(data)
                var str = "";
                json.forEach(e => {
                    if (e.user_id !== 1) {
                        str += '<button user_id="' + e.user_id + '" class="btn btn-primary bt-md btn-msg text-capitalize " data-message="' + e.message + '" data-created="' + e.created + '">' + e.username + '</button>';
                        // str += '<p data-label="Users">' + e.message + '</p>';
                        // str += '<p data-label="Users">' + e.created + '</p>';
                    } else {
                        // Handle the case when user_id is 1
                    }
                });
                $('#messageReceived').html(str);

                $('.btn-msg').click(function () {
                    let messageId = $(this).attr("user_id");
                    let msg = $(this).data("message");
                    let time = $(this).data("created");
                    messageById(messageId, msg, time);
                });
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(thrownError);
            }
        });
    }

    users();

});


var chatA = (message, messageId, msg, time, id) => {
    console.log(msg)
    $.ajax({
        type: "POST",
        url: "../../../routes/router.php",
        data: { choice: 'chatA', message: message, messageId: messageId, msg: msg, time: time, id: id },
        success: function (data) {
            alert(data)
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(thrownError);
        }
    });
}



// ... (Previous code)

var messageById = (messageId, msg, time) => {
    $.ajax({
        type: "POST",
        url: "../../../routes/router.php",
        data: { choice: 'messageById', messageId: messageId, msg: msg, time: time },
        success: function (data) {
            var json = JSON.parse(data);
            str = "";

            json.forEach(e => {
                str += `
                <p data-label="Users">${e.user_id}</p>
                <p data-label="Users">${e.message}</p>
                <p data-label="Users">${e.created}</p><hr>  

                `;
            });

            $('#messageDisplay').append(str);

            if (json.length > 0) {
                // Assuming you want to empty messageReceived only if there are messages
                $('#messageReceived').empty();
                $('#messageReceived').append('<input class="form-control rounded" type="text" id="yourTextInputId" placeholder="Type your message">');
                $('#messageReceived').append('<button class="btn btn-primary mx-2 rounded mt-2" id="sendButton">Send</button>');

                $('#sendButton').click(function () {
                    var message = $('#yourTextInputId').val();
                    // Clear the input after getting the value
                    $('#yourTextInputId').val('');
                    chatA(message, messageId, msg, time);
                });
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(thrownError);
        }
    });
}

// ... (Rest of your code)

// var searchUsers = () => {
//     var searchQuery = $('#searchInput').val();
//     var container = $('#displayUsers');

//     $.ajax({
//         type: "POST",
//         url: "../../../routes/router.php",
//         data: { choice: 'searchUserss' },
//         success: function (data) {
// console.log(data);
//             try {
//                 var json = JSON.parse(data);
//                 json.sort(function (a, b) {
//                     var dateA = new Date(a.created);
//                     var dateB = new Date(b.created);
//                     return dateB - dateA;
//                 });
//                 json.reverse();
//                 container.empty();

//                 if (searchQuery === '') {
//                     json.forEach(function (e) {
//                         displaySearch(container, e);
//                     });
//                 } else {
//                     var filteredData = json.filter(function (e) {
//                         return (
//                             e.username.toLowerCase().includes(searchQuery.toLowerCase())

//                         );
//                     });

//                     if (filteredData.length === 0) {
//                         container.append("<p>No matching products found.</p>");
//                     } else {
//                         filteredData.forEach(function (e) {
//                             displaySearch(container, e);
//                         });
//                     }
//                 }
//             } catch (error) {
//                 console.error("Error parsing JSON data: " + error);
//             }
//         },
//         error: function (xhr, ajaxOptions, thrownError) {
//             alert("An error occurred: " + thrownError);
//         }
//     });
// }


// function displaySearch(container, e) {

//     var str = "";
//     // str += '<p data-label="Users">'+e.username+'</p>';
//     // str += '<p data-label="Users">'+e.message+'</p>';
//     // str += '<p data-label="Users">'+e.created+'</p>';
//     str += '<button user_id="' + e.user_id + '" class="btn-msg mx-1 data-label="Message"" >'+e.username+'</button>';
//     $(container).append(str);

//     $('.btn-msg').click(function () {
//         let messageId = $(this).attr("user_id");
//         messageById(messageId);
//     });

//     container.append(str);
// }
