<script setup>
import {ref} from 'vue';
import Title from '@/components/Title.vue';
import NavSections from '@/common/NavSections.vue';
import HoveredList from "@/common/components/HoveredList.vue";
import {useRouter} from 'vue-router';

import iconPath from '../assets/icon.png';
import treePath from '../assets/tree.png';
import hoverIconPath from '../assets/lifted_icon.png';

const iconSource = ref(iconPath);
const treeSource = ref(treePath);
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
        <Title msg="" style="color: black"/>
      </div>
    </header>

    <NavSections/>

    <div class="footer">
      <img :src="treeSource" alt=""/>
      <div class="footer-section">
        <p>Kryeit </p>
        <router-link to="/about">About us</router-link>
        <a href="https://status.kryeit.com" target="_blank">Status</a>
        <a href="https://kryeit.wiki.gg" target="_blank">Wiki</a>
      </div>

      <div class="footer-section">
        <p>Survival</p>
        <a href="https://map.kryeit.com" target="_blank">World Map</a>
        <a href="https://archive.kryeit.com" target="_blank">Archive</a>
      </div>

      <div class="footer-section">
        <p>Support</p>
        <router-link to="/bans">Bans</router-link>
        <router-link to="/faq">FAQ</router-link>
      </div>

      <div class="footer-section">
        <p>Contact</p>
        <a href="mailto:kryeit.minecraft@gmail.com">Email us</a>
      </div>

    </div>
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

.footer {
  bottom: 0;
  max-height: 17vh;
  width: auto;
  background-color: var(--primary-brass-gold);
  color: white;
  padding: 0.6rem;
  text-align: center;
  display: flex;
  justify-content: space-around;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  gap: 10px;
}

.footer-section {
  padding: 10px;
  flex-direction: column;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
}

.footer-section p {
  font-size: 13px;
  color: lightgray;
  margin-bottom: 7px;
}

.footer-section a {
  font-size: 11px;
  white-space: nowrap;
  color: lightblue;
  text-decoration: none;
}

.footer-section a:hover {
  text-decoration: underline;
  color: blue;
}

.footer img {
  max-height: 100%;
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

  .footer {
    padding-bottom: 150px;
    gap: 0;
  }

  .footer-section {
    padding: 4px;
  }
}

</style>
