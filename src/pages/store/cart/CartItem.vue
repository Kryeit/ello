<template>
  <div class="cart-item">
    <div class="item-header">
      <div :style="{ '--color-square': item.color }" class="color-square"></div>
      <router-link :to="`/product/${item.name}`" class="item-name">{{ item.name }}</router-link>
    </div>
    <div class="content">
      <div class="item-details">
        <p v-if="item.size">Size: {{ item.size }}</p>
        {{ item.price * item.quantity }}€
      </div>
      <div class="item-buttons">
        <button @click="decreaseQuantity(item.id)">-</button>
        {{ item.quantity }}
        <button @click="cart.addItem(item.id, item.price)">+</button>
        <button @click="removeItem(item.id)">
          <Trash/>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {cart} from '@/js/merch/cart.js';

const props = defineProps({
  item: Object
});

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
  width: 24px;
  height: 24px;
  margin-right: 4px;
  display: flex;
  align-items: center;
  border: none;
  background-image: url('/src/assets/minecraft/squared_button.png');
  background-size: contain;
  background-repeat: no-repeat;
  image-rendering: pixelated;
  user-select: none;
  position: relative;
}

.color-square::before {
  content: '';
  position: absolute;
  top: 1px;
  left: 1px;
  width: calc(100% - 2px);
  height: calc(100% - 2px);
  background-color: var(--color-square);  /* Custom variable for color */
  opacity: 1;
  mix-blend-mode: overlay;
  z-index: 3;
}

.item-name {
  flex-grow: 1;
  color: var(--color-text);
  text-decoration: underline;
  text-underline-offset: 4px;
}

.item-details {
  flex-grow: 1;
  margin-right: 10px;
}

.content {
  display: flex;
  justify-content: space-between;
  align-items: start;
  width: 100%;
}

.item-buttons {
  display: flex;
  gap: 5px;
  align-self: flex-end;
}

button {
  color: var(--color-text);
  background: var(--color-background);
}
</style>