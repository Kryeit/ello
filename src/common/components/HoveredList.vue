<script setup>
import {computed, ref} from 'vue';
import router from "@/router/index.js";
import HoverButton from "@/common/components/HoverButton.vue";


const playerName = ref('');
const showList = ref(false);

const displayPlayerName = computed(() => playerName.value || "MuriPlz");

function actionOne() {
  router.push('/leaderboard').then(() => location.reload());
}

function actionTwo() {
  router.push(`/@${displayPlayerName.value}`).then(() => location.reload());
}

function actionThree() {
  router.push('/bans').then(() => location.reload());
}
</script>

<template>
  <div class="hovered-list" @mouseleave="showList = false">
    <HoverButton @mouseover="showList = true" :player-name="displayPlayerName"></HoverButton>
    <div v-show="showList" class="button-list">
      <button @click="actionOne" class="button">
        <a class="button-text">Leaderboard</a>
      </button>
      <button @click="actionTwo" class="button">
        <a class="button-text">Playerinfo</a>
      </button>
      <button @click="actionThree" class="button">
        <a class="button-text">Bans</a>
      </button>
    </div>
  </div>
</template>

<style scoped>
.hovered-list {
  position: relative;
}

.button-list {
  flex-direction: column;
  position: absolute;
  top: 100%;
  width: 100%;
}

.button {
  background-color: #ccc;
  border-radius: 8px;
  padding: 10px;
  transition: transform 0.1s, background-color 0.08s;
  width: 100%;
  cursor: pointer;
}

.button:hover {
  background-color: #e0e0e0;
  transform: scale(1.01);
}

.button-text {
  color: black;
  user-select: none;
}
</style>