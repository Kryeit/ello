<script setup>
import {computed} from 'vue';
import Store from "@/js/auth/store.js";

const props = defineProps({
  playerName: String,
});

const computedPlayerName = computed(() => {
  if (!Store.getUser() || !props.playerName) {
    return new URL('@/assets/minecraft/steve.png', import.meta.url).href;
  }
  return `/api/players/${props.playerName}/head`;
});
</script>

<template>
  <div v-bind="$attrs" class="player-head-container">
    <img class="player-image" :src="computedPlayerName" alt="Player Head" draggable="false">
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
  image-rendering: pixelated; /* For browsers that support it */
  image-rendering: crisp-edges; /* Safari fallback */
  user-select: none;
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