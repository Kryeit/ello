<script setup>
import {onMounted, ref, watch} from 'vue';
import {useRoute} from 'vue-router';
import Products from '@/js/merch/products.js';
import ColorSelector from "@/pages/store/ColorSelector.vue";
import SizeSelector from "@/pages/store/SizeSelector.vue";
import {cart} from '@/js/merch/cart.js';
import Cart from "@/pages/store/Cart.vue";
import ProductCarousel from "@/pages/store/ProductCarousel.vue";
import Stock from "@/js/merch/stock.js";

const route = useRoute();
const product = ref(null);
const selectedProduct = ref(null);
let colors = [];
const selectedColor = ref(null);
const selectedSize = ref(null);
const sizes = ref([]);
const stock = ref(null);

onMounted(async () => {
  const productName = route.params.name;
  const productsByColor = await Products.getProductsGroupedByColor(productName);
  colors = Object.keys(productsByColor);
  selectedColor.value = colors[0];

  product.value = {
    name: productName,
    colors: productsByColor,
    ...productsByColor[colors[0]][0]
  };

  sizes.value = await Products.getSizesByColor(productName, selectedColor.value.replace('#', ''));

  await updateSelectedProduct();
});

watch(selectedColor, async (newColor) => {
  if (newColor) {
    sizes.value = await Products.getSizesByColor(product.value.name, newColor.replace('#', ''));
  }
});

watch([selectedColor, selectedSize], updateSelectedProduct);

watch(selectedProduct, async (newProduct) => {
  if (newProduct) {
    stock.value = await Stock.getStock(newProduct);
  }
});

async function updateSelectedProduct() {
  if (selectedColor.value && selectedSize.value) {
    const productName = route.params.name;
    selectedProduct.value = await Products.getProductBySizeAndColor(productName, selectedSize.value, selectedColor.value.replace('#', ''));
  }
}
</script>

<template>
  <div v-if="product" class="product-details">
    <button class="back-button">
      <router-link class="catalog" to="/store">
        < Catalog
      </router-link>
    </button>
    <h1>{{ product.name }}</h1>
    <ProductCarousel :product-name="product.name"/>
    <p>{{ product.description }}</p>
    <p class="price"><span style="font-weight: bold; font-size: 1.5rem">{{ product.price }}</span>€</p>

    <h3 v-if="selectedColor && sizes.length > 0">Size:</h3>
    <SizeSelector v-if="selectedColor && product.colors[selectedColor]" :sizes="sizes"
                  @update:selectedSize="selectedSize = $event"/>
    <h3 v-if="selectedColor">Color:</h3>
    <ColorSelector :colors="colors" @update:selectedColor="selectedColor = $event"/>
    <p v-if="product.material">Material: {{ product.material }}</p>
    <p>Stock: {{ stock?.quantity ?? 0 }}</p>
    <button @click="cart.addItem(selectedProduct, product.price)" :disabled="!selectedProduct">Add to Cart</button>
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

.catalog {
  display: flex;
  align-items: center;
  color: var(--color-text);
  text-decoration: none;
}

.price {
  font-size: 0.9rem;
}

button {
  background: var(--color-background-mute);
  margin-top: 8px;
  border: 2px solid var(--color-border);
  cursor: pointer;
  font-size: 16px;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  user-select: none;
  display: flex;
  min-height: 30px;
}

button:hover {
  filter: brightness(1.05);
}

button:active {
  transform: scale(0.95);
}

.back-button {
  position: absolute;
  left: 20px;
}

@media (max-width: 1368px) {
  .back-button {
    bottom: 8px;
    top: auto;
    left: 4px;
  }
}
</style>