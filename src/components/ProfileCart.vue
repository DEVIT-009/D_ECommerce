<script setup>
import { useCartStore } from "../stores/cartStore.js";
import Button from "./Button.vue";
import { RouterLink } from "vue-router";
import { useUserStore } from "../stores/userData.js";
import rootrouter from "../routers/rootrouter.js";
import { ShoppingCart } from "lucide-vue-next";

const userStore = useUserStore();

function handleLogOut() {
  userStore.$reset(); // clear all user data
  rootrouter.push("/login");
}

const cartStore = useCartStore();


</script>

<template>
  <div class="w-fit navbar-end flex gap-4">
    <!-- Cart -->
    <div class="dropdown dropdown-end">
      <div tabindex="0" role="button" class="btn btn-square btn-circle btn-soft btn-accent md:btn-lg cursor-default">
        <div class="indicator">
          <ShoppingCart />
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
          class="ring-accent ring-offset-base-100 w-9 md:w-10 rounded-full ring-2 ring-offset-2"
        >
          <img :src="userStore.image || userStore.imgDefault" />
        </div>
      </div>
      <ul
        tabindex="0"
        class="menu menu-sm dropdown-content bg-base-300 rounded-box z-1 mt-2 w-52 p-4 shadow"
      >
        <li>
          <RouterLink to="/profile" class="w-full text-[15px]">
            Profile
          </RouterLink>
          <ul>
            <li>
              <RouterLink to="/manage-account" class="w-full ">
                Manage Account
              </RouterLink>
            </li>
          </ul>
        </li>
        <li>
          <li class=" menu-title">Account</li>
          <ul>
            <li>
              <RouterLink to="/login" class="w-full ">
                <!-- Login -->
                Login
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/register" class="w-full">
                <!-- Register -->
                {{ userStore.isActive ? "Add new Account" : "Create Account" }}
              </RouterLink>
            </li>
            <li>
              <button @click="handleLogOut" class="w-full">
                <!-- Logout -->
                Sign Out
              </button>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
