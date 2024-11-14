import Store from "@/js/auth/store.js";
import User from "@/js/auth/user.js";

class AuthService {

    async validateToken() {
        const token = this.getToken();
        if (token) {
            const response = await fetch(`/api/login/validate`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            const user = new User(data.uuid, data.username, data.creation, data.roles);
            Store.setUser(user.uuid, user.username, user.creation, user.roles);
            return true;
        }
        return false;
    }

    saveToken(token) {
        document.cookie = `auth=${token}; path=/`;
    }

    async validateLogin(token) {

        const encodedToken = encodeURIComponent(token);

        const response = await fetch(`/api/login/validate-login?t=` + encodedToken);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        const user = new User(data.uuid, data.username, data.creation, data.roles);

        Store.setUser(user.uuid, user.username, user.creation, user.roles);
        this.saveToken(data.token);

        return true;
    }

    getToken() {
        const cookies = document.cookie.split('; ');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i];
            const [name, value] = cookie.split('=');
            if (name === 'auth') {
                return value;
            }
        }
        return null;
    }

    async logout() {
        const response = await fetch('/api/account/logout', {
            method: 'POST',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Clear the auth cookie
        document.cookie = 'auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = '_auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

        Store.resetUser();
    }
}

export default new AuthService();