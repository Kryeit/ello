<script setup>
import { onMounted, ref, computed } from 'vue';
import productStore from '@/js/merch/productStore.js';
import Item from '@/pages/store/Item.vue';
import Cart from "@/pages/store/cart/Cart.vue";
import StoreFooter from "@/components/payment/StoreFooter.vue";

const isLoading = computed(() => productStore.isLoading());
const hasError = computed(() => productStore.hasError());
const errorMessage = computed(() => productStore.error());

// Get products from store
const storeProducts = computed(() => {
  if (!productStore.isLoaded()) return { virtualProducts: [], physicalProducts: [] };
  return productStore.getProductsForStore();
});

const virtualProducts = computed(() => storeProducts.value.virtualProducts);
const merchProducts = computed(() => storeProducts.value.physicalProducts);

onMounted(async () => {
  // If products aren't loaded yet, fetch them
  if (!productStore.isLoaded()) {
    await productStore.fetchCatalog();
  }
});
</script>

<template>
  <div class="container">
    <div class="header">
      <h1>Store</h1>
    </div>

    <div v-if="isLoading" class="loading-state">
      <p>Loading products...</p>
    </div>

    <div v-else-if="hasError" class="error-state">
      <p>Error loading products: {{ errorMessage }}</p>
      <button @click="productStore.fetchCatalog()">Try Again</button>
    </div>

    <template v-else>
      <div class="section">
        <h2>Merch</h2>
        <div class="grid-container">
          <div v-for="product in merchProducts" :key="product.id" class="grid-item">
            <Item v-if="product.listed" :product="Array.of(product)" />
          </div>
        </div>
      </div>

      <div class="section">
        <h2>Cosmetics</h2>
        <div class="grid-container">
          <div v-for="product in virtualProducts" :key="product.id" class="grid-item">
            <Item v-if="product.listed" :product="Array.of(product)" />
          </div>
        </div>
      </div>
    </template>
    <StoreFooter />

    <Cart />
  </div>

</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 20px;
  box-sizing: border-box;
}

.header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;

}

.header h1 {
  margin: 0;
}

h2 {
  margin-bottom: 12px;
}

.section {
  margin-bottom: 32px;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
}

.loading-state, .error-state {
  text-align: center;
  padding: 40px;
  margin: 20px;
}

.error-state {
  color: #cf4747;
}

.error-state button {
  margin-top: 15px;
  padding: 8px 16px;
  background-color: var(--color-background-mute);
  border: 2px dashed var(--color-border);
  border-radius: 8px;
  cursor: pointer;
}
</style>