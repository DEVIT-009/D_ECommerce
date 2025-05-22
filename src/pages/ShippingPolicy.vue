<script setup>
import { RouterLink } from "vue-router";

const shippingMethod = [
  "Standard Shipping (3-5 business days)",
  "Express Shipping (1-2 business days)",
  "International Shipping (7-14 business days)",
];
const shippingCost = [
  "Order weight and dimensions",
  "Shipping destination",
  "Selected shipping method",
];
const internationalShipping = [
  "Customs duties and taxes may apply",
  "Delivery times may vary based on customs processing",
  "Some items may be restricted in certain countries",
];
</script>
<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">Shipping Policy</h1>

    <div class="space-y-6">
      <section>
        <h2 class="text-2xl font-semibold mb-4">Shipping Methods</h2>
        <p class="text-base-content/40 mb-4">
          We offer various shipping methods to ensure your order arrives safely
          and on time:
        </p>
        <ul class="list-disc pl-6 space-y-2">
          <li v-for="(item, key) in shippingMethod" :key="key">
            {{ item }}
          </li>
        </ul>
      </section>

      <section>
        <h2 class="text-2xl font-semibold mb-4">Shipping Costs</h2>
        <p class="text-base-content/40 mb-4">
          Shipping costs are calculated based on:
        </p>
        <ul class="list-disc pl-6 space-y-2">
          <li v-for="(item, key) in shippingCost">{{ item }}</li>
        </ul>
      </section>

      <section>
        <h2 class="text-2xl font-semibold mb-4">Processing Time</h2>
        <p class="text-base-content/40">
          Orders are typically processed within 1-2 business days after payment
          confirmation. During peak seasons, processing may take 3-5 business
          days.
        </p>
      </section>

      <section>
        <h2 class="text-2xl font-semibold mb-4">Tracking Information</h2>
        <p class="text-base-content/40">
          Once your order ships, you will receive a tracking number via email.
          You can track your package's status through our website or the
          carrier's tracking system.
        </p>
      </section>

      <section>
        <h2 class="text-2xl font-semibold mb-4">International Shipping</h2>
        <p class="text-base-content/40 mb-4">
          For international orders, please note:
        </p>
        <ul class="list-disc pl-6 space-y-2">
          <li v-for="(item, key) in internationalShipping" :key="key">
            {{ item }}
          </li>
        </ul>
      </section>

      <section>
        <h2 class="text-2xl font-semibold mb-4">Contact Us</h2>
        <p class="text-base-content/40">
          If you have any questions about our shipping policy, please contact
          our customer service team.
        </p>
        <RouterLink to="/contact" class="btn btn-link px-0">
          Click to Contact Us!
        </RouterLink>
      </section>
    </div>
  </div>
</template>
