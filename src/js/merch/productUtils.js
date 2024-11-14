class ProductUtils {
    static getGroupedProductsByColorAndSize(products) {
        const groupedProducts = {};

        products.forEach(product => {
            if (!groupedProducts[product.name]) {
                groupedProducts[product.name] = {
                    ...product,
                    colors: {}
                };
            }

            if (!groupedProducts[product.name].colors[product.color]) {
                groupedProducts[product.name].colors[product.color] = [];
            }

            groupedProducts[product.name].colors[product.color].push(product.size);
        });

        return Object.values(groupedProducts);
    }
}

export default ProductUtils;