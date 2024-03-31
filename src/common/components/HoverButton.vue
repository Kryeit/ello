<template>
  <div class="player-card" @mouseover="hover = true" @mouseleave="hover = false">
    <div class="player-image">
      <img :src="`/api/players/${playerName}/head`" alt="Player Head">
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
}

.player-image {
  position: relative;
  width: 50px;
  height: 50px;
  margin-right: 10px;
  border-radius: 25%; /* Adjust this value to change the border radius of the image */
  overflow: hidden;
}

.player-image::before {
  content: "";
  position: absolute;
  top: -5px;
  left: -5px;
  width: calc(100% + 10px);
  height: calc(100% + 10px);
  border-radius: 25%; /* Adjust this value to change the border radius of the circumference/square */
  border: 5px solid gray; /* Adjust this value to change the color and width of the circumference/square */
  transition: border-color 0.3s ease;
}

.player-card:hover .player-image::before {
  border-color: green; /* Change the color of the circumference/square to green when the .player-card is hovered */
}

.player-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.player-name {
  font-size: 1.2rem;
  color: #333;
}
</style>