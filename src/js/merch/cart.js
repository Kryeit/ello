import { reactive, computed } from 'vue';

export const cart = reactive({
    items: {},

    addItem(id, price) {
        if (this.items[id]) {
            this.items[id].quantity += 1;
        } else {
            this.items[id] = { quantity: 1, price };
        }
    },

    removeItem(id) {
        if (this.items[id]) {
            if (this.items[id].quantity > 1) {
                this.items[id].quantity -= 1;
            } else {
                delete this.items[id];
            }
        }
    },

    clearCart() {
        this.items = {};
    },

    get totalPrice() {
        return Object.values(this.items).reduce((total, item) => total + item.price * item.quantity, 0);
    }
});