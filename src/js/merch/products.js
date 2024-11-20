class Products {
    constructor() {
        this.apiUrl = 'http://localhost:6969/api/products';
        this.imageApiUrl = 'http://localhost:6969/api/images/products';
    }

    async getProducts() {
        const response = await fetch(this.apiUrl);
        return await response.json();
    }

    async getProduct(id) {
        const response = await fetch(`${this.apiUrl}/${id}`);
        return await response.json();
    }

    async getProductBySizeAndColor(name, size, color) {
        const url = `${this.apiUrl}/by-size-and-color?name=${name}&size=${size}&color=${color}`;
        const response = await fetch(url);
        return await response.json();
    }

    async getSizes(name) {
        const url = `${this.apiUrl}/sizes?name=${name}`;
        const response = await fetch(url);
        return await response.json();
    }

    async getSizesByColor(name, color) {
        const url = `${this.apiUrl}/sizes?name=${name}&color=${color}`;
        const response = await fetch(url);
        return await response.json();
    }

    async getProductsGroupedByColor(name) {
        const response = await fetch(`${this.apiUrl}/color-group?name=${name}`);
        return await response.json();
    }

    async getProductsByName(name) {
        const response = await fetch(`${this.apiUrl}/by-name?name=${name}`);
        return await response.json();
    }

    async getProductsGroupedByName() {
        const response = await fetch(`${this.apiUrl}/by-name`);
        return await response.json();
    }

    async getImages(productName) {
        const response = await fetch(`${this.imageApiUrl}/${productName}`);
        return await response.json();
    }

    async getImage(productName, index) {
        const response = await fetch(`${this.imageApiUrl}/${productName}?index=${index}`);
        return await response.text();
    }
}

export default new Products();