<script setup>
import Modal from "@/components/Modal.vue";
import authService from "@/js/auth/authService.js";
import {addToast} from "@/js/toasts.js";
import {ref} from "vue";

const shown = defineModel("shown", false);
const code = ref("");

async function login() {
  try {
    await authService.login(code.value);
  } catch (error) {
    console.log(error);
    addToast("map.png", "Error logging in", error.message);
  } finally {
    shown.value = false;
  }
}
</script>

<template>
  <Modal v-model:shown="shown" :title="$t('auth.login')">
    <p>Login using /otp in the Minecraft server or in Discord if you have linked your accounts.</p>
    <p class="code-header">Your code</p>
    <input v-model="code">

    <button v-if="code.trim().length > 0" @click="login">Login</button>
  </Modal>
</template>

<style scoped>
input, button {
  background: var(--color-background-mute);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 5px 12px;
  color: inherit;
  width: 100%;
  text-align: center;
}

button {
  margin-top: 10px;
  background: var(--color-background);
  cursor: pointer;
}

.code-header {
  margin-top: 10px;
  font-size: 14px;
}
</style>
