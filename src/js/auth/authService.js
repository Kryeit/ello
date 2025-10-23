import {getIpAddress} from "@/js/static.js";
import {ref} from "vue";
import User from "@/js/auth/user.js";

class AuthService {
    user = ref();

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
        this.user.value = new User(body.account.minecraftUUID, body.account.minecraftName, []);
    }

    async validateToken() {
        const response = await fetch("/api/account", {
            headers: {
                "Authorization": `${localStorage.getItem("token")}`,
            }
        });
        if (response.ok) {
            const body = await response.json();
            this.user.value = new User(body.minecraftUUID, body.minecraftName, []);
        }
    }

    async logout() {
        const response = await fetch(getIpAddress() + '/api/account/logout', {
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