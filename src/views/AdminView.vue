<script setup>
import Admin_MenuLeft from "../components/Admin_MenuLeft.vue";
</script>
<template>
  <div class="max-w-7xl w-full mx-auto flex flex-col">
    <Admin_MenuLeft />
    <div class="w-full py-4 px-2">
      <router-view />
    </div>
  </div>
</template>
