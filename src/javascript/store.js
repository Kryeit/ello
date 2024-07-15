// src/store.js
import { reactive } from 'vue';
import { jwtDecode } from 'jwt-decode';

const store = reactive({
    user: {
        isLoggedIn: false,
        uuid: '',
        role: '',
    },
    message: '', // Initialize the message property
    setUser(authToken) {
        if (typeof authToken !== 'string' || !authToken.trim()) {
            console.error('setUser called with invalid token:', authToken);
            this.clearUser(); // Clear user state if the token is invalid
            return;
        }
        try {
            const decodedToken = jwtDecode(authToken);
            this.user.isLoggedIn = true;
            this.user.uuid = decodedToken.sub;
            this.user.role = decodedToken.roles ? decodedToken.roles.join(', ') : 'Not specified';
        } catch (error) {
            console.error('Error decoding token:', error);
            this.clearUser(); // Ensure user is cleared if token decoding fails
        }
    },
    clearUser() {
        this.user.isLoggedIn = false;
        this.user.uuid = '';
        this.user.role = '';
    },
    setMessage(message) {
        this.message = message;
    }
});

export default store;