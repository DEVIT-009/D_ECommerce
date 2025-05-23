<script setup>
import { RouterLink } from "vue-router";
import { useGetProd } from "@/services/ProductService";
import { useGetUser } from "@/services/userService";
import { useCartStore } from "@/stores/cartStore";
import {
  Smartphone,
  ShoppingCart,
  Package,
  Users,
  Plus,
  Edit,
  UserPlus,
} from "lucide-vue-next";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import TotalCardDashboard from "../../components/TotalCardDashboard.vue";
import { onMounted, reactive } from "vue";

// Get data from services
const { state: productState, getProd } = useGetProd();
const { state: userState, getUser } = useGetUser();
const cartStore = useCartStore();

// init data
const dataState = reactive({
  totalProduct: 0,
  totalCart: 0,
  totalStock: 0,
  totalUser: 0,
});

onMounted(async () => {
  await getProd();
  await getUser();

  if (!productState.isLoading && !userState.isLoading) {
    dataState.totalProduct = productState.products?.length || 0;
    dataState.totalUser = userState.users?.length || 0;
    dataState.totalStock =
      productState.products?.reduce(
        (sum, prod) => sum + (parseInt(prod.quantity) || 0),
        0
      ) || 0;
    dataState.totalCart = cartStore.totalCount || 0;
  }
});

const dataTotal = [
  {
    title: "Total Products",
    get total() {
      return `${dataState.totalProduct} ${
        dataState.totalProduct <= 1 ? "item" : "items"
      }`;
    },
    icon: Smartphone,
    link: "/d-admin/product/display",
    nameBtn: "View Products",
    color: "info",
  },
  {
    title: "Cart Items",
    get total() {
      return `${dataState.totalCart} ${
        dataState.totalCart <= 1 ? "item" : "items"
      }`;
    },
    icon: ShoppingCart,
    link: "/cart",
    nameBtn: "View Cart",
    color: "info",
  },

  {
    title: "Total Stock",
    get total() {
      return `${dataState.totalStock} ${
        dataState.totalStock <= 1 ? "item" : "items"
      }`;
    },
    icon: Package,
    link: "/d-admin/product/func",
    nameBtn: "Manage Stock",
    color: "info",
  },
  {
    title: "Total Users",
    get total() {
      return `${dataState.totalUser} ${
        dataState.totalUser <= 1 ? "user" : "users"
      }`;
    },
    icon: Users,
    link: "/d-admin/user/display",
    nameBtn: "View Users",
    color: "accent",
  },
];
const btnQuickAction = [
  {
    title: "Add New Product",
    icon: Plus,
    link: "/d-admin/product/add",
    color: "info",
  },
  {
    title: "Edit Products",
    icon: Edit,
    link: "/d-admin/product/func",
    color: "info",
  },
  {
    title: "Add New User",
    icon: UserPlus,
    link: "/d-admin/user/add",
    color: "accent",
  },
  {
    title: "Manage Users",
    icon: Users,
    link: "/d-admin/user/display",
    color: "accent",
  },
];
</script>

<template>
  <div class="w-full">
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
        <TotalCardDashboard
          v-for="item in dataTotal"
          :key="item.title"
          :title="item.title"
          :total="item.total"
          :icon="item.icon"
          :link="item.link"
          :nameBtn="item.nameBtn"
          :color="item.color"
        />
      </div>

      <!-- Quick Actions -->
      <div class="bg-base-300 rounded-lg p-6 shadow-sm">
        <h2 class="text-xl font-bold mb-4">Quick Actions</h2>
        <p class="text-base-content/50 mb-4">
          Quick access to common administrative tasks. Use these buttons to
          efficiently manage products and users.
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <RouterLink
            v-for="item in btnQuickAction"
            :key="item.title"
            :to="item.link"
            :class="`btn btn-${item.color} btn-outline`"
          >
            <component :is="item.icon" class="w-5 h-5" />
            {{ item.title }}
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
