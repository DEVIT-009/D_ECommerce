<script setup>
import { House } from "lucide-vue-next";
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="w-screen h-[90vh] flex items-center justify-center">
    <div class="text-center text-4xl">
      <h1 class="text-error text-5xl md:text-7xl font-bold">404 Not-Found</h1>
      <h2 class="text-xl md:text-3xl text-white/40 my-2">
        You browse in wrong site
      </h2>
      <RouterLink class="btn btn-warning btn-wide max-md:btn-sm" to="/">
        <House class="w-4 h-4" />
        Go back to HomePage
      </RouterLink>
    </div>
  </div>
</template>
