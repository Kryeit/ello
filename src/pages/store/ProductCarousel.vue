<script setup>
import { nextTick, onMounted, ref, watch, computed } from "vue";
import productStore from "@/js/merch/productStore.js";
import Flicking from "@egjs/vue3-flicking";
import "@egjs/vue3-flicking/dist/flicking.css";
import Products from "@/js/merch/products.js";
import {getIpAddress} from "@/js/static.js";
import ImagePopup from "@/pages/store/ImagePopup.vue";

const props = defineProps({
  productName: String
});

const images = ref([]);
const flicking = ref(null);
const carouselWrapper = ref(null);
let flickingMoving = false;

// Popup state
const popupVisible = ref(false);
const popupSrc = ref("");

const isMobileOrTablet = computed(() => window.innerWidth <= 1024);

onMounted(async () => {
  try {
    if (!productStore.isLoaded()) {
      await productStore.fetchCatalog();
    }
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

// Open popup with selected image
function openPopup(image) {
  popupSrc.value = getIpAddress() + image;
  popupVisible.value = true;
}
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
            :src="getIpAddress() + image"
            alt="Product Image"
            class="carousel-image"
            draggable="false"
            @dragstart.prevent
            @click="openPopup(image)"
        />
      </div>
    </Flicking>

    <!-- Image popup component -->
    <ImagePopup v-model="popupVisible" :src="popupSrc" />
  </div>
</template>

<style scoped>
.carousel-wrapper {
  overflow: hidden;
  position: relative;
  z-index: 998;
  padding: 20px 0;
  display: flex;
  height: 100%;
}

.carousel {
  width: 90%;
  height: 105%;
  white-space: nowrap;
}

.panel {
  display: block;
  width: 100%;
  height: 100%;
  margin-bottom: 30px;
}
.carousel-image {
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -o-user-select: none;
  -ms-user-select: none;
  user-select: none;

  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  -ms-user-drag: none;
  user-drag: none;

  object-fit: contain;
  image-rendering: pixelated; /* For browsers that support it */
  image-rendering: crisp-edges; /* Safari fallback */
  width: 100%;
  height: auto;
  border-radius: 12px;
  border: 4px solid black;
  cursor: pointer;
}

@media (max-width: 1024px) {
  .carousel {
    width: 100%;
  }

  .panel {
    margin-bottom: 0;
    margin-right: 30px;
  }

}
</style>
