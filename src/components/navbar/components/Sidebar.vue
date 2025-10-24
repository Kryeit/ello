<script setup>
import {computed, onMounted, onUnmounted, ref} from 'vue';

import jarOfTips from '@/assets/minecraft/jar_of_tips.png';
import jarOfTips1 from '@/assets/minecraft/jar_of_tips_1.png';
import jarOfTips2 from '@/assets/minecraft/jar_of_tips_2.png';
import jarOfTips3 from '@/assets/minecraft/jar_of_tips_3.png';
import {cart} from "@/js/merch/cart.js";

const isMobile = ref(false);

const checkScreenSize = () => {
  isMobile.value = window.innerWidth <= 1024;
};

const cartIcons = [jarOfTips, jarOfTips1, jarOfTips2, jarOfTips3];

const cartIconSrc = computed(() => {
  const itemCount = Object.values(cart.items).reduce((total, item) => total + item.quantity, 0);
  return cartIcons[Math.min(itemCount, cartIcons.length - 1)];
});

const cartIconClass = computed(() => {
  return Object.keys(cart.items).length > 0 ? 'cart-icon filled' : 'cart-icon';
});

onMounted(() => {
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize);
});
</script>

<template>
  <div v-if="isMobile" class="sidebar">
    <button class="catalog">
      <router-link class="catalog-router" to="/store">
        Store
      </router-link>
    </button>
    <button class="cart" @click="$emit('open-cart')">
      <img :class="cartIconClass" :src="cartIconSrc" draggable="false" alt=""/>
      Cart
    </button>
  </div>
</template>

<style scoped>
@media (max-width: 1024px) {
  .sidebar {
    position: fixed;
    top: calc(100% - env(safe-area-inset-bottom) - 35px);
    left: 0;
    width: 100%;
    height: 35px;
    background-color: #976746;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top-right-radius: 20% 20px;
    border-top-left-radius: 20% 20px;
    outline: 7px solid black;
    z-index: 1000;
  }

  .sidebar button {
    position: absolute;
    bottom: 4px;
    background: none;
    border: none;
    color: black;
    width: 115px;
    font-size: 1rem;
    font-weight: bold;
  }

  .catalog-router {
    color: black;
    text-decoration: none;
    font-weight: bold;
  }

  .catalog {
    left: calc(18vw - 55px);
    border-top-left-radius: 50%;
  }

  .cart {
    right: calc(18vw - 55px);
    cursor: pointer;
  }

  .cart-icon {
    position: relative;
    width: 30px;
    bottom: -5px;
    right: -8px;
  }
}
</style>