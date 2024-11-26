class Stock {
    constructor() {
        this.apiUrl = 'http://localhost:6969/api/stock'; // replace with your actual API URL
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