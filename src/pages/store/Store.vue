<script setup>
import {onMounted, ref} from 'vue';
import Products from '@/js/merch/products.js';
import Item from '@/pages/store/Item.vue';
import Cart from "@/pages/store/cart/Cart.vue";
import StoreFooter from "@/components/payment/StoreFooter.vue";

const virtualProducts = ref([]);
const merchProducts = ref([]);

onMounted(async () => {
  const allProducts = await Products.getProductsGroupedByName();

  for (const category in allProducts) {
    if (allProducts[category][0].virtual) {
      virtualProducts.value.push(allProducts[category][0]);
    } else {
      merchProducts.value.push(allProducts[category][0]);
    }
  }
});
</script>

<template>
  <h1 style="color: red">THIS PAGE IS NOT RELEASED, JUST INTERACTABLE AS A TEST PHASE, NO PAYMENTS OR ANYTHING WILL GO THROUGH OR ARE REAL</h1>

  <div class="header">
    <h1>Store</h1>
  </div>

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

  <Cart />

  <StoreFooter />
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
</style>