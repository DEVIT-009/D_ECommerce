<script setup>
import { Ellipsis } from "lucide-vue-next";
import { RouterLink } from "vue-router";
import { useGetProd, useDeleteProd, state } from "@/services/ProductService.js";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import { useToast } from "vue-toastification";

const toast = useToast();
const { getProd } = useGetProd();
const { deleteProd } = useDeleteProd();

async function handleRemove(id) {
  const confirmDelete = confirm("Are you sure you want to remove this item?");
  if (!confirmDelete) return;

  await deleteProd(id);
  if (!state.error && !state.isLoading) {
    toast.success("Product has been Removed successfully...");
    await getProd();
  }
}
</script>
<template>
  <div class="relative overflow-x-auto h-full w-full">
    <!-- Loading -->
    <div class="py-10 w-fit mx-auto" v-if="state.isLoading">
      <PulseLoader color="#ffffff" />
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
          <th scope="col" class="px-6 py-3 max-lg:text-sm">Name</th>
          <th scope="col" class="px-6 py-3 max-lg:text-sm">Price</th>
          <th scope="col" class="px-6 py-3 max-lg:text-sm">Stock</th>
          <th scope="col" class="px-6 py-3 max-lg:text-sm text-right">
            Options
          </th>
        </tr>
      </thead>
      <!-- Info -->
      <tbody>
        <tr
          v-for="(item, index) in state.products"
          :key="index"
          class="bg-white border-b border-gray-200 hover:bg-gray-50 transition-all group dark:hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700"
        >
          <td class="p-4">
            <figure>
              <img
                :src="item.image"
                class="w-20 md:w-32 rounded-sm max-w-full max-h-full"
                alt="Apple Watch"
              />
            </figure>
          </td>
          <td
            class="px-6 py-4 font-semibold text-gray-900 dark:text-white max-md:text-[12px]"
          >
            {{ item.name }}
          </td>
          <td
            class="px-6 py-4 font-semibold text-gray-900 dark:text-white max-md:text-[12px]"
          >
            ${{ item.price.toLocaleString() }}
          </td>
          <td
            class="px-6 py-4 font-semibold text-gray-900 dark:text-white text-nowrap max-md:text-[12px]"
          >
            {{
              item.quantity <= 1
                ? item.quantity + " item"
                : item.quantity + " items"
            }}
          </td>
          <td class="px-6 py-4 max-md:text-[12px] text-right">
            <!-- ====================================================================== -->
            <button
              class="btn btn-circle btn-link group-hover:btn-soft group-hover:btn-primary"
              :popovertarget="`popover-${index + 1}`"
              :style="`anchor-name: --anchor-${index + 1}`"
            >
              <Ellipsis />
            </button>
            <ul
              class="dropdown dropdown-end menu min-w-32 rounded-box bg-base-100 shadow-sm md:translate-y-[25%] translate-y-[10%]"
              popover
              :id="`popover-${index + 1}`"
              :style="`position-anchor: --anchor-${index + 1}`"
            >
              <li class="">
                <RouterLink :to="`/products/${item.id}`">Detail</RouterLink>
              </li>
              <li class="">
                <RouterLink :to="`/d-admin/product/edit/${item.id}`"
                  >Edit</RouterLink
                >
              </li>
              <li class="text-error">
                <button type="button" @click="handleRemove(item.id)">
                  Remove
                </button>
              </li>
            </ul>
            <!-- ====================================================================== -->
          </td>
        </tr>
      </tbody>
    </table>
    <div class="px-6 pt-6 pb-20">
      <p>
        {{
          state.products.length <= 1
            ? state.products.length + " item"
            : state.products.length + " items"
        }}
      </p>
    </div>
  </div>
</template>
