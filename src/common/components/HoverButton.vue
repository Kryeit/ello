<template>
  <div class="player-card" @mouseover="hover = true" @mouseleave="hover = false">
    <div class="player-image">
      <img :src="`/api/players/${playerName}/head`" alt="Player Head">
      <div class="player-shadow"></div>
    </div>
    <div class="player-name">{{ playerName }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const {playerName} = defineProps(["player-name"]);
const hover = ref(false);
</script>

<style scoped>
.player-card {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background-color: var(--dark-brass-gold);
  border-radius: 10px;
  transition: background-color 0.7s ease;
}

.player-card:hover {
  filter: brightness(105%);
  cursor: pointer;
}

.player-image {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 50px;
  height: 50px;
  margin-right: 10px;
  border-radius: 25%;
  overflow: hidden;
}

.player-image img, .player-shadow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 80%;
  border-radius: 40%;
}

.player-image img {
  z-index: 3;
}

.player-shadow {
  z-index: 2;
  border: 24px solid black;
}

.player-card:hover .player-shadow {
  border-color: green;
}

.player-name {
  font-size: 1.2rem;
  color: black;
  font-weight: bold;
}
</style>