<script setup>
import { useCartStore } from "../stores/cartStore";
import { useUserStore } from "../stores/userData";
import { useReceiverStore } from "../stores/receiverStore";
import { useOrderStore } from "../stores/orderStore";

const cartStore = useCartStore();
const userStore = useUserStore();
const receiverStore = useReceiverStore();
const orderStore = useOrderStore();

function handleClick() {
  cartStore.$reset();
  userStore.$reset();
  receiverStore.$reset();
  orderStore.$reset();
}
</script>
<template>
  <button class="btn btn-warning btn-soft mx-auto" @click="handleClick">
    Click Me!
  </button>
</template>
