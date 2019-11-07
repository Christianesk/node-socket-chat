var params = new URLSearchParams(window.location.search);

var name = params.get('name');
var room = params.get('room');


var divUsers = $('#divUsers');
var formSend = $('#formSend');
var txtMessage = $('#txtMessage');
var divChatbox = $('#divChatbox');

function renderUser(users) {


    console.log(users);

    var html = '';

    html += '<li>';
    html += '<a href="javascript:void(0)" class="active"> Chat de <span> ' + room + '</span></a>';
    html += '</li>';

    for (var i = 0; i < users.length; i++) {
        html += '<li>';
        html += '<a data-id="' + users[i].id + '" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>' + users[i].name + '<small class="text-success">online</small></span></a>';
        html += '</li>';
    }

    divUsers.html(html);





}

function renderMessage(data, self) {

    var html = '';
    var date = new Date(data.date);
    var hour = date.getHours() + ':' + date.getMinutes();

    var adminClass = 'info';

    if (data.name === 'Admin') {
        adminClass = 'danger'
    }

    if (self) {
        html += '<li class="reverse">';
        html += '    <div class="chat-content">';
        html += '        <h5>' + data.name + '</h5>';
        html += '        <div class="box bg-light-inverse">' + data.message + '</div>';
        html += '    <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" />';
        html += '    </div>';
        html += '    <div class="chat-time">' + hour + '</div>';
        html += '</li>';
    } else {
        html += '<li class="animated fadeIn">';
        if (data.name !== 'Admin') {
            html += '<div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" />';
        }
        html += '</div>';
        html += '<div class="chat-content">';
        if (data.name !== 'Admin') {
            html += '<h5>' + data.name + '</h5>';
        }
        html += '<div class="box bg-light-' + adminClass + '">' + data.message + '</div>';
        html += ' </div>';
        html += '<div class="chat-time">' + hour + '</div>';
        html += '</li>';
    }

    divChatbox.append(html);

}

divUsers.on('click', 'a', function () {
    var id = $(this).data('id');

    if (id) {
        console.log(id);
    }
});

formSend.on('submit', function (event) {
    event.preventDefault();

    if (txtMessage.val().trim().length === 0) {
        return;
    }

    socket.emit('createMessage', {
        name: name,
        message: txtMessage.val()
    }, function (message) {
        txtMessage.val('').focus();
        renderMessage(message, true);
        scrollBottom();
    });
});
