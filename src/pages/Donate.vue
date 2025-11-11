<script setup>
import {computed, onMounted, ref} from "vue";
import {loadStripe} from "@stripe/stripe-js";
import {watchEffect} from "vue-demi";
import Trophy from "@/components/Trophy.vue";

const stats = ref();
const paymentForm = ref();
const paymentElements = ref();
const error = ref();
const subscription = ref(false);
const amount = computed(() => Math.round(Number.parseFloat(amountModel.value.replace(",", ".")) * 100) || 0);
const amountModel = ref("4.00");

fetch("/api/donations/stats").then(r => r.json()).then(data => {
  stats.value = data;
  console.log(stats.value);
});

const stripePromise = loadStripe("pk_test_51SBfXvD3GmZjKuBrZzxvKsToWh8THjHJbsNEPFyzjTmFE10qlpmhF4JUzTbwWSf70RC7Lx7YVZYBHFvwryhKBZZs00sy6VrlDC");

onMounted(async () => {
  const stripe = await stripePromise;

  const elements = stripe.elements({
    mode: "subscription",
    amount: amount.value,
    currency: "eur",
    appearance: {
      theme: "night"
    }
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
  return (amount / 100).toFixed(2) + "\xa0€";
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
    This server runs entirely off of donations and all donations will be used to pay for this server.
  </p>
  <p class="header">I seriously appreciate every donation ❤️</p>

  <div class="goal-wrapper" v-if="stats">
    <h3>Our monthly goal to settle the hosting costs</h3>
    <div class="goal">
      <div :style="{width: `${stats.income / stats.targetIncome * 100}%`}" class="progress"/>
    </div>
    <h4>{{ formatMoney(stats.income) }} / {{ formatMoney(stats.targetIncome) }} <span class="goal-text-small">raised this month</span>
    </h4>
  </div>

  <div class="payment-card">
    <div>
      <h2>Amount: <input v-model="amountModel" class="amount-input" @beforeinput="validateAmount($event)"> €</h2>
    </div>

    <div ref="paymentForm"></div>

    <div class="subscription-buttons">
      <button class="once" v-if="paymentElements" @click="submit">Donate once</button>
      <button v-if="paymentElements" @click="submit">Subscribe monthly ❤️</button>
    </div>
  </div>

  <div class="donations">
    <h2>A sincere thank you to all our supporters!</h2>

    <div class="top-donations">
      <div v-for="(donation, i) in stats?.topDonations || []">
        <h4 class="top-donator">
          <Trophy :material="['gold', 'silver', 'bronze'][i]"/>
          {{ donation.name }}: {{ formatMoney(donation.amount) }}
        </h4>
      </div>
    </div>

    <div class="donation-list-wrapper">
      <div class="donation-list">
        <div v-for="donation in stats?.recentDonations || []" class="donation">
          <img :src="`/api/players/${donation.uuid}/head-skin`" height="64px">
          <div>
            <h4>{{ donation.name }}</h4>
            <h5>{{ donation.count }} × {{ formatMoney(donation.amount) }}
              {{ new Date(donation.timestamp).toLocaleDateString() }}</h5>
            <h4 class="message">{{ donation.message }}</h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.donations {
  margin-top: 40px;
}

.donation-list-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.donation-list {
  margin-top: 40px;
  display: grid;
  gap: 30px;
  grid-template-columns: 50% 50%;
  max-width: 100%;
  width: 900px;
}

.message {
  margin-top: 4px;
}

.donation {
  display: flex;
  gap: 10px;
}

.top-donations {
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
  width: 100%;
  justify-content: center;
}

.top-donator {
  display: flex;
  align-items: center;
  gap: 10px;
}

button {
  border: none;
  border-radius: 8px;
  padding: 10px;
  font-size: 18px;
  cursor: pointer;
  background: #30313d;
  color: white;
}

button.once {
  background: none;
  text-decoration: underline;
  color: var(--color-text);
}

.subscription-buttons {
  display: flex;
  gap: 10px;
  margin-left: auto;
}

h1, h2 {
  text-align: center;
}

.payment-card {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  text-align: center;
  padding: 16px 16px 16px 16px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  gap: 20px;
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
  width: 340px;
  overflow: hidden;
  margin-top: 10px;
}

.goal-text-small {
  color: var(--color-text);
}

.goal > .progress {
  background: #08aa3e;
  height: 100%;
}

.goal-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
  margin-bottom: 40px;
}

@media screen and (max-width: 700px) {
  .donation-list {
    grid-template-columns: 1fr;
  }
}
</style>