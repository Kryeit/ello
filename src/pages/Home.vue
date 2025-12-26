<script setup>
import Slideshow from "@/components/Slideshow.vue";
import OnlinePlayers from "@/components/home/OnlinePlayers.vue";
import HowToJoin from "@/components/home/HowToJoin.vue";
import VideoPlayer from "@/components/VideoPlayer.vue";
import Kryeitrailer from "@/assets/media/Kryeitrailer.mp4";

import slideshowBest2b from "@/assets/slideshow/best2b.webp";
import slideshowRats from "@/assets/slideshow/rats.webp";
import slideshowTesseract from "@/assets/slideshow/tesseract.webp";
import slideshowMaxwell from "@/assets/slideshow/maxwell.webp";
import slideshowLknotok from "@/assets/slideshow/lknotok.webp";
import slideshowBerrysweet from "@/assets/slideshow/berrysweet.webp";
import slideshowEnzo from "@/assets/slideshow/enzo.webp";
import slideshowMayson from "@/assets/slideshow/mayson.webp";
import slideshowOctt from "@/assets/slideshow/octt.webp";
import slideshowRay from "@/assets/slideshow/ray.webp";
import slideshowKcnctc from "@/assets/slideshow/kcnctc.webp";
import slideshowQuales from "@/assets/slideshow/quales.webp";
import slideshowJotredi from "@/assets/slideshow/jotredi.webp";
import slideshowSeisonicon from "@/assets/slideshow/seisonicon.webp";
import slideshowVerdeen from "@/assets/slideshow/verdeen.webp";
import slideshowAureline from "@/assets/slideshow/aureline.webp";
import slideshowPhostt from "@/assets/slideshow/phostt.webp";
import slideshowOlimilo from "@/assets/slideshow/olimilo.webp";
import slideshowJerry from "@/assets/slideshow/jerry.webp";
import slideshowElzen from "@/assets/slideshow/elzen.webp";
import Separator from "@/components/Separator.vue";

const images = [
  {
    src: slideshowBest2b,
    name: "Best25",
    width: 800,
    height: 600
  },
  {
    src: slideshowRats,
    name: "RatsInATopHat",
    width: 800,
    height: 600
  },
  {
    src: slideshowTesseract,
    name: "__Tesseract",
    width: 800,
    height: 600
  },
  {
    src: slideshowMaxwell,
    name: "Maxwell_Western",
    width: 800,
    height: 600
  },
  {
    src: slideshowLknotok,
    name: "LKnotOK",
    width: 800,
    height: 600
  },
  {
    src: slideshowBerrysweet,
    name: "BerrySweet",
    width: 800,
    height: 600
  },
  {
    src: slideshowEnzo,
    name: "Enzoquest10",
    width: 800,
    height: 600
  },
  {
    src: slideshowMayson,
    name: "MaysonBean",
    width: 800,
    height: 600
  },
  {
    src: slideshowOctt,
    name: "OcttKing",
    width: 800,
    height: 600
  },
  {
    src: slideshowRay,
    name: "JustRay23",
    width: 800,
    height: 600
  },
  {
    src: slideshowKcnctc,
    name: "Kcnctc",
    width: 800,
    height: 600
  },
  {
    src: slideshowQuales,
    name: "Quales_",
    width: 800,
    height: 600
  },
  {
    src: slideshowJotredi,
    name: "jotredi_",
    width: 800,
    height: 600
  },
  {
    src: slideshowSeisonicon,
    name: "Seisonicon",
    width: 800,
    height: 600
  },
  {
    src: slideshowVerdeen,
    name: "verdeen_",
    width: 800,
    height: 600
  },
  {
    src: slideshowPhostt,
    name: "Phostt",
    width: 800,
    height: 600
  },
  {
    src: slideshowAureline,
    name: "goldnphoenix258",
    width: 800,
    height: 600
  },
  {
    src: slideshowPhostt,
    name: "Phostt",
    width: 800,
    height: 600
  },
  {
    src: slideshowOlimilo,
    name: "OlimilO1402",
    width: 800,
    height: 600
  },
  {
    src: slideshowJerry,
    name: "Jerry_Snow5038",
    width: 800,
    height: 600
  },
  {
    src: slideshowElzen,
    name: "ELZEN",
    width: 800,
    height: 600
},
]
</script>

<template>
  <div class="!mx-4">
    <div class="h-12"></div>
    <div class="flex flex-row justify-center">
      <img class="w-[calc(100vw-30px)] max-w-3xl" alt="Kryeit banner" src="@/assets/kryeit/banner-scaled.webp"/>
    </div>

    <h1 class="visually-hidden">Kryeit Home Page</h1>

    <h2 class="text-center py-8 text-4xl !text-gray-400">{{ $t("home.slogan") }}</h2>

    <OnlinePlayers class="online-players"/>

    <h3 class="text-2xl">
      {{ $t("home.description.1") }}
    </h3>
    <h3 class="text-2xl !mb-8">
      {{ $t("home.description.2") }}
    </h3>

    <h2 id="gallery" class="text-4xl !mb-4 font-bold text-center">
      {{ $t("home.gallery.title") }}
    </h2>

    <Separator/>
    <hr class="separator">

    <Slideshow :images="images" class="!mb-8"/>

    <h2 id="how-to-join" class="text-4xl !mb-4 font-bold text-center">
      {{ $t("home.how-to-join.title") }}
    </h2>

    <Separator/>
    <hr class="separator">

    <HowToJoin class="!mb-8"/>

    <h2 id="trailer" class="text-4xl !mb-4 font-bold text-center">Trailer</h2>

    <Separator/>
    <hr class="separator">

    <VideoPlayer :src="Kryeitrailer" :sound="0.7"/>

    <hr class="footer-separator">

    <h2 class="text-xs text-center">
      {{ $t("home.disclaimer") }}
    </h2>
  </div>
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

.section-title {
  text-align: center;
  padding-top: 20px;
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