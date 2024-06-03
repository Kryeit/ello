<script setup>

import Slideshow from "@/components/Slideshow.vue";

const images = [
  {
    src: "https://kryeit.com/images/img_0.webp",
    name: "Picture by OlimilO1402"
  },
  {
    src: "https://kryeit.com/images/img_1.webp",
    name: "Picture by Tesseract"
  },
  {
    src: "https://kryeit.com/images/img_2.webp",
    name: "Picture by bbqribs2129"
  },
  {
    src: "https://kryeit.com/images/img_3.webp",
    name: "Picture by Enzoquest10"
  },
  {
    src: "https://kryeit.com/images/img_4.webp",
    name: "Picture by Enzoquest10"
  },
  {
    src: "https://kryeit.com/images/img_5.webp",
    name: "Picture by Enzoquest10"
  },
  {
    src: "https://kryeit.com/images/img_6.webp",
    name: "Picture by Enzoquest10"
  },
  {
    src: "https://kryeit.com/images/img_7.webp",
    name: "Picture by Derpduck"
  },
  {
    src: "https://kryeit.com/images/img_8.webp",
    name: "Picture by Enzoquest10"
  },
  {
    src: "https://kryeit.com/images/img_9.webp",
    name: "Picture by Enzoquest10"
  },
  {
    src: "https://kryeit.com/images/img_10.webp",
    name: "Picture by Enzoquest10"
  },
  {
    src: "https://kryeit.com/images/img_11.webp",
    name: "Picture by bbqribs2129"
  },
  {
    src: "https://kryeit.com/images/img_12.webp",
    name: "Picture by bbqribs2129"
  },
  {
    src: "https://kryeit.com/images/img_13.webp",
    name: "Picture by Not a Hedgie"
  },
  {
    src: "https://kryeit.com/images/img_14.webp",
    name: "Picture by OlimilO1402"
  },
]
</script>

<template>
  <div class="gallery">
    <h2 class="title">Legacy Gallery (S2)</h2>
    <Slideshow :images="images"/>
  </div>
</template>

<style scoped>
.title {
  margin: 20px;
  font-size: 38px;
  text-align: center;
}
</style>