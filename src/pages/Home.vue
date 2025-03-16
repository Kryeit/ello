<script setup>
import Slideshow from "@/components/Slideshow.vue";
import OnlinePlayers from "@/components/home/OnlinePlayers.vue";
import HowToJoin from "@/components/home/HowToJoin.vue";
import VideoPlayer from "@/components/VideoPlayer.vue";
import Kryeitrailer from "@/assets/media/Kryeitrailer.mp4";

const images = [
  {
    src: "https://kryeit.com/images/gallery/ELZEN219.webp",
    name: "ELZEN219"
  },
  {
    src: "https://kryeit.com/images/gallery/goldnphoenix258.webp",
    name: "goldnphoenix258"
  },
  {
    src: "https://kryeit.com/images/gallery/__Tesseract.webp",
    name: "__Tesseract"
  },
  {
    src: "https://kryeit.com/images/gallery/Jerry_Snow5038.webp",
    name: "Jerry_Snow5038"
  },
  {
    src: "https://kryeit.com/images/gallery/OlimilO1402.webp",
    name: "OlimilO1402"
  },
  {
    src: "https://kryeit.com/images/gallery/BerrySweet.webp",
    name: "BerrySweet"
  },
  {
    src: "https://kryeit.com/images/gallery/Enzoquest10.webp",
    name: "Enzoquest10"
  },
  {
    src: "https://kryeit.com/images/gallery/Maxwell_Western.webp",
    name: "Maxwell_Western"
  },
  {
    src: "https://kryeit.com/images/gallery/RatsInATopHat.webp",
    name: "RatsInATopHat"
  },
  {
    src: "https://kryeit.com/images/gallery/MaysonBean.webp",
    name: "MaysonBean"
  },
  {
    src: "https://kryeit.com/images/gallery/OcttKing.webp",
    name: "OcttKing"
  },
  {
    src: "https://kryeit.com/images/gallery/JustRay23.webp",
    name: "JustRay23"
  },
  {
    src: "https://kryeit.com/images/gallery/Kcnctc.webp",
    name: "Kcnctc"
  },
  {
    src: "https://kryeit.com/images/gallery/Best25.webp",
    name: "Best25"
  },
  {
    src: "https://kryeit.com/images/gallery/Quales_.webp",
    name: "Quales_"
  },
  {
    src: "https://kryeit.com/images/gallery/jotredi_.webp",
    name: "jotredi_"
  },
  {
    src: "https://kryeit.com/images/gallery/Metalli70.webp",
    name: "Metalli70"
  },
  {
    src: "https://kryeit.com/images/gallery/Seisonicon.webp",
    name: "Seisonicon"
  },
  {
    src: "https://kryeit.com/images/gallery/Do_you_know_wae.webp",
    name: "Do_you_know_wae"
  },
  {
    src: "https://kryeit.com/images/gallery/verdeen_.webp",
    name: "verdeen_"
  },
  {
    src: "https://kryeit.com/images/gallery/Phostt.webp",
    name: "Phostt"
  },
  {
    src: "https://kryeit.com/images/gallery/LKnotOK.webp",
    name: "LKnotOK"
  },
]
</script>

<template>
  <div class="banner">
    <img alt="Kryeit banner" src="https://kryeit.com/banner.webp"/>
  </div>

  <h1 class="visually-hidden">Kryeit Home Page</h1>

  <h2 class="slogan">{{ $t("home.slogan") }}</h2>

  <OnlinePlayers class="online-players"/>

  <h3 class="description">
    {{ $t("home.description.1") }}
  </h3>
  <h3 class="description">
    {{ $t("home.description.2") }}
  </h3>

  <h2 id="gallery" class="section-title">
    {{ $t("home.gallery.title") }}
  </h2>

  <hr class="separator">

  <Slideshow :images="images"/>

  <h2 id="how-to-join" class="section-title">
    {{ $t("home.how-to-join.title") }}
  </h2>

  <hr class="separator">

  <HowToJoin/>

  <h2 id="trailer" class="section-title">Trailer</h2>

  <hr class="separator">

  <VideoPlayer :src="Kryeitrailer" :sound="0.7"/>

  <hr class="footer-separator">

  <h2 class="minecraft-disclaimer">
    {{ $t("home.disclaimer") }}
  </h2>
</template>

<style scoped>
.separator {
  margin-bottom: 16px;
  background-color: var(--color-text);
  border: none;
  height: 2px;
}

.footer-separator {
  background-color: var(--color-text);
  border: none;
  height: 1px;
}

.online-players {
  margin-bottom: 20px;
}

.banner img {
  width: calc(100vw - 30px);
  max-width: 800px;
  height: auto;
}

.slogan {
  text-align: center;
  padding-bottom: 16px;
}

.description {
  text-align: center;
}

.section-title {
  text-align: center;
  padding-top: 20px;
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

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
</style>