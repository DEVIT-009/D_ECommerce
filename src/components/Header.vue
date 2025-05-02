<script setup>
import Nav from "./Nav.vue";
import { RouterLink } from "vue-router";
import ProfileCart from "./ProfileCart.vue";
</script>

<template>
  <div
    class="navbar bg-base-300/50 ring-1 ring-base-300 backdrop-blur-md shadow-md max-w-7xl mx-auto sticky top-0 z-100"
  >
    <Nav />

    <div class="navbar-center btn md:px-7">
      <RouterLink :to="'/'" class="md:text-xl">D-CAMPhone</RouterLink>
    </div>

    <ProfileCart />
  </div>
</template>
