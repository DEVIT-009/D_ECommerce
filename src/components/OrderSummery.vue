<script setup>
import { storeToRefs } from "pinia";
import { useCartStore } from "../stores/cartStore.js";
import { Code } from "lucide-vue-next";

const cartStore = useCartStore();
const { cartItems } = storeToRefs(cartStore);
</script>
<template>
  <!-- Heading -->
  <div class="w-full">
    <h1
      class="text-2xl bg-base-300 rounded-full py-4 px-7 font-bold flex items-center gap-2 mb-2"
    >
      <Code />
      Order Summery
    </h1>
    <!-- Table invoice -->
    <div class="w-full overflow-x-auto">
      <table class="w-full text-sm text-left text-gray-500">
        <thead class="bg-base-300 text-white text-xs uppercase">
          <tr>
            <th scope="col" class="px-6 py-3">N°</th>
            <th scope="col" class="px-6 py-3">Name</th>
            <th scope="col" class="px-6 py-3">Quantity</th>
            <th scope="col" class="px-6 py-3">Price</th>
            <th scope="col" class="px-6 py-3">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="border-b bg-gray-800 border-white/30"
            v-for="(product, index) in cartItems"
            :key="index"
          >
            <td class="px-6 py-4">
              {{ index < 9 ? "0" + (index + 1) : index + 1 }}
            </td>
            <th
              scope="row"
              class="px-6 py-4 font-medium whitespace-nowrap text-white"
            >
              {{ product.product_name }}
            </th>
            <td class="px-6 py-4">{{ product.qty }}</td>
            <td class="px-6 py-4">${{ product.price.toLocaleString() }}</td>
            <td class="px-6 py-4 text-white">
              ${{ (product.qty * product.price).toLocaleString() }}
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th
              scope="col"
              colspan="3"
              class="px-6 py-3 text-white text-center bg-base-300"
            >
              Sub-Total :
            </th>
            <th
              scope="col"
              colspan="2"
              class="px-6 py-3 text-center text-white border-l-2 border-white/20 bg-base-300"
            >
              ${{
                cartStore.subTotalPrice.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              }}
            </th>
          </tr>
        </tfoot>
      </table>
    </div>
    <!-- Delivery section -->
    <div
      class="grid md:grid-cols-2 gap-4 p-4 bg-base-300 ring-1 ring-accent mt-4"
    >
      <!-- Delivery -->
      <div class="flex items-center gap-2">
        <input
          id="delivery-true"
          type="checkbox"
          :checked="cartStore.isDelivery"
          class="checkbox"
          @change="cartStore.isDelivery = !cartStore.isDelivery"
        />
        <label
          for="delivery-true"
          :class="`hover:underline cursor-pointer text-[12px] ${
            cartStore.isDelivery ? 'text-white' : 'text-white/50'
          }`"
        >
          I want Delivery!
        </label>
      </div>
      <!-- Not Delivery -->
      <div class="flex items-center gap-2">
        <input
          id="delivery-false"
          type="checkbox"
          :checked="!cartStore.isDelivery"
          class="checkbox"
          @change="cartStore.isDelivery = !cartStore.isDelivery"
        />
        <label
          for="delivery-false"
          :class="`hover:underline cursor-pointer text-[12px] ${
            cartStore.isDelivery ? 'text-white/50' : 'text-white'
          }`"
        >
          I prefer to get products at store!
        </label>
      </div>
    </div>
  </div>
</template>
