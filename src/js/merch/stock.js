import { getIpAddress } from "@/js/static.js";

class Stock {
    constructor() {
        this.apiUrl = getIpAddress() + '/api/stock';
    }

    async getStock(id) {
        if (typeof id !== 'number' && !Number.isInteger(parseInt(id))) return { quantity: 0, discount: 0 };

        try {
            const response = await fetch(`${this.apiUrl}/${id}`);
            return await response.json();
        } catch (error) {
            console.error("Error fetching stock:", error);
            return { quantity: 0, discount: 0 };
        }
    }

    async getStockByName(name) {
        try {
            // For product groups, we sum up the stock across all variants
            const response = await fetch(`${this.apiUrl}/by-name?name=${encodeURIComponent(name)}`);
            return await response.json();
        } catch (error) {
            console.error("Error fetching stock by name:", error);
            return 0;
        }
    }
}

export default new Stock();