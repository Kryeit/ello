import {reactive, watch} from 'vue';

const cart = reactive({
    items: JSON.parse(localStorage.getItem('cart') || '[]')
});

watch(
    () => cart.items,
    (newItems) => {
        localStorage.setItem('cart', JSON.stringify(newItems));
    },
    { deep: true }
);

const addToCart = (item) => {
    const existingItem = cart.items.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.items.push({ ...item, quantity: 1 });
    }
};

const removeFromCart = (itemId) => {
    const index = cart.items.findIndex(cartItem => cartItem.id === itemId);
    if (index !== -1) {
        cart.items.splice(index, 1);
    }
};

const increaseQuantity = (itemId) => {
    const item = cart.items.find(cartItem => cartItem.id === itemId);
    if (item) {
        item.quantity += 1;
    }
};

const decreaseQuantity = (itemId) => {
    const item = cart.items.find(cartItem => cartItem.id === itemId);
    if (item) {
        if (item.quantity > 1) {
            item.quantity -= 1;
        } else {
            removeFromCart(itemId);
        }
    }
};

const clearCart = () => {
    cart.items = [];
};

export { cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart };
