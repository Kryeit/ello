import User from './user.js';

class Store {
    constructor() {
        this.state = {
            user: null
        };
    }

    setUser(user) {
        this.state.user = user;
    }

    getUser() {
        return this.state.user;
    }

    resetUser() {
        this.state.user = null;
    }
}

export default new Store();