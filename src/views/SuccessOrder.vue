<script setup>
import { Check, House, SquareUser } from "lucide-vue-next";
// logo svg
import facebook from "../assets/social/facebook.svg";
import instagram from "../assets/social/instagram.svg";
import telegram from "../assets/social/telegram.svg";
import { RouterLink } from "vue-router";
const dataContact = [
  {
    title: "Facebook",
    icon: facebook,
  },
  {
    title: "Instagram",
    icon: instagram,
  },
  {
    title: "Telegram",
    icon: telegram,
  },
];
</script>
<template>
  <div class="max-w-7xl w-full mx-auto py-3 max-md:px-3">
    <!-- Thank place -->
    <div
      class="flex flex-col items-center justify-center bg-base-300 max-w-4xl md:w-2/3 p-7 rounded-lg mx-auto"
    >
      <Check
        class="text-white bg-success p-2 rounded-full"
        strokeWidth="5"
        size="60"
      />
      <h1
        class="md:text-4xl sm:text-xl text-lg font-bold text-center max-w-3xl mt-4"
      >
        Your order is successfully,
        <span class="text-success">Thank You</span> for Ordering and Trust our
        service!
      </h1>
      <p class="text-white/70 text-center mt-7">
        Your order is about to delivery as soon as possible and we will contact
        you for getting your order. In case that you prefer to getting the
        products at our store we always be there waiting for you to getting out,
        thank you for the order hope you doing well and see you soon.
      </p>
      <RouterLink class="btn btn-success px-10 mt-4" to="/">
        <House />
        Back to Homepage!
      </RouterLink>
    </div>
    <!-- Contact -->
    <div
      class="max-w-4xl md:w-2/3 mx-auto flex max-md:flex-wrap gap-4 rounded-lg justify-between mt-4"
    >
      <div class="w-full bg-base-300 p-4 rounded-lg lg:flex justify-between">
        <h2
          class="text-white font-bold md:text-xl text-lg flex max-md:justify-center gap-1 lg:h-fit items-center py-2 px-5 cursor-default rounded-full bg-base-100"
        >
          <SquareUser size="22" class="inline" />
          Contact us!
        </h2>
        <div
          class="flex md:justify-end justify-center flex-wrap items-center max-lg:mt-4 gap-2"
        >
          <div
            v-for="item in dataContact"
            :key="item.title"
            class="flex flex-col flex-1 md:max-w-40 items-center bg-base-100 px-2 py-4 rounded-lg group hover:ring-1 hover:ring-success transition-all"
          >
            <img
              :src="item.icon"
              :alt="`logo-${item.title}`"
              class="bg-white rounded-2xl w-12 h-12 p-[1px] group-hover:bg-success transition-all"
            />
            <span
              class="font-bold bg-base-300 py-2 px-4 cursor-default mt-2 rounded-full text-sm group-hover:text-success"
              >{{ item.title }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
