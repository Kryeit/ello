<script setup>
import {computed, ref} from 'vue';
import router from "@/router/index.js";
import HoverButton from "@/common/components/HoverButton.vue";


const playerName = ref('');
const showList = ref(false);

const displayPlayerName = computed(() => playerName.value || "Dinnerbone");

function actionOne() {
  router.push('/leaderboard');
}

function actionTwo() {
  router.push(`/@${displayPlayerName.value}`);
}

function actionThree() {
  //router.push('/bans');
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


.main-button {
  background-color: var(--primary-brass-gold);
  filter: brightness(89%);
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: block;
  border-radius: 15px;
  width: 100%;
  box-sizing: border-box;
  transition: transform 0.1s, background-color 0.05s;
  cursor: pointer;
  margin-bottom: 7px;
  min-width: max-content;
}

.main-button:last-child {
  margin-bottom: 0;
}

.main-button:hover {
  filter: brightness(105%);
  transform: scale(1.01);
}
</style>