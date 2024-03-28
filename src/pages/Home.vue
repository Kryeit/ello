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
  <div class="banner">
    <img alt="Kryeit banner" src="https://kryeit.com/banner.webp"/>
  </div>
  <h1>
    A Create mod server
  </h1>

  <Slideshow :images="images"></Slideshow>

  <iframe src="https://www.youtube.com/embed/Jh2NoGXKzME?autoplay=1&amp;mute=1" title="Kryeit trailer"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen="">
  </iframe>

  <hr>

  <h2>
    NOT AN OFFICIAL MINECRAFT SERVICE. NOT APPROVED BY OR ASSOCIATED WITH MOJANG OR MICROSOFT.
  </h2>
</template>

<style scoped>
.banner img {
  width: calc(100vw - 30px);
  max-width: 800px;
  height: auto;
}

h1 {
  margin-bottom: 20px;
  text-align: center;
}

h2 {
  margin-bottom: 20px;
  text-align: center;
}

.banner {
  margin-top: 30px;
  margin-bottom: 30px;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

iframe {
  border: none;
  width: 100%;
  aspect-ratio: 16/9;
  display: block;
  margin: 30px auto;
  max-width: 800px;
}
</style>