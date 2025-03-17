<script setup>
import { computed, getCurrentInstance, nextTick, onMounted, ref } from 'vue';
import PaymentForm from "@/components/payment/PaymentForm.vue";
import Cart from "@/pages/store/cart/Cart.vue";
import { cart } from "@/js/merch/cart.js";
import Products from "@/js/merch/products.js";
import Orders from "@/js/merch/orders.js";
import { useRouter } from 'vue-router';
import Store from "@/js/auth/store.js";

const { emit } = getCurrentInstance();
const router = useRouter();

const email = ref('');
const destination = ref('');
const phone = ref('');
const isSubmitting = ref(false);
const errorMessage = ref('');
const successMessage = ref('');

const hasPhysicalProduct = computed(async () => {
  for (const id in cart.items) {
    const product = await Products.getProduct(id);
    if (!product.virtual) {
      return true;
    }
  }
  return false;
});

const cartItemsFormatted = computed(() => {
  // Format cart items for the backend
  return JSON.stringify(Object.keys(cart.items).map(id => parseInt(id)));
});

const handleSubmit = async () => {
  if (isSubmitting.value) return;

  // Validation
  if (!email.value) {
    errorMessage.value = "Email is required";
    return;
  }

  const physicalProductPresent = await hasPhysicalProduct.value;

  if (physicalProductPresent && !destination.value) {
    errorMessage.value = "Shipping address is required for physical products";
    return;
  }

  // For virtual products, check if user is logged in
  const hasVirtualProducts = Object.keys(cart.items).some(async (id) => {
    const product = await Products.getProduct(id);
    return product.virtual;
  });

  if (hasVirtualProducts && !Store.getUser()) {
    errorMessage.value = "You must be logged in to purchase virtual products";
    return;
  }

  try {
    isSubmitting.value = true;
    errorMessage.value = '';

    // Create payment intent (this would usually be handled by PaymentForm component)
    // For this example, we're just showing the process
    const paymentIntentId = "test_payment_" + Date.now();

    // Create order data
    const orderData = {
      cart: cartItemsFormatted.value,
      destination: destination.value || "Virtual Product",
      phone: phone.value || "",
      email: email.value,
      transaction: paymentIntentId
    };

    // Submit order
    const orderId = await Orders.createOrder(orderData);

    // Success!
    successMessage.value = `Order created successfully! Order ID: ${orderId}`;

    // Clear cart
    cart.clearCart();

    // Redirect to confirmation page (or implement it here)
    setTimeout(() => {
      router.push('/orders');
    }, 3000);

  } catch (error) {
    console.error("Error creating order:", error);
    errorMessage.value = "Failed to create order: " + (error.message || "Unknown error");
  } finally {
    isSubmitting.value = false;
  }
};

const preloadUserData = () => {
  const user = Store.getUser();
  if (user) {
    email.value = user.email || '';
  }
};

onMounted(async () => {
  await nextTick();
  emit('open-cart');
  preloadUserData();
});
</script>

<template>
  <h1 style="color: red">THIS PAGE IS NOT RELEASED, JUST INTERACTABLE AS A TEST PHASE, NO PAYMENTS OR ANYTHING WILL GO THROUGH OR ARE REAL</h1>
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
      <h3>Payment</h3>
      <PaymentForm :form-data="{ email, destination, phone }" />

      <button type="submit" class="submit-button" :disabled="isSubmitting">
        {{ isSubmitting ? 'Processing...' : 'Complete Purchase' }}
      </button>
    </div>
  </form>
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
  margin: 20px 0;
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
</style>