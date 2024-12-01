<template>
  <div class="cart-item">
    <div class="item-header">
      <div :style="{ backgroundColor: item.color }" class="color-square"></div>
      <router-link :to="`/product/${item.name}`" class="item-name">{{ item.name }}</router-link>
    </div>
    <div class="item-details">
      <p>Size: {{ item.size }}</p>
      {{ item.price * item.quantity }}€
    </div>
    <div class="item-buttons">
      <button @click="decreaseQuantity(item.id)">-</button>
      {{ item.quantity }}
      <button @click="increaseQuantity(item.id)">+</button>
      <button @click="removeItem(item.id)">
        <Trash/>
      </button>
    </div>
  </div>
</template>

<script setup>
import {cart} from '@/js/merch/cart.js';

const props = defineProps({
  item: Object
});

const increaseQuantity = (productId) => {
  const product = cart.items[productId];
  if (product) {
    cart.addItem(productId, product.price);
  }
};

const decreaseQuantity = (productId) => {
  cart.removeItem(productId);
};

const removeItem = (productId) => {
  delete cart.items[productId];
};
</script>

<style scoped>
.cart-item {
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 20px;
  border: 2px solid var(--color-background-mute);
  padding: 10px;
}

.item-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.color-square {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}

.item-name {
  flex-grow: 1;
  color: var(--color-text);
  text-decoration: underline;

}

.item-details {
  flex-grow: 1;
  margin-bottom: 10px;
}

.item-buttons {
  display: flex;
  gap: 5px;
}

button {
  color: var(--color-text);
  background: var(--color-background);
}
</style>