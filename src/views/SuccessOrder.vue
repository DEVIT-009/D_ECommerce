<script setup>
import {
  Check,
  House,
  SquareUser,
  FileText,
  MessageSquare,
  HelpCircle,
  Star,
  Truck,
  RotateCcw,
  Shield,
} from "lucide-vue-next";
import Invoice from "../components/Invoice.vue";
// logo svg
import { RouterLink } from "vue-router";

const navLinks = [
  {
    title: "Contact Us",
    icon: MessageSquare,
    to: "/contact",
  },
  {
    title: "FAQs",
    icon: HelpCircle,
    to: "/faq",
  },
  {
    title: "Feedback",
    icon: Star,
    to: "/feedback",
  },
];

const policyLinks = [
  {
    title: "Delivery Policy",
    icon: Truck,
    to: "/shipping-policy",
  },
  {
    title: "Return & Refund",
    icon: RotateCcw,
    to: "/return-refund",
  },
  {
    title: "Privacy Policy",
    icon: Shield,
    to: "/privacy-policy",
  },
];
</script>

<template>
  <div class="max-w-7xl w-full mx-auto py-3 max-md:px-3">
    <!-- Main Content Grid -->
    <div class="grid md:grid-cols-2 gap-4">
      <!-- Invoice Column -->
      <div class="w-full">
        <Invoice :order_date="new Date().toLocaleDateString()" />
      </div>

      <!-- Success Message Column -->
      <div class="flex flex-col gap-4">
        <!-- Thank place -->
        <div
          class="flex flex-col items-center justify-center bg-base-300 w-full p-7 rounded-lg"
        >
          <Check
            class="text-white bg-success p-2 rounded-full"
            strokeWidth="5"
            size="60"
          />
          <h1
            class="md:text-4xl sm:text-xl text-lg font-bold text-center max-w-3xl mt-4"
          >
            Your order is successfully,
            <span class="text-success">Thank You</span> for Ordering and Trust
            our service!
          </h1>
          <p class="text-white/70 text-center mt-7">
            Your order is about to delivery as soon as possible and we will
            contact you for getting your order. In case that you prefer to
            getting the products at our store we always be there waiting for you
            to getting out, thank you for the order hope you doing well and see
            you soon.
          </p>
          <RouterLink class="btn btn-success px-10 mt-4" to="/">
            <House />
            Back to Homepage!
          </RouterLink>
        </div>

        <!-- For more informations -->
        <div class="w-full bg-base-300 p-6 rounded-lg">
          <h2 class="text-xl font-bold mb-4 flex items-center gap-2">
            <SquareUser size="24" />
            For More Information
          </h2>
          <div class="grid grid-cols-2 gap-3">
            <RouterLink
              v-for="link in navLinks"
              :key="link.title"
              :to="link.to"
              class="flex items-center gap-2 bg-base-200 p-3 rounded-lg hover:bg-base-100 transition-colors group"
            >
              <component
                :is="link.icon"
                class="w-5 h-5 group-hover:text-success"
              />
              <span class="font-medium">{{ link.title }}</span>
            </RouterLink>
          </div>
        </div>
        <!-- Policy Section -->
        <div class="w-full bg-base-300 p-6 rounded-lg">
          <h2 class="text-xl font-bold mb-4 flex items-center gap-2">
            <FileText size="24" />
            Our Policies
          </h2>
          <div class="grid grid-cols-1 gap-3">
            <RouterLink
              v-for="policy in policyLinks"
              :key="policy.title"
              :to="policy.to"
              class="flex items-center gap-3 bg-base-200 p-4 rounded-lg hover:bg-base-100 transition-colors group"
            >
              <component
                :is="policy.icon"
                class="w-6 h-6 group-hover:text-success"
              />
              <span class="font-medium">{{ policy.title }}</span>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
