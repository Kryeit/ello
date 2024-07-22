<script setup>
import store from "@/javascript/auth/store.js";

const props = defineProps({
  playerName: String,
  areaExpanded: Boolean,
});
</script>

<template>
  <div v-bind="$attrs" class="player-head-container">
    <img v-if="store.user.isLoggedIn" class="player-image" :src="`/api/players/${playerName}/head`" alt="Player Head">
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
  border-radius: 45%;
  z-index: 2;
}

.shadow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 46px;
  height: 46px;
  border-radius: 45%;
  background-color: gray;
  transition: background-color 0.3s ease;
  z-index: 1;
}

.player-head-container[aria-expanded="true"] .shadow {
  background-color: green;
}
</style>