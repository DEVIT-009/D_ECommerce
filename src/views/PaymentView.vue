<script setup>
import OrderSummery from "../components/OrderSummery.vue";
import GrandTotal from "../components/GrandTotal.vue";
import Help from "../components/Help.vue";
</script>
<template>
  <section class="max-w-7xl mx-auto flex flex-wrap gap-2 p-2">
    <router-view />
    <div class="relative lg:max-w-[500px] w-full flex flex-col gap-4">
      <!-- Order summery and delivery -->
      <OrderSummery />
      <!-- Grand Total -->
      <GrandTotal />
      <!-- Help -->
      <Help />
    </div>
  </section>
</template>
