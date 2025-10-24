<script setup>
import Slideshow from "@/components/Slideshow.vue";

const images = [
  {
    src: "https://kryeit.com/images/OlimilO1402.webp",
    name: "Picture by OlimilO1402",
    width: 800,
    height: 600
  },
  {
    src: "https://kryeit.com/images/__Tesseract.webp",
    name: "Picture by __Tesseract",
    width: 800,
    height: 600
  },
  {
    src: "https://kryeit.com/images/bbqribs2129.webp",
    name: "Picture by bbqribs2129",
    width: 800,
    height: 600
  },
  {
    src: "https://kryeit.com/images/Enzoquest10.webp",
    name: "Picture by Enzoquest10",
    width: 800,
    height: 600
  },
  {
    src: "https://kryeit.com/images/Enzoquest10-2.webp",
    name: "Picture by Enzoquest10",
    width: 800,
    height: 600
  },
  {
    src: "https://kryeit.com/images/Enzoquest10-3.webp",
    name: "Picture by Enzoquest10",
    width: 800,
    height: 600
  },
  {
    src: "https://kryeit.com/images/Enzoquest10-4.webp",
    name: "Picture by Enzoquest10",
    width: 800,
    height: 600
  },
  {
    src: "https://kryeit.com/images/Derpduck.webp",
    name: "Picture by Derpduck",
    width: 800,
    height: 600
  },
  {
    src: "https://kryeit.com/images/Enzoquest10-5.webp",
    name: "Picture by Enzoquest10",
    width: 800,
    height: 600
  },
  {
    src: "https://kryeit.com/images/Enzoquest10-6.webp",
    name: "Picture by Enzoquest10",
    width: 800,
    height: 600
  },
  {
    src: "https://kryeit.com/images/Enzoquest10-7.webp",
    name: "Picture by Enzoquest10",
    width: 800,
    height: 600
  },
  {
    src: "https://kryeit.com/images/bbqribs2129-2.webp",
    name: "Picture by bbqribs2129",
    width: 800,
    height: 600
  },
  {
    src: "https://kryeit.com/images/bbqribs2129-3.webp",
    name: "Picture by bbqribs2129",
    width: 800,
    height: 600
  },
  {
    src: "https://kryeit.com/images/Hedgie.webp",
    name: "Picture by Not a Hedgie",
    width: 800,
    height: 600
  },
  {
    src: "https://kryeit.com/images/OlimilO1402-2.webp",
    name: "Picture by OlimilO1402",
    width: 800,
    height: 600
  },
]
</script>

<template>
  <div class="gallery">
    <h2 class="title">Legacy Gallery (S2)</h2>
    <Slideshow :images="images"/>
    <br>
  </div>
</template>

<style scoped>
.title {
  margin: 20px;
  font-size: 38px;
  text-align: center;
}
</style>