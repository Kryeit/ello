<template>
  <img :class="{ 'toggle-btn': true, rotated: isNavVisible }" @click="toggleNav" src="/src/assets/icon.png" alt="Menu"/>
  <NavBar :showNav="isNavVisible"/>

  <router-view>

  </router-view>
</template>

<script setup>
import {ref} from 'vue';
import NavBar from './common/NavBar.vue';
import {useRouter} from "vue-router";

const isNavVisible = ref(false);

function toggleNav() {
  isNavVisible.value = !isNavVisible.value;
}

useRouter().afterEach(() => {
  isNavVisible.value = false;
});
</script>

<style scoped>

.toggle-btn {
  position: fixed;
  top: 50%;
  left: 0;
  transform: translateX(-50%) translateY(-50%);
  z-index: 1010;
  color: white;
  cursor: pointer;
  width: 15vw;
  transition: transform 0.3s ease-in-out;
}

.toggle-btn.rotated {
  transform: translateX(-50%) translateY(-50%) rotate(180deg);
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
