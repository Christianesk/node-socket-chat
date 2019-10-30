const { io } = require('../server');
const { Users } = require('../classes/users');

const users = new Users();


io.on('connection', (client) => {

    client.on('enterChat', (user, callback) => {
        if (!user.name) {
            return callback({
                error: true,
                message: 'The name is necessary'
            });
        }
        let usersAdd = users.addUser(client.id, user.name);

        client.broadcast.emit('userList', users.getUsers());

        callback(usersAdd);
    });


    client.on('disconnect', () => {
        let userDeleted = users.deleteUserById(client.id);

        client.broadcast.emit('createMessage', { user: 'Administrador', message: `${userDeleted.name} abandono el chat` });
        client.broadcast.emit('userList', users.getUsers());
    });
});