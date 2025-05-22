<script setup>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
</script>
<template>
  <div class="px-1">
    <Header />
    <router-view />
    <Footer />
  </div>
</template>
