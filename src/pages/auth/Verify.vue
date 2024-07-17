<script setup>
import { ref } from 'vue';
// Import the v-otp-input component if it's from a library or ensure it's globally registered if custom

const otp = ref(''); // Holds the OTP input value

// Function to handle OTP verification
const verifyOtp = () => {
  // Implement verification logic here, possibly calling an API
  console.log('Verifying OTP:', otp.value);
};
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
              length="6"
              @input="verifyOtp"
          ></v-otp-input>
          <div class="d-flex justify-center">
            <v-btn color="primary" class="mt-4" @click="verifyOtp">Verify OTP</v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
v-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}
</style>