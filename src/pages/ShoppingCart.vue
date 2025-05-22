<script setup>
// cart store for managing cart state
import { useCartStore } from "../stores/cartStore";
// pinia utilities for reactivity
import { storeToRefs } from "pinia";
// components
import GrandTotal from "../components/GrandTotal.vue";
// Style
import { Plus, Minus, X } from "lucide-vue-next";
import { useToast } from "vue-toastification";
// router for navigation
import rootrouter from "@/routers/rootrouter";

const cartStore = useCartStore();
const { cartItems } = storeToRefs(cartStore); // reactive reference

function handleAdd(id) {
  const product = cartStore.cartItems.find((item) => item.product_id === id);
  if (product) {
    cartStore.addToCart(product);
  }
}
function handleRemoveOne(id) {
  cartStore.removeOneFromCart(id);
}
function handleRemoveProd(id) {
  cartStore.removeProdFromCart(id);
}
const toast = useToast();
function handleGoToPayment() {
  if (cartStore.cartItems.length > 0) {
    rootrouter.push("/payment");
  } else {
    toast.error("There is no product in your cart!", {
      position: "bottom-right",
      timeout: 1500,
    });
  }
}
</script>

<template>
  <section class="w-full flex max-lg:flex-col-reverse gap-2">
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg flex-1">
      <table
        class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
      >
        <thead
          class="text-xs text-white uppercase bg-base-300 border-b border-white/30 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3">N°</th>
            <th scope="col" class="px-6 py-3">Image</th>
            <th scope="col" class="px-6 py-3">Product</th>
            <th scope="col" class="px-6 py-3">Quantity</th>
            <th scope="col" class="px-6 py-3">Price</th>
            <th scope="col" class="px-6 py-3">Total</th>
            <th scope="col" class="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(product, index) in cartItems"
            :key="index"
            class="bg-base-100 border-b border-white/30 hover:bg-base-300"
          >
            <td class="p-4">
              {{ index < 9 ? "0" + (index + 1) : index + 1 }}
            </td>
            <td class="p-4">
              <img
                :src="product.image"
                class="w-16 md:w-28 max-w-full max-h-full rounded-lg"
                alt="Apple Watch"
              />
            </td>
            <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
              {{ product.name }}
            </td>
            <td class="px-6 py-4">
              <div class="flex items-center">
                <button
                  class="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                  type="button"
                  @click="() => handleRemoveOne(product.product_id)"
                >
                  <Minus />
                </button>
                <div>
                  <input
                    type="number"
                    :value="product.qty"
                    id="first_product"
                    class="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="1"
                    required
                  />
                </div>
                <button
                  class="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                  type="button"
                  @click="() => handleAdd(product.product_id)"
                >
                  <Plus />
                </button>
              </div>
            </td>
            <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
              ${{ product.price.toLocaleString() }}
            </td>
            <td class="px-6 py-4 font-semibold text-gray-900 dark:text-white">
              ${{ (product.qty * product.price).toLocaleString() }}
            </td>
            <td class="px-6 py-4">
              <button
                @click="() => handleRemoveProd(product.product_id)"
                class="btn btn-error btn-circle btn-soft"
              >
                <X />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="min-w-100">
      <GrandTotal />
      <div class="mt-2">
        <button class="btn btn-primary w-full" @click="handleGoToPayment">
          Payment
        </button>
      </div>
    </div>
  </section>
</template>

<style>
@import "tailwindcss";
td {
  @apply lg:text-sm;
}
.list-grand-total {
  @apply grid-cols-[2fr_1fr] items-center gap-2 text-lg;
}
.list-grand-total .label {
  @apply flex items-center gap-2;
}
</style>
