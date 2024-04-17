<script setup>
import {computed, ref} from 'vue';
import router from "@/router/index.js";
import HoverButton from "@/common/components/HoverButton.vue";


const playerName = ref('');
const showList = ref(false);

const displayPlayerName = computed(() => playerName.value || "_DinnerBone");

function actionOne() {
  router.push('/leaderboard').then(() => location.reload());
}

function actionTwo() {
  router.push(`/@${displayPlayerName.value}`).then(() => location.reload());
}

function actionThree() {
  //router.push('/bans').then(() => location.reload());
}
</script>

<template>
  <div class="hovered-list" @mouseleave="showList = false">
    <HoverButton :style="{ 'border-bottom-left-radius': showList ? '0' : '10px', 'border-bottom-right-radius': showList ? '0' : '10px' }" @mouseover="showList = true" :player-name="displayPlayerName"></HoverButton>
    <div v-show="showList" class="button-list">

      <button @click="actionOne" class="main-button">
        <a class="button-text">Leaderboard</a>
      </button>
      <button @click="actionTwo" class="main-button">
        <a class="button-text">Playerinfo</a>
      </button>

      <button @click="actionThree" class="main-button">
        <a class="button-text">Settings</a>
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
  padding: 1rem;
  background-color: var(--dark-brass-gold);
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border-top-right-radius: 10px;
  gap: 10px;
}

.button-text {
  color: black;
  user-select: none;
  font-weight: bold;
  font-family: 'Minecraftia', sans-serif;
}
</style>