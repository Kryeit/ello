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
  <h2>
    Kryeit is a PvE survival Minecraft server focused on the Create mod. We strive for a friendly environment
    so that everyone can enjoy their time on the server. There is a claim system and a nerfed teleport
    experience to make travelling easier. The server has a focus on technical minecraft, due to the nature of
    the Create mod, although all play styles are welcome. The most used form of communication is our Discord
    server!
  </h2>

  <Slideshow :images="images"></Slideshow>

  <iframe src="https://www.youtube.com/embed/Jh2NoGXKzME?autoplay=1&amp;mute=1" title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen="">
  </iframe>

  <h2>
    NOT AN OFFICIAL MINECRAFT SERVICE. NOT APPROVED BY OR ASSOCIATED WITH MOJANG OR MICROSOFT.
  </h2>
</template>

<style scoped>
.banner img {
  width: calc(100vw - 30px);
  max-width: 1200px;
  height: auto;
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
  margin-top: 30px;
}
</style>