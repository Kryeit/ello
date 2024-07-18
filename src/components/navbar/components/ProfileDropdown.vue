<script setup>
import {computed} from 'vue';
import {useRouter} from 'vue-router';
import SettingsDropdown from "@/components/navbar/components/SettingsDropdown.vue";
import {i18n} from "@/main.js";
import store from "@/javascript/auth/store.js";

const router = useRouter();
const playerName = computed(() => store.user.username ? store.user.username : i18n.global.t("auth.login"));

const items = computed(() => [
  { title: i18n.global.t("navbar.leaderboard"), path: '/leaderboard' },
]);

function navigateTo(item) {
  router.push(item.path);
}

function handleProfileClick() {
  if (!store.user.username) {
    router.push('/login');
  } else {
    router.push('/@' + store.user.username);
  }
}
</script>

<template>
  <div>
    <v-menu open-on-hover :close-on-content-click="false" :open-delay="0" :close-delay="400">
      <template v-slot:activator="{ props }">
        <v-btn class="profile-button" v-bind="props" @click="handleProfileClick">
          <img v-if="store.user.isLoggedIn" class="player-image" :src="`/api/players/${playerName}/head`" alt="Player Head">
          <span class="player-name">{{ playerName }}</span>
        </v-btn>
      </template>

      <v-list bg-color="var(--color-background)">
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
.profile-button {
  background-color: var(--dark-brass-gold);
  color: white;
}

.list {
  color: var(--color-text);
}

.player-image {
  width: 24px;
  height: 24px;
  margin-right: 8px;
  border-radius: 20%;
}
</style>
