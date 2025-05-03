import { getIpAddress } from "@/js/static.js";

class Products {
    constructor() {
        this.apiUrl = getIpAddress() + '/api/products';
        this.imageApiUrl = getIpAddress() + '/api/images/products';
    }

    // New methods using the improved API
    async getProductCatalog() {
        const response = await fetch(`${this.apiUrl}/catalog`);
        return await response.json();
    }

    async getProductDetails(name) {
        console.log("Hey")
        const response = await fetch(`${this.apiUrl}/details?name=${encodeURIComponent(name)}`);
        return await response.json();
    }

    // Methods below are maintained for backward compatibility
    async getProducts() {
        const response = await fetch(this.apiUrl);
        return await response.json();
    }

    async getProduct(id) {
        const response = await fetch(`${this.apiUrl}/${id}`);
        return await response.json();
    }

    async getProductBySizeAndColor(name, size, color) {
        // We can now use the details endpoint and filter client-side
        const details = await this.getProductDetails(name);
        for (const colorVariant of details.colorVariants) {
            if (colorVariant.color === `#${color}` || colorVariant.color === color) {
                for (const sizeVariant of colorVariant.sizes) {
                    if (sizeVariant.size === size) {
                        return sizeVariant.id;
                    }
                }
            }
        }
        return null;
    }

    async getSizes(name) {
        // Use product details and extract sizes from all color variants
        const details = await this.getProductDetails(name);
        const allSizes = new Set();
        for (const colorVariant of details.colorVariants) {
            for (const sizeVariant of colorVariant.sizes) {
                allSizes.add(sizeVariant.size);
            }
        }
        return Array.from(allSizes);
    }

    async getSizesByColor(name, color) {
        // Use product details and extract sizes for a specific color
        const details = await this.getProductDetails(name);
        for (const colorVariant of details.colorVariants) {
            if (colorVariant.color === `#${color}` || colorVariant.color === color) {
                return colorVariant.sizes.map(size => size.size);
            }
        }
        return [];
    }

    async getProductsByNameAndColor(name, color) {
        // Use product details to get all products of a specific color
        const details = await this.getProductDetails(name);
        for (const colorVariant of details.colorVariants) {
            if (colorVariant.color === color) {
                return colorVariant.sizes.map(size => ({
                    id: size.id,
                    name: details.name,
                    description: details.description,
                    price: details.price,
                    size: size.size,
                    color: colorVariant.color,
                    material: details.material,
                    virtual: details.virtual,
                    stock: size.stock
                }));
            }
        }
        return [];
    }

    async getProductsByColor(name) {
        // Use product details to group products by color
        const details = await this.getProductDetails(name);
        const productsByColor = {};

        for (const colorVariant of details.colorVariants) {
            productsByColor[colorVariant.color] = colorVariant.sizes.map(size => ({
                id: size.id,
                name: details.name,
                description: details.description,
                price: details.price,
                size: size.size,
                color: colorVariant.color,
                material: details.material,
                virtual: details.virtual,
                stock: size.stock
            }));
        }

        return productsByColor;
    }

    async getProductsByName(name) {
        // Get all product IDs for a specific product name
        const details = await this.getProductDetails(name);
        const ids = [];

        for (const colorVariant of details.colorVariants) {
            for (const sizeVariant of colorVariant.sizes) {
                ids.push(sizeVariant.id);
            }
        }

        return ids;
    }

    async getProductsGroupedByName() {
        // Use catalog to get all products grouped by name
        const catalog = await this.getProductCatalog();
        const result = {};

        for (const product of catalog) {
            if (product.colorVariants.length > 0) {
                // Use the first variant's color and size for display in the catalog
                const firstColorVariant = product.colorVariants[0];
                const firstSizeVariant = firstColorVariant.sizes[0];

                result[product.name] = [{
                    id: firstSizeVariant.id,
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    size: firstSizeVariant.size,
                    color: firstColorVariant.color,
                    material: product.material,
                    virtual: product.virtual,
                    listed: true
                }];
            }
        }

        return result;
    }

    async getImages(productName) {
        // This is still handled by the existing images endpoint
        const response = await fetch(`${this.imageApiUrl}/${productName}`);
        return await response.json();
    }

    async getImage(productName, index) {
        // This is still handled by the existing images endpoint
        const response = await fetch(`${this.imageApiUrl}/${productName}?index=${index}`);
        return await response.text();
    }
}

export default new Products();