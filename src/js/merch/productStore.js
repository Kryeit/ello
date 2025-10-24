import { ref, reactive, readonly } from 'vue';
import { getIpAddress } from '@/js/static.js';

// Store state
const state = reactive({
    catalog: [],
    productsByName: {},
    productsByID: {},
    isLoaded: false,
    isLoading: false,
    error: null
});

// Create a global cache for product lookup
const productDetailsCache = reactive({});

// Actions
async function fetchCatalog() {
    if (state.isLoading || state.isLoaded) return;

    state.isLoading = true;
    state.error = null;

    try {
        const apiUrl = getIpAddress() + '/api/products/catalog';
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`Failed to fetch product catalog: ${response.status}`);
        }

        const data = await response.json();
        state.catalog = data;

        // Process catalog to create lookup maps
        processCatalog(data);

        state.isLoaded = true;
    } catch (error) {
        console.error('Error loading product catalog:', error);
        state.error = error.message;
    } finally {
        state.isLoading = false;
    }
}

function processCatalog(catalog) {
    // Group by name
    const byName = {};

    // Create ID lookup
    const byID = {};

    for (const product of catalog) {
        // Add to name lookup
        byName[product.name] = product;

        // Add each variant to ID lookup
        for (const colorVariant of product.colorVariants) {
            for (const sizeVariant of colorVariant.sizes) {
                byID[sizeVariant.id] = {
                    id: sizeVariant.id,
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    color: colorVariant.color,
                    colorCode: colorVariant.colorCode,
                    size: sizeVariant.size,
                    stock: sizeVariant.stock,
                    discount: sizeVariant.discount || 0,
                    material: product.material,
                    virtual: product.virtual,
                    images: colorVariant.images || []
                };
            }
        }
    }

    state.productsByName = byName;
    state.productsByID = byID;
}

// Getters
function getProductCatalog() {
    return state.catalog;
}

function getProductByID(id) {
    if (typeof id === 'string') id = parseInt(id, 10);
    return state.productsByID[id] || null;
}

function getProductByName(name) {
    return state.productsByName[name] || null;
}

// Add this new method to fetch product details directly from API
async function fetchProductDetailsFromApi(name) {
    try {
        const apiUrl = getIpAddress() + '/api/products/details';
        const response = await fetch(`${apiUrl}?name=${encodeURIComponent(name)}`);

        if (!response.ok) {
            throw new Error(`Failed to fetch product details: ${response.status}`);
        }

        const data = await response.json();

        // Add to cache
        state.productsByName[name] = data;

        // Add each variant to ID lookup
        if (data && data.colorVariants) {
            for (const colorVariant of data.colorVariants) {
                for (const sizeVariant of colorVariant.sizes) {
                    state.productsByID[sizeVariant.id] = {
                        id: sizeVariant.id,
                        name: data.name,
                        description: data.description,
                        price: data.price,
                        color: colorVariant.color,
                        colorCode: colorVariant.colorCode,
                        size: sizeVariant.size,
                        stock: sizeVariant.stock,
                        discount: sizeVariant.discount || 0,
                        material: data.material,
                        virtual: data.virtual,
                        images: colorVariant.images || []
                    };
                }
            }
        }

        return data;
    } catch (error) {
        console.error(`Error fetching product details for ${name}:`, error);
        return null;
    }
}

// Updated to fetch from API if not in cache
async function getProductDetails(name) {
    if (state.productsByName[name]) {
        return state.productsByName[name];
    }
    return await fetchProductDetailsFromApi(name);
}

function getProductVariants(name) {
    const product = state.productsByName[name];
    if (!product) return [];

    const variants = [];
    for (const colorVariant of product.colorVariants) {
        for (const sizeVariant of colorVariant.sizes) {
            variants.push(sizeVariant.id);
        }
    }

    return variants;
}

function getProductsByType(isVirtual) {
    return state.catalog.filter(product => product.virtual === isVirtual);
}

function getSizesByColor(name, color) {
    const product = state.productsByName[name];
    if (!product) return [];

    for (const colorVariant of product.colorVariants) {
        if (colorVariant.color === color || colorVariant.color === `#${color}`) {
            return colorVariant.sizes.map(size => size.size);
        }
    }

    return [];
}

function getProductBySizeAndColor(name, size, color) {
    const product = state.productsByName[name];
    if (!product) return null;

    for (const colorVariant of product.colorVariants) {
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

function getAvailableColors(name) {
    const product = state.productsByName[name];
    if (!product) return [];

    return product.colorVariants.map(variant => variant.color);
}

function getImages(name) {
    const product = state.productsByName[name];
    if (!product || !product.colorVariants.length) return [];

    // Return images from the first color variant
    return product.colorVariants[0].images || [];
}

function getProductsForStore() {
    const virtualProducts = [];
    const physicalProducts = [];

    for (const product of state.catalog) {
        if (product.colorVariants.length > 0) {
            // Create a representative product for display
            const displayProduct = {
                id: product.colorVariants[0].sizes[0].id,
                name: product.name,
                description: product.description,
                price: product.price,
                size: product.colorVariants[0].sizes[0].size,
                color: product.colorVariants[0].color,
                material: product.material,
                virtual: product.virtual,
                listed: true,
                images: product.colorVariants[0].images || []
            };

            if (product.virtual) {
                virtualProducts.push(displayProduct);
            } else {
                physicalProducts.push(displayProduct);
            }
        }
    }

    return { virtualProducts, physicalProducts };
}

export default {
    fetchCatalog,
    getProductCatalog,
    getProductByID,
    getProductByName,
    getProductDetails,
    getProductVariants,
    getProductsByType,
    getSizesByColor,
    getProductBySizeAndColor,
    getAvailableColors,
    getImages,
    getProductsForStore,
    isLoaded: () => state.isLoaded,
    isLoading: () => state.isLoading,
    hasError: () => !!state.error,
    error: () => state.error
};