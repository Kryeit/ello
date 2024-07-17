<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card class="pa-5">
          <v-card-title class="text-h4">Register</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="registerUserWrapper">
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
              <v-btn color="primary" type="submit">Register</v-btn>
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
import {getMinecraftUUID} from "@/javascript/auth/authUtils.js";

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
