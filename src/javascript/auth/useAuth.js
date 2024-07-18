import {authenticate, logout} from "@/javascript/auth/auth.js";
import store from "@/javascript/auth/store.js"; // Assuming store.js exports a default store object

async function loginUser(uuid, password) {
    try {
        const response = await authenticate(uuid, password);
        // No need to set user here as it's already done in authenticate
        return true;
    } catch (error) {
        console.error('Login error:', error);
        store.setMessage(error.message || 'An error occurred.');
        return false;
    }
}

async function checkLoginStatus() {
    const token = localStorage.getItem('token');
    if (token) {
        await store.setUser(token);
    } else {
        store.clearUser();
    }
}

function logoutUser() {
    logout(); // Clears tokens from localStorage
    store.clearUser(); // clearUser needs to be implemented in store.js
}


// Run checkLoginStatus on initialization to update state based on current token
checkLoginStatus();

export function useAuth() {
    return {
        loginUser,
        logoutUser,
        checkLoginStatus
    };
}