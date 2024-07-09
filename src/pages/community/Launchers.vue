<template>
  <h1>Launchers</h1>
  <div v-for="(launcher, index) in launchers" :key="index" class="launcher">
    <a :href="launcher.link" target="_blank">
      <h2>{{ launcher.name }}</h2>
      <p>{{ launcher.description }}</p>
    </a>
  </div>
</template>

<script setup>
import {ref} from 'vue';

const launchers = ref([
  { name: 'Modrinth App', description: 'A modern look alongside a worldclass launcher! Smooth and useful, our suggested choice.', link: 'https://modrinth.com/app' },
  { name: 'Prism', description: 'Allows managing multiple instances of Minecraft, supports importing and exporting of instances for easy backup and sharing of game setups.', link: 'https://prismlauncher.org' },
]);
</script>

<style scoped>
h1 {
  margin-bottom: 20px;
  text-align: center;
  margin-top: 20px;
  font-size: 52px;
}

.launcher {
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  transition: transform 0.3s ease-in-out;
}

.launcher:hover {
  transform: scale(1.01);
}

.launcher a {
  color: inherit;
  text-decoration: none;
}

.launcher h2 {
  margin-bottom: 10px;
}
</style>