<script setup>
import {ref} from "vue";

const {images} = defineProps(["images"]);

const currentImage = ref(0);
const parent = ref();
let currentTimeout = null;

function deltaImages(n) {
  let newValue = currentImage.value + n;
  if (newValue >= images.length) {
    newValue = 0;
  } else if (newValue < 0) {
    newValue = images.length - 1;
  }
  currentImage.value = newValue;

  clearTimeout(currentTimeout);
  currentTimeout = setTimeout(() => deltaImages(1), 4500);
}

deltaImages(0);
</script>

<template>
  <div ref="parent" class="slideshow">
    <a class="button" @click="deltaImages(-1)">❮</a>
    <a class="button right" @click="deltaImages(1)">❯</a>
    <div :style="{transform: `translateX(${-parent?.clientWidth * currentImage}px)`}" class="image" v-for="image in images">
      <img :src="image.src" :alt="image.name">
    </div>
    <a class="subtitle">{{ images[currentImage].name }}</a>
  </div>
</template>

<style scoped>
.slideshow {
  position: relative;
  overflow: hidden;
  display: flex;
}

.image {
  float: left;
  flex-shrink: 0;
  width: 100%;
  transition: transform 1s;
}

a {
  color: var(--vt-c-white-mute);
  font-size: 15px;
  padding: 8px 12px;
  position: absolute;
  bottom: 8px;
  width: 100%;
  text-align: center;
}

.subtitle {
  left: 0;
}

.button {
  cursor: pointer;
  position: absolute;
  top: 50%;
  width: auto;
  padding: 16px;
  margin-top: -22px;
  color: white;
  font-weight: bold;
  font-size: 18px;
  user-select: none;
  transition: scale 0.2s;
  height: fit-content;
  z-index: 10;
}

.button.right {
  right: 0;
}

.button:hover {
  scale: 1.3;
}

img {
  width: 100%;
  aspect-ratio: 16/9;
  object-fit: none;
}
</style>