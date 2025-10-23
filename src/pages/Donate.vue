<script setup>
import {computed, onMounted, ref} from "vue";
import {loadStripe} from "@stripe/stripe-js";
import {watchEffect} from "vue-demi";

const stats = ref();
const paymentForm = ref();
const paymentElements = ref();
const error = ref();
const subscription = ref(false);
const amount = computed(() => Math.round(Number.parseFloat(amountModel.value.replace(",", ".")) * 100) || 0);
const amountModel = ref("4.00");

fetch("/api/donations/stats").then(r => r.json()).then(data => {
  stats.value = data;
});

const stripePromise = loadStripe("pk_test_51SBfXvD3GmZjKuBrZzxvKsToWh8THjHJbsNEPFyzjTmFE10qlpmhF4JUzTbwWSf70RC7Lx7YVZYBHFvwryhKBZZs00sy6VrlDC");

onMounted(async () => {
  const stripe = await stripePromise;

  const elements = stripe.elements({
    mode: "subscription",
    amount: amount.value,
    currency: "eur"
  });

  watchEffect(() => {
    error.value = "";
    console.log(amount.value);
    if (amount.value < 400) {
      error.value = "Please donate at least 4 €";
      return;
    }

    elements.update({
      mode: subscription.value ? "subscription" : "payment",
      amount: amount.value,
      currency: "eur"
    });
  });

  elements.create("payment", {layout: "accordion"}).mount(paymentForm.value);
  paymentElements.value = elements;
});


async function submit() {
  const stripe = await stripePromise;
  const data = await paymentElements.value.submit();
  if (data.error) {
    error.value = data.error;
    return;
  }

  const subscriptionResponse = await fetch("/api/account/create-donation", {
    method: "POST",
    headers: {
      "Authorization": "vg0BIYi6e0GH7VxD5MrtTuhbg8SfBdsWOtd3hc1Ub6k3i6Iwn45xFtoNN1q5k4tb"
    },
    body: JSON.stringify({
      amount: amount.value,
      subscription: subscription.value,
      message: "Message"
    })
  });
  const intent = await subscriptionResponse.json();
  const confirmIntent = intent.type === "setup" ? stripe.confirmSetup : stripe.confirmPayment;

  const payment = await confirmIntent({
    elements: paymentElements.value,
    clientSecret: intent.secret,
    confirmParams: {
      return_url: "http://localhost:5173/complete"
    }
  });

  if (payment.error) {
    error.value = payment.error;
  }
}

function formatMoney(amount) {
  return (amount / 100).toFixed(2) + " €";
}

function validateAmount(event) {
  if (event.data && !event.data.match(/^[\d.,]$/)) {
    event.preventDefault();
  }
}
</script>

<template>
  <h1>Becoming a Collaborator</h1>
  <p class="header">
    This server runs entirely off of donations and all donations will be invested into keeping the server running.
  </p>
  <p class="header">We seriously appreciate all your donations ❤️</p>

  <div class="goal-wrapper">
    <div class="goal">
      <div :style="{width: `${stats.income / stats.targetIncome * 100}%`}" class="progress"/>
    </div>
    <h4>{{ formatMoney(stats.income) }} / {{ formatMoney(stats.targetIncome) }}</h4>
    <h5>raised this month</h5>
  </div>

  <div class="payment-card">
    <h2><input v-model="amountModel" class="amount-input" @beforeinput="validateAmount($event)"> € / month</h2>

    <div ref="paymentForm"></div>
    <input type="checkbox" v-model="subscription">
    <input type="number" v-model="amount">

    <button v-if="paymentElements" @click="submit">Subscribe monthly</button>
    <button v-if="paymentElements" @click="submit">Donate once</button>

    <h1>{{ error }}</h1>
  </div>
</template>

<style scoped>

.payment-card {
  margin-top: 20px;
  text-align: center;
  padding: 16px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
}

.amount-input {
  font-size: 1em;
  color: var(--color-text);
  width: 120px;
  text-align: center;
}

p.header {
  text-align: center;
}

.goal {
  border: 1px solid var(--color-border);
  background: var(--color-background-mute);
  border-radius: 8px;
  height: 30px;
  width: 300px;
  overflow: hidden;
}

.goal > .progress {
  background: #f44336;
  height: 100%;
}

.goal-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}
</style>