var socket = io();

var params = new URLSearchParams(window.location.search);

if (!params.has('name') || !params.has('room')) {
    window.location = 'index.html';
    throw new Error('El nombre y sala son necesarios');
}

var user = {
    name: params.get('name'),
    room: params.get('room')
}

socket.on('connect', function () {

    socket.emit('enterChat', user, function (resp) {
        renderUser(resp);
    });
});

// escuchar
socket.on('disconnect', function () {

    console.log('Perdimos conexión con el servidor');

});

// Listen to information
socket.on('createMessage', function (message) {
    renderMessage(message, false);
    scrollBottom();
});

//Listen to user changes (Login and logout)
socket.on('userList', function (users) {

    renderUser(users);

});

//Private message
socket.on('privateMessage', function (message) {
    console.log('Private message: ', message);
});