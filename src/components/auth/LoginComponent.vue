<template>
  <div>
    <h1>Login</h1>
    <div v-if="store.user.isLoggedIn">
      <p>You are already logged in. Your UUID is: {{ store.user.uuid }} and your role is: {{ store.user.role }}</p>
      <button @click="logoutUser">Logout</button>
    </div>
    <form v-else @submit.prevent="loginUserWrapper">
      <div>
        <label for="uuid">UUID:</label>
        <input type="text" v-model="uuid" id="uuid" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" v-model="password" id="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
    <p v-if="store.message">{{ store.message }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuth } from "@/javascript/useAuth.js";
import store from "@/javascript/store.js";

const uuid = ref('');
const password = ref('');

const {loginUser, logoutUser} = useAuth();

async function loginUserWrapper() {
  await loginUser(uuid.value, password.value);
}

// No need to explicitly expose loginUserWrapper or store to the template in <script setup>
</script>

<style scoped>
/* Add any component-specific styles here */
</style>