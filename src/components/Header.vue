<script setup>
import Nav from "./Nav.vue";
import { RouterLink } from "vue-router";
import ProfileCart from "./ProfileCart.vue";
</script>

<template>
  <div
    class="navbar bg-base-300/50 ring-1 ring-base-300 backdrop-blur-md shadow-md max-w-7xl mx-auto sticky top-0 z-100"
  >
    <Nav class="w-fit" />

    <div class="navbar-center md:px-7 flex-1 grid place-items-center">
      <RouterLink :to="'/'" class="btn md:btn-lg btn-ghost">
        D-CAMPhone
      </RouterLink>
    </div>

    <ProfileCart />
  </div>
</template>
