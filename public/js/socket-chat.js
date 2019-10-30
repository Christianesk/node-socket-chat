var socket = io();

var params = new URLSearchParams(window.location.search);

if (params.has('nombre')) {
    window.location = 'index.html';
    throw new Error('El nombre es necesario');
}

var user = {
    name: params.get('name')
}

socket.on('connect', function () {

    socket.emit('enterChat', user, function (resp) {
        console.log('Users online', resp);
    });
});

// escuchar
socket.on('disconnect', function () {

    console.log('Perdimos conexión con el servidor');

});


// Send information
/*ocket.emit('createMessage', {
    usuario: 'Fernando',
    mensaje: 'Hola Mundo'
}, function (resp) {
    console.log('respuesta server: ', resp);
});*/
// Listen to information
socket.on('createMessage', function (mensaje) {

    console.log('Servidor:', mensaje);

});

//Listen to user changes (Login and logout)
socket.on('userList', function (users) {

    console.log(users);

});