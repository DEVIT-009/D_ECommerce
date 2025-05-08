<script setup>
import Admin_MenuLeft from "../components/Admin_MenuLeft.vue";
</script>
<template>
  <div class="max-w-7xl w-full mx-auto flex flex-col">
    <div class="w-full relative">
      <Admin_MenuLeft />
    </div>
    <div class="w-full pt-16">
      <router-view />
    </div>
  </div>
</template>
