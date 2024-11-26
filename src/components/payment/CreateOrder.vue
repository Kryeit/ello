<script setup>
import { ref } from 'vue';
import PaymentForm from "@/components/payment/PaymentForm.vue";
import Cart from "@/pages/store/cart/Cart.vue";

const email = ref('');
const destination = ref('');
const phone = ref('');

const handleSubmit = () => {
  console.log('Email:', email.value);
  console.log('Destination:', destination.value);
  console.log('Phone:', phone.value);
};
</script>

<template>
  <h1>Order creation</h1>
  <Cart/>
  <form @submit.prevent="handleSubmit">
    <div>
      <label for="email">Email: </label>
      <input type="email" id="email" v-model="email" required />
    </div>
    <div>
      <label for="destination">Destination: </label>
      <input type="text" id="destination" v-model="destination" required />
    </div>
    <div>
      <label for="phone">Phone: </label>
      <input type="tel" id="phone" v-model="phone"/>
    </div>
    <PaymentForm :form-data="{ email, destination, phone }" />
  </form>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

label {
  font-weight: bold;
}

input {
  padding: 5px;
  font-size: 1rem;
}

button {
  padding: 10px;
  font-size: 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>