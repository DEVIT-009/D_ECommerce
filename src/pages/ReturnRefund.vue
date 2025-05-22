<script setup>
import { RouterLink } from "vue-router";

const returnConditions = [
  "Items must be unused and in original packaging",
  "All tags and labels must be attached",
  "Items must be returned within 30 days of delivery",
  "Original receipt or proof of purchase required",
  "Items must be in resellable condition",
];

const refundProcess = [
  "Submit return request through your account",
  "Package items securely with return label",
  "Ship items back to our warehouse",
  "Wait for inspection (2-3 business days)",
  "Receive refund within 5-7 business days",
];

const nonReturnable = [
  "Items marked as final sale",
  "Personalized or custom items",
  "Items without original packaging",
  "Used or damaged items",
  "Items purchased more than 30 days ago",
];
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">Return & Refund Policy</h1>

    <div class="space-y-6">
      <section>
        <h2 class="text-2xl font-semibold mb-4">Return Conditions</h2>
        <p class="text-base-content/40 mb-4">
          To be eligible for a return, your item must meet the following
          conditions:
        </p>
        <ul class="list-disc pl-6 space-y-2">
          <li v-for="(item, key) in returnConditions" :key="key">
            {{ item }}
          </li>
        </ul>
      </section>

      <section>
        <h2 class="text-2xl font-semibold mb-4">Refund Process</h2>
        <p class="text-base-content/40 mb-4">
          Follow these steps to process your return and refund:
        </p>
        <ul class="list-disc pl-6 space-y-2">
          <li v-for="(item, key) in refundProcess" :key="key">
            {{ item }}
          </li>
        </ul>
      </section>

      <section>
        <h2 class="text-2xl font-semibold mb-4">Non-Returnable Items</h2>
        <p class="text-base-content/40 mb-4">
          The following items are not eligible for returns:
        </p>
        <ul class="list-disc pl-6 space-y-2">
          <li v-for="(item, key) in nonReturnable" :key="key">
            {{ item }}
          </li>
        </ul>
      </section>

      <section>
        <h2 class="text-2xl font-semibold mb-4">Refund Methods</h2>
        <p class="text-base-content/40">
          Refunds will be processed using the original payment method. Please
          note that it may take 5-7 business days for the refund to appear in
          your account, depending on your payment provider.
        </p>
      </section>

      <section>
        <h2 class="text-2xl font-semibold mb-4">Return Shipping</h2>
        <p class="text-base-content/40">
          Customers are responsible for return shipping costs unless the item
          was damaged or incorrect. We recommend using a trackable shipping
          service and purchasing shipping insurance for valuable items.
        </p>
      </section>

      <section>
        <h2 class="text-2xl font-semibold mb-4">Damaged or Incorrect Items</h2>
        <p class="text-base-content/40">
          If you received a damaged or incorrect item, please contact us within
          48 hours of delivery. We will arrange for a return shipping label and
          process your refund or replacement promptly.
        </p>
      </section>

      <section>
        <h2 class="text-2xl font-semibold mb-4">Contact Us</h2>
        <p class="text-base-content/40">
          If you have any questions about our return and refund policy, please
          contact our customer service team.
        </p>
        <RouterLink to="/contact" class="btn btn-link px-0">
          Contact Customer Service
        </RouterLink>
      </section>
    </div>
  </div>
</template>
