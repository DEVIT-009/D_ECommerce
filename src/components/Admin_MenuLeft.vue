<script setup>
import { RouterLink } from "vue-router";
import { LayoutDashboard, Smartphone, Text, Users } from "lucide-vue-next";
import ProfileCart from "@/components/ProfileCart.vue";
</script>
<template>
  <div
    class="navbar ring-1 ring-base-300 backdrop-blur-md shadow-md max-w-7xl mx-auto sticky top-0 z-10 w-full"
  >
    <!-- button left menu -->
    <div class="drawer top-0 left-10 sticky w-fit z-[100]">
      <input id="my-drawer" type="checkbox" class="drawer-toggle" />
      <!-- header with toggle btn -->
      <div class="flex-none">
        <!-- Toggle btn -->
        <label
          for="my-drawer"
          class="btn md:btn-lg drawer-button swap swap-rotate"
        >
          <!-- hamburger icon -->
          <Text />
        </label>
      </div>
      <!--  
      Listing info of admin
      -->
      <div class="drawer-side">
        <label
          for="my-drawer"
          aria-label="close sidebar"
          class="drawer-overlay"
        ></label>
        <!-- Content -->
        <ul
          class="menu dark:bg-base-100 text-base-content min-h-full w-56 p-4 pt-20"
        >
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
                <RouterLink to="/d-admin/product/func"
                  >Edit | Remove</RouterLink
                >
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
                <RouterLink to="/d-admin/user/display"
                  >Display Users</RouterLink
                >
              </li>
              <hr class="w-[90%] mx-auto my-1 border-white/20" />
              <li>
                <RouterLink to="/d-admin/user/add">
                  Register | Add Users
                </RouterLink>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>

    <div class="navbar-center md:px-7 flex-1 grid place-items-center">
      <RouterLink :to="'/'" class="btn md:btn-lg btn-ghost">
        D-CAMPhone
      </RouterLink>
    </div>

    <ProfileCart />
  </div>
</template>
