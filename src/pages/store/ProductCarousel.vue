<script setup>
import { nextTick, onMounted, ref, watch, computed } from "vue";
import productStore from "@/js/merch/productStore.js";
import Flicking from "@egjs/vue3-flicking";
import "@egjs/vue3-flicking/dist/flicking.css";
import Products from "@/js/merch/products.js";

const props = defineProps({
  productName: String
});

const images = ref([]);
const flicking = ref(null);
const carouselWrapper = ref(null);
let flickingMoving = false;

const isMobileOrTablet = computed(() => window.innerWidth <= 1024);

onMounted(async () => {
  try {
    // If the store isn't loaded yet, wait for it
    if (!productStore.isLoaded()) {
      await productStore.fetchCatalog();
    }

    // Get images from store
    images.value = await Products.getImages(props.productName);

    await nextTick();
    setCarouselHeight();
  } catch (error) {
    console.error("Error loading product images:", error);
  }
});

const setCarouselHeight = () => {
  const firstImage = carouselWrapper.value.querySelector('.carousel-image');
  if (firstImage) {
    firstImage.addEventListener('load', () => {
      carouselWrapper.value.style.height = `${firstImage.clientHeight + 40}px`;
    });
  }
};

</script>

<template>
  <div ref="carouselWrapper" class="carousel-wrapper">
    <Flicking
        ref="flicking"
        :options="{
        circular: true, align: 'prev',
        horizontal: isMobileOrTablet
      }"
        class="carousel"
        @moveStart="() => { flickingMoving = true; }"
        @moveEnd="() => { flickingMoving = false;}"
    >
      <div
          class="panel"
          v-for="(image, index) in images"
          :key="index"
      >
        <img
            :src="image"
            alt="Product Image"
            class="carousel-image"
            draggable="false"
        />
      </div>
    </Flicking>
  </div>
</template>

<style scoped>
.carousel-wrapper {
  overflow: hidden;
  position: relative;
  z-index: 998;
  padding: 20px 0;
  display: flex;
}

.carousel {
  width: 90%;
  height: 100%;
  white-space: nowrap;
}

.panel {
  display: block;
  width: 100%;
  height: 100%;
  margin-bottom: 20px;
}

.carousel-image {
  object-fit: contain;
  image-rendering: pixelated; /* For browsers that support it */
  image-rendering: crisp-edges; /* Safari fallback */
  user-select: none;
  width: 100%;
  height: auto;
}

.scrolling-hint {
  width: 4px;
  background-color: var(--color-background);
  display: flex;
  align-items: flex-start;
  margin-left: 20px;
  border-radius: 4px;
  border: 1px solid var(--color-border);
}

.scrolling-hint-progress {
  width: 100%;
  background-color: var(--color-text);
  transition: height 0.3s ease;
  border-radius: 4px;
}
</style>