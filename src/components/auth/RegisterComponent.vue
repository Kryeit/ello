<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card class="pa-5">
          <v-card-title class="text-center">
            <h2>{{ $t("auth.register") }}</h2>
          </v-card-title>
          <v-card-text>
            <div v-if="store.user.isLoggedIn" class="center-content">
              <p class="mb-4">{{ $t("auth.already-registered") }}</p>
              <v-btn color="primary" @click="logout">Logout</v-btn>
            </div>

            <v-form v-else @submit.prevent="registerUserWrapper">
              <UsernameInput
                  v-model="username"
                  :hint="$t('auth.username-input.hint') + ' (*)'"
                  class="mb-4"
              />
              <PasswordInput
                  v-model="password"
                  class="mb-4"
              />
              <v-text-field
                  v-model="confirmPassword"
                  type="password"
                  :label="$t('auth.password-input.confirm')"
c              />

              <div class="disclaimer-space">
                <span class="red-text">{{ $t("auth.verify-disclaimer") }}</span>
              </div>

              <div class="d-flex justify-center">
                <v-btn color="primary" type="submit">
                  {{ $t("auth.register") }}
                </v-btn>
              </div>
            </v-form>
            <v-alert v-if="store.message" type="error" dense class="mt-4">{{ store.message }}</v-alert>
            <v-row class="mt-4" justify="center">
              <v-col cols="auto">
                <a href="/login" class="text-decoration-none">
                  {{ $t("auth.is-registered") }}
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
import {ref, watch} from 'vue';
import {logout, register} from "@/javascript/auth/auth.js";
import store from "@/javascript/auth/store.js";
import {getMinecraftUUID} from "@/javascript/auth/authUtils.js";
import PasswordInput from "@/components/auth/input/PasswordInput.vue";
import UsernameInput from "@/components/auth/input/UsernameInput.vue";

const username = ref('');
const password = ref('');
const confirmPassword = ref('');

async function registerUserWrapper() {
  if (password.value !== confirmPassword.value) {
    store.message = 'Passwords do not match';
    return;
  }

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
.red-text {
  color: red;
  font-size: 10px;
}

.disclaimer-space {
  margin-bottom: 20px;
}

.center-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
