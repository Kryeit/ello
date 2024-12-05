import {getIpAddress} from "@/js/static.js";

class Stock {
    constructor() {
        this.apiUrl = getIpAddress() + '/api/stock';
    }

    async getStock(id) {
        if (typeof id != 'number') return 0;
        const response = await fetch(`${this.apiUrl}/${id}`);
        return await response.json();
    }

    async getStockByName(name) {
        const response = await fetch(`${this.apiUrl}/by-name?name=${name}`);
        return await response.json();
    }
}

export default new Stock();