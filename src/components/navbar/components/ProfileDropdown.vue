<script setup>
import {computed, ref} from 'vue';
import {useRouter} from 'vue-router';
import {i18n} from "@/main.js";
import PlayerAvatar from "@/components/navbar/components/PlayerAvatar.vue";
import AuthService from "@/js/auth/authService.js";
import store from "@/js/auth/store.js";
import DropdownIcon from "@/assets/dropdown.svg?component";
import SettingsDropdown from "@/components/navbar/components/SettingsDropdown.vue";

const router = useRouter();
const menuVisible = ref(false);
const playerName = computed(() => store.username ? store.user.username : i18n.global.t("auth.login"));

function toggleMenu() {
  menuVisible.value = !menuVisible.value;
}
</script>

<template>
  <div class="profile-dropdown-wrapper">

    <div class="player-avatar-container" @click="toggleMenu">
      <PlayerAvatar :player-name="playerName" />
      <DropdownIcon class="dropdown-arrow" />
    </div>

    <div v-if="menuVisible" class="dropdown-menu-overlay">
      <router-link v-if="!store.getUser()" to="login" class="menu-item" tag="button">
        <span class="menu-item-title">{{ $t("auth.login") }}</span>
      </router-link>

      <div v-if="store.getUser()">
        <router-link :to="`/@${playerName}`" class="menu-item" tag="button">
          <span class="menu-item-title">@{{ playerName }}</span>
        </router-link>
      </div>

      <router-link to="leaderboard" class="menu-item" tag="button">
        <span class="menu-item-title">{{ $t("navbar.leaderboard") }}</span>
      </router-link>

      <SettingsDropdown />

      <router-link v-if="store.getUser()" to="" class="menu-item logout-button" @click="AuthService.logout()" tag="button">
        <span class="menu-item-title">{{ $t("auth.logout") }}</span>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.profile-dropdown-wrapper {
  position: relative;
}

.player-avatar-container {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
}

.dropdown-arrow {
  margin-left: 4px;
  font-size: 20px;
  color: black;
}

.dropdown-menu-overlay {
  position: absolute;
  top: 100%;
  left: -150%;
  z-index: 1000;
  background-color: var(--color-background);
  width: 200px;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  padding: 10px;
  align-items: center;
  border: 2px solid var(--color-background-mute);
}

span {
  user-select: none;
}

.menu-item {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 12px;
  margin-bottom: 6px;
  align-items: center;
  justify-content: center;
  user-select: none;
  width: 100%;
  text-align: center;
  text-decoration: none;
  color: inherit;
}

.menu-item:hover {
  background: var(--color-background-mute);
}

.menu-item:active {
  transform: scale(0.95);
}

.menu-item:last-child {
  margin-bottom: 0;
}

.logout-button:hover {
  background: rgba(255, 0, 0, 0.4);
}

</style>
