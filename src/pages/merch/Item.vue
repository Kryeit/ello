<script setup>
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';
import ProductCarousel from "@/pages/merch/ProductCarousel.vue";

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
});

const router = useRouter();

const navigateToProduct = () => {
  router.push(`/product/${props.product.name}`);
};

// Define the custom order for sizes
const sizeOrder = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

// Extract unique sizes from all colors and sort them
const uniqueSizes = [...new Set(Object.values(props.product.colors).flat())].sort((a, b) => sizeOrder.indexOf(a) - sizeOrder.indexOf(b));
</script>

<template>
  <div class="product-item" @click="navigateToProduct">
    <div class="product-header">
      <img :src="product.image" alt="" />
      <h2>{{ product.name }}</h2>
    </div>

    <div class="product-info">
      <p>{{ product.price }}€</p>

      <div class="sizes">
        <p>{{ uniqueSizes.join(', ') }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-item {
  cursor: pointer;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 12px;
  box-sizing: border-box;
}

.product-header {
  background: var(--color-background);
  padding: 8px;
  border-radius: 8px;
  border: 1px solid var(--color-border);
  font-size: 1.1rem;
  flex-grow: 1;
}

.product-header h2 {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  font-size: 0.9rem;
}

.sizes {
  margin-top: auto;
  font-size: 0.6rem;
}

.product-info {
  flex-grow: 1;
  padding: 14px 14px 8px 14px;
}
</style>