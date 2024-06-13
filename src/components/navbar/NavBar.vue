<script setup>
import {ref} from 'vue';
import NavSections from '@/components/navbar/NavSections.vue';
import Footer from '@/components/navbar/components/Footer.vue';
import HoveredList from "@/components/navbar/components/HoveredList.vue";
import {useRouter} from 'vue-router';

import iconPath from '@/assets/kryeit/icon.png';
import hoverIconPath from '@/assets/kryeit/lifted_icon.png';

const iconSource = ref(iconPath);
const hoverIconSource = hoverIconPath;
const router = useRouter();

defineProps({
  showNav: Boolean
});

function handleMouseOver() {
  iconSource.value = hoverIconSource;
}

function handleMouseLeave() {
  iconSource.value = iconPath;
}

function sendToMainPage() {
  handleMouseLeave();
  router.push('/home');
}
</script>


<template>
  <div>
    <body v-if="showNav" class="fullscreen-nav">

    <header class="header">
      <div class="header-content">
        <img :src="iconSource" @mouseover="handleMouseOver" @mouseleave="handleMouseLeave" @click="sendToMainPage"
             alt=""/>
        <HoveredList/>
      </div>
    </header>

    <NavSections/>

    <Footer/>

    </body>

  </div>
</template>


<style scoped>
.fullscreen-nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  z-index: 1000;
  box-sizing: border-box;
  overflow: hidden;
}

.header {
  display: grid;
  place-items: center;
  width: 100%;
  padding: 0 5rem 1.5rem;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--primary-brass-gold);
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
}

.header-content img {
  margin-right: 20px;
  width: 85px;
  height: auto;
  cursor: pointer;
}

.header-content::before {
  content: '';
  display: block;
  width: 10%;
}

.button-list button:hover {
  background-color: #0056b3;
}

@media (max-width: 600px) {
  .header {
    padding-left: 0;
    padding-right: 0;
    width: 100%;
  }

  .header-content {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
}

</style>
