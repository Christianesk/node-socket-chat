var socket = io();
socket.on('connect', function () {
    console.log('Conectado al servidor');
});

//Escuchar
socket.on('disconnect', function () {
    console.log('Perdimos conexion con el servidor');
});

//Enviar informacion
socket.emit('enviarMensaje', {
    usuario: 'Fernando',
    mensaje: 'Hola Mundo'
}, function (resp) {
    console.log('Repuesta server: ', resp);
});

//Escuchar información
socket.on('enviarMensaje', function (mensaje) {
    console.log('Servidor: ', mensaje);
});