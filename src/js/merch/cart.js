import {reactive, watch} from 'vue';
import Stock from '@/js/merch/stock.js';
import Products from "@/js/merch/products.js";
import {addToast} from "@/js/toasts.js";
import {i18n} from "@/main.js";

const loadCartFromLocalStorage = () => {
    const cartData = localStorage.getItem('cart');
    return cartData ? JSON.parse(cartData) : {};
};

const saveCartToLocalStorage = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
};

const createCart = async () => {
    const items = loadCartFromLocalStorage();

    const cart = reactive({
        items,

        async addItem(id, price) {
            if (typeof id !== 'number') {
                id = Number(id);
            }

            if (isNaN(id)) {
                console.error('Invalid product ID');
                return;
            }

            const stock = await Stock.getStock(id);
            const product = await Products.getProduct(id);

            if (this.items[id]) {
                if (product.virtual) {
                    console.warn('Virtual products can only have a quantity of 1 in the cart');
                } else if (this.items[id].quantity < stock.quantity) {
                    this.items[id].quantity += 1;

                    addToast('map.png', "Added " + product.name + " to the Jar. I mean... Cart!", "Click the checkout button to proceed");
                } else {
                    console.warn('Not enough stock to add more items');
                }
            } else {
                if (stock.quantity > 0 || product.virtual) {
                    this.items[id] = { quantity: 1, price };

                    addToast('map.png', "Added " + product.name + " to the Jar. I mean... Cart!", "Click the checkout button to proceed");
                } else {
                    console.warn('No stock available for this item');
                }
            }
            saveCartToLocalStorage(this.items);
        },

        removeItem(id) {
            if (this.items[id]) {
                if (this.items[id].quantity > 1) {
                    this.items[id].quantity -= 1;
                } else {
                    delete this.items[id];
                }
                saveCartToLocalStorage(this.items);
            }
        },

        clearCart() {
            this.items = {};
            saveCartToLocalStorage(this.items);

        },

        totalPrice() {
            return Object.values(this.items).reduce((total, item) => total + item.price * item.quantity, 0);
        },

        totalWithShipping(hasNonVirtualItems) {
            let total = this.totalPrice();
            if (hasNonVirtualItems) {
                total += 10; // Shipping cost
            }
            return total;
        },

        getCartItemsArray() {
            return Object.keys(this.items).map(id => ({
                id: Number(id),
                quantity: this.items[id].quantity,
                price: this.items[id].price
            }));
        }
    });

    // Watch for changes in the cart items and save to local storage
    watch(() => cart.items, (newItems) => {
        saveCartToLocalStorage(newItems);
    }, { deep: true });

    return cart;
};

const setupCart = async () => {
    return await createCart();
};

let cart;
setupCart().then(initializedCart => {
    cart = initializedCart;
});

export { cart };