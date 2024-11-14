<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Products from '@/js/merch/products.js';
import ProductUtils from "@/js/merch/productUtils.js";
import ColorSelector from "@/pages/merch/ColorSelector.vue";
import SizeSelector from "@/pages/merch/SizeSelector.vue";
import { cart } from '@/js/merch/cart.js';
import Cart from "@/pages/merch/Cart.vue";

const route = useRoute();
const product = ref(null);
const selectedColor = ref(null);
const selectedSize = ref(null);

onMounted(async () => {
  const productName = route.params.name;
  const products = ProductUtils.getGroupedProductsByColorAndSize(await Products.getProducts());
  product.value = products.find(p => p.name === productName);
});

const addToCart = () => {
  if (product.value && selectedColor.value && selectedSize.value) {
    const productToAdd = {
      ...product.value,
      id: `${product.value.id}-${selectedColor.value}-${selectedSize.value}`,
      color: selectedColor.value,
      size: selectedSize.value
    };
    cart.addItem(productToAdd);
  }
};
</script>

<template>
  <div v-if="product" class="product-details">
    <h1>{{ product.name }}</h1>
    <p>{{ product.description }}</p>
    <p>Price: ${{ product.price }}</p>
    <SizeSelector v-if="selectedColor" :sizes="product.colors[selectedColor]" @update:selectedSize="selectedSize = $event"/>
    <ColorSelector :colors="product.colors" @update:selectedColor="selectedColor = $event"/>
    <p>Material: {{ product.material }}</p>
    <button @click="addToCart">Add to Cart</button>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>

  <Cart/>
</template>

<style scoped>
button {
  background: var(--color-background-mute);
}
</style>