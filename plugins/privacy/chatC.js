$(document).ready(function () {
    users = () => {
        $.ajax({
            type: "POST",
            url: "../../../routes/router.php",
            data: { choice: 'readChatToAdmin' },
            success: function (data) {
                var json = JSON.parse(data);
                var str = "";
                json.forEach(e => {
                    str += '<p data-label="Users">' + e.user_id + '</p>';
                    str += '<p data-label="Users">' + e.message + '</p>';
                    str += '<p data-label="Users">' + e.created + '</p><hr>';
                });
                $('#messageReceived').html(str);
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(thrownError);
            }
        });
    }

    users();
    setInterval(users, 1000);
});

$('#send').click(function () {
    chatA($('#chat').val(), 1);

    $('#chat').val('');
});

var chatA = (messageId) => {
    console.log(messageId)
    $.ajax({
        type: "POST",
        url: "../../../routes/router.php",
        data: { choice: 'chatToAdmin', messageId: messageId, message: $('#chat').val() },
        success: function (data) {
            alert(data)
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(thrownError);
        }
    });
}

// var messageById = (messageId, msg, time) => {
//     $.ajax({
//         type: "POST",
//         url: "../../../routes/router.php",
//         data: { choice: 'messageById', messageId: messageId, msg:msg, time:time},
//         success: function (data) {
//             alert(data);
//             console.log(data)
//             alert(data)
//             var json = JSON.parse(data);
//             str = "";

//             json.forEach(e => {
//                 str += `
//                 <p data-label="Users">${e.user_id}</p>
//                 <p data-label="Users">${e.message}</p>
//                 <p data-label="Users">${e.created}</p><hr>  

//                 `;
//             });

//             $('#messageDisplay').append(str);

//             if (json.length > 0) {
//                 // Assuming you want to empty messageReceived only if there are messages
//                 $('#messageReceived').empty();
//                 $('#messageReceived').append('<input type="text" id="yourTextInputId" placeholder="Type your message">');
//                 $('#messageReceived').append('<button id="sendButton">Send</button>');

//                 $('#sendButton').click(function () {
//                     var message = $('#yourTextInputId').val();
//                     // Clear the input after getting the value
//                     $('#yourTextInputId').val('');
//                     chatA(message, messageId,msg, time);
//                 });
//             }
//         },
//         error: function (xhr, ajaxOptions, thrownError) {
//             alert(thrownError);
//         }
//     });
// }
