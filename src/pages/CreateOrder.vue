<script setup>
import { getCurrentInstance, nextTick, onMounted, ref } from 'vue';
import Cart from "@/pages/store/cart/Cart.vue";
import { cart } from "@/js/merch/cart.js";
import Products from "@/js/merch/products.js";
import Orders from "@/js/merch/orders.js";
import Store from "@/js/auth/store.js";
import { loadStripe } from "@stripe/stripe-js";
import { onBeforeMount } from "vue-demi";
import StoreFooter from "@/components/payment/StoreFooter.vue";

const { emit } = getCurrentInstance();

const email = ref('');
const destination = ref('');
const phone = ref('');
const isSubmitting = ref(false);
const errorMessage = ref('');
const successMessage = ref('');
const hasPhysicalProduct = ref(false);

// API base URL - will use the current domain for subdomain.kryeit.com or current domain
// for localhost
const API_BASE_URL = process.env.NODE_ENV === 'production'
    ? 'https://kryeit.com'
    : 'http://localhost:6969';

const checkForPhysicalProducts = async () => {
  try {
    const productPromises = Object.keys(cart.items).map(id => Products.getProduct(id));
    const products = await Promise.all(productPromises);
    hasPhysicalProduct.value = products.some(product => !product.virtual);
  } catch (error) {
    console.error("Error checking for physical products:", error);
    errorMessage.value = "Failed to check product types. Please try refreshing the page.";
  }
};

const handleSubmit = async () => {
  if (isSubmitting.value) return;
  errorMessage.value = '';

  // Input validation
  if (!email.value || !email.value.includes('@')) {
    errorMessage.value = "Please enter a valid email address";
    return;
  }

  if (hasPhysicalProduct.value && !destination.value) {
    errorMessage.value = "Shipping address is required for physical products";
    return;
  }

  try {
    isSubmitting.value = true;

    // Check for virtual products requiring login
    const productPromises = Object.keys(cart.items).map(id => Products.getProduct(id));
    const products = await Promise.all(productPromises);
    const hasVirtualProducts = products.some(product => product.virtual);

    if (hasVirtualProducts && !Store.getUser()) {
      errorMessage.value = "You must be logged in to purchase virtual products";
      isSubmitting.value = false;
      return;
    }

    // Create Stripe session
    const response = await fetch(`${API_BASE_URL}/api/payment/create`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
      body: JSON.stringify({
        cart: cart.items,
        email: email.value,
        phone: phone.value || "",
        destination: destination.value || "Virtual Product",
      }),
    });

    const responseText = await response.text();
    let data;

    try {
      data = JSON.parse(responseText);
    } catch (e) {
      throw new Error(`Invalid server response: ${responseText.substring(0, 100)}`);
    }

    // Check if we got a valid Stripe session ID regardless of status code
    if (data && data.id && typeof data.id === 'string' && data.id.startsWith('cs_')) {
      // Valid Stripe session - redirect to checkout 'pk_live_51OtwANDLNKXyc0J1CzeD4E3QXQ8Oygtac1h9ZS8nMHIXNL42WOTU79H3gOAi7XkzB2ocPZITi1dAPc8SUmgLIehV00l0E6tVsg'
      const stripe = await loadStripe('pk_live_51OtwANDLNKXyc0J1CzeD4E3QXQ8Oygtac1h9ZS8nMHIXNL42WOTU79H3gOAi7XkzB2ocPZITi1dAPc8SUmgLIehV00l0E6tVsg');

      if (!stripe) {
        throw new Error("Failed to initialize payment provider");
      }

      const { error } = await stripe.redirectToCheckout({ sessionId: data.id });

      if (error) {
        throw new Error(error.message);
      }
    } else {
      throw new Error(data.error || "Failed to create checkout session");
    }
  } catch (error) {
    console.error("Error creating order:", error);
    errorMessage.value = `Failed to process payment: ${error.message || "Unknown error"}`;
    isSubmitting.value = false;
  }
};

const preloadUserData = () => {
  const user = Store.getUser();
  if (user && user.email) {
    email.value = user.email;
  }
};

onMounted(async () => {
  await nextTick();
  emit('open-cart');
  preloadUserData();
  await checkForPhysicalProducts();
});

onBeforeMount(async () => {
  const url = new URL(window.location.href);
  if (url.pathname === '/orders' && url.searchParams.has('checkout') && url.searchParams.get('checkout') === 'success') {
    successMessage.value = "Your order has been placed successfully!";
    cart.clearCart();

    const sessionId = url.searchParams.get('session_id');
    if (sessionId) {
      try {
        await fetch(`${API_BASE_URL}/api/payment/success?session_id=${encodeURIComponent(sessionId)}`);
      } catch (error) {
        console.error("Error verifying payment:", error);
      }
    }
  }
});
</script>

<template>
  <h1 style="text-align: center; margin-bottom: 20px;">Order creation</h1>
  <Cart/>

  <div v-if="successMessage" class="success-message">
    {{ successMessage }}
    <p>Redirecting to your orders...</p>
  </div>

  <form v-else @submit.prevent="handleSubmit">
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>

    <div>
      <label for="email">Email: </label>
      <input type="email" id="email" v-model="email" required
             placeholder="example@kryeit.com"/>
    </div>

    <div>
      <label :for="hasPhysicalProduct ? 'destination' : ''">Delivery Address: </label>
      <input type="text" id="destination" v-model="destination" :required="hasPhysicalProduct"
             placeholder="Flat 1, 123 Main St, Springfield, USA, 12345"/>
      <small v-if="!hasPhysicalProduct" class="form-hint">Not required for virtual products</small>
    </div>

    <div>
      <label for="phone">Phone: </label>
      <input type="tel" id="phone" v-model="phone" placeholder="+1 123-456-7890"
             oninput="this.value=this.value.replace(/[^0-9+ ]/g,'')"/>
    </div>

    <div class="order-summary">
      <h3>Order Summary</h3>
      <p>Total Items: {{ Object.values(cart.items).reduce((sum, item) => sum + item.quantity, 0) }}</p>
      <p>Subtotal: {{ cart.totalPrice() }}€</p>
      <p v-if="hasPhysicalProduct">Shipping: {{ Orders.shippingCosts }}€</p>
      <p class="total-price">Total: {{ cart.totalWithShipping(hasPhysicalProduct) }}€</p>
    </div>

    <div class="payment-section">
      <h3 class="disclaimer">Important: If you are not
        <a href="https://kryeit.com/login">
        logged in</a>
        you won't be able to see your order status, unless you contact
      <a href="https://kryeit.com/about">
        Staff</a>.</h3>

      <button type="submit" class="submit-button" :disabled="isSubmitting">
        {{ isSubmitting ? 'Processing...' : 'Complete Purchase' }}
      </button>
    </div>
  </form>

  <StoreFooter />

</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 600px;
  margin: 0 auto;
}

label {
  font-weight: bold;
  display: block;
  position: relative;
  margin-bottom: 5px;
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
  display: block;
  margin-top: 5px;
  width: 100%;
}

input:focus {
  border-color: var(--color-background-mute);
}

.form-hint {
  font-size: 0.8rem;
  color: var(--color-text-muted);
  font-style: italic;
}

.error-message {
  background-color: rgba(220, 53, 69, 0.1);
  color: #dc3545;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 15px;
}

.success-message {
  background-color: rgba(40, 167, 69, 0.1);
  color: #28a745;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
  margin: 30px 0;
}

.order-summary {
  background-color: var(--color-background-soft);
  padding: 15px;
  border-radius: 5px;
  margin: 10px 0;
}

.order-summary h3 {
  margin-top: 0;
  margin-bottom: 10px;
}

.total-price {
  font-weight: bold;
  font-size: 1.2rem;
  margin-top: 10px;
  border-top: 1px solid var(--color-border);
  padding-top: 10px;
}

.payment-section {
  margin-top: 20px;
}

.submit-button {
  padding: 12px 20px;
  font-size: 1rem;
  background-color: var(--color-background-mute);
  color: var(--color-text);
  border: 2px dashed var(--color-border);
  cursor: pointer;
  border-radius: 12px;
  width: 100%;
  margin-top: 20px;
}

.submit-button:hover:not(:disabled) {
  background-color: var(--color-border);
}

.submit-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.disclaimer a {
  color: #ba304d;
}
</style>