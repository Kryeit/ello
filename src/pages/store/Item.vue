<script setup>
import {defineProps, onMounted, ref} from 'vue';
import {useRouter} from 'vue-router';
import Products from "@/js/merch/products.js";
import Stock from "@/js/merch/stock.js";
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

const handleMouseMove = (event) => {
  const item = event.currentTarget;
  const rect = item.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  const rotateX = (y - centerY) / 20;
  const rotateY = (centerX - x) / 20;
  item.style.transform = `translateY(-10px) scale(1.02) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
};

const handleMouseLeave = (event) => {
  const item = event.currentTarget;
  item.style.transform = 'translateY(0) scale(1)';
};

onMounted(async () => {
  image.value = await Products.getImage(props.product[0].name, 1);
  stock.value = await Stock.getStockByName(props.product[0].name);
  sizes.value = await Products.getSizes(props.product[0].name);
  stockLoaded.value = true;
});
</script>

<template>
  <div class="product-item" @click="navigateToProduct" @mousemove="handleMouseMove" @mouseleave="handleMouseLeave">
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
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background: var(--color-background-soft);
  box-shadow: 0 2px 4px var(--color-text);
  overflow: hidden;
  perspective: 1000px;
}

.product-item:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 6px 8px var(--color-text);
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
  color: var(--color-background-mute);
  font-size: 1.1rem;
  text-shadow: 1px 3px 1px var(--color-text);
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
  background: rgba(170, 41, 41, 0.5);
  color: white;
  font-weight: bold;
  z-index: 2;
  position: absolute;
  top: 30px;
  left: 30px;
  transform: translate(-50%, -50%) rotate(-45deg);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  border-top: 2px solid var(--color-background);
  border-bottom: 2px solid var(--color-background);
}

.sold-out p {
  font-size: 25px;
  transform: scaleX(0.4);
  text-align: center;
}

.euro-symbol {
  font-size: 1.2rem;
  margin-left: -18px;
}
</style>