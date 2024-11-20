import { reactive, computed, watch } from 'vue';

const loadCartFromLocalStorage = () => {
    const cartData = localStorage.getItem('cart');
    return cartData ? JSON.parse(cartData) : {};
};

const saveCartToLocalStorage = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
};

export const cart = reactive({
    items: loadCartFromLocalStorage(),

    addItem(id, price) {
        if (this.items[id]) {
            this.items[id].quantity += 1;
        } else {
            this.items[id] = { quantity: 1, price };
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