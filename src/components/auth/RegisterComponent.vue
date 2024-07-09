<script>
import {registerUser} from '@/javascript/authService.js';

export default {
  data() {
    return {
      uuid: '',
      password: '',
      message: ''
    };
  },
  methods: {
    async handleRegister() {
      try {
        const response = await registerUser(this.uuid, this.password);
        this.message = response;
      } catch (error) {
        this.message = error.message;
      }
    }
  }
};
</script>

<template>
  <div>
    <h1>Register</h1>
    <form @submit.prevent="handleRegister">
      <div>
        <label for="uuid">UUID:</label>
        <input type="text" v-model="uuid" id="uuid" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" v-model="password" id="password" required />
      </div>
      <button type="submit">Register</button>
    </form>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<style scoped>
/* Add any styles you need here */
</style>
