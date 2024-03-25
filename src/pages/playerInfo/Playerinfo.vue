<script setup>
import {useRoute, useRouter} from "vue-router";
import InfoHolder from "@/pages/playerInfo/InfoHolder.vue";
import Searchbar from "@/components/Searchbar.vue";
import {ref} from "vue";

const route = useRoute();
const router = useRouter();
const playerName = ref(route.params.playerName);

function showInfo(newName) {
  playerName.value = newName;
  router.push("/players/" + newName);
}

async function search(query) {
  if (query === "") {
    const response = await fetch(`/api/leaderboard?limit=5&sort-direction=DESC`);
    return (await response.json()).leaderboard.map(e => e.name);
  } else {
    const response = await fetch(`/api/players?query=${encodeURIComponent(query)}`);
    return await response.json();
  }
}
</script>

<template>
  <h1>Playerinfo</h1>
  <Searchbar class="searchbar" :search-fn="search" @result-selected="showInfo"></Searchbar>

  <InfoHolder v-if="playerName" :key="playerName" :player-name="playerName"></InfoHolder>
</template>

<style scoped>
.searchbar {
  max-width: 600px;
  margin-bottom: 10px;
}

h1 {
  font-size: 40px;
  color: var(--vt-c-white-mute);
}
</style>