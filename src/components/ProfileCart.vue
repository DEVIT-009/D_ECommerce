<script setup>
import { useCartStore } from "../stores/cartStore.js";
import Button from "./Button.vue";
import { RouterLink } from "vue-router";
import { useUserStore } from "../stores/userData.js";
import rootrouter from "../routers/rootrouter.js";

const userStore = useUserStore();

function handleLogOut() {
  userStore.$reset(); // clear all user data
  rootrouter.push("/login");
}

const cartStore = useCartStore();
</script>

<template>
  <div class="navbar-end flex gap-4">
    <!-- Cart -->
    <div class="dropdown dropdown-end">
      <div tabindex="0" role="button" class="btn cursor-default">
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
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <span
            :class="`badge badge-sm -top-1 -right-2 bg-red-700 indicator-item ${
              cartStore.totalCount == 0 ? 'hidden' : ''
            }`"
          >
            {{ cartStore.totalCount }}
          </span>
        </div>
      </div>
      <div
        tabindex="0"
        class="card card-compact dropdown-content bg-base-100 z-1 w-52 shadow mt-2"
      >
        <div class="card-body bg-base-300 rounded-lg ring-1 ring-white/5">
          <span class="text-lg font-bold">
            {{ cartStore.totalCount }} items
          </span>
          <span class="text-info">
            Sub-Total: ${{ cartStore.subTotalPrice.toLocaleString() }}
          </span>
          <div class="card-actions">
            <Button
              text="View cart"
              _class="btn-primary btn-block"
              link="/cart"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- Profile -->
    <div class="dropdown dropdown-end">
      <div tabindex="0" role="button" class="avatar cursor-pointer">
        <div
          class="ring-accent ring-offset-base-100 w-9 rounded-full ring-2 ring-offset-2"
        >
          <img :src="userStore.image || userStore.imgDefault" />
        </div>
      </div>
      <ul
        tabindex="0"
        class="menu menu-sm dropdown-content bg-base-300 rounded-box z-1 mt-2 w-40 p-4 shadow"
      >
        <li>
          <RouterLink to="/profile" class="w-full md:text-[15px]"
            >Profile</RouterLink
          >
        </li>
        <li>
          <RouterLink to="/setting" class="w-full md:text-[15px]"
            >Settings</RouterLink
          >
        </li>
        <li>
          <RouterLink to="/login" class="w-full md:text-[15px]"
            >Log in</RouterLink
          >
        </li>
        <li>
          <button @click="handleLogOut" class="w-full md:text-[15px]">
            Log out
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>
