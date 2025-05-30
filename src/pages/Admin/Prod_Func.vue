<script setup>
import { Ellipsis, ArrowUpDown } from "lucide-vue-next";
import { RouterLink } from "vue-router";
import { useGetProd, useDeleteProd, state } from "@/services/ProductService.js";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import { useToast } from "vue-toastification";
import { ref, computed } from "vue";

const toast = useToast();
const { getProd } = useGetProd();
const { deleteProd } = useDeleteProd();

// Sorting state
const sortField = ref("product_name");
const sortDirection = ref("asc");

// Computed sorted products
const sortedProducts = computed(() => {
  if (!state.products) return [];

  return [...state.products].sort((a, b) => {
    let aVal = a[sortField.value];
    let bVal = b[sortField.value];

    // Handle nested properties
    if (sortField.value === "camera") {
      aVal = a.camera.rear;
      bVal = b.camera.rear;
    }

    if (typeof aVal === "string") {
      return sortDirection.value === "asc"
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    }

    return sortDirection.value === "asc" ? aVal - bVal : bVal - aVal;
  });
});

// Toggle sort
function toggleSort(field) {
  if (sortField.value === field) {
    sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
  } else {
    sortField.value = field;
    sortDirection.value = "asc";
  }
}

async function handleRemove(product_id) {
  // Confirmation
  const confirmDelete = window.confirm(
    "Are you sure you want to remove this item? This action cannot be undone."
  );
  if (!confirmDelete) return;

  // Remove process
  try {
    await deleteProd(product_id);
    if (!state.error && !state.isLoading) {
      toast.success("Product has been removed successfully");
      // Refresh products
      await getProd();
    }
  } catch (error) {
    toast.error("Failed to remove product");
    console.log(error);
  }
}

// Load products on mount
getProd();
</script>
<template>
  <div class="relative overflow-x-auto h-full w-full">
    <!-- Loading -->
    <div
      v-if="state.isLoading"
      class="fixed inset-0 flex items-center justify-center z-10 bg-base-300/5 backdrop-blur-[3px]"
    >
      <PulseLoader color="#ffffff" />
    </div>

    <!-- Empty State -->
    <div
      v-else-if="!state.products || state.products.length === 0"
      class="flex flex-col items-center justify-center py-10"
    >
      <p class="text-lg text-gray-500 dark:text-gray-400">No products found</p>
      <RouterLink to="/d-admin/product/add" class="btn btn-accent mt-4">
        Add New Product
      </RouterLink>
    </div>

    <!-- Data Show -->
    <table
      v-else
      class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
    >
      <!-- Heading -->
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th scope="col" class="px-6 py-3 max-lg:text-sm">Image</th>
          <th
            scope="col"
            class="px-6 py-3 max-lg:text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
            @click="toggleSort('product_name')"
          >
            <div class="flex items-center gap-2">
              Name
              <ArrowUpDown class="w-4 h-4" />
            </div>
          </th>
          <th
            scope="col"
            class="px-6 py-3 max-lg:text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
            @click="toggleSort('price')"
          >
            <div class="flex items-center gap-2">
              Price
              <ArrowUpDown class="w-4 h-4" />
            </div>
          </th>
          <th
            scope="col"
            class="px-6 py-3 max-lg:text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
            @click="toggleSort('quantity')"
          >
            <div class="flex items-center gap-2">
              Stock
              <ArrowUpDown class="w-4 h-4" />
            </div>
          </th>
          <th scope="col" class="px-6 py-3 max-lg:text-sm text-right">
            Options
          </th>
        </tr>
      </thead>
      <!-- Info -->
      <tbody>
        <tr
          v-for="(item, index) in sortedProducts"
          :key="index"
          class="bg-white border-b border-gray-200 hover:bg-gray-50 transition-all group dark:hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700"
        >
          <td class="p-4">
            <figure>
              <img
                :src="item.image"
                class="w-20 md:w-32 rounded-sm max-w-full max-h-full object-contain"
                :alt="item.product_name"
              />
            </figure>
          </td>
          <td
            class="px-6 py-4 font-semibold text-gray-900 dark:text-white max-md:text-[12px]"
          >
            {{ item.product_name }}
          </td>
          <td
            class="px-6 py-4 font-semibold text-gray-900 dark:text-white max-md:text-[12px]"
          >
            ${{ item.price.toLocaleString() }}
          </td>
          <td
            class="px-6 py-4 font-semibold text-gray-900 dark:text-white text-nowrap max-md:text-[12px]"
          >
            <span :class="{ 'text-error': item.quantity <= 5 }">
              {{
                item.quantity <= 1
                  ? item.quantity + " item"
                  : item.quantity + " items"
              }}
            </span>
          </td>
          <td class="px-6 py-4 max-md:text-[12px] text-right">
            <div class="dropdown dropdown-end">
              <button
                class="btn btn-circle btn-link group-hover:btn-soft group-hover:btn-accent"
                tabindex="0"
              >
                <Ellipsis />
              </button>
              <ul
                tabindex="0"
                class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <RouterLink :to="`/products/${item.product_id}`"
                    >Detail</RouterLink
                  >
                </li>
                <li>
                  <RouterLink :to="`/d-admin/product/edit/${item.product_id}`"
                    >Edit</RouterLink
                  >
                </li>
                <li class="text-error">
                  <button type="button" @click="handleRemove(item.product_id)">
                    Remove
                  </button>
                </li>
              </ul>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="px-6 pt-6 pb-20">
      <p class="text-gray-500 dark:text-gray-400">
        {{
          state.products.length <= 1
            ? state.products.length + " item"
            : state.products.length + " items"
        }}
      </p>
    </div>
  </div>
</template>
