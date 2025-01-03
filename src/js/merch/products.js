import {getIpAddress} from "@/js/static.js";

class Products {
    constructor() {
        this.apiUrl = getIpAddress() + '/api/products';
        this.imageApiUrl = getIpAddress() + '/api/images/products';
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

    async getProductsByNameAndColor(name, color) {
        const encodedColor = encodeURIComponent(color);
        const response = await fetch(`${this.apiUrl}/by-name-and-color?name=${name}&color=${encodedColor}`);
        return await response.json();
    }

    async getProductsByColor(name) {
        const response = await fetch(`${this.apiUrl}/by-color?name=${name}`);
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