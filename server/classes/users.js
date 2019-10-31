class Users {

    constructor() {
        this.users = [];
    }

    //Add User to Group
    addUser(id, name) {
        let user = { id, name };

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

    }

    deleteUserById(id) {

        let userDeleted = this.getUserById(id);

        this.users = this.users.filter(user => user.id != id);

        return userDeleted;
    }

}


module.exports = { Users }