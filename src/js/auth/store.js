import User from './user.js';

class Store {
    constructor() {
        this.state = {
            user: null
        };
    }

    setUser(uuid, username, creation, roles) {
        this.state.user = new User(uuid, username, creation, roles);
    }

    getUser() {
        return this.state.user;
    }
}

export default new Store();