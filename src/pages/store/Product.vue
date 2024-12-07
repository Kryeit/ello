<template>
  <h1 style="color: red">THIS PAGE IS NOT RELEASED, JUST INTERACTABLE AS A TEST PHASE, NO PAYMENTS OR ANYTHING WILL GO THROUGH OR ARE REAL</h1>
  <div class="page-container">
    <div v-if="product" class="product-container">
      <div class="details-container">
        <div class="product-header">
          <router-link class="return-to-store" to="/store">
            <ArrowLeft/>
            <h1>Store</h1>
          </router-link>
          <h1>{{ product.name }} #{{ selectedProduct }}</h1>
        </div>
        <div class="content">
          <ProductCarousel :product-name="product.name" class="carousel"/>
          <div class="product-description">
            <div v-html="productDescriptionHtml"></div>
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
import {computed, onMounted, ref, watch} from 'vue';
import {useRoute} from 'vue-router';
import Products from '@/js/merch/products.js';
import ColorSelector from "@/pages/store/ColorSelector.vue";
import SizeSelector from "@/pages/store/SizeSelector.vue";
import {cart} from '@/js/merch/cart.js';
import Cart from "@/pages/store/cart/Cart.vue";
import ProductCarousel from "@/pages/store/ProductCarousel.vue";
import Stock from '@/js/merch/stock.js';
import StoreFooter from "@/components/payment/StoreFooter.vue";
import {marked} from "marked";

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

  if (Object.keys(productsByColor)[0] === "") {
    const productId = await Products.getProductsByName(productName);
    product.value = await Products.getProduct(productId);
    selectedProduct.value = productId[0];

  } else {
    colors = Object.keys(productsByColor);
    selectedColor.value = colors[0];

    product.value = {
      name: productName,
      colors: productsByColor,
      ...productsByColor[colors[0]][0]
    };

    sizes.value = await Products.getSizesByColor(productName, selectedColor.value.replace('#', ''));

    await updateSelectedProduct();
  }
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

const productDescriptionHtml = computed(() => {
  return marked.parse(product.value?.description || '');
});
</script>

<style scoped>
.product-header {
  display: flex;
  align-items: center;
  position: relative;
  justify-content: flex-start;
  margin-bottom: 50px;
  margin-top: 10px;
}

.return-to-store {
  display: flex;
  align-items: center;
  gap: 8px;
  position: absolute;
  left: 0;
  transform: translateY(10%);
  color: var(--color-text);
}

.product-header h1 {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
  margin: 0;
}

.return-to-store h1 {
  margin: 0;
  left: 220%;
  font-size: 1.2rem;
}

.footer {
  margin-top: auto;
}

.product-container {
  padding: 20px;
  box-sizing: border-box;
}

.content {
  display: flex;
  gap: 20px;
}

.carousel {
  flex: 0 0 60%;
}

.product-description {
  flex: 0 0 40%;
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

@media (max-width: 600px) {
  .product-description,
  .product-details {
    min-width: 100%;
  }
}

@media (max-width: 1024px) {
  .product-header {
    margin-bottom: 40px;
    margin-right: -30px;
  }

  .return-to-store {
    display: none;
  }
}
</style>