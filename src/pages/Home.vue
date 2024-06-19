<script setup>
import Slideshow from "@/components/Slideshow.vue";
import OnlinePlayers from "@/components/home/OnlinePlayers.vue";
import HowToJoin from "@/components/home/HowToJoin.vue";
import VideoPlayer from "@/components/VideoPlayer.vue";
import Kryeitrailer from "@/assets/media/Kryeitrailer.mp4";

const images = [
  {
    src: "https://kryeit.com/images/gallery/MrRedRhino.png",
    name: "Picture by MrRedRhino"
  },
  {
    src: "https://kryeit.com/images/gallery/ELZEN219.png",
    name: "Picture by ELZEN219"
  },
  {
    src: "https://kryeit.com/images/gallery/MuriPlz.png",
    name: "Picture by MuriPlz"
  },
  {
    src: "https://kryeit.com/images/gallery/goldnphoenix258.png",
    name: "Picture by goldnphoenix258"
  },
  {
    src: "https://kryeit.com/images/gallery/__Tesseract.png",
    name: "Picture by __Tesseract"
  },
  {
    src: "https://kryeit.com/images/gallery/Jerry_Snow5038.png",
    name: "Picture by Jerry_Snow5038"
  },
  {
    src: "https://kryeit.com/images/gallery/OlimilO1402.png",
    name: "Picture by OlimilO1402"
  },
  {
    src: "https://kryeit.com/images/gallery/BerrySweet.png",
    name: "Picture by BerrySweet"
  },
  {
    src: "https://kryeit.com/images/gallery/Enzoquest10.png",
    name: "Picture by Enzoquest10"
  },
  {
    src: "https://kryeit.com/images/gallery/Maxwell_Western.png",
    name: "Picture by Maxwell_Western"
  },
  {
    src: "https://kryeit.com/images/gallery/RatsInATopHat.png",
    name: "Picture by RatsInATopHat"
  },
  {
    src: "https://kryeit.com/images/gallery/MaysonBean.png",
    name: "Picture by MaysonBean"
  },
  {
    src: "https://kryeit.com/images/gallery/OcttKing.png",
    name: "Picture by OcttKing"
  },
  {
    src: "https://kryeit.com/images/gallery/JustRay23.png",
    name: "Picture by JustRay23"
  },
  {
    src: "https://kryeit.com/images/gallery/Kcnctc.png",
    name: "Picture by Kcnctc"
  },
  {
    src: "https://kryeit.com/images/gallery/Best25.png",
    name: "Picture by Best25"
  },
  {
    src: "https://kryeit.com/images/gallery/Quales_.png",
    name: "Picture by Quales_"
  },
  {
    src: "https://kryeit.com/images/gallery/jotredi_.png",
    name: "Picture by jotredi_"
  },
  {
    src: "https://kryeit.com/images/gallery/Metalli70.png",
    name: "Picture by Metalli70"
  },
  {
    src: "https://kryeit.com/images/gallery/Seisonicon.png",
    name: "Picture by Seisonicon"
  },
  {
    src: "https://kryeit.com/images/gallery/Do_you_know_wae.png",
    name: "Picture by Do_you_know_wae"
  },
  {
    src: "https://kryeit.com/images/gallery/verdeen_.png",
    name: "Picture by verdeen_"
  },
  {
    src: "https://kryeit.com/images/gallery/Phostt.png",
    name: "Picture by Phostt"
  },
  {
    src: "https://kryeit.com/images/gallery/LKnotOK.png",
    name: "Picture by LKnotOK"
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

  <h2 id="gallery" class="section-title">Gallery</h2>

  <hr class="separator">

  <Slideshow :images="images"/>

  <h2 id="how-to-join" class="section-title">How to join</h2>

  <hr class="separator">

  <HowToJoin/>

  <h2 id="trailer" class="section-title">Trailer</h2>

  <hr class="separator">

  <VideoPlayer :src="Kryeitrailer"/>

  <hr>

  <h2 class="minecraft-disclaimer">
    NOT AN OFFICIAL MINECRAFT SERVICE. NOT APPROVED BY OR ASSOCIATED WITH MOJANG OR MICROSOFT.
  </h2>
</template>

<style scoped>
.separator {
  margin-bottom: 16px;
}

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
</style>