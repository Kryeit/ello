<script setup>
import { ref, computed } from 'vue';
import PaymentForm from "@/components/payment/PaymentForm.vue";
import Cart from "@/pages/store/cart/Cart.vue";
import Sidebar from "@/components/navbar/components/Sidebar.vue";
import { cart } from "@/js/merch/cart.js";
import Products from "@/js/merch/products.js";

const email = ref('');
const destination = ref('');
const phone = ref('');

const hasPhysicalProduct = computed(() => {
  const items = cart.items; // Access the reactive object directly
  for (const key in items) {
    const product = Products.getProduct(items[key].key); // Access the key property directly
    if (!product.virtual) {
      return true;
    }
  }
  return false;
});

const handleSubmit = () => {
  console.log('Email:', email.value);
  console.log('Destination:', destination.value);
  console.log('Phone:', phone.value);
};
</script>

<template>
  <h1 style="text-align: center; margin-bottom: 20px;">Order creation</h1>
  <Cart/>
  <form @submit.prevent="handleSubmit">
    <div>
      <label for="email">Email: </label>
      <input type="email" id="email" v-model="email" required />
    </div>
    <div>
      <label :for="hasPhysicalProduct ? 'destination' : ''">Destination: </label>
      <input type="text" id="destination" v-model="destination" :required="hasPhysicalProduct" placeholder="Flat 1, 123 Main St, Springfield, USA, 12345" />
    </div>
    <div>
      <label for="phone">Phone: </label>
      <input type="tel" id="phone" v-model="phone" placeholder="+1 123-456-7890" oninput="this.value=this.value.replace(/[^0-9+]/g,'')" />
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
  display: block; /* Ensure label is a block element */
  position: relative;
}

label:not([for="phone"])::after {
  content: '*';
  color: #de514c;
  position: absolute;
  top: -10px;
}

input {
  background-color: var(--color-background);
  border: 2px solid var(--color-border);
  color: var(--color-text);
  padding: 10px;
  font-size: 0.9rem;
  border-radius: 5px;
  font-family: 'Minecraftia', sans-serif;
  display: block; /* Ensure input is a block element */
  margin-top: 5px; /* Add margin to separate input from label */
}

input:focus {
  border-color: var(--color-background-mute);
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

#destination {
  width: 100%;
}
</style>