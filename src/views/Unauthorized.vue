<script setup>
import { House } from "lucide-vue-next";
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="w-screen h-[90vh] flex items-center justify-center">
    <div class="text-center text-4xl">
      <h1 class="text-error text-5xl md:text-7xl font-bold">403 Forbidden</h1>
      <h2 class="text-xl md:text-3xl text-white/40 mt-5">
        Access <span class="text-warning">Denied!</span>
      </h2>
      <h2 class="text-xl md:text-3xl text-white/40 mb-5">
        You are not able to access this page!
      </h2>
      <RouterLink class="btn btn-warning btn-wide max-md:btn-sm" to="/">
        <House class="w-4 h-4" />
        Go back to HomePage
      </RouterLink>
    </div>
  </div>
</template>
