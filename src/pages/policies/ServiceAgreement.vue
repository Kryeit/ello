<script setup>
import {marked} from 'marked';
import Cart from "@/pages/store/cart/Cart.vue";
import StoreFooter from "@/components/payment/StoreFooter.vue";

const rawServiceAgreement = `
# Service Agreement

Welcome to our shop. By using our website, you agree to the following terms outlined in this Service Agreement. Please read them carefully.

## General Terms
1. This agreement governs the use of our website and the purchase of products from our store.
2. By accessing our site or placing an order, you agree to comply with this agreement.

## Orders and Payments
- **Order Acceptance:** All orders are subject to availability and acceptance.
- **Pricing:** Prices are listed in USD and may be subject to change without notice.
- **Payment Processing:** Payments are processed securely through [Stripe](https://stripe.com). Please refer to their [Privacy Policy](https://stripe.com/privacy) for more information.

## Refunds and Cancellations
- We **do not offer refunds** for delivered products, except as required by law.
- Cancellations must be made before the order is shipped. Once shipped, the order cannot be canceled.

## Shipping and Delivery
- We aim to deliver your order within the specified timeframe, but delays may occur due to external factors (e.g., customs, weather).
- Shipping fees are non-refundable.

## Intellectual Property
- All content on this website, including text, images, and logos, is the property of the owner(s) of Kryeit.
- You may not reproduce, distribute, or use any content without prior written permission.

## Limitation of Liability
- We are not liable for any damages resulting from the use of our website or products, except as required by law.

## Changes to the Agreement
We reserve the right to update this agreement at any time. Continued use of our website implies acceptance of the updated agreement.

## Governing Law
This agreement is governed by the laws of Spain. Any disputes shall be resolved under the jurisdiction of the courts of Spain.

## Contact Us
If you have any questions about this Service Agreement, please contact us at **kryeit.minecraft@gmail.com**.

Effective Date: 22/11/2024
`;

const serviceAgreement = marked.parse(rawServiceAgreement);
</script>

<template>
  <div class="end">
    <h1>Service Agreement</h1>
    <div class="agreement-content" v-html="serviceAgreement"></div>
  </div>

  <Cart />
  <StoreFooter />
</template>

<style scoped>
h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

div {
  font-size: 1rem;
  line-height: 1.5;
}

::v-deep(.agreement-content a) {
  color: var(--color-text);
  font-style: italic;
}

::v-deep(.agreement-content h2) {
  margin-top: 8px;
  margin-bottom: 12px;
}

.end {
  margin-bottom: 20px;
}
</style>
