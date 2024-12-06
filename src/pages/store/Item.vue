<script setup>
import {defineProps, onMounted, ref} from 'vue';
import {useRouter} from 'vue-router';
import Products from "@/js/merch/products.js";
import Stock from "@/js/merch/stock.js";
import ItemImage from "@/pages/store/ItemImage.vue";
import {getIpAddress} from "@/js/static.js";

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
const stockLoaded = ref(false);

const navigateToProduct = () => {
  router.push(`/product/${props.product[0].name}`);
};

onMounted(async () => {
  image.value = await Products.getImage(props.product[0].name, 1);
  stock.value = await Stock.getStockByName(props.product[0].name);
  sizes.value = await Products.getSizes(props.product[0].name);
  stockLoaded.value = true;
});
</script>

<template>
  <div class="product-item" @click="navigateToProduct">
    <div class="product-header">
      <img class="product-image" :src="getIpAddress() + image" :alt="props.product[0].name"/>
    </div>

    <div class="product-info">
      <h2 class="title">{{ props.product[0].name }}</h2>
      <p>
        <strong class="price">
          {{ props.product[0].price }}
          <span class="euro-symbol">€</span>
        </strong>
      </p>
    </div>
    <p v-if="product[0].virtual">{{ product[0].description }}</p>
    <div class="sizes">
      <p v-if="!props.lonely">{{ sizes.join(', ') }}</p>
      <p v-else>{{ product[0].size }}</p>
    </div>
    <div v-if="stockLoaded && stock === 0" class="sold-out">
      <p>
        Sold Out
      </p>
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
  box-sizing: border-box;
  position: relative;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  margin: 0;
  transition: transform 0.3s ease;
  background: var(--color-background-mute);
}

.product-header {
  border-radius: 8px;
  font-size: 1.1rem;
  flex-grow: 1;
  position: relative;
}

.title {
  white-space: nowrap;
  overflow: hidden;
  width: 100%;
  font-size: 1.1rem;
}

.sizes {
  margin-top: auto;
  margin-bottom: 12px;
  font-size: 0.6rem;
  margin-left: 12px;
}

.product-info {
  padding: 12px;
}

.product-image {
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  width: 100%;
  object-fit: cover;
  image-rendering: pixelated;
}

.price {
  font-size: 2rem;
}

.product-info p {
  margin-left: auto;
  text-align: right;
}

.sold-out {
  background: rgba(255, 0, 0, 0.5);
  color: white;
  font-size: 1rem;
  font-weight: bold;
  z-index: 2;
  position: absolute;
  align-content: center;
  display: block;
}

.sold-out p {
  transform: scaleY(3.5);
  font-stretch: condensed;
  text-align: center;
}

.euro-symbol {
  font-size: 1.2rem; /* Smaller font size for the € symbol */
  margin-left: -18px; /* Reduces the gap between the number and the € */
}
</style>