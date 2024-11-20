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
      <p>Total: €{{ totalPrice }}</p>
    </div>
  </div>
</template>

<script setup>
import {computed, onMounted, ref} from 'vue';
import {cart} from '@/js/merch/cart.js';
import Products from '@/js/merch/products.js';
import clipboard from '@/assets/minecraft/clipboard.webp';
import writtenClipboard from '@/assets/minecraft/written_clipboard.webp';

const visible = ref(false);

const toggleCart = (event) => {
  event.stopPropagation();
  visible.value = !visible.value;
};

const groupedItems = ref([]);

const fetchGroupedItems = async () => {
  groupedItems.value = await Promise.all(
      Object.entries(cart.items).map(async ([id, item]) => {
        const product = await Products.getProduct(id);
        return {
          id,
          ...item,
          name: product.name,
          color: product.color,
          size: product.size
        };
      })
  );
};

onMounted(fetchGroupedItems);

const increaseQuantity = (productId) => {
  const product = cart.items[productId];
  if (product) {
    cart.addItem(productId, product.price);
    fetchGroupedItems();
  }
};

const decreaseQuantity = (productId) => {
  cart.removeItem(productId);
  fetchGroupedItems();
};

const removeItem = (productId) => {
  delete cart.items[productId];
  fetchGroupedItems();
};

const totalPrice = computed(() => {
  return cart.totalPrice;
});

const cartIconSrc = computed(() => {
  return Object.keys(cart.items).length > 0 ? writtenClipboard : clipboard;
});

const cartIconClass = computed(() => {
  return Object.keys(cart.items).length > 0 ? 'cart-icon filled' : 'cart-icon';
});
</script>

<style scoped>
.cart-icon {
  position: fixed;
  top: 10px;
  right: 10px;
  cursor: pointer;
  image-rendering: pixelated;
  width: 70px;
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