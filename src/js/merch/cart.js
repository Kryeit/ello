import { reactive, computed, watch } from 'vue';
import Stock from '@/js/merch/stock.js';

const loadCartFromLocalStorage = async () => {
    const cartData = localStorage.getItem('cart');
    return cartData ? JSON.parse(cartData) : {};
};

const saveCartToLocalStorage = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
};

const createCart = async () => {
    const items = await loadCartFromLocalStorage();

    const cart = reactive({
        items,

        async addItem(id, price) {
            const stock = await Stock.getStock(id);
            if (this.items[id]) {
                if (this.items[id].quantity < stock.quantity) {
                    this.items[id].quantity += 1;
                } else {
                    console.warn('Not enough stock to add more items');
                }
            } else {
                if (stock.quantity > 0) {
                    this.items[id] = { quantity: 1, price };
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

        get totalPrice() {
            return Object.values(this.items).reduce((total, item) => total + item.price * item.quantity, 0);
        }
    });

    // Watch for changes in the cart items and save to local storage
    watch(() => cart.items, (newItems) => {
        saveCartToLocalStorage(newItems);
    }, { deep: true });

    return cart;
};

const setupCart = async () => {
    const cart = await createCart();
    return cart;
};

let cart;
setupCart().then(initializedCart => {
    cart = initializedCart;
});

export { cart };