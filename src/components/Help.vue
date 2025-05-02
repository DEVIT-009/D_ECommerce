<script setup>
import {
  CircleHelp,
  FolderPen,
  Headset,
  CornerDownRight,
} from "lucide-vue-next";
import { useCartStore } from "../stores/cartStore.js";
const cartStore = useCartStore();
const dataContact = [
  {
    title: "Telegram",
    link: "https://t.me/DEVIT_009",
    value: "@DEVIT_009",
  },
  {
    title: "Facebook",
    link: "https://www.facebook.com/Tep.Devit.9",
    value: "Devit Tep",
  },
  {
    title: "Instagram",
    link: "https://www.instagram.com/tep.devit.9/",
    value: "tep.devit.9",
  },
];
</script>
<template>
  <div class="w-full flex flex-wrap gap-4 p-6 bg-base-300">
    <h1
      class="text-2xl bg-base-100 w-full rounded-full py-4 px-7 font-bold flex items-center gap-2 mb-2"
    >
      <CircleHelp />
      Help
    </h1>
    <div class="flex-1 min-w-40" v-if="cartStore.isDelivery">
      <h2 class="flex items-center gap-2 text-lg font-bold">
        <FolderPen />
        Note for delivery
      </h2>
      <textarea
        class="textarea w-full mt-2 min-h-24 max-h-64"
        placeholder="I love you!"
      ></textarea>
    </div>
    <div class="flex-1 min-w-40">
      <h2 class="flex items-center gap-2 text-lg font-bold mb-3">
        <Headset />
        Customer Support
      </h2>
      <div class="bg-base-100 p-4 rounded-md ring-1 ring-white/20">
        <p
          class="flex gap-2 text-sm text-white/80"
          v-for="(item, index) in dataContact"
          :key="index"
        >
          <CornerDownRight size="20" />
          <span>{{ item.title }}</span>
          <span>
            :
            <a :href="item.link" class="hover:text-white hover:underline">
              {{ item.value }}
            </a>
          </span>
        </p>
      </div>
    </div>
  </div>
</template>
