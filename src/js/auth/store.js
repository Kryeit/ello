import authService from "@/js/auth/authService.js";

class Store {
    getUser() {
        return authService.user.value;
    }
}

export default new Store();