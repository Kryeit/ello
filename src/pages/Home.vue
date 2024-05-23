<script setup>
import Slideshow from "@/components/Slideshow.vue";
import OnlinePlayers from "@/components/OnlinePlayers.vue";
import CopyIP from "@/components/CopyIP.vue";
import HowToJoin from "@/components/HowToJoin.vue";

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

  <h2 class="slogan">Mine, craft and create.</h2>

  <OnlinePlayers/>

  <br>
  <h3 class="description">
    Technical minecraft, yet a relaxed environment to play on.
  </h3>
  <h3 class="description">
    You can find here a long-term mindset, a friendly community and a lot of moss.
  </h3>
  <br>

  <h2 class="section-title">Gallery</h2>

  <hr>

  <br>

  <Slideshow :images="images"></Slideshow>

  <br>
  <h2 class="section-title">How to join</h2>

  <hr>

  <br>

  <HowToJoin/>

  <h2 class="section-title">Trailer</h2>

  <hr>

  <br>

  <iframe
      src="https://www.youtube-nocookie.com/embed/Jh2NoGXKzME?autoplay=1&mute=1"
      title="Kryeit trailer"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
      loading="lazy">
  </iframe>

  <hr>

  <h2 class="minecraft-disclaimer">
    NOT AN OFFICIAL MINECRAFT SERVICE. NOT APPROVED BY OR ASSOCIATED WITH MOJANG OR MICROSOFT.
  </h2>
</template>

<style scoped>
.banner img {
  width: calc(100vw - 30px);
  max-width: 800px;
  height: auto;
}

.slogan {
  color: white;
  text-align: center;
  padding-bottom: 16px;
}

.description {
  text-align: center;
}

.section-title {
  color: white;
  text-align: center;
}

.minecraft-disclaimer {
  text-align: center;
  font-size: 12px;
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
  max-width: 800px;
  margin: auto auto 20px;
}
</style>