<script setup>
import { ref, onMounted } from 'vue';
import Orders from '@/js/merch/orders.js';

const orders = ref({});

onMounted(async () => {
  orders.value = await Orders.getOrders();
});
</script>

<template>
  <div>
    <h1>Orders</h1>
    <div v-for="order in orders" :key="order.id" class="order">
      <p>Order ID: {{ order.id }}</p>
      <p>Cart: {{ order.cart }}</p>
      <p>Destination: {{ order.destination }}</p>
      <p>Phone: {{ order.phone }}</p>
      <p>Status: {{ order.status }}</p>
    </div>
  </div>
</template>

<style scoped>
.order {
  border: 3px solid #ccc;
  border-radius: 4px;
  margin-bottom: 1rem;
  padding: 1rem;
}

.cart-item {
  margin-bottom: 0.5rem;
}
</style>