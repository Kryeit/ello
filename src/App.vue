<script setup>
import {ref} from 'vue';
import NavBar from './components/navbar/NavBar.vue';
import {useRouter} from "vue-router";
import ToastManager from "@/components/toast/ToastManager.vue";

const isNavVisible = ref(false);

function toggleNav() {
  isNavVisible.value = !isNavVisible.value;
}

useRouter().afterEach(() => {
  isNavVisible.value = false;
});
</script>

<template>
  <ToastManager />
  <img :class="{ 'toggle-btn': true, rotated: isNavVisible }" @click="toggleNav" src="/src/assets/kryeit/zoomed_icon.png" alt="Menu"/>
  <NavBar :showNav="isNavVisible"/>

  <router-view>
  </router-view>

</template>

<style scoped>

.toggle-btn {
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
  transition: transform 0.4s ease-in-out;
}

.toggle-btn.rotated {
  transform: translateX(-50%) translateY(-50%) rotate(90deg);
}

.toggle-btn:focus {
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

@media (max-width: 600px) {
  .toggle-btn {
    top: min(100%, 100% - env(safe-area-inset-bottom)); /* In case a browser/app adds a bottom nav bar too */
    left: 50%;
    width: 150px;
    height: 150px;
  }
}
</style>
