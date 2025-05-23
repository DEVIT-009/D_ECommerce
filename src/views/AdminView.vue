<script setup>
import Header from "@/components/Header.vue";
</script>
<template>
  <div class="max-w-7xl w-full mx-auto flex flex-col">
    <!-- <Admin_MenuLeft /> -->
    <Header :isAdmin="true" />
    <div class="w-full py-4 px-2">
      <router-view />
    </div>
  </div>
</template>
