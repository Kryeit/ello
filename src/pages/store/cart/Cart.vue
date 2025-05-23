<template>
  <div>
    <img :class="cartIconClass" :src="cartIconSrc" @click="toggleCart" draggable="false" alt=""/>

    <transition name="cart">
      <div v-if="visible" ref="cartContainer" class="cart">
        <div class="header">
          <ArrowLeft class="close-cart" @click="toggleCart"/>
          <h2 class="title">Cart</h2>
          <ClearCart v-if="!isCartEmpty" class="clear-cart"/>
          </div>
        <div class="cart-items">
          <CartItem v-for="(item, index) in displayedItems" :key="index" :item="item"/>
        </div>
        <div v-if="!isCartEmpty" class="bottom">
          <div>
            <div style="display: flex; flex-direction: row; gap: 12px; align-items: flex-end;">
              <p>Total: {{ totalPrice }}€</p>
              <p style="font-size: 0.8rem; font-style: italic; margin-bottom: 1px">{{Object.values(cart.items).reduce((total, item) => total + item.quantity, 0)}} item(s)</p>
            </div>
            <p v-if="hasNonVirtualItems" class="shipping">+{{ Orders.shippingCosts }}€ of shipping</p>
          </div>
          <button class="checkout" @click="goToCheckout" :disabled="totalPrice === 0">Checkout</button>
        </div>
        <div v-else class="empty-cart-message">
          <p>This jar looks empty...</p>
        </div>
      </div>
    </transition>
  </div>

  <Sidebar @open-cart="toggleCart"/>
</template>

<script setup>
import {computed, nextTick, onMounted, ref, watch} from 'vue';
import {cart} from '@/js/merch/cart.js';
import Products from '@/js/merch/products.js';
import jarOfTips from '@/assets/minecraft/jar_of_tips.png';
import jarOfTips1 from '@/assets/minecraft/jar_of_tips_1.png';
import jarOfTips2 from '@/assets/minecraft/jar_of_tips_2.png';
import jarOfTips3 from '@/assets/minecraft/jar_of_tips_3.png';
import CartItem from './CartItem.vue';
import router from "@/router/index.js";
import Sidebar from "@/components/navbar/components/Sidebar.vue";
import Orders from "../../../js/merch/orders.js";
import ClearCart from "@/pages/store/cart/ClearCart.vue";

const visible = ref(false);
const displayedItems = ref([]);

const toggleCart = (event) => {
  visible.value = !visible.value;
};

const groupedItems = ref([]);
const hasNonVirtualItems = computed(() => {
  return groupedItems.value.some(item => !item.virtual);
});

const fetchGroupedItems = async () => {
  groupedItems.value = await Promise.all(
      Object.entries(cart.items).map(async ([id, item]) => {
        const product = await Products.getProduct(id);
        return {
          id,
          ...item,
          name: product.name,
          color: product.color,
          size: product.size,
          virtual: product.virtual,
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
  return cart.totalPrice(false);
});

const cartIcons = [jarOfTips, jarOfTips1, jarOfTips2, jarOfTips3];

const cartIconSrc = computed(() => {
  const itemCount = Object.values(cart.items).reduce((total, item) => total + item.quantity, 0);
  return cartIcons[Math.min(itemCount, cartIcons.length - 1)];
});

const cartIconClass = computed(() => {
  return Object.keys(cart.items).length > 0 ? 'cart-icon filled' : 'cart-icon';
});

const isCartEmpty = computed(() => {
  return Object.keys(cart.items).length === 0;
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
  image-rendering: pixelated; /* For browsers that support it */
  image-rendering: crisp-edges; /* Safari fallback */
  width: 70px;
  user-select: none;
  z-index: 999;
}

.close-cart {
  cursor: pointer;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
}

.title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.clear-cart {
  cursor: pointer;
}

.cart {
  position: fixed;
  top: 75px;
  right: 10px;
  background: var(--color-background);
  padding: 22px;
  max-width: 400px;
  width: auto;
  z-index: 999;
  border-radius: 20px;
  border: 2px solid var(--color-background-mute);
  transition: width 3s ease, height 3s ease;
}

.cart-items {
  margin-top: 10px;
  margin-bottom: 10px;
  max-height: calc(100vh - 200px);
  overflow-y: auto;
}

.bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.empty-cart-message {
  text-align: center;
  font-size: 1rem;
  color: var(--color-text-muted);
}

button {
  background: none;
  border: 2px dashed var(--color-border);
  cursor: pointer;
  font-size: 16px;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  user-select: none;
  display: flex;
}

button:hover {
  background: var(--color-background-mute);
}

button:active {
  transform: scale(0.95);
}

@media (max-width: 1024px) {
  .cart {
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    max-width: 100%;
  }

  .cart-icon {
    visibility: hidden;
  }
}

.shipping {
  font-size: 0.7rem;
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