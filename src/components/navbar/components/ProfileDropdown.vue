<script setup>
import {computed} from 'vue';
import {useRouter} from 'vue-router';
import {i18n} from "@/main.js";
import PlayerAvatar from "@/components/navbar/components/PlayerAvatar.vue";
import AuthService from "@/js/auth/authService.js";
import store from "@/js/auth/store.js";
import DropdownIcon from "@/assets/dropdown.svg?component";

const router = useRouter();
const playerName = computed(() => store.username ? store.user.username : i18n.global.t("auth.login"));

const items = computed(() => [
  { title: i18n.global.t("navbar.leaderboard"), path: '/leaderboard' },
]);

function navigateTo(item) {
  router.push(item.path);
}

function logout() {
  AuthService.logout();
}
</script>

<template>
  <div>
    <div class="player-avatar-container" @click="router.push('/@' + playerName)">
      <PlayerAvatar :player-name="playerName"/>
      <DropdownIcon class="dropdown-arrow"/>
    </div>

    <div v-if="store.getUser()">
      <div class="menu-item" @click="router.push('/@' + playerName)">
        <span class="menu-item-title">@{{ playerName }}</span>
        <span class="menu-item-subtitle">Visit your profile</span>
      </div>

      <div class="menu-item" v-for="(item, index) in items" :key="index" @click="navigateTo(item)">
        <span class="menu-item-title">{{ item.title }}</span>
      </div>

      <div class="menu-item" @click="logout()">
        <span class="menu-item-title">Logout</span>
      </div>
    </div>

    <div v-else class="menu-item" @click="router.push('/login')">
      <span class="menu-item-title">Guest</span>
      <span class="menu-item-subtitle">Log in</span>
    </div>
  </div>
</template>

<style scoped>
.menu-item {
  cursor: pointer;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

.menu-item-title {
  font-family: 'Minecraftia', sans-serif;
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
</style>