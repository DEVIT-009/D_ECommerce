<script setup>
import { RouterLink } from "vue-router";
import logo from "../assets/logo_white.png";
import { Smartphone, Users } from "lucide-vue-next";
</script>
<template>
  <div class="drawer lg:drawer-open w-fit">
    <input id="my-drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content block lg:hidden">
      <!-- Page content here -->
      <label for="my-drawer" class="btn drawer-button swap swap-rotate">
        <!-- this hidden checkbox controls the state -->
        <input type="checkbox" />

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

        <!-- close icon -->
        <svg
          class="swap-on fill-current"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 512 512"
        >
          <polygon
            points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49"
          />
        </svg>
      </label>
    </div>
    <div class="drawer-side lg:static">
      <label
        for="my-drawer"
        aria-label="close sidebar"
        class="drawer-overlay lg:hidden"
      ></label>
      <!-- Content -->
      <ul class="menu bg-base-200 min-w-56 relative h-full">
        <div class="navbar bg-base-300 w-full sticky top-0 left-0 z-10">
          <div class="avatar">
            <div class="w-9 rounded ring-1 ring-white p-1">
              <img :src="logo" alt="logo-DV" />
            </div>
          </div>
        </div>
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
