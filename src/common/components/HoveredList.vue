<script setup>
import {ref} from 'vue';
import router from "@/router/index.js";

const showList = ref(false);

function actionOne() {
  router.push('/leaderboard').then(() => location.reload());
}

function actionTwo() {
  router.push('/@Notch').then(() => location.reload());
}

function actionThree() {
  router.push('/bans').then(() => location.reload());
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
        <button @click="actionTwo">Playerinfo</button>
      </div>
      <div>
        <button @click="actionThree">Bans</button>
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