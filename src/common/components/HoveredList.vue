<script setup>
import {computed, ref} from 'vue';
import router from "@/router/index.js";
import {useRoute} from "vue-router";
import InfoHolder from "@/pages/playerInfo/InfoHolder.vue";
import HoverButton from "@/common/components/HoverButton.vue";

const route = useRoute();

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
  <div @mouseleave="showList = false" style="position: relative;">
    <HoverButton @mouseover="showList = true" :player-name="displayPlayerName"></HoverButton>
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