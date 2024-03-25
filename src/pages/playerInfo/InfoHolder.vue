<script setup>
import {ref} from "vue";
import {formatDate, ordinal} from "@/utils.js";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

const {playerName} = defineProps(["player-name"]);

const data = ref();
const error = ref(false);

fetch(`/api/players/${playerName}`).then(res => res.json())
    .catch(() => error.value = true)
    .then(json => {
      data.value = json;
    })
</script>

<template>
  <div class="wrapper">
    <div v-if="error">
      <h1 class="error">Not found</h1>
    </div>
    <div v-else-if="data" class="data-wrapper">
      <h1>{{ playerName }}</h1>

      <h2>Status:</h2>
      <div class="info-wrapper">
        <div class="status-wrapper">
          <div class="status" :style="{background: data.online && !data.banStatus ? 'var(--green)' : 'var(--red)'}"></div>
          <h3 v-if="data.banStatus">Banned
            <router-link to="/bans">All bans...</router-link>
          </h3>
          <h3 v-else>{{ data.online ? "Online" : "Offline" }}</h3>
        </div>
        <h3 v-if="!data.online">Last Seen: {{ formatDate(data.lastSeen) }}
          <br>
          ({{ Math.round((new Date() - data.lastSeen) / (1000 * 60 * 60 * 24)) }} days ago)</h3>
      </div>

      <h2>Playtime</h2>
      <div class="info-wrapper">
        <h3 class="info">
          {{ Math.floor(data.playtime / 3600) }} hours ({{ ordinal(data.rank) }} place)
        </h3>
      </div>

      <div v-if="data.totalClaimBlocks">
        <h2>Total Claimblocks</h2>
        <div class="info-wrapper">
          <h3>{{ data.totalClaimBlocks }} blocks</h3>
        </div>
      </div>
    </div>
    <LoadingSpinner v-else></LoadingSpinner>
    <img :hidden="!data" :src="`/api/players/${playerName}/skin`" alt=""/>
  </div>
</template>

<style scoped>
h1 {
  font-size: 26px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.data-wrapper {
  overflow: hidden;
}

.wrapper {
  display: flex;
  flex-direction: row;
  border: 1px solid var(--vt-c-divider-dark-1);
  background: var(--vt-c-black-soft);
  padding: 10px;
  border-radius: 10px;
  max-width: 600px;
  min-height: 150px;
}

.status {
  display: block;
  height: 20px;
  width: 20px;
  float: left;
  border-radius: 100%;
  margin-right: 7px;
  font-weight: normal;
}

.status-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.info-wrapper {
  margin-left: 10px;
}

img {
  margin-left: auto;
  border-radius: 10px;
  width: 100px;
  height: 100px;
}

a {
  color: cornflowerblue;
  text-decoration: underline;
  cursor: pointer;
}

.error {
  color: var(--red);
}

@media screen and (min-width: 500px) {
  img {
    width: 150px;
    height: 150px;
  }
}
</style>