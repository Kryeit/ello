<script setup>
import {onMounted} from 'vue';
import AuthService from "@/js/auth/authService.js";

const props = defineProps({
  token: {
    type: String,
    default: null
  }
});

onMounted(async () => {
  if (props.token) {
    try {
      await AuthService.validateLogin(props.token);
      console.log('Token validated successfully');
    } catch (error) {
      console.error('Token validation failed', error);
    }
  }
});
</script>

<template>
  <div>
    <p v-if="token">Token: {{ token }}</p>
    <div v-else style="text-align:center; margin-top: 200px;">
      <p>
        The authentication depends on minecraft accounts for now.
      </p>
      <p>
        Use /login command to log into the website.
      </p>
    </div>

  </div>
</template>

<style scoped>
</style>