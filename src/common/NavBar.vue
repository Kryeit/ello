<script setup>
import {defineProps, ref} from 'vue';
import Title from '@/components/Title.vue';
import NavSections from '@/common/NavSections.vue';
import HoveredList from "@/common/components/HoveredList.vue";
import { useRouter } from 'vue-router';

const iconSource = ref('/src/assets/icon.png');
const treeSource = ref('/src/assets/tree.png');
const hoverIconSource = '/src/assets/lifted_icon.png';
const router = useRouter();

defineProps({
  showNav: Boolean
});

function handleMouseOver() {
  iconSource.value = hoverIconSource;
}

function handleMouseLeave() {
  iconSource.value = '/src/assets/icon.png';
}

function sendToMainPage() {
  router.push('/home').then(() => location.reload());
}

</script>


<template>
  <div>
    <body v-if="showNav" class="fullscreen-nav">

      <header class="header-content">
        <div class="header">
          <img :src="iconSource" @mouseover="handleMouseOver" @mouseleave="handleMouseLeave" @click="sendToMainPage" alt=""/>
          <HoveredList class="hovered-list"/>
          <Title msg="" style="color: black"/>
        </div>
      </header>

      <NavSections />

      <div class="footer">
        <img :src="treeSource" alt=""/>
        <div class="footer-section">
          <p>Kryeit </p>
          <a href="/about">About us</a>
        </div>

        <div class="footer-section">
          <p>Survival</p>
          <a href="https://map.kryeit.com" target="_blank">World Map</a>
          <a href="https://archive.kryeit.com" target="_blank">Archive</a>
          <a href="https://status.kryeit.com" target="_blank">Status</a>
        </div>

        <div class="footer-section">
          <p>Support</p>
          <a href="/bans">Bans</a>
          <a href="/faq">FAQ</a>
        </div>

        <div class="footer-section">
          <p>Join!</p>
          <a href="/discord">Discord</a>
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

.header-content {
  display: grid;
  place-items: center;
  width: 100%;
  padding: 0 5rem 1.5rem;
}

.header {
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

.header img {
  margin-right: 20px;
  width: 85px;
  height: auto;
  cursor: pointer;
}

.hovered-list {
  padding-right: 20px;
}

.header::before {
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
  padding: 1rem;
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
}

.footer-section a {
  font-size: 11px;
}

.footer img {
  max-height: 100%;
}
</style>
