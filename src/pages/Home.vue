<script setup>
import CardContainer from "../components/CardContainer.vue";
import { CornerDownRight } from "lucide-vue-next";
</script>
<template>
  <div class="max-w-7xl mx-auto my-2">
    <RouterLink to="/products" class="btn btn-xl btn-primary btn-soft">
      <CornerDownRight />
      OUR Products
    </RouterLink>
    <CardContainer :limit="12" />
  </div>
</template>
