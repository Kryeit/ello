<script setup>
import {computed, onMounted, ref, watch} from 'vue';
import {useRoute} from 'vue-router';
import productStore from '@/js/merch/productStore.js';
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
const colors = ref([]);
const selectedColor = ref(null);
const selectedSize = ref(null);
const sizes = ref([]);
const stock = ref(null);
const isLoading = ref(true);

onMounted(async () => {
  const productName = route.params.name;

  // If products aren't loaded yet, wait for them
  if (!productStore.isLoaded()) {
    await productStore.fetchCatalog();
  }

  // Get product details from store
  const productDetails = await productStore.getProductDetails(productName);
  console.log("Product details:", productDetails);

  if (!productDetails || productDetails.colorVariants.length === 0) {
    console.error('Product not found or has no color variants');
    isLoading.value = false;
    return;
  }

  // Set product data
  product.value = {
    name: productDetails.name,
    description: productDetails.description,
    price: productDetails.price,
    material: productDetails.material,
    virtual: productDetails.virtual
  };

  // Extract colors
  colors.value = productDetails.colorVariants.map(cv => cv.color);

  // Set default color
  selectedColor.value = colors.value[0];

  // Process product variants
  const variantsByColor = {};
  for (const colorVariant of productDetails.colorVariants) {
    variantsByColor[colorVariant.color] = colorVariant.sizes.map(size => ({
      id: size.id,
      name: productDetails.name,
      description: productDetails.description,
      price: productDetails.price,
      size: size.size,
      color: colorVariant.color,
      material: productDetails.material,
      virtual: productDetails.virtual,
      stock: size.stock
    }));
  }

  // Add color variants to product
  product.value.colors = variantsByColor;

  // Update sizes based on selected color
  if (selectedColor.value) {
    updateSizesForColor(selectedColor.value);
  }

  // Set initial product selection
  await updateSelectedProduct();
  isLoading.value = false;
});

function updateSizesForColor(color) {
  if (product.value && product.value.colors && product.value.colors[color]) {
    sizes.value = product.value.colors[color].map(p => p.size);
  }
}

watch(selectedColor, async (newColor) => {
  if (newColor) {
    updateSizesForColor(newColor);
    selectedSize.value = sizes.value[0];
  }
});

watch([selectedColor, selectedSize], updateSelectedProduct);

watch(selectedProduct, async (newProduct) => {
  if (newProduct) {
    stock.value = await Stock.getStock(newProduct);
  }
});

async function updateSelectedProduct() {
  if (selectedColor.value && selectedSize.value && product.value && product.value.colors) {
    const variants = product.value.colors[selectedColor.value];
    const selectedVariant = variants.find(v => v.size === selectedSize.value);

    if (selectedVariant) {
      selectedProduct.value = selectedVariant.id;
    }
  }
}

const productDescriptionHtml = computed(() => {
  return marked.parse(product.value?.description || '');
});
</script>

<template>
  <div class="page-container">
    <div v-if="isLoading" class="loading-state">
      <p>Loading product details...</p>
    </div>

    <div v-else-if="!product" class="error-state">
      <p>Product not found</p>
      <router-link to="/store" class="back-link">Back to Store</router-link>
    </div>

    <div v-else class="product-container">
      <div class="details-container">
        <div class="product-header">
          <router-link class="return-to-store" to="/store">
            <ArrowLeft/>
            <h1>Store</h1>
          </router-link>
          <h1>{{ product.name }}</h1>
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
                <button class="add-to-cart" @click="cart.addItem(selectedProduct, product.price)"
                        :disabled="!selectedProduct">Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <StoreFooter class="footer"/>

    <Cart/>
  </div>

</template>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 20px;
  box-sizing: border-box;
}
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

.loading-state, .error-state {
  text-align: center;
  padding: 40px;
  margin: 20px;
}

.error-state {
  color: #cf4747;
}

.back-link {
  display: inline-block;
  margin-top: 15px;
  padding: 8px 16px;
  background-color: var(--color-background-mute);
  border: 2px dashed var(--color-border);
  border-radius: 8px;
  color: var(--color-text);
  text-decoration: none;
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

  .content {
    flex-direction: column;
  }

  .carousel {
    flex: 0 0 auto;
    margin-bottom: 20px;
  }

  .product-description {
    flex: 0 0 auto;
  }
}
</style>