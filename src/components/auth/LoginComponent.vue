<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card class="pa-5">
          <v-card-title class="text-h4">Login</v-card-title>
          <v-card-text>
            <div v-if="store.user.isLoggedIn">
              <p>You are already logged in.</p>
              <v-btn color="primary" @click="logoutUser">Logout</v-btn>
            </div>
            <v-form v-else @submit.prevent="loginUserWrapper">
              <v-text-field
                  label="Username"
                  v-model="username"
                  required
                  prepend-icon="mdi-account"
              ></v-text-field>
              <v-text-field
                  label="Password"
                  v-model="password"
                  type="password"
                  required
                  prepend-icon="mdi-lock"
              ></v-text-field>
              <v-btn color="primary" type="submit">Login</v-btn>
            </v-form>
            <v-alert v-if="store.message" type="error" dense class="mt-4">{{ store.message }}</v-alert>
            <v-row class="mt-4" justify="space-between">
              <v-col cols="auto">
                <a href="/register" class="text-decoration-none">No account yet?</a>
              </v-col>
              <v-col cols="auto">
                <a href="/forgot-password" class="text-decoration-none">Forgot password?</a>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { useAuth } from "@/javascript/auth/useAuth.js";
import store from "@/javascript/auth/store.js";
import { getMinecraftUUID } from "@/javascript/auth/authUtils.js";

const username = ref('');
const password = ref('');

const { loginUser, logoutUser } = useAuth();

async function loginUserWrapper() {
  try {
    const uuid = await getMinecraftUUID(username.value);
    await loginUser(uuid, password.value);
  } catch (error) {
    store.message = 'Failed to log in. Please check your username and password.';
  }
}
</script>

<style scoped>
/* Add any component-specific styles here */
.text-decoration-none {
  text-decoration: none;
}
</style>
