<script setup>
import { onMounted, ref } from 'vue';
import Orders from '@/js/merch/orders.js';
import Products from '@/js/merch/products.js';

const orders = ref([]);
const orderProducts = ref({});
const isLoading = ref(true);

onMounted(async () => {
  try {
    // Get user orders
    orders.value = await Orders.getOrders();

    // Load product details for each order
    for (const order of orders.value) {
      // Parse the cart
      let cartItems = [];
      try {
        cartItems = JSON.parse(order.cart);
      } catch (e) {
        console.error("Error parsing cart:", e);
        cartItems = [];
      }

      // Get product details for each item
      const products = [];
      for (const productId of cartItems) {
        try {
          const product = await Products.getProduct(productId);
          products.push({
            ...product,
            id: productId
          });
        } catch (e) {
          console.error(`Error loading product ${productId}:`, e);
        }
      }

      orderProducts.value[order.id] = products;
    }
  } catch (error) {
    console.error("Error loading orders:", error);
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div>
    <h1>Your Orders</h1>

    <div v-if="isLoading" class="loading">
      <p>Loading your orders...</p>
    </div>

    <div v-else-if="orders.length === 0" class="no-orders">
      <p>You don't have any orders yet.</p>
      <router-link to="/store" class="store-link">Browse the Store</router-link>
    </div>

    <div v-else class="orders-container">
      <div v-for="order in orders" :key="order.id" class="order-card">
        <div class="order-header">
          <h2>Order #{{ order.id }}</h2>
          <span class="order-status" :class="order.status.toLowerCase()">
            {{ Orders.getStatusLabel(order.status) }}
          </span>
        </div>

        <div class="order-details">
          <p><strong>Date:</strong> {{ Orders.formatOrderDate(order.createdAt) }}</p>
          <p v-if="order.destination && order.destination !== 'Virtual Product'">
            <strong>Shipping Address:</strong> {{ order.destination }}
          </p>
          <p v-if="order.email"><strong>Email:</strong> {{ order.email }}</p>
          <p v-if="order.phone"><strong>Phone:</strong> {{ order.phone }}</p>
        </div>

        <div class="order-items">
          <h3>Items</h3>
          <div v-if="orderProducts[order.id]?.length" class="items-list">
            <div v-for="product in orderProducts[order.id]" :key="product.id" class="order-item">
              <div class="item-details">
                <p class="item-name">{{ product.name }}</p>
                <p v-if="product.color" class="item-variant">
                  <span class="color-dot" :style="{ backgroundColor: product.color }"></span>
                  {{ product.size }}
                </p>
                <p v-if="product.virtual" class="item-type">Virtual Item</p>
              </div>
              <p class="item-price">{{ product.price }}€</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.loading, .no-orders {
  text-align: center;
  padding: 30px;
}

.store-link {
  display: inline-block;
  margin-top: 15px;
  padding: 10px 20px;
  background-color: var(--color-background-mute);
  color: var(--color-text);
  text-decoration: none;
  border-radius: 5px;
}

.orders-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
}

.order-card {
  border: 2px solid var(--color-border);
  border-radius: 8px;
  padding: 20px;
  background-color: var(--color-background-soft);
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 10px;
}

.order-header h2 {
  margin: 0;
}

.order-status {
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: bold;
}

.order-status.unpaid {
  background-color: rgba(255, 193, 7, 0.2);
  color: #ffc107;
}

.order-status.pending {
  background-color: rgba(0, 123, 255, 0.2);
  color: #007bff;
}

.order-status.shipped {
  background-color: rgba(40, 167, 69, 0.2);
  color: #28a745;
}

.order-status.delivered {
  background-color: rgba(40, 167, 69, 0.4);
  color: #155724;
}

.order-details {
  margin-bottom: 20px;
}

.order-details p {
  margin: 5px 0;
}

.order-items h3 {
  margin-top: 0;
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 8px;
}

.items-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.order-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-radius: 5px;
  background-color: var(--color-background);
}

.item-name {
  font-weight: bold;
  margin: 0 0 5px 0;
}

.item-variant {
  display: flex;
  align-items: center;
  gap: 5px;
  margin: 0;
  font-size: 0.9rem;
}

.color-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
}

.item-type {
  font-size: 0.8rem;
  margin: 5px 0 0 0;
  font-style: italic;
}

.item-price {
  font-weight: bold;
}
</style>