<script setup>
import logo from "@/assets/logo_white.png";
import StepPayment from "../components/StepPayment.vue";
import Button from "../components/Button.vue";
import { useCartStore } from "../stores/cartStore";
import { storeToRefs } from "pinia";
import { useUserStore } from "../stores/userData";

const userStore = useUserStore();

const cartStore = useCartStore();
const { cartItems } = storeToRefs(cartStore);
</script>
<template>
  <div class="bg-base-300 rounded-lg p-7 my-2 max-w-2xl w-full">
    <!-- Logo -->
    <figure class="flex items-center gap-4">
      <img
        :src="logo"
        alt="Logo"
        class="h-14 bg-base-100 p-2 ring-1 ring-white/50 rounded-lg"
      />
      <h2 class="md:text-3xl text-2xl font-bold">D-CAMPhone</h2>
    </figure>
    <!-- 2nd Line | Header -->
    <div class="text-center flex justify-between items-center mt-4">
      <h1 class="md:text-2xl text-xl font-bold">Invoice</h1>
      <h1 class="md:text-2xl text-xl font-bold">From</h1>
    </div>
    <!-- INV & Customer -->
    <div class="flex justify-between mt-2">
      <div>
        <p class="md:text-sm text-[12px]">
          Date: {{ new Date().toLocaleDateString() }}
        </p>
        <p class="md:text-sm text-[12px]">Invoice No: 001</p>
      </div>
      <div>
        <p class="text-sm text-right">
          Customer Name: {{ userStore.f_name + " " + userStore.l_name }}
        </p>
        <p class="text-sm text-right">Tel: {{ userStore.phone }}</p>
      </div>
    </div>

    <!-- Dash Border -->
    <div class="w-full border-[1px] border-white/50 my-4"></div>

    <!-- Order Summery -->
    <div class="overflow-x-auto">
      <h1 class="font-bold md:text-2xl text-xl">Order Summery</h1>
      <table class="table table-zebra text-[12px] md:text-sm">
        <!-- head -->
        <thead>
          <tr class="text-white">
            <th>N°</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <!-- row 1 -->
          <tr v-for="(item, index) in cartItems" :key="index">
            <td class="text-[12px] sm:text-sm">
              {{ index < 9 ? "0" + (index + 1) : index + 1 }}
            </td>
            <td class="text-[12px] sm:text-sm">{{ item.name }}</td>
            <td class="text-[12px] sm:text-sm">{{ item.qty }}</td>
            <td class="text-[12px] sm:text-sm">${{ item.price }}</td>
            <td class="text-[12px] sm:text-sm">
              ${{ (item.price * item.qty).toLocaleString() }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Dash Border -->
    <div class="w-full border-1 border-white/50 my-4"></div>

    <!-- Total -->
    <div class="grid grid-cols-2">
      <div class="md:text-3xl text-2xl font-bold grid place-items-center">
        Thanks
      </div>
      <ul class="font-bold text-[12px] md:text-sm">
        <li class="grid grid-cols-2 pl-3">
          <span>Sub-Total</span>
          <span>: ${{ cartStore.subTotalPrice.toLocaleString() }}</span>
        </li>
        <li class="grid grid-cols-2 pl-3">
          <span>Tax</span>
          <span>: ${{ cartStore.taxValue.toLocaleString() }}</span>
        </li>
        <li
          :class="`grid grid-cols-2 pl-3 ${
            cartStore.isDelivery ? '' : 'hidden'
          }`"
        >
          <span>Delivery</span>
          <span>: ${{ cartStore.delivery.toLocaleString() }}</span>
        </li>
        <li class="grid grid-cols-2 p-3 rounded-lg ring-1 ring-white/50 mt-2">
          <span>Grand-Total</span>
          <span>: ${{ cartStore.grandTotal.toLocaleString() }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
