<script setup>
import { RouterLink } from "vue-router";
import { LayoutDashboard, Smartphone, Users } from "lucide-vue-next";
import { useUserStore } from "../stores/userData.js";
import rootrouter from "../routers/rootrouter.js";

const userStore = useUserStore();

function handleLogOut() {
  userStore.$reset(); // clear all user data
  rootrouter.push("/login");
}
</script>
<template>
  <div class="drawer top-0 left-0 sticky z-10">
    <input id="my-drawer" type="checkbox" class="drawer-toggle" />
    <!-- header with toggle btn -->
    <div
      class="navbar bg-base-300 shadow-sm absolute top-0 left-0 w-full z-[100]"
    >
      <div class="flex-none">
        <!-- Toggle btn -->
        <label
          for="my-drawer"
          class="btn md:btn-lg drawer-button swap swap-rotate"
        >
          <!-- hamburger icon -->
          <svg
            class="swap-off fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 512 512"
          >
            <path
              d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z"
            />
          </svg>
        </label>
      </div>
      <!-- Logo -->
      <div class="flex-1 grid place-items-center">
        <RouterLink :to="'/'" class="btn md:btn-lg btn-ghost"
          >D-CAMPhone</RouterLink
        >
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
          <li><a class="w-full md:text-[15px]">Settings</a></li>
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
    <!--  
      Listing info 
    -->
    <div class="drawer-side">
      <label
        for="my-drawer"
        aria-label="close sidebar"
        class="drawer-overlay"
      ></label>
      <!-- Content -->
      <ul class="menu bg-base-300 text-base-content min-h-full w-56 p-4 pt-20">
        <li>
          <!-- Products -->
          <RouterLink to="/d-admin" class="text-xl flex items-center">
            <LayoutDashboard class="w-5 h-5" />
            Dashboard
          </RouterLink>
        </li>
        <li>
          <!-- Products -->
          <RouterLink to="" class="text-xl flex items-center">
            <Smartphone class="w-5 h-5" />
            Products
          </RouterLink>
          <ul>
            <li>
              <RouterLink to="/d-admin/product/display">
                Display Products
              </RouterLink>
            </li>
            <hr class="w-[90%] mx-auto my-1 border-white/20" />
            <li>
              <RouterLink to="/d-admin/product/add">Add Products</RouterLink>
            </li>
            <li>
              <RouterLink to="/d-admin/product/func">Edit | Remove</RouterLink>
            </li>
          </ul>
        </li>
        <li>
          <!-- User -->
          <RouterLink to="" class="text-lg flex items-center">
            <Users class="w-5 h-5" />
            Users
          </RouterLink>
          <ul>
            <li>
              <RouterLink to="/d-admin/user/display">Display Users</RouterLink>
            </li>
            <hr class="w-[90%] mx-auto my-1 border-white/20" />
            <li>
              <RouterLink to="/d-admin/user/add"
                >Register | Add Users</RouterLink
              >
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
