<script setup>
import { RouterLink } from "vue-router";
import { useUserStore } from "../stores/userData.js";

const userStore = useUserStore();
</script>

<template>
  <div class="navbar-start">
    <div class="dropdown dropdown-start">
      <div tabindex="0" role="button" class="btn">
        <div class="indicator">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
        </div>
      </div>
      <div
        tabindex="0"
        class="card card-compact dropdown-content z-1 mt-2 w-52 shadow"
      >
        <div class="card-body bg-base-300 rounded-lg ring-1 ring-white/5">
          <RouterLink class="btn" to="/">Homepage</RouterLink>
          <RouterLink class="btn" to="/products">Our Products</RouterLink>
          <RouterLink class="btn" to="/about">About us</RouterLink>
          <RouterLink
            class="btn"
            to="/d-admin"
            v-if="userStore.position == 'admin'"
          >
            Admin
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
