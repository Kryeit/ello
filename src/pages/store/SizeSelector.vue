<script setup>
import {onMounted, ref, watch} from 'vue';
import Stock from "@/js/merch/stock.js";
import Products from "@/js/merch/products.js";

const props = defineProps({
  sizes: {
    type: Array,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
});

const emits = defineEmits(['update:selectedSize']);
const isSoldOut = ref([]);

const selectedSize = ref(null);
const selectedSizes = ref([]);

const fetchProductsAndStock = async (color) => {
  let products = await Products.getProductsByNameAndColor(props.name, color);
  isSoldOut.value = new Array(selectedSizes.value.length).fill(false);

  for (let product of products) {
    let stock = await Stock.getStock(product.id);

    const sizeIndex = selectedSizes.value.indexOf(product.size);
    if (sizeIndex !== -1) {
      isSoldOut.value[sizeIndex] = stock.quantity <= 0;
    }
  }
};

watch(() => props.color, async (newColor) => {
  selectedSizes.value = await Products.getSizesByColor(props.name, newColor.replace('#', ''));
  if (newColor) {
    await fetchProductsAndStock(newColor);
    if (selectedSizes.value.length > 0) {
      const firstAvailableSize = selectedSizes.value.find((size, index) => !isSoldOut.value[index]);
      if (firstAvailableSize) {
        selectSize(firstAvailableSize);
      }
    }
  }
}, { immediate: true });

const selectSize = (size) => {
  if (!isSoldOut.value[selectedSizes.value.indexOf(size)]) {
    selectedSize.value = size;
    emits('update:selectedSize', size);
  }
};

watch(() => props.sizes, (newSizes) => {
  if (newSizes.length > 0) {
    selectSize(newSizes[0]);
  }
}, { immediate: true });

onMounted(async () => {
  await fetchProductsAndStock(props.color);
});
</script>

<template>
  <div class="size-selector">
    <div class="overlay"></div>
    <div class="sizes">
      <div v-for="(size, index) in selectedSizes" :key="size" class="size-option" :class="{ selected: size === selectedSize, 'sold-out': isSoldOut[index] }" @click="selectSize(size)">
        <input type="radio" :id="size" :value="size" v-model="selectedSize" @change="selectSize(size)" :disabled="isSoldOut[index]" />
        <label class="size" :for="size" :class="{ 'disabled-label': isSoldOut[index] }">{{ size }}</label>      </div>
    </div>
  </div>
</template>

<style scoped>
.size-selector {
  display: inline-flex;
  background-image: url('/src/assets/minecraft/dirt.png');
  background-size: 70px 70px;
  background-repeat: repeat;
  image-rendering: pixelated; /* For browsers that support it */
  image-rendering: crisp-edges; /* Safari fallback */
  padding: 6px;
  border: 3px solid black;
  border-radius: 12px;
  position: relative;
}

.sizes {
  display: flex;
  gap: 10px;
  position: relative;
  z-index: 1;
}

.size-option {
  display: flex;
  align-items: center;
  width: 42px;
  height: 42px;
  border: none;
  background-image: url('/src/assets/minecraft/squared_button.png');
  background-size: contain;
  background-repeat: no-repeat;
  image-rendering: pixelated; /* For browsers that support it */
  image-rendering: crisp-edges; /* Safari fallback */
  cursor: pointer;
  user-select: none;
  position: relative;
}

.size-option.sold-out {
  filter: brightness(0.5);
  cursor: not-allowed;
}

.size-option::before {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: calc(100% - 4px);
  height: calc(100% - 4px);
  background-color: var(--color);
  opacity: 1;
  mix-blend-mode: overlay;
  z-index: -1;
}

.size-option.selected {
  background-image: url('/src/assets/minecraft/squared_button_hover.png');
}

.size {
  cursor: pointer;
  color: white;
  margin-left: auto;
  margin-right: auto;
  font-size: 0.7rem;
}

input[type="radio"] {
  display: none;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  z-index: 0;
  pointer-events: none;
}

.disabled-label {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>