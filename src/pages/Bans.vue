<script setup>

import {ref} from "vue";
import {formatDate} from "../utils.js";

const bans = ref();

fetch("/api/bans").then(res => res.json()).then(data => {
  bans.value = data;
})
</script>

<template>
  <div class="wrapper">
    <h1>Banned players</h1>
    <div class="ban" v-for="ban in bans">
      <div class="ban-content">
        <img :src="`/api/players/${ban.playerName}/head`" alt=""/>
        <div class="ban-details">
          <h1>{{ ban.playerName }}</h1>
          <h2><strong>Banned on:</strong> {{ formatDate(ban.creationDate) }}</h2>
          <h2><strong>Expires:</strong> {{ ban.expiryDate ? formatDate(ban.expiryDate) : "never" }}</h2>
          <h2><strong>Reason:</strong> {{ ban.reason }}</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ban strong {
  font-weight: bold;
  color: var(--color-text);
}

.ban {
  border-radius: 8px;
  border: 1px solid var(--vt-c-black-mute);
  margin-bottom: 10px;
  padding: 10px;
  background: var(--vt-c-black-soft);
}

.ban-content {
  display: flex;
}

.ban-details {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
}

.ban-content img {
  width: 12%;
  height: auto;
  object-fit: contain;
}

.ban h2 {
  color: var(--vt-c-white-mute);
  margin-left: 15px;
}

.ban h1 {
  color: var(--vt-c-white-mute);
  font-size: 25px;
}

h1 {
  font-size: 40px;
  color: var(--vt-c-white-mute);
}
</style>