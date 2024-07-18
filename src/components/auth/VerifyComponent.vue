<script setup>
import { ref, shallowRef } from 'vue';
import { verifyOtp } from "@/javascript/auth/auth.js";
import store from "@/javascript/auth/store.js";

const loading = shallowRef(false);
const otp = ref('');

async function onClick() {
  loading.value = true;

  await verifyOtp(otp.value);

  setTimeout(() => {
    loading.value = false
  }, 1000)
}
</script>

<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="pa-4">
          <v-card-title class="text-center">
            <h2>Verify</h2>
            <!-- Conditional messages inside the card, below the title -->
            <div v-if="store.user.verified">
              <span class="alert-success">{{ "You're already verified." }}</span>
            </div>
            <div v-else-if="!store.user.isLoggedIn">
              <span class="alert-info">{{ "You are not logged in." }}</span>
            </div>
          </v-card-title>
          <!-- Verification components only shown if user is not verified and is logged in -->
          <div v-if="!store.user.verified && store.user.isLoggedIn">
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
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.alert-success {
  background-color: #C8E6C9;
  color: #256029;
  padding: 10px;
  margin-top: 10px;
  display: block;
  text-align: center;
  border-radius: 8px;
}

.alert-info {
  background-color: #BBDEFB;
  color: #1A237E;
  padding: 10px;
  margin-top: 10px;
  display: block;
  text-align: center;
  border-radius: 8px;
}
</style>