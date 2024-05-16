<template>
  <div class="server-status">
    <div class="overlay"></div>
    <img class="icon" src="/src/assets/gears.png" alt="Server Icon" />
    <div class="details">
      <h1>Minecraft Server</h1>
      <h2>Kryeit</h2>
      <h3>
        <span class="create-mod">Create mod</span>
        <span class="survival">survival</span>
        <span class="version">(1.20.1)</span>
      </h3>
    </div>
    <div class="player-info">
      <div
          class="player-count"
          @mouseover="showPlayerList"
          @mouseleave="hidePlayerList"
      >
        <span>{{ onlineCount }}/18</span>
        <img class="bars" src="/src/assets/bars.png" alt="Bars" />
        <div class="player-list" v-show="hovered" ref="playerList">
          <p
              v-for="(player, index) in displayedPlayers"
              :key="index"
              :class="{ afk: player.afk }"
          >
            {{ player.playerName }}
          </p>
          <p v-if="remainingCount > 0">...and {{ remainingCount }} more</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, nextTick } from 'vue';
import ReconnectingWebSocket from "reconnecting-websocket";

const onlinePlayers = ref([]);
const onlineCount = computed(() => {
  return onlinePlayers.value.filter((p) => !p.afk).length;
});
const displayedPlayers = computed(() => {
  return onlinePlayers.value.slice(0, 10);
});
const remainingCount = computed(() => {
  return onlinePlayers.value.length - displayedPlayers.value.length;
});

const hovered = ref(false);
const playerList = ref(null);

const websocket = new ReconnectingWebSocket("wss://kryeit.com/api/live");
websocket.addEventListener("message", event => {
  onlinePlayers.value = JSON.parse(event.data);
});

const showPlayerList = () => {
  hovered.value = true;
  adjustPlayerListPosition();
};

const hidePlayerList = () => {
  hovered.value = false;
};

const adjustPlayerListPosition = () => {
  nextTick(() => {
    if (playerList.value) {
      const rect = playerList.value.getBoundingClientRect();
      playerList.value.style.left = (rect.right > window.innerWidth) ? 'auto' : '0';
      playerList.value.style.right = (rect.right > window.innerWidth) ? '0' : 'auto';
    }
  });
};

onMounted(() => {
  window.addEventListener('resize', adjustPlayerListPosition);
});
</script>



<style scoped>
.server-status {
  position: relative;
  display: flex;
  align-items: flex-start; /* Align items at the top */
  background-image: url('/src/assets/dirt.png');
  background-size: 100px 100px; /* Increase the size of the mosaic texture */
  padding: 10px;
  border-radius: 8px;
  overflow: visible;
  margin: 0 4rem;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
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
  color: var(--vt-c-white);
}

.survival {
  color: gray;
  margin: 0 5px;
}

.version {
  color: lightblue;
}

.player-info {
  display: flex;
  align-items: flex-start;
  z-index: 1;
  position: relative;
}

.player-count {
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Align items to the top left */
  margin-left: 20px;
  cursor: pointer;
  position: relative;
  z-index: 2;
}

.player-count span {
  margin-right: 5px;
  color: white;
}

.bars {
  width: 20px;
  height: 20px;
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
}

.player-list p {
  margin: 0;
}

.afk {
  color: var(--color-text);
}
</style>
