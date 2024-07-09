<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
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
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script>
import {loginUser} from '@/javascript/authService.js';

export default {
  data() {
    return {
      uuid: '',
      password: '',
      message: ''
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await loginUser(this.uuid, this.password);
        this.message = response;
      } catch (error) {
        this.message = error.message;
      }
    }
  }
};
</script>

<style scoped>
/* Add any styles you need here */
</style>
