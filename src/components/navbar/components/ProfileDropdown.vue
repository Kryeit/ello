<script setup>
import {computed} from 'vue';
import {useRouter} from 'vue-router';
import SettingsDropdown from "@/components/navbar/components/SettingsDropdown.vue";
import {i18n} from "@/main.js";
import store from "@/javascript/auth/store.js";
import PlayerAvatar from "@/components/navbar/components/PlayerAvatar.vue";

const router = useRouter();
const playerName = computed(() => store.user.username ? store.user.username : i18n.global.t("auth.login"));

const items = computed(() => [
  { title: i18n.global.t("navbar.leaderboard"), path: '/leaderboard' },
]);

function navigateTo(item) {
  router.push(item.path);
}
</script>

<template>
  <div>
    <v-menu
        open-on-hover
        :close-on-content-click="false"
        :open-delay="0"
        :close-delay="400"
        transition="slide-y-transition"
        offset="6"
    >

      <template v-slot:activator="{ props }">
        <div class="player-avatar-container" v-bind="props">
          <PlayerAvatar :player-name="playerName" v-bind="props"/>
          <span class="dropdown-arrow">⮟</span>
        </div>
      </template>

      <v-list bg-color="var(--color-background)">

        <v-list-item v-if="store.user.isLoggedIn" @click="router.push('/@' + playerName)">
          <v-list-item-title class="text-caption" style="font-family: 'Minecraftia', sans-serif">@{{ playerName }}</v-list-item-title>
          <v-list-item-subtitle>Visit your profile</v-list-item-subtitle>
        </v-list-item>

        <v-list-item v-else @click="router.push('/login')">
          <v-list-item-title class="text-caption" style="font-family: 'Minecraftia', sans-serif">Guest</v-list-item-title>
          <v-list-item-subtitle>Log in</v-list-item-subtitle>
        </v-list-item>

        <v-list-item class="list"
                     v-for="(item, index) in items"
                     :key="index"
                     @click="navigateTo(item)"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>

        <SettingsDropdown/>
      </v-list>
    </v-menu>
  </div>
</template>

<style scoped>
v-list-item {
  cursor: pointer;
}

.player-avatar-container {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
}

.dropdown-arrow {
  margin-left: 4px;
  font-size: 20px;
  color: currentColor;
}
</style>
