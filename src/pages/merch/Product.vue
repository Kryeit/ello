<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Products from '@/js/merch/products.js';
import ProductUtils from "@/js/merch/productUtils.js";
import ColorSelector from "@/pages/merch/ColorSelector.vue";
import SizeSelector from "@/pages/merch/SizeSelector.vue";
import { cart } from '@/js/merch/cart.js';
import Cart from "@/pages/merch/Cart.vue";
import ProductCarousel from "@/pages/merch/ProductCarousel.vue";

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

    <button class="back-button">
      <router-link class="catalog" to="/merch">
        <ArrowLeft/>
        <p>Catalog</p>
      </router-link>
    </button>
    <h1>{{ product.name }}</h1>
    <ProductCarousel :product-name="product.name" />
    <p class="price"><span style="font-weight: bold; font-size: 1.5rem">{{ product.price }}</span>€</p>
    <p>{{ product.description }}</p>
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
h1 {
  margin-bottom: 28px;
}
button {
  background: var(--color-background-mute);
  border-radius: 18px;
}

.back-button {
  position: fixed;
  top: 16px;
  left: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.catalog {
  display: flex;
  align-items: center;
  color: var(--color-text);
  text-decoration: none;

}

.price {
  font-size: 0.9rem;
}

@media (max-width: 1368px) {
  .back-button {
    bottom: 8px;
    top: auto;
    left: 4px;
  }
}
</style>