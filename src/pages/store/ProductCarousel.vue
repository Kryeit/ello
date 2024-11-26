<script setup>
import { ref, onMounted } from "vue";
import Products from "@/js/merch/products.js";
import Flicking from "@egjs/vue3-flicking";
import "@egjs/vue3-flicking/dist/flicking.css";

const props = defineProps({
  productName: String
});

const images = ref([]);
const flicking = ref(null);


onMounted(async () => {
  try {
    images.value = await Products.getImages(props.productName);
  } catch (error) {
    console.error("Error loading product images:", error);
  }
});

const onFlickingReady = () => {
  setTimeout(() => {
    flicking.value.align = 'prev';
  }, 200);
};
</script>

<template>
  <div class="carousel-wrapper">
    <Flicking
        ref="flicking"
        :options="{
          circular: true, align: 'center'
      }"
        class="carousel"
        @ready="onFlickingReady"
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
}

.carousel {
  width: 100%;
  height: auto;
  white-space: nowrap;

}

.panel {
  display: inline-block;
  height: min(70vw, 50vh);
}

.panel:last-child {
  margin-right: 0;
}

.carousel-image {
  object-fit: contain;
  image-rendering: pixelated;
  user-select: none;
  height: min(70vw, 50vh);
}

@media (max-width: 768px) {
  .carousel-image {
    width: 100vw;
    height: 100%;
  }
}
</style>