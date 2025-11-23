<script setup>
import {ref} from 'vue';
import NavBar from './components/navbar/NavBar.vue';
import {useRouter} from "vue-router";
import ToastManager from "@/components/toast/ToastManager.vue";
import LoginModal from "@/components/auth/LoginModal.vue";
import authService from "@/js/auth/authService.js";

const isNavVisible = ref(false);

function toggleNav() {
  isNavVisible.value = !isNavVisible.value;
}

useRouter().afterEach(() => {
  isNavVisible.value = false;
});

window.addEventListener('scroll', doParallax);

function doParallax() {
  const positionY = window.scrollY / 7;
  document.body.style.backgroundPositionY = -positionY + "px";
}

function resizeBackgroundImage() {
  document.body.style.backgroundSize = (document.body.clientHeight * 1.913 + document.body.clientHeight * 1.913 / 7) + "px";
}

window.onresize = resizeBackgroundImage;
resizeBackgroundImage();
</script>

<template>
  <div>
    <div>
      <ToastManager/>
      <img :class="{ 'cog-toggler': true, rotated: isNavVisible }" @click="toggleNav"
           src="/src/assets/kryeit/zoomed_icon.webp" alt="Menu"/>
      <NavBar :showNav="isNavVisible"/>

      <LoginModal v-model:shown="authService.loginShown.value"/>
    </div>

    <div style="backdrop-filter: blur(4px) saturate(200%) brightness(20%) hue-rotate(-10deg);">
      <div class="main">
        <router-view>
        </router-view>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main {
  max-width: 1280px;
  font-weight: normal;
  margin: 0 auto;
  padding: 20px 75px; /* Cog icon margin */
  min-height: 100vh;
}

@media (max-width: 1024px) {
  .main {
    padding: 0 10px 75px 10px; /* Cog icon margin in vertical devices */
  }
}

.cog-toggler {
  -webkit-user-select: none; /* Chrome, Safari, and Opera */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently supported by most modern browsers */
  -webkit-tap-highlight-color: transparent; /* Remove tap highlight color on mobile for WebKit (Chrome, Safari) */
  position: fixed;
  top: 50%;
  left: 0;
  transform: translateX(-50%) translateY(-50%);
  z-index: 1010;
  color: white;
  cursor: pointer;
  width: 10vw;
  border-radius: 100%;
  transition: transform 0.6s ease-in-out;
}

.cog-toggler.rotated {
  transform: translateX(-50%) translateY(-50%) rotate(90deg);
}

.cog-toggler:focus {
  outline: none;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(90deg);
  }
}

@media (max-width: 1024px) {
  .cog-toggler {
    top: calc(100% - env(safe-area-inset-bottom));
    left: 50%;
    width: 150px;
    height: 150px;
  }

}
</style>
