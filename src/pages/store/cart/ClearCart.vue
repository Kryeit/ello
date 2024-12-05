<script setup>
import { ref } from 'vue';
import { cart } from '@/js/merch/cart.js';

const isHovered = ref(false);

const clearCart = () => {
  cart.items = {};
};

const showTooltip = () => {
  isHovered.value = true;
};

const hideTooltip = () => {
  isHovered.value = false;
};
</script>

<template>
  <div class="clear-cart" @click="clearCart" @mouseover="showTooltip" @mouseleave="hideTooltip">
    <ShoppingCartClear/>
    <span v-if="isHovered" class="tooltip">Clear Cart</span>
  </div>
</template>

<style scoped>
.clear-cart {
  position: relative;
  display: inline-block;
  cursor: pointer;
}

.icon {
  font-weight: bold;
}

.tooltip {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: var(--color-background);
  border: 2px solid var(--color-background-mute);
  color: var(--color-text);
  padding: 5px;
  border-radius: 5px;
  white-space: nowrap;
  font-size: 0.8rem;
  z-index: 10;
}
</style>