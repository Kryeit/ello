<script setup>
import {defineProps, onMounted, ref} from 'vue';
import {useRouter} from 'vue-router';
import Products from "@/js/merch/products.js";
import Stock from "@/js/merch/stock.js";

const props = defineProps({
  product: {
    type: Object,
    required: true
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
    </div>

    <div class="product-info">
      <p>{{ props.product[0].price }}€</p>
      <p>{{ stock }} units left!</p>

      <div class="sizes">
        <p>{{ sizes.join(', ') }}</p>
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
</style>