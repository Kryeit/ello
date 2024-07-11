<template>
  <v-menu open-on-hover v-model="menu" :close-on-content-click="false" :open-delay="0" :close-delay="400">
    <template v-slot:activator="{ props }">
      <v-btn color="var(--dark-brass-gold)" v-bind="props">
        Cart ({{ itemCount }})
      </v-btn>
    </template>

    <v-card class="cart-menu">
      <v-card-title>Shopping Cart</v-card-title>
      <v-list class="cart-items-list">
        <v-list-item v-for="(item, index) in cart.items" :key="index" class="cart-item">
          <div class="item-details">
            <v-list-item-title>{{ item.name }}</v-list-item-title>
            <v-list-item-subtitle>
              Price: ${{ item.price.toFixed(2) }}
            </v-list-item-subtitle>
          </div>
          <div class="item-controls">
            <div class="quantity-controls">
              <v-btn size="x-small" @click="decreaseQuantity(item.id)">-</v-btn>
              <span class="quantity-display">{{ item.quantity }}</span>
              <v-btn size="x-small" @click="increaseQuantity(item.id)">+</v-btn>
            </div>
            <v-btn size="small" color="red" @click="removeFromCart(item.id)">x</v-btn>
          </div>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <div class="cart-footer">
        <v-card-text class="text-right">
          <strong>Total: ${{ total }}</strong>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="checkout">
            Checkout
          </v-btn>
        </v-card-actions>
      </div>
    </v-card>
  </v-menu>
</template>

<script setup>
import { computed, ref } from 'vue';
import { cart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } from '@/javascript/merch/cart.js'; // Adjust the path as needed

const menu = ref(false);

const total = computed(() => {
  return cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
});

const itemCount = computed(() => {
  return cart.items.reduce((count, item) => count + item.quantity, 0);
});

const checkout = () => {
  console.log('Checking out with items:', cart.items);
  clearCart();
  menu.value = false;
};
</script>

<style scoped>
.cart-menu {
  display: flex;
  flex-direction: column;
  padding: 16px;
  max-height: 80vh;
}

.cart-items-list {
  flex-grow: 1;
  overflow-y: auto;
  max-height: calc(80vh - 130px);
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.item-details {
  flex-grow: 1;
  margin-right: 16px;
}

.item-controls {
  display: flex;
  align-items: center;
}

.quantity-controls {
  display: flex;
  align-items: center;
  margin-right: 8px;
}

.quantity-display {
  margin: 0 8px;
  min-width: 24px;
  text-align: center;
}

.cart-footer {
  border-top: 1px solid #eee;
  padding-top: 16px;
}
</style>
