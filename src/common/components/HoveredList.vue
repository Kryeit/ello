<script setup>
import {inject, ref} from 'vue';
import { useStore } from 'vuex';
import router from "@/router/index.js";

const showList = ref(false);
const toggleNav = inject('toggleNav');

function actionOne() {
  router.push('/leaderboard');
  toggleNav();
}

function actionTwo() {
  console.log("Action Two triggered");
}

function actionThree() {
  console.log("Action Three triggered");
}
</script>

<template>
  <div @mouseleave="showList = false" style="position: relative;">
    <button @mouseover="showList = true">Hover me</button>
    <div v-show="showList" class="button-list">
      <div>
        <button @click="actionOne">Leaderboard</button>
      </div>
      <div>
        <button @click="actionTwo">Action Two</button>
      </div>
      <div>
        <button @click="actionThree">Action Three</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.button-list {
  flex-direction: column;
  position: absolute;
  top: 100%;
}
</style>