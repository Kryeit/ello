<template>
  <v-container>
    <v-row justify="center">
      <v-col md="6">
        <v-card class="pa-5">
          <v-card-title class="text-center">
            <h2>
              {{ $t("auth.login") }}
            </h2>
          </v-card-title>
          <v-card-text>
            <div v-if="store.user.isLoggedIn" class="center-content">
              <p class="mb-4">You are already logged in.</p>
              <v-btn color="primary" @click="logout">Logout</v-btn>
            </div>

            <v-form v-else @submit.prevent="loginUserWrapper">
              <UsernameInput
                  v-model=username
                  class="mb-4"
              />

              <PasswordInput
                  v-model=password
                  class="mb-4"
              />

              <div class="d-flex justify-center">
                <v-btn color="primary" type="submit">
                  {{ $t("auth.login") }}
                </v-btn>
              </div>
            </v-form>
            <v-alert v-if="store.message" type="error" dense class="mt-4">{{ store.message }}</v-alert>
            <v-row class="mt-4" justify="space-between">
              <v-col cols="auto">
                <a href="/register" class="text-decoration-none">
                  {{ $t("auth.no-account-yet") }}
                </a>
              </v-col>
              <v-col cols="auto">
                <a href="/forgot-password" class="text-decoration-none">
                  {{ $t("auth.forgot-password") }}
                </a>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import {ref} from 'vue';
import store from "@/javascript/auth/store.js";
import {getMinecraftUUID} from "@/javascript/auth/authUtils.js";
import UsernameInput from "@/components/auth/input/UsernameInput.vue";
import PasswordInput from "@/components/auth/input/PasswordInput.vue";
import {authenticate, logout} from "@/javascript/auth/auth.js";

const username = ref('');
const password = ref('');


async function loginUserWrapper() {
  try {
    const uuid = await getMinecraftUUID(username.value);
    await authenticate(uuid, password.value);
  } catch (error) {
    store.message = 'Failed to log in. Please check your username and password.';
  }
}
</script>

<style scoped>
.center-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.text-decoration-none {
  text-decoration: none;
}
</style>
