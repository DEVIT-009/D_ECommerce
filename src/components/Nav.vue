<script setup>
import { RouterLink } from "vue-router";
import { useUserStore } from "@/stores/userData.js";
import { Cog, Text, X } from "lucide-vue-next";

const userStore = useUserStore();
// Display nnavlink
const props = defineProps({
  navLink: {
    type: Array,
    default: [],
    required: true,
  },
  isAdminView: {
    type: Boolean,
    default: false,
  },
});
</script>
<template>
  <div class="navbar-start">
    <div class="drawer">
      <input id="my-drawer" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content">
        <!-- Page content here -->
        <label
          for="my-drawer"
          class="btn md:btn-lg btn-accent btn-soft btn-square btn-circle drawer-button"
        >
          <Text />
        </label>
      </div>
      <div class="drawer-side border-s-2 border-accent/20">
        <label
          for="my-drawer"
          aria-label="close sidebar"
          class="drawer-overlay"
        >
        </label>
        <div class="menu bg-base-100 text-base-content min-h-full w-80 p-4">
          <li class="mb-2">
            <label
              for="my-drawer"
              aria-label="close"
              class="btn md:btn-lg btn-accent btn-soft btn-square btn-circle"
            >
              <X />
            </label>
          </li>
          <!-- Menu -->
          <!-- Admin -->
          <li v-if="userStore.position != 'user'" class="hover:bg-transparent">
            <hr class="border-accent/30 my-1 rounded-[0] p-0" />
            <RouterLink
              class="text-accent bg-accent/10 font-bold hover:bg-accent hover:text-base-content"
              :to="isAdminView ? '/' : '/d-admin'"
            >
              <Cog class="w-4 h-4 btn-accent" />{{
                isAdminView ? "Home" : "Admin"
              }}
            </RouterLink>
          </li>
          <!-- Home, Phone, About, Contact, Policy-->
          <li v-for="item in props.navLink" :key="item.link">
            <component
              :is="item.isBorder ? 'hr' : null"
              class="border-accent/30 my-1 rounded-[0] p-0"
            />
            <!-- One NavLink -->
            <RouterLink :to="item.link" v-if="!Array.isArray(item.link)">
              <component :is="item.icon" class="w-4 h-4" />{{ item.label }}
            </RouterLink>
            <!-- Multi NavLink -->
            <details open v-else>
              <summary>
                <component :is="item.icon" class="w-4 h-4" />{{ item.label }}
              </summary>
              <ul>
                <li v-for="subItem in item.link">
                  <RouterLink :to="subItem.link">
                    {{ subItem.label }}
                  </RouterLink>
                </li>
              </ul>
            </details>
          </li>
        </div>
      </div>
    </div>
  </div>
</template>
