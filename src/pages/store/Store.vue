<script setup>
import { ref, onMounted } from 'vue';
import Products from '@/js/merch/products.js';
import Item from '@/pages/store/Item.vue';
import Cart from "@/pages/store/Cart.vue";

const items = ref([]);

onMounted(async () => {
  items.value = await Products.getProductsGroupedByName();
});
</script>

<template>
  <div class="header">
    <h1>Store</h1>
  </div>

  <div class="grid-container">
    <div v-for="item in items" :key="item.id" class="grid-item">
      <Item :product="item" />
    </div>
  </div>

  <Cart />
</template>

<style scoped>
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
}

.header h1 {
  margin: 0;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}

.grid-item {
  border: 1px solid var(--color-border);
  border-radius: 12px;
  margin: 0;
  transition: transform 0.3s ease;
  background: var(--color-background-mute);
}

.grid-item:hover {
  transform: scale(1.02);
}
</style>