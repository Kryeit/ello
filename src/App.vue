<template>
  <div id="app">
    <img :class="{ 'toggle-btn': true, rotated: isRotated }" @click="toggleNav" src="/icon.png" alt="Menu" />
    <NavBar :showNav="isNavVisible" />
  </div>
  <div id="banner">
    <img alt="Kryeit banner" src="https://kryeit.com/images/banner.png" :style="bannerStyle" />
  </div>
</template>

<script setup>
import {ref} from 'vue';
import NavBar from './common/NavBar.vue';

const isNavVisible = ref(false);
const isRotated = ref(false);

function toggleNav() {
  isNavVisible.value = !isNavVisible.value;
  isRotated.value = !isRotated.value;
}

const bannerStyle = ref({
  position: 'absolute',
  top: '10%',
  left: '50%',
  transform: 'translateX(-50%)',
  width: '50vw', // 50% of viewport width
  height: 'auto' // auto adjust the height to maintain aspect ratio
});
</script>

<style>
#app {
  text-align: center;
  height: 100vh;
  position: relative;
}

.toggle-btn {
  position: fixed;
  top: 50%;
  left: 0;
  transform: translateX(-50%) translateY(-50%);
  z-index: 1010;
  color: white;
  cursor: pointer;
  width: 15vw;
  transition: transform 0.3s ease-in-out; /* Add this line */
}

.toggle-btn.rotated {
  transform: translateX(-50%) translateY(-50%) rotate(180deg); /* Add this line */
}

.toggle-btn:focus {
  outline: none;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(180deg);
  }
}
</style>
