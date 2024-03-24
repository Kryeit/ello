<script setup>
import {useRoute} from "vue-router";
import InfoHolder from "@/pages/playerInfo/InfoHolder.vue";
import Searchbar from "@/components/Searchbar.vue";
import {ref} from "vue";

const route = useRoute();
const playerName = ref(route.params.playerName);

function showInfo(newName) {
  playerName.value = newName;
  history.replaceState(history.state, "", "/player/" + newName);
}
</script>

<template>
  <Searchbar class="searchbar" endpoint="/api/players" @result-selected="showInfo"></Searchbar>

  <InfoHolder :key="playerName" :player-name="playerName"></InfoHolder>
</template>

<style scoped>
.searchbar {
  max-width: 600px;
  margin-bottom: 10px;
}
</style>