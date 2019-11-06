class Users {

    constructor() {
        this.users = [];
    }

    //Add User to room
    addUser(id, name, room) {
        let user = { id, name, room };

        this.users.push(user);

        return this.users;
    }

    getUserById(id) {
        let user = this.users.filter(user => user.id === id)[0];

        return user;
    }

    getUsers() {
        return this.users;
    }

    getUsersByRoom(room) {
        let userInRoom = this.users.filter(user => user.room === room);
        return userInRoom;
    }

    deleteUserById(id) {

        let userDeleted = this.getUserById(id);

        this.users = this.users.filter(user => user.id != id);

        return userDeleted;
    }

}


module.exports = { Users }