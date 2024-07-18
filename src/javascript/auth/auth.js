import axios from 'axios';
import store from "@/javascript/auth/store.js";

const api = axios.create({
    baseURL: 'http://localhost:6969/api/v1/auth',
    headers: {
        'Content-Type': 'application/json',
    },
});

export async function register(uuid, password, role = 'USER') {
    const response = await api.post('/register', {
        uuid,
        password,
        role,
    });
    return response.data;
}

export async function authenticate(uuid, password) {
    try {
        const response = await api.post('/authenticate', { uuid, password });
        const { access_token, refresh_token } = response.data;
        if (typeof access_token !== 'string') {
            throw new Error('Invalid token received');
        }
        localStorage.setItem('token', access_token);
        localStorage.setItem('refreshToken', refresh_token);
        await store.setUser(access_token);
        return response.data; // Return the full response data
    } catch (error) {
        handleAuthError(error);
        return false;
    }
}

export async function refreshToken() {
    try {
        const response = await api.post('/refresh-token', null, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('refreshToken')}`,
            },
        });
        const { token } = response.data;
        localStorage.setItem('token', token);
        return response.data;
    } catch (error) {
        handleAuthError(error);
        return false;
    }
}

export function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    store.setUser(null);
}

export function getToken() {
    return localStorage.getItem('token');
}

export async function verifyOtp(otp, uuid = store.user.uuid) {
    console.log('verifyOtp called with OTP:', otp, 'and UUID:', uuid); // Log input parameters
    try {
        const response = await api.post('/otp/verify', { uuid, otp });
        console.log('verifyOtp response:', response.data); // Log API response
        return response.data; // Return the verification result
    } catch (error) {
        console.error('verifyOtp error:', error); // Log caught error
        handleAuthError(error);
        return false;
    }
}

export function initializeAuthState() {
    const token = getToken();
    if (token) {
        store.setUser(token);
    }
}

function handleAuthError(error) {
    if (error.response && error.response.status === 403) {
        store.setMessage('Access denied. Please check your credentials.');
    } else {
        store.setMessage(error.response?.data?.message || error.message || 'An error occurred.');
    }
}
