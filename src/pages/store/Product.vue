<template>
  <div class="page-container">
    <div v-if="product" class="product-container">
      <h1>{{ product.name }} #{{ selectedProduct }}</h1>
      <ProductCarousel :product-name="product.name"/>

      <div class="details-container">
        <div class="product-description">
          <p>{{ product.description }}</p>
        </div>
        <div class="separator"></div>
        <div class="product-details">
          <h3 v-if="selectedColor && sizes.length > 0">Size:</h3>
          <SizeSelector v-if="selectedColor && product.colors[selectedColor]" :sizes="sizes"
                        :name="product.name" :color="selectedColor"
                        @update:selectedSize="selectedSize = $event"/>
          <h3 v-if="selectedColor">Color:</h3>
          <ColorSelector :colors="colors" @update:selectedColor="selectedColor = $event"/>
          <p v-if="product.material">Material: {{ product.material }}</p>
          <p v-if="!product.virtual">Stock: {{ stock?.quantity ?? 0 }}</p>
          <div class="price-container">
            <p class="price"><span style="font-weight: bold; font-size: 1.5rem">{{ product.price }}</span>€</p>
            <button class="add-to-cart" @click="cart.addItem(selectedProduct, product.price)" :disabled="!selectedProduct">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>

    <div v-else>
      <p>Loading...</p>
    </div>

    <Cart/>
    <StoreFooter class="footer"/>
  </div>
</template>

<script setup>
import {onMounted, ref, watch} from 'vue';
import {useRoute} from 'vue-router';
import Products from '@/js/merch/products.js';
import ColorSelector from "@/pages/store/ColorSelector.vue";
import SizeSelector from "@/pages/store/SizeSelector.vue";
import {cart} from '@/js/merch/cart.js';
import Cart from "@/pages/store/cart/Cart.vue";
import ProductCarousel from "@/pages/store/ProductCarousel.vue";
import Stock from '@/js/merch/stock.js';
import StoreFooter from "@/components/payment/StoreFooter.vue";

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
  const productsByColor = await Products.getProductsByColor(productName);
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

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.footer {
  margin-top: auto;
}

.product-container {
  padding: 20px;
  box-sizing: border-box;
}

.price-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

h1 {
  margin-bottom: 20px;
  text-align: center;
}

.price {
  font-size: 1rem;
}

button {
  background: none;
  margin-top: 8px;
  border: 2px dashed var(--color-border);
  cursor: pointer;
  font-size: 16px;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  user-select: none;
  display: flex;
  min-height: 30px;
  padding: 10px;
}

button:hover {
  background: var(--color-background-mute);
}

button:active {
  transform: scale(0.95);
}

.add-to-cart {
  white-space: nowrap;
}

.separator {
  width: 1px;
  background: var(--color-border);
}

.details-container {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-top: 20px;
}

.product-description {
  flex: 1;
  min-width: 50%;
}

.product-details {
  flex: 1;
  min-width: 50%;
}

@media (max-width: 600px) {
  .details-container {
    flex-direction: column;
  }

  .product-description,
  .product-details {
    min-width: 100%;
  }
}
</style>