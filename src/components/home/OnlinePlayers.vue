<template>
  <div class="server-status">
    <div class="overlay"></div>
    <img class="icon" src="/src/assets/kryeit/gears.png" alt="Server Icon" />
    <div class="details">
      <h1>Minecraft Server</h1>
      <h2>Kryeit</h2>
      <h3>
        <span class="create-mod">Create mod</span>
        <span class="survival">survival</span>
      </h3>
    </div>
    <div class="player-info">
      <div
          class="player-count"
          @mouseover="showPlayerList"
          @mouseleave="hidePlayerList"
      >
        <span>{{ onlineCount }}/18</span>
        <a href="https://status.kryeit.com" target="_blank">
          <img class="bars" src="/src/assets/minecraft/bars.png" alt="Bars" />
        </a>
        <div class="player-list" v-show="hovered" ref="playerList">
          <p
              v-for="(player, index) in displayedPlayers"
              :key="index"
              :class="{ afk: player.afk }"
          >
            <img class="player-image" :src="`/api/players/${player.playerName}/head`" alt=""/>
            <a :href="`/@${player.playerName}`" class="player-link">{{ player.playerName }}</a>
          </p>
          <p v-if="remainingCount > 0">...and {{ remainingCount }} more</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {computed, ref} from 'vue';
import ReconnectingWebSocket from "reconnecting-websocket";

const onlinePlayers = ref([]);
const onlineCount = computed(() => {
  return onlinePlayers.value.length;
});
const displayedPlayers = computed(() => {
  return onlinePlayers.value.slice(0, 10);
});
const remainingCount = computed(() => {
  return onlinePlayers.value.length - displayedPlayers.value.length;
});

const hovered = ref(false);

const websocket = new ReconnectingWebSocket("wss://kryeit.com/api/live");
websocket.addEventListener("message", event => {
  onlinePlayers.value = JSON.parse(event.data);
});

const showPlayerList = () => {
  hovered.value = true;
};

const hidePlayerList = () => {
  hovered.value = false;
};
</script>



<style scoped>
.server-status {
  position: relative;
  display: flex;
  align-items: flex-start;
  background-image: url('/src/assets/minecraft/dirt.png');
  background-size: 100px 100px;
  background-repeat: repeat;
  padding: 10px;
  border-radius: 8px;
  overflow: visible;
  margin: 0 10px;
  image-rendering: pixelated;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  z-index: 0;
  pointer-events: none;
}

.icon {
  width: 100px;
  height: 100px;
  margin-right: 10px;
  z-index: 1;
  image-rendering: pixelated;
}

.details {
  color: var(--vt-c-white);
  flex-grow: 1;
  z-index: 1;
}

h1,
h2,
h3 {
  margin: 0;
  z-index: 1;
}

h1 {
  font-size: 1.2em;
}

h2 {
  color: orange;
}

h3 {
  display: flex;
  align-items: center;
}

.create-mod {
  white-space: nowrap;
  color: var(--vt-c-white);
}

.survival {
  color: gray;
  margin-left: 1ch;
}

.player-info {
  display: flex;
  align-items: flex-start;
  z-index: 1;
  position: relative;
}

.player-count {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  cursor: pointer;
  position: relative;
  z-index: 2;
}

.player-count span {
  margin-right: 5px;
  color: white;
}

.bars {
  height: 18px;
  image-rendering: pixelated;
}

.player-list {
  background-color: rgba(0, 0, 0, 0.8);
  padding: 10px;
  border-radius: 8px;
  color: white;
  position: absolute;
  top: 100%;
  left: 0;
  white-space: nowrap;
  z-index: 3;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  transform-origin: top left;
  transform: translateX(-75%);
}

.player-list p {
  margin: 0;
}

.player-image {
  width: 20px;
  height: 20px;
  margin-right: 5px;
  image-rendering: pixelated;
}

a.player-link {
  color: inherit;
  text-decoration: none;
}

a.player-link:hover {
  text-decoration: none;
  color: inherit;
}

.afk {
  color: var(--color-text);
}

@media (max-width: 600px) {
  .server-status {
    padding: 5px;
    background-size: 50px 50px;
  }

  .icon {
    width: 50px;
    height: 50px;
  }

  .bars {
    height: 1em;
  }

  .details {
    flex-grow: 1;
    padding-right: 10px;
  }

  h1, h2, h3 {
    font-size: 0.7em;
  }

  .player-count {
    font-size: 0.7em;
  }
}


</style>
