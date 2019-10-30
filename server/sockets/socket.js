const { io } = require('../server');
const { Users } = require('../classes/users');
const { createMessage } = require('../utils/utils')

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

    client.on('createMessage', (user) => {

        let userMessage = users.getUserById(client.id);

        let message = createMessage(userMessage.name, userMessage.message);

        client.broadcast.emit('createMessage', message);
    });


    client.on('disconnect', () => {
        let userDeleted = users.deleteUserById(client.id);

        client.broadcast.emit('createMessage', createMessage('Admin', `${userDeleted.name} salió`));
        client.broadcast.emit('userList', users.getUsers());
    });
});