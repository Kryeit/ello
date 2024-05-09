<script setup>
import {computed, ref} from "vue";

const onlinePlayers = ref([]);
const onlineCount = computed(() => {
  return onlinePlayers.value.filter(p => !p.afk).length;
});

fetch("/api/online").then(r => r.json()).then(json => {
  onlinePlayers.value = json;
});
</script>

<template>
  <h1>There are {{ onlineCount }} players online</h1>
  <h2 v-for="player in onlinePlayers" :class="{afk: player.afk}">- {{ player.playerName }}</h2>
</template>

<style scoped>
h2 {
  color: var(--vt-c-white);
}

.afk {
  color: var(--color-text);
}
</style>