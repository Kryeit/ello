class Products {
    constructor() {
        this.apiUrl = 'http://localhost:6969/api/products';
    }

    async getProducts() {
        const response = await fetch(this.apiUrl);
        return await response.json();
    }

    async getProduct(id) {
        const response = await fetch(`${this.apiUrl}/${id}`);
        return await response.json();
    }
}

export default new Products();