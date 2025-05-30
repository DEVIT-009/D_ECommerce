<script setup>
import { ref } from "vue";
import { ChevronDown } from "lucide-vue-next";

const faqs = ref([
  {
    question: "How do I place an order?",
    answer:
      "To place an order, simply browse our products, add items to your cart, and proceed to checkout. You'll need to create an account or sign in, provide shipping details, and complete the payment process. We accept various payment methods including credit cards and digital wallets.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept a variety of payment methods including major credit cards (Visa, MasterCard, American Express), PayPal, and other digital payment solutions. All transactions are secure and encrypted for your safety.",
  },
  {
    question: "How long does shipping take?",
    answer:
      "Standard shipping typically takes 3-5 business days within the country. International shipping may take 7-14 business days depending on the destination. Express shipping options are available for faster delivery.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We offer a 30-day return policy for most items. Products must be unused and in their original packaging. To initiate a return, please contact our customer service team through your account dashboard or email us.",
  },
  {
    question: "How can I track my order?",
    answer:
      "Once your order is shipped, you'll receive a tracking number via email. You can also track your order status by logging into your account and visiting the 'Order History' section.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by location. You can check shipping rates during checkout before completing your purchase.",
  },
  {
    question: "What if I receive a damaged item?",
    answer:
      "If you receive a damaged item, please take photos of the damage and contact our customer service within 48 hours of delivery. We'll arrange for a replacement or refund as appropriate.",
  },
  {
    question: "How can I change or cancel my order?",
    answer:
      "Orders can be modified or cancelled within 1 hour of placement, provided they haven't been processed for shipping. Please contact our customer service team immediately for assistance.",
  },
]);

const activeIndex = ref(null);

const toggleAccordion = (index) => {
  activeIndex.value = activeIndex.value === index ? null : index;
};
</script>

<template>
  <div class="w-full">
    <!-- Header Section -->
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
      <p class="text-base-content/70">
        Find answers to common questions about our products, shipping, returns,
        and more.
      </p>
    </div>

    <!-- FAQ Accordion -->
    <div class="space-y-4">
      <div
        v-for="(faq, index) in faqs"
        :key="index"
        class="bg-base-300 rounded-lg overflow-hidden"
      >
        <!-- Question Button -->
        <button
          @click="toggleAccordion(index)"
          class="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-base-200 transition-colors"
        >
          <span class="font-semibold">{{ faq.question }}</span>
          <ChevronDown
            class="w-5 h-5 transition-transform"
            :class="{ 'transform rotate-180': activeIndex === index }"
          />
        </button>

        <!-- Answer Content -->
        <div v-show="activeIndex === index" class="px-6 py-4 bg-base-200">
          <p class="text-base-content/80">{{ faq.answer }}</p>
        </div>
      </div>
    </div>

    <!-- Contact Support Section -->
    <div class="mt-12 text-center">
      <h2 class="text-2xl font-semibold mb-4">Still Have Questions?</h2>
      <p class="text-base-content/70 mb-6">
        Can't find the answer you're looking for? Our support team is here to
        help.
      </p>
      <RouterLink to="/contact" class="btn btn-accent">
        Contact Support
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.transform {
  transition: transform 0.3s ease;
}
</style>
