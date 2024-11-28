<script setup>
import {marked} from 'marked';
import Cart from "@/pages/store/cart/Cart.vue";
import StoreFooter from "@/components/payment/StoreFooter.vue";

const rawPrivacyPolicy = `

Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal data when you use our services.

## Data We Collect
- **Email Address**: Used to communicate about your order.
- **Shipping Address**: Used to deliver your purchase.
- **Order Details**: Information about the items you've purchased.
- **JWT Tokens**: Used to authenticate your session securely.

We do not store any passwords.

## Data Retention
We only retain your personal data as long as necessary to process your orders:
- **Order Details, Shipping Address, and Email**: These are deleted from our database once the order status is marked as "delivered."

## Why We Collect Data
Your data is used solely for:
1. Processing and delivering your orders.
2. Communicating updates related to your purchases.

## Data Sharing
- **Payment Processing:** We use Stripe to securely process payments. Your payment information is handled according to Stripe's Privacy Policy, which can be found at [https://stripe.com/privacy](https://stripe.com/privacy).
- **Shipping Providers:** Your address is shared with our shipping partners to deliver your order.
- We do not sell, share, or trade your personal information with any other third parties, except as required to comply with legal obligations.

## Cookies
Users can manage or disable cookies through their browser settings. Our cookie use is minimal and only for session management.

## Data Security
We implement industry-standard measures, such as encryption and secure servers, to protect your personal data from unauthorized access, alteration, or disclosure.

## Your Rights
Under GDPR, you have the right to:
- Access, update, or delete your personal information.
- Withdraw consent for data collection at any time.

To exercise your rights, please contact us at **kryeit.minecraft@gmail.com**.

## Legal Jurisdiction
This Privacy Policy complies with the General Data Protection Regulation (GDPR) and applies to all users worldwide.

## Changes to This Policy
We may update this Privacy Policy to reflect changes in our practices or legal requirements. Please review this page regularly.

## Contact Us
If you have any questions about our Privacy Policy, please contact us at **kryeit.minecraft@gmail.com**.

Effective Date: 22/11/2024
`;

const privacyPolicy = marked.parse(rawPrivacyPolicy);
</script>

<template>
  <div class="end">
    <h1>Privacy Policy</h1>
    <div class="policy-content" v-html="privacyPolicy"></div>
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

::v-deep(.policy-content a) {
  color: var(--color-text);
  font-style: italic;
}

::v-deep(.policy-content a) {
  color: var(--color-text);
  font-style: italic;
}

::v-deep(.policy-content h2) {
  margin-top: 8px;
  margin-bottom: 12px;

}

.end {
  margin-bottom: 20px;
}
</style>
