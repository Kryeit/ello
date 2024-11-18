<template>
  <div>
    <img :class="cartIconClass" :src="cartIconSrc" @click="toggleCart" />
    <div v-if="visible" ref="cartContainer" class="cart">
      <h3>Cart</h3>
      <div v-for="(item, index) in groupedItems" :key="index" class="cart-item">
        <div class="item-header">
          <div :style="{ backgroundColor: item.color }" class="color-square"></div>
          <div class="item-name">{{ item.name }}</div>
        </div>
        <div class="item-details">
          {{ item.size }}
          {{ item.price }}€
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
      <p>Total: ${{ cart.totalPrice }}</p>
    </div>
  </div>
</template>

<script setup>
import {ref, computed} from 'vue';
import {cart} from '@/js/merch/cart.js';
import clipboard from '@/assets/minecraft/clipboard.webp';
import writtenClipboard from '@/assets/minecraft/written_clipboard.webp';

const visible = ref(false);

const toggleCart = (event) => {
  event.stopPropagation();
  visible.value = !visible.value;
};

const groupedItems = computed(() => {
  const grouped = {};
  cart.items.forEach(item => {
    if (!grouped[item.id]) {
      grouped[item.id] = {...item, quantity: 0};
    }
    grouped[item.id].quantity += 1;
  });
  return Object.values(grouped);
});

const increaseQuantity = (productId) => {
  const product = cart.items.find(item => item.id === productId);
  if (product) {
    cart.addItem(product);
  }
};

const decreaseQuantity = (productId) => {
  const index = cart.items.findIndex(item => item.id === productId);
  if (index !== -1) {
    cart.totalPrice -= cart.items[index].price;
    cart.items.splice(index, 1);
  }
};

const removeItem = (productId) => {
  cart.items = cart.items.filter(item => item.id !== productId);
  cart.totalPrice = cart.items.reduce((total, item) => total + item.price, 0);
};

const cartIconSrc = computed(() => {
  return cart.items.length > 0 ? writtenClipboard : clipboard;
});

const cartIconClass = computed(() => {
  return cart.items.length > 0 ? 'cart-icon filled' : 'cart-icon';
});
</script>

<style scoped>
.cart-icon {
  position: fixed;
  top: 10px;
  right: 10px;
  cursor: pointer;
  image-rendering: pixelated;
  width: 70px
}

.cart-icon.filled {
  /* Add any additional styles for the filled cart icon if needed */
}

.cart {
  position: fixed;
  top: 90px;
  right: 10px;
  background: var(--color-background);
  border: 1px solid #ccc;
  padding: 10px;
  max-width: 300px;
  width: auto;
}

.cart-item {
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border: 1px solid #ccc;
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
  background: var(--color-background-mute);
}
</style>