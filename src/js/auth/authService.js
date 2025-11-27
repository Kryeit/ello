import {ref} from "vue";
import User from "@/js/auth/user.js";

class AuthService {
    validatingLogin = ref(false);
    user = ref();
    loginShown = ref(false);

    async login(code) {
        const response = await fetch("/api/account/login", {
            method: "POST",
            body: JSON.stringify({code: code}),
        });
        if (!response.ok) {
            throw new Error(await response.text());
        }

        const body = await response.json();
        localStorage.setItem("token", body.token);
        this.handleSuccessfulLogin(body, body.token);
    }

    async validateToken() {
        this.validatingLogin.value = true;
        try {
            const authToken = localStorage.getItem("token");
            const response = await fetch("/api/account", {
                headers: {
                    "Authorization": `${authToken}`,
                }
            });
            if (response.ok) {
                this.handleSuccessfulLogin(await response.json(), authToken);
            }
        } finally {
            this.validatingLogin.value = false;
        }
    }

    handleSuccessfulLogin(body, token) {
        const actualFetch = fetch;
        fetch = (url, options) => actualFetch(url, {...options, headers: {"Authorization": token}});

        this.user.value = new User(body.minecraftUUID, body.minecraftName, []);
    }

    async logout() {
        const response = await fetch('/api/account/logout', {
            method: 'POST',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! ${await response.text()}`);
        }

        localStorage.setItem("token", null);
        this.user.value = null;
    }
}

export default new AuthService();