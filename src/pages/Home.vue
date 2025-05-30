<script setup>
import CardContainer from "../components/CardContainer.vue";
import { CornerDownRight } from "lucide-vue-next";
import PhoneSlider from "../components/PhoneSlider.vue";
</script>
<template>
  <div class="w-full">
    <PhoneSlider />
    <RouterLink to="/products" class="btn md:btn-xl btn-accent">
      <CornerDownRight />
      OUR Products
    </RouterLink>
    <CardContainer :limit="12" />
  </div>
</template>
