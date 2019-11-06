const { io } = require('../server');
const { Users } = require('../classes/users');
const { createMessage } = require('../utils/utils')

const users = new Users();


io.on('connection', (client) => {

    client.on('enterChat', (data, callback) => {
        if (!data.name || !data.room) {
            return callback({
                error: true,
                message: 'The name or room is necessary'
            });
        }

        client.join(data.room);

        let usersAdd = users.addUser(client.id, data.name, data.room);

        client.broadcast.to(data.room).emit('userList', users.getUsersByRoom(data.room));

        callback(users.getUsersByRoom(data.room));
    });

    client.on('createMessage', (data) => {

        let userMessage = users.getUserById(client.id);

        let message = createMessage(userMessage.name, data.message);

        client.broadcast.to(userMessage.room).emit('createMessage', message);
    });


    client.on('disconnect', () => {
        let userDeleted = users.deleteUserById(client.id);

        // console.log(userDeleted)

        client.broadcast.to(userDeleted.room).emit('createMessage', createMessage('Admin', `${userDeleted.name} salió`));
        client.broadcast.to(userDeleted.room).emit('userList', users.getUsersByRoom(userDeleted.room));
    });


    client.on('privateMessage', (data) => {

        /*if (data.message === null || data.message === '') {
            return 
        }*/

        let userPrivate = users.getUserById(client.id);
        client.broadcast.to(data.to).emit('privateMessage', createMessage(userPrivate.name, data.message));
    });
});