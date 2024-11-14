// src/js/merch/cart.js
import { reactive } from 'vue';

export const cart = reactive({
    items: [],
    totalPrice: 0,

    addItem(product) {
        this.items.push(product);
        this.totalPrice += product.price;
    },

    removeItem(productId) {
        const index = this.items.findIndex(item => item.id === productId);
        if (index !== -1) {
            this.totalPrice -= this.items[index].price;
            this.items.splice(index, 1);
        }
    },

    clearCart() {
        this.items = [];
        this.totalPrice = 0;
    }
});