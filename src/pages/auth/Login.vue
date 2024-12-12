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
    <p v-else>Log in inside the server using /login</p>
  </div>
</template>

<style scoped>
</style>