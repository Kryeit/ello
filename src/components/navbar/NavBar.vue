<script setup>
import {onMounted, ref} from 'vue';
import NavSections from '@/components/navbar/NavSections.vue';
import Footer from '@/components/navbar/components/Footer.vue';
import {useRouter} from 'vue-router';

import iconPath from '@/assets/kryeit/icon.png';
import hoverIconPath from '@/assets/kryeit/lifted_icon.png';
import ProfileDropdown from "@/components/navbar/components/ProfileDropdown.vue";

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

function preloadImages(...urls) {
  urls.forEach(url => {
    const img = new Image();
    img.src = url;
  });
}

onMounted(() => {
  preloadImages(iconPath, hoverIconPath);
});

</script>


<template>
  <body v-if="showNav" class="fullscreen-nav">

  <header class="header">
    <div class="header-content">
      <div>
        <img :src="iconSource" @mouseover="handleMouseOver" @mouseleave="handleMouseLeave" @click="sendToMainPage"
             alt=""/>
        <div class="social-media">
          <a href="https://discord.gg/njGh5UUU4d" target="_blank" rel="noopener noreferrer">
            <DiscordLogo class="logo"/>
          </a>
        </div>
      </div>
      <ProfileDropdown class="profile-dropdown"/>
    </div>
  </header>

  <NavSections/>

  <Footer/>

  </body>
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
  z-index: 1000;
}

.header {
  width: 100%;
  border-bottom: 5px solid var(--color-border);
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--color-text);
  width: 100%;
  padding: 10px 30px;
  min-height: 105px;
}

.header-content > div {
  display: flex;
  align-items: center;
}

.profile-dropdown {
  cursor: pointer;
}

.header-content img {
  width: 85px;
  height: auto;
  cursor: pointer;
}

.social-media a {
  cursor: pointer;
  color: var(--color-background);

}

.logo {
  width: 50px;
  height: 50px;
  color: var(--color-background);
  align-items: center;
  margin-left: 8px;

}

.logo:hover {
  transform: scale(1.05);
}
</style>
