<script setup>
import {defineProps, onMounted, ref} from 'vue';
import {useRouter} from 'vue-router';
import Products from "@/js/merch/products.js";
import Stock from "@/js/merch/stock.js";

const props = defineProps({
  product: {
    type: Object,
    required: true
  },
  lonely: {
    type: Boolean,
    default: false
  }
});

const router = useRouter();
const image = ref('');
const stock = ref(0);
const sizes = ref([]);

const navigateToProduct = () => {
  router.push(`/product/${props.product[0].name}`);
};

onMounted(async () => {
  image.value = await Products.getImage(props.product[0].name, 1);
  stock.value = await Stock.getStockByName(props.product[0].name);
  sizes.value = await Products.getSizes(props.product[0].name);
});
</script>

<template>
  <div class="product-item" @click="navigateToProduct">
    <div class="product-header">
      <img class="product-image" :src="image" alt="" />
      <h2>{{ props.product[0].name }}</h2>
      <div v-if="stock === 0" class="sold-out">Sold Out</div>
    </div>

    <div class="product-info">
      <p>{{ props.product[0].price }}€</p>
      <p v-if="!props.lonely">{{ stock }} units left!</p>
      <div class="sizes">
        <p v-if="!props.lonely">{{ sizes.join(', ') }}</p>
        <p v-else>{{ product[0].size }}</p>
      </div>
    </div>
    <div v-if="stock === 0" class="blur-overlay"></div>
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
  position: relative;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  margin: 0;
  transition: transform 0.3s ease;
  background: var(--color-background-mute);
}

.product-item:hover {
  transform: scale(1.02);
}

h2 {
  text-align: center;
}

.product-header {
  background: var(--color-background);
  padding: 8px;
  border-radius: 8px;
  border: 1px solid var(--color-border);
  font-size: 1.1rem;
  flex-grow: 1;
  position: relative;
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

.product-image {
  width: 100%;
  height: 80%;
  object-fit: cover;
  border-radius: 8px;
  image-rendering: pixelated;
}

.sold-out {
  position: absolute;
  top: 10px;
  left: 10px;
  background: red;
  color: white;
  padding: 5px 10px;
  font-size: 1rem;
  font-weight: bold;
  transform: rotate(-15deg);
  z-index: 2;
  border-radius: 4px;
}

.blur-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(1px);
  z-index: 1;
}
</style>