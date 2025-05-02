<script setup>
import Admin_MenuLeft from "../components/Admin_MenuLeft.vue";
</script>
<template>
  <div class="max-w-7xl w-full mx-auto lg:flex">
    <Admin_MenuLeft />
    <div class="w-full">
      <router-view />
    </div>
  </div>
</template>
