<script setup>
import { ref, onMounted } from "vue";
import Products from "@/js/merch/products.js";

const props = defineProps({
  productName: String
});

const images = ref([]);

onMounted(async () => {
  try {
    images.value = await Products.getImages(props.productName);
  } catch (error) {
    console.error("Error loading product images:", error);
  }
});
</script>

<template>
  <div class="carousel-wrapper">
    <Flicking
        ref="flicking"
        :options="{
          circular: true,
          align: 'prev',
      }"
        class="carousel"
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
  width: 290%;
  overflow: hidden;
  position: relative;
}

.carousel {
  width: 100%;
  height: auto;
  white-space: nowrap;
}

.panel {
  margin-right: 16px;
  display: inline-block;
  height: min(70vw, 50vh);
}

.panel:last-child {
  margin-right: 0;
}

.carousel-image {
  object-fit: cover;
  image-rendering: pixelated;
  user-select: none;
  height: min(70vw, 50vh);
}

@media (max-width: 768px) {
  .carousel-image {
    width: 100vw;
    height: 100vw;
  }

  .carousel-wrapper {
    left: -8%;
  }
}
</style>