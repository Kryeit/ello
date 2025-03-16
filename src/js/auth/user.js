class User {
    constructor(uuid, username, creation, lastSeen, roles, stats) {
        this.uuid = uuid;
        this.username = username;
        this.creation = creation;
        this.lastSeen = lastSeen;
        this.roles = roles;
        this.stats = stats;
    }
}

export default User;