<script setup>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
</script>
<template>
  <Header />
  <div class="px-2 py-3 max-w-7xl mx-auto">
    <router-view />
  </div>
  <Footer />
</template>
