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
  align-items: center;
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 10px;
  transition: background-color 0.3s ease;
}

.player-card:hover {
  background-color: #e0e0e0;
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

.player-image img {
  position: relative;
  z-index: 2;
  width: 90%;
  height: 90%;
  object-fit: cover;
  border-radius: 100%;
}

.player-shadow {
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 7px solid gray;
  border-radius: 100%;
}

.player-card:hover .player-shadow {
  border-color: forestgreen;
}

.player-name {
  font-size: 1.2rem;
  color: #333;
  font-weight: bold;
}
</style>