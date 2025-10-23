<script setup>
import {useRoute, useRouter} from "vue-router";
import InfoHolder from "@/pages/playerInfo/InfoHolder.vue";
import Searchbar from "@/components/Searchbar.vue";
import {ref} from "vue";

const route = useRoute();
const router = useRouter();
const playerName = ref(route.params.playerName);
const playerId = ref(null);

if (playerName.value) {
  fetch(`/api/players?query=${encodeURIComponent(playerName.value)}&exact=true`).then(r => r.json().then(p => {
    if (p.length > 0) {
      playerId.value = p[0].uuid;
      playerName.value = p[0].name;
    }
  }));
}

function showInfo(player) {
  playerName.value = player.name;
  playerId.value = player.uuid;
  router.push("/@" + player.name);
}

async function search(query) {
  if (query === "") {
    const response = await fetch(`/api/leaderboard?limit=5&key=minecraft:play_time`);
    return (await response.json());
  } else {
    const response = await fetch(`/api/players?query=${encodeURIComponent(query)}`);
    return await response.json();
  }
}
</script>

<template>
  <h1>{{ playerName }}</h1>
  <h2>Information</h2>
  <Searchbar class="searchbar" :search-fn="search" option-label="name" @result-selected="showInfo"></Searchbar>

  <InfoHolder v-if="playerId" :key="playerName" :player="playerId"></InfoHolder>

</template>

<style scoped>
.searchbar {
  max-width: 600px;
  margin-bottom: 10px;
}

h1 {
  font-size: 40px;
  color: var(--color-text);
}
</style>