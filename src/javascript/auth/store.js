import { reactive } from 'vue';
import { jwtDecode } from 'jwt-decode';
import { getMinecraftUsername } from './authUtils.js'; // Import the function from authUtils.js

const store = reactive({
    user: {
        isLoggedIn: false,
        uuid: '',
        role: '',
        mcUsername: '',
    },
    message: '',
    async setUser(authToken) {
        if (typeof authToken !== 'string' || !authToken.trim()) {
            console.error('setUser called with invalid token');
            this.clearUser();
            return;
        }
        try {
            const decodedToken = jwtDecode(authToken);
            // Use getMinecraftUsername to fetch the username
            const mcUsername = await getMinecraftUsername(decodedToken.sub);
            if (mcUsername !== 'Username not found' && mcUsername !== 'Failed to fetch username') {
                this.user.mcUsername = mcUsername;
                this.user.isLoggedIn = true;
                this.user.uuid = decodedToken.sub;
                this.user.role = decodedToken.roles ? decodedToken.roles.join(', ') : 'Not specified';
            } else {
                throw new Error(mcUsername); // Handle errors from getMinecraftUsername
            }
        } catch (error) {
            console.error('Error setting user:', error);
            this.clearUser();
        }
    },
    clearUser() {
        this.user.isLoggedIn = false;
        this.user.uuid = '';
        this.user.role = '';
        this.user.mcUsername = '';
    },
    setMessage(message) {
        this.message = message;
    }
});

export default store;