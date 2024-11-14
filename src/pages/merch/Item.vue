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
    <h2>{{ product.name }}</h2>
    <p>{{ product.description }}</p>
    <p>Price: ${{ product.price }}</p>
    <div class="sizes">
      <p>Sizes: {{ uniqueSizes.join(', ') }}</p>
    </div>
    <div class="colors">
      <p>Colors:</p>
      <div v-for="color in Object.keys(product.colors)" :key="color" class="color-square" :style="{ backgroundColor: color }"></div>
    </div>
    <p>Material: {{ product.material }}</p>
  </div>
</template>

<style scoped>
.product-item {
  cursor: pointer;
}

.product-item h2 {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.colors {
  display: flex;
  gap: 10px;
  align-items: center;
}

.color-square {
  width: 30px;
  height: 30px;
  margin: 5px;
  border: 1px solid #000;
}
</style>