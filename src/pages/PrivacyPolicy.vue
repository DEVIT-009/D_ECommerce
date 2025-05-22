<script setup>
import { RouterLink } from "vue-router";

const dataCollection = [
  "Personal information (name, email, address)",
  "Payment information",
  "Order history and preferences",
  "Device and usage information",
  "Cookies and similar technologies",
];

const dataUsage = [
  "Process and fulfill your orders",
  "Communicate with you about your orders",
  "Send marketing communications (with your consent)",
  "Improve our website and services",
  "Prevent fraud and enhance security",
];

const dataProtection = [
  "Encryption of sensitive data",
  "Regular security assessments",
  "Limited access to personal information",
  "Secure data storage systems",
  "Employee training on data protection",
];
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8">Privacy Policy</h1>

    <div class="space-y-6">
      <section>
        <h2 class="text-2xl font-semibold mb-4">Information We Collect</h2>
        <p class="text-base-content/40 mb-4">
          We collect various types of information to provide and improve our
          services:
        </p>
        <ul class="list-disc pl-6 space-y-2">
          <li v-for="(item, key) in dataCollection" :key="key">
            {{ item }}
          </li>
        </ul>
      </section>

      <section>
        <h2 class="text-2xl font-semibold mb-4">How We Use Your Information</h2>
        <p class="text-base-content/40 mb-4">
          Your information is used for the following purposes:
        </p>
        <ul class="list-disc pl-6 space-y-2">
          <li v-for="(item, key) in dataUsage" :key="key">
            {{ item }}
          </li>
        </ul>
      </section>

      <section>
        <h2 class="text-2xl font-semibold mb-4">Data Protection</h2>
        <p class="text-base-content/40 mb-4">
          We implement various security measures to protect your information:
        </p>
        <ul class="list-disc pl-6 space-y-2">
          <li v-for="(item, key) in dataProtection" :key="key">
            {{ item }}
          </li>
        </ul>
      </section>

      <section>
        <h2 class="text-2xl font-semibold mb-4">Your Rights</h2>
        <p class="text-base-content/40">You have the right to:</p>
        <ul class="list-disc pl-6 space-y-2 mt-4">
          <li>Access your personal information</li>
          <li>Correct inaccurate data</li>
          <li>Request deletion of your data</li>
          <li>Opt-out of marketing communications</li>
          <li>File a complaint with supervisory authorities</li>
        </ul>
      </section>

      <section>
        <h2 class="text-2xl font-semibold mb-4">Cookies and Tracking</h2>
        <p class="text-base-content/40">
          We use cookies and similar tracking technologies to improve your
          browsing experience, analyze site traffic, and understand where our
          visitors are coming from. You can control cookie settings through your
          browser preferences.
        </p>
      </section>

      <section>
        <h2 class="text-2xl font-semibold mb-4">Third-Party Services</h2>
        <p class="text-base-content/40">
          We may use third-party services that collect, monitor, and analyze
          data. These services have their own privacy policies addressing how
          they use such information.
        </p>
      </section>

      <section>
        <h2 class="text-2xl font-semibold mb-4">Contact Us</h2>
        <p class="text-base-content/40">
          If you have any questions about our privacy policy or how we handle
          your data, please contact our privacy team.
        </p>
        <RouterLink to="/contact" class="btn btn-link px-0">
          Contact Privacy Team
        </RouterLink>
      </section>
    </div>
  </div>
</template>
