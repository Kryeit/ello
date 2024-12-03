<template>
  <div>
    <button @click="redirectToCheckout" :disabled="processing">
      {{ processing ? "Processing..." : "Pay Now " + cart.totalPrice(hasNonVirtualItems) + "€" }}
    </button>
  </div>
</template>

<script setup>
import {onMounted, ref, watch} from "vue";
import Products from "@/js/merch/products.js";

const hasNonVirtualItems = ref(false);

const checkNonVirtualItems = async () => {
  const results = await Promise.all(
      Object.keys(cart.items).map(async item => {
        const product = await Products.getProduct(item);
        return !product.virtual;
      })
  );
  hasNonVirtualItems.value = results.some(isNonVirtual => isNonVirtual);
};



onMounted(checkNonVirtualItems);

watch(() => cart.items, checkNonVirtualItems, { deep: true });
</script>

<script>
import { loadStripe } from '@stripe/stripe-js';
import { cart } from "@/js/merch/cart.js";
import Products from "@/js/merch/products.js";
import store from "@/js/auth/store.js";

export default {
  props: {
    formData: Object
  },
  data() {
    return {
      stripe: null,
      processing: false,
    };
  },
  async mounted() {
    this.stripe = await loadStripe('pk_test_51OtwANDLNKXyc0J1TNDujqp4FCBKXlq7yMqUOBMsKSfYenydSamwzyl0T4dIDsvaVmUJ5KHORvRkogmjCmHEkMqa00R6cDAaGV'); // Replace with your publishable key

    if (!this.stripe) {
      console.error("Stripe failed to initialize.");
    }
  },
  methods: {
    cart() {
      return cart
    },
    async redirectToCheckout() {
      const emailError = this.validateEmail(this.formData.email);

      if (emailError !== '') {
        alert(emailError);
        return;
      }

      if (!this.formData.email || !this.formData.destination) {
        alert('Please provide both email and destination.');
        return;
      }

      this.processing = true;

      try {
        // Prepare the cart data to be sent
        const cartData = cart.items;

        let hasVirtual = false;

        for (const key in cartData) {
          const product = await Products.getProduct(key);
          if (product.virtual) {
            hasVirtual = true;
            break;
          }
        }

        if (hasVirtual && !store.getUser()) {
          alert('You need to be logged in to purchase virtual items.');
          return;
        }

        // Send cart details to backend to create a Stripe Checkout session
        const response = await fetch('http://localhost:6969/api/payment/create', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          credentials: 'include',
          body: JSON.stringify({
            cart: cartData,
            email: this.formData.email,
            phone: this.formData.phone,
            destination: this.formData.destination,
          }),
        });

        const {id: sessionId, error} = await response.json();

        if (error) {
          console.error(error);
          alert('Error creating checkout session.');
          return;
        }

        // Redirect to Stripe Checkout
        await this.stripe.redirectToCheckout({sessionId});
      } catch (err) {
        console.error(err.message);
        alert('Failed to redirect to Checkout.');
      } finally {
        this.processing = false;
      }
    },
    validateEmail(emailToCheck) {
      // Check if email is empty
      if (!emailToCheck) {
        return 'Email is required';
      }

      // Trim the email
      emailToCheck = emailToCheck.trim();

      // Simple but effective email regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      // Check if email matches the regex
      if (!emailRegex.test(emailToCheck)) {
        return 'Please enter a valid email address';
      }

      // Additional basic checks
      const [local, domain] = emailToCheck.split('@');

      // Check local part length
      if (local.length < 1 || local.length > 64) {
        return 'Invalid email address';
      }

      // Check domain length
      if (domain.length < 3 || domain.length > 255) {
        return 'Invalid email domain';
      }

      // Ensure domain has at least one dot
      if (!domain.includes('.')) {
        return 'Email domain is invalid';
      }

      // If all checks pass
      return '';
    },
  },
};
</script>

<style scoped>
button {
  background-color: var(--color-background);
  cursor: pointer;
}
</style>