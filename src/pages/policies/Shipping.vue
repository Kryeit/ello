<script setup>
import {marked} from 'marked';
import Cart from "@/pages/store/cart/Cart.vue";
import StoreFooter from "@/components/payment/StoreFooter.vue";

const rawShipping = `
## Shipping Information

We are committed to delivering your order as quickly and securely as possible. Below are the details of our shipping policies.

### **Shipping Costs**
- A flat rate of **10€** applies to all orders with physical products, regardless of size or weight.
- We currently ship to all locations within Europe and internationally.

### **Processing Time**
- Orders are typically processed within **1-2 business days**.
- Once your order has been shipped, you will receive a confirmation email with a tracking number if there is one.

### **Delivery Time**
- Shipping times may vary depending on the destination:
  - **Spain** 2-3 business days
  - **Europe:** 4-7 business days
  - **International:** 10-15 business days
- Please note that unforeseen delays (e.g., customs processing or weather conditions) may affect delivery times.

### **Data Shared with [Correos](https://www.correos.es)**
To facilitate shipping, we share only the necessary information with **Correos**, our trusted delivery partner:
- **Shipping address**
- **Email address**
- **Phone number** (if provided)
- Additionally depending on the destination, we may ask you personally for your initials when required by Correos.

Correos uses this information solely for the purpose of delivering your order and complies with data protection regulations.

### **Returns & Exchanges**
- If your order arrives damaged or incorrect, please contact us within **7 days** of receipt.
- For reasons other than defects (e.g., size or preference), exchanges must be initiated within 14 days of delivery. The customer is responsible for return shipping costs.
- Refunds are not offered. Instead, we provide exchanges or store credit for eligible returns.

If you have any questions or need further assistance, feel free to [contact us](kryeit.minecraft@gmail.com).
`;

const shippingHtml = marked.parse(rawShipping);
</script>

<template>
  <div class="end">
    <h1>Shipping</h1>
    <div class="shipping-content" v-html="shippingHtml"></div>
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

::v-deep(.shipping-content a) {
  color: var(--color-text);
}

::v-deep(.shipping-content h2) {
  margin-top: 8px;
  margin-bottom: 12px;

}

::v-deep(.shipping-content h3) {
  margin-top: 8px;
  margin-bottom: 12px;

}

.end {
  margin-bottom: 20px;
}
</style>
