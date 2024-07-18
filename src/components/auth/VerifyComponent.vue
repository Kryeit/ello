<script setup>
import {ref, shallowRef} from 'vue';
import {verifyOtp} from "@/javascript/auth/auth.js";
import store from "@/javascript/auth/store.js";
import VerifyComponent from "@/components/auth/VerifyComponent.vue";

const loading = shallowRef(false)
const otp = shallowRef('')

function onClick () {
  loading.value = true

  setTimeout(() => {
    loading.value = false
  }, 2000)
}
</script>

<script>
import {verifyOtp} from "@/javascript/auth/auth.js";
import {ref, shallowRef} from "vue";
import store from "@/javascript/auth/store.js";

const loading = shallowRef(false);
const otp = ref('');

async function onClick() {
  loading.value = true;

  try {
    const response = await verifyOtp(otp.value);
    if (response) {
      store.setMessage('OTP verified successfully!');
    } else {
      store.setMessage('Failed to verify OTP.');
    }
  } catch (error) {
    store.setMessage('An error occurred during OTP verification.');
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="pa-4">
          <v-card-title class="text-center">
            <h2>Verify</h2>
          </v-card-title>
          <v-otp-input
              v-model="otp"
              :loading="loading"
              variant="solo-filled"
          ></v-otp-input>

          <div class="d-flex justify-center">

            <v-btn
                :disabled="otp.length < 6 || loading"
                class="mt-4"
                @click="onClick"
                text="Verify Account"
                variant="tonal"
            ></v-btn>
          </div>
          <v-alert v-if="store.message" type="error" dense class="mt-4">{{ store.message }}</v-alert>

        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>