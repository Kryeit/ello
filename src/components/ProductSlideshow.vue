<script setup>
import {ref, watch, onMounted, onBeforeUnmount} from "vue";
import Flicking from "@egjs/vue3-flicking";
import "@egjs/vue3-flicking/dist/flicking.css";
import {watchEffect} from "vue-demi";
import {AutoPlay} from "@egjs/flicking-plugins";

const props = defineProps({
  images: Array,
  isMobileOrTablet: Boolean
});

const emit = defineEmits(['changed']);
const flicking = ref(null);
const carouselWrapper = ref(null);
const currentImage = ref(0);
const plugins = [new AutoPlay({duration: 4500, direction: "NEXT", stopOnHover: true})];
const onFlickingReady = () => {
  setTimeout(() => {
    flicking.value.align = 'center';
  }, 200);
};

watch(flicking, (newFlicking) => {
  if (newFlicking) {
    newFlicking.on('changed', (e) => {
      currentImage.value = e.index;
    });
  }
});
</script>

<template>
  <div ref="carouselWrapper" class="carousel-wrapper">
    <Flicking
        ref="flicking"
        :options="{
          circular: true,
          align: 'center',
          horizontal: isMobileOrTablet
        }"
        @ready="onFlickingReady"

        class="carousel"
        :plugins="plugins"

    >
      <div
          class="panel"
          v-for="(image, index) in images"
          :key="index"
      >
        <img
            :src="image.src"
            class="carousel-image"
            draggable="false"
            :loading="index === 0 ? 'eager' : 'lazy'"
         alt=""/>
      </div>
    </Flicking>
  </div>
</template>

<style scoped>
.carousel-wrapper {
  overflow: hidden;
  position: relative;
}

.carousel {
  width: 100%;
  height: auto;
  white-space: nowrap;
}

.panel {
  display: inline-block;
  width: 100%;
  height: min(70vw, 50vh);
}

.carousel-image {
  object-fit: contain;
  image-rendering: pixelated;
  image-rendering: crisp-edges;
  user-select: none;
  width: 100%;
  height: 100%;
}

@media (max-width: 768px) {
  .panel {
    width: 100vw;
  }

  .carousel-image {
    width: 100vw;
    height: 100%;
  }
}
</style>