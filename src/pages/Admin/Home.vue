<script setup>
import { RouterLink } from "vue-router";
import { useGetProd } from "@/services/ProductService";
import { useGetUser } from "@/services/userService";
import { useCartStore } from "@/stores/cartStore";
import {
  Smartphone,
  Users,
  ShoppingCart,
  Package,
  Plus,
  UserPlus,
  Edit,
} from "lucide-vue-next";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";

// Get data from services
const { state: productState, getProd } = useGetProd();
const { state: userState, getUser } = useGetUser();
const cartStore = useCartStore();

// Fetch initial data
getProd();
getUser();
</script>

<template>
  <div class="w-full p-4">
    <!-- Loading State -->
    <div
      v-if="productState.isLoading || userState.isLoading"
      class="w-full flex justify-center items-center min-h-[400px]"
    >
      <div class="text-center">
        <PulseLoader color="#ffffff" />
      </div>
    </div>

    <!-- Dashboard Content -->
    <div v-else class="space-y-6">
      <!-- Welcome Section -->
      <div class="bg-base-300 rounded-lg p-6 shadow-sm">
        <h1 class="text-3xl font-bold">Welcome to Admin Dashboard</h1>
        <p class="text-white/70 mt-2">
          Manage your products, users, and monitor your store's performance.
        </p>
      </div>

      <!-- Statistics Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <!-- Products Card -->
        <div class="bg-base-300 rounded-lg p-6 shadow-sm">
          <div class="flex items-center gap-4">
            <div class="bg-primary/20 p-3 rounded-lg">
              <Smartphone class="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 class="text-lg font-semibold">Total Products</h3>
              <p class="text-2xl font-bold">
                {{ productState.products?.length || 0 }}
                {{ productState.products?.length <= 1 ? "item" : "items" }}
              </p>
            </div>
          </div>
          <RouterLink
            to="/d-admin/product/display"
            class="btn btn-primary btn-sm mt-4 w-full"
          >
            View Products
          </RouterLink>
        </div>

        <!-- Users Card -->
        <div class="bg-base-300 rounded-lg p-6 shadow-sm">
          <div class="flex items-center gap-4">
            <div class="bg-accent/20 p-3 rounded-lg">
              <Users class="w-6 h-6 text-accent" />
            </div>
            <div>
              <h3 class="text-lg font-semibold">Total Users</h3>
              <p class="text-2xl font-bold">
                {{ userState.users?.length || 0 }}
                {{ userState.users?.length <= 1 ? "user" : "users" }}
              </p>
            </div>
          </div>
          <RouterLink
            to="/d-admin/user/display"
            class="btn btn-accent btn-sm mt-4 w-full"
          >
            View Users
          </RouterLink>
        </div>

        <!-- Cart Items Card -->
        <div class="bg-base-300 rounded-lg p-6 shadow-sm">
          <div class="flex items-center gap-4">
            <div class="bg-success/20 p-3 rounded-lg">
              <ShoppingCart class="w-6 h-6 text-success" />
            </div>
            <div>
              <h3 class="text-lg font-semibold">Cart Items</h3>
              <p class="text-2xl font-bold">
                {{ cartStore.totalCount }}
                {{ cartStore.totalCount <= 1 ? "item" : "items" }}
              </p>
            </div>
          </div>
          <RouterLink to="/cart" class="btn btn-success btn-sm mt-4 w-full">
            View Cart
          </RouterLink>
        </div>

        <!-- Stock Card -->
        <div class="bg-base-300 rounded-lg p-6 shadow-sm">
          <div class="flex items-center gap-4">
            <div class="bg-warning/20 p-3 rounded-lg">
              <Package class="w-6 h-6 text-warning" />
            </div>
            <div>
              <h3 class="text-lg font-semibold">Total Stock</h3>
              <p class="text-2xl font-bold">
                {{
                  productState.products
                    ? productState.products.reduce(
                        (sum, prod) => sum + (parseInt(prod.quantity) || 0),
                        0
                      )
                    : 0
                }}
                items
              </p>
            </div>
          </div>
          <RouterLink
            to="/d-admin/product/func"
            class="btn btn-warning btn-sm mt-4 w-full"
          >
            Manage Stock
          </RouterLink>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="bg-base-300 rounded-lg p-6 shadow-sm">
        <h2 class="text-xl font-bold mb-4">Quick Actions</h2>
        <p class="text-base-content/50 mb-4">
          Quick access to common administrative tasks. Use these buttons to
          efficiently manage products and users.
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <RouterLink to="/d-admin/product/add" class="btn btn-primary">
            <Plus class="w-5 h-5" />
            Add New Product
          </RouterLink>
          <RouterLink to="/d-admin/user/add" class="btn btn-accent">
            <UserPlus class="w-5 h-5" />
            Add New User
          </RouterLink>
          <RouterLink to="/d-admin/product/func" class="btn btn-success">
            <Edit class="w-5 h-5" />
            Edit Products
          </RouterLink>
          <RouterLink to="/d-admin/user/display" class="btn btn-warning">
            <Users class="w-5 h-5" />
            Manage Users
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
