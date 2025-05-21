<script setup>
import { BadgeDollarSign, SquarePen, CircleCheckBig } from "lucide-vue-next";
import { useCartStore } from "../stores/cartStore.js";

const cartStore = useCartStore();
</script>
<template>
  <div class="card bg-base-300 shadow-sm w-full">
    <div class="card-body">
      <h1
        class="text-primary bg-base-100 font-bold text-2xl py-4 px-7 rounded-full w-full flex items-center gap-2"
      >
        <BadgeDollarSign />GRAND-TOTAL
      </h1>
      <ul class="mt-6 flex flex-col gap-2 text-xs">
        <li class="grid list-grand-total">
          <span class="label"><SquarePen />Sub-Total</span>
          <span>: ${{ cartStore.subTotalPrice.toLocaleString() }}</span>
        </li>
        <li
          :class="`${
            cartStore.isDelivery ? 'grid' : 'hidden'
          } list-grand-total`"
        >
          <span class="label"><SquarePen />Delivery</span>
          <span>: ${{ cartStore.delivery_price }}</span>
        </li>
        <li class="grid list-grand-total">
          <span class="label"><SquarePen />Tax({{ cartStore.taxRate }}%)</span>
          <span> : ${{ cartStore.taxValue }} </span>
        </li>
        <div class="border-t-2 border-dashed my-2"></div>
        <li class="grid list-grand-total text-primary">
          <span class="label"><CircleCheckBig />Grand-Total</span>
          <span
            >: ${{
              cartStore.grandTotal.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
            }}</span
          >
        </li>
      </ul>
    </div>
  </div>
</template>
