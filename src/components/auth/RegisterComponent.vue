<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card class="pa-5">
          <v-card-title class="text-center">
            <h2>{{ $t("auth.register") }}</h2>
          </v-card-title>
          <v-card-text>
            <div v-if="store.user.isLoggedIn">
              <p>{{ $t("auth.alreadyRegistered") }}</p>
            </div>
            <v-form v-else @submit.prevent="registerUserWrapper">
              <UsernameInput
                  v-model="username"
                  class="mb-4"
              />
              <PasswordInput
                  v-model="password"
                  class="mb-4"
              />
              <div class="d-flex justify-center">
                <v-btn color="primary" type="submit">
                  {{ $t("auth.register") }}
                </v-btn>
              </div>
            </v-form>
            <v-alert v-if="store.message" type="error" dense class="mt-4">{{ store.message }}</v-alert>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { register } from "@/javascript/auth/auth.js";
import store from "@/javascript/auth/store.js";
import { getMinecraftUUID } from "@/javascript/auth/authUtils.js";
import PasswordInput from "@/components/auth/input/PasswordInput.vue";
import UsernameInput from "@/components/auth/input/UsernameInput.vue";

const username = ref('');
const password = ref('');

async function registerUserWrapper() {
  try {
    const uuid = await getMinecraftUUID(username.value);
    const response = await register(uuid, password.value);
    if (response) {
      store.message = 'Registration successful!';
    }
  } catch (error) {
    store.message = error.message || 'An error occurred during registration.';
  }
}
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
