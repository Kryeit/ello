<script setup>
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';

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

    <p>{{ product.price }}€</p>

    <div class="sizes">
      <p>{{ uniqueSizes.join(', ') }}</p>
    </div>
  </div>
</template>

<style scoped>
.product-item {
  cursor: pointer;
}

.product-header {
  width: 100%;
  background: var(--color-background);
  padding: 8px;
  border-radius: 8px;
  border: 1px solid var(--color-border);
  font-size: 1.1rem ;
}

.product-header h2 {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  padding: 8px;
  font-size: 1.1rem ;
}

.sizes {
  margin-top: auto;
  font-size: 0.6rem;
}
</style>