<script setup>
import {ref, watch} from "vue";
import Flicking from "@egjs/vue3-flicking";
import "@egjs/vue3-flicking/dist/flicking.css";
import {AutoPlay} from "@egjs/flicking-plugins";

const props = defineProps({
  images: Array
});

const flicking = ref(null);
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
  <div class="carousel-wrapper">
    <Flicking
        ref="flicking"
        :options="{
          circular: true, align: 'center'
      }"
        :plugins="plugins"
        class="carousel"
        @ready="onFlickingReady"
    >
      <div
          class="panel"
          v-for="(image, index) in images"
          :key="index"
      >
        <img
            :src="image.src"
            :alt="image.name"
            :width="image.width"
            :height="image.height"
            class="carousel-image"
            draggable="false"
            :loading="index === 0 ? 'eager' : 'lazy'"
        />
      </div>
    </Flicking>
    <a class="subtitle">{{ $t("home.gallery.subtitle", {author: images[currentImage].name}) }}</a>
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

.panel:last-child {
  margin-right: 0;
}

.carousel-image {
  object-fit: contain;
  image-rendering: pixelated;
  image-rendering: crisp-edges;
  user-select: none;
  width: 100%;
  height: 100%;
}

.subtitle {
  position: absolute;
  bottom: 28px;
  width: 100%;
  text-align: center;
  color: var(--vt-c-white-mute);
  font-size: 15px;
  padding: 8px 12px;
  z-index: 1;
  user-select: none;
  pointer-events: none;
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