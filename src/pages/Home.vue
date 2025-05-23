<script setup>
import CardContainer from "../components/CardContainer.vue";
import { CornerDownRight } from "lucide-vue-next";
</script>
<template>
  <div class="w-full">
    <RouterLink to="/products" class="btn md:btn-xl btn-accent">
      <CornerDownRight />
      OUR Products
    </RouterLink>
    <CardContainer :limit="12" />
  </div>
</template>
