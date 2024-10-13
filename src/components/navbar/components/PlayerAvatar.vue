<script setup>
import store from "@/js/auth/store.js";
import {computed} from "vue";

const props = defineProps({
  playerName: String,
});

const computedPlayerName = computed(() => {
  return props.playerName || 'Steve';
});
</script>

<template>
  <div v-bind="$attrs" class="player-head-container">
    <img class="player-image" :src="`/api/players/${computedPlayerName}/head`" alt="Player Head">
    <div class="shadow"></div>
  </div>
</template>

<style scoped>
.player-head-container {
  position: relative;
  width: 46px;
  height: 46px;
}

.player-image {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 41px;
  height: 41px;
  border-radius: 17px;
  z-index: 2;
}

.shadow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 46px;
  height: 46px;
  border-radius: 20px;
  background-color: darkslategrey;
  transition: background-color 0.3s ease;
  z-index: 1;
}

.player-head-container[aria-expanded="true"] .shadow {
  background-color: green;
}
</style>