<template>
  <div>
    <img :class="cartIconClass" :src="cartIconSrc" @click="toggleCart" draggable="false" />

    <transition name="cart">
      <div v-if="visible" ref="cartContainer" class="cart">
        <ArrowLeft v-if="visible" class="close-cart" style="visibility: hidden; position: absolute;" @click="toggleCart"/>
        <h2 style="text-align: center">Cart</h2>
        <div class="cart-items">
          <CartItem v-for="(item, index) in displayedItems" :key="index" :item="item"/>
        </div>
        <div class="bottom">
          <p>Total: {{ totalPrice }}€</p>
          <button class="checkout" @click="goToCheckout">Checkout</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch, nextTick } from 'vue';
import { cart } from '@/js/merch/cart.js';
import Products from '@/js/merch/products.js';
import clipboard from '@/assets/minecraft/clipboard.webp';
import writtenClipboard from '@/assets/minecraft/written_clipboard.webp';
import CartItem from './CartItem.vue';
import router from "@/router/index.js";

const visible = ref(false);
const displayedItems = ref([]);

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
  await nextTick();
  displayedItems.value = groupedItems.value;
};

onMounted(fetchGroupedItems);

watch(() => cart.items, async () => {
  await fetchGroupedItems();
}, { deep: true });

const totalPrice = computed(() => {
  return cart.totalPrice;
});

const cartIconSrc = computed(() => {
  return Object.keys(cart.items).length > 0 ? writtenClipboard : clipboard;
});

const cartIconClass = computed(() => {
  return Object.keys(cart.items).length > 0 ? 'cart-icon filled' : 'cart-icon';
});

const goToCheckout = () => {
  router.push('/order/create');
};
</script>

<style scoped>
.cart-icon {
  position: fixed;
  top: 10px;
  right: 10px;
  cursor: pointer;
  image-rendering: pixelated;
  width: 70px;
  user-select: none;
}

.cart {
  position: fixed;
  top: 90px;
  right: 10px;
  background: var(--color-background);
  padding: 22px;
  max-width: 400px;
  width: auto;
  z-index: 900;
  border-radius: 20px;
  border: 2px solid var(--color-background-mute);
  transition: width 3s ease, height 3s ease;
}

.cart-items {
  margin-top: 10px;
  margin-bottom: 10px;
  max-height: calc(100vh - 200px); /* Adjust the value as needed */
  overflow-y: auto;
}

.bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

@media (max-width: 768px) {
  .cart {
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    max-width: 100%;
    z-index: 999;
  }

  .close-cart {
    position: static !important;
    visibility: visible !important;
  }
}

/* Transition styles */
.cart-enter-active, .cart-leave-active {
  transition: all 0.3s ease;
}

.cart-enter-from, .cart-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>