<script setup>
import { defineProps, ref } from "vue";
import Button from "./Button.vue";
import { CornerDownRight, RotateCcw, File } from "lucide-vue-next";

const isDollar = ref(true);
defineProps({
  img_dollar: {
    type: String,
  },
  img_kh: {
    type: String,
  },
  info: {
    type: Object,
    default: () => ({
      bank: "",
      name: "",
      no_dollar: "",
      no_kh: "",
    }),
  },
});
const fileSelected = ref(false);

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  fileSelected.value = !!file;
  if (file) {
    console.log("File selected:", file.name);
  }
};
</script>
<template>
  <div class="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
    <figure class="rounded-lg overflow-hidden grid">
      <button
        class="btn btn-primary py-6 mb-2 text-lg rounded-full"
        @click="isDollar = !isDollar"
      >
        Switch to {{ isDollar ? "KH" : "Dollar" }} <RotateCcw />
      </button>
      <img
        v-if="isDollar"
        :src="img_dollar"
        alt="img-qr"
        class="h-auto w-full aspect-square object-cover"
      />
      <img
        v-else
        :src="img_kh"
        alt="img-qr"
        class="h-auto w-full aspect-square object-cover"
      />
    </figure>
    <ul class="">
      <li>
        <h2
          class="bg-base-100 font-bold lg:text-lg text-sm px-7 py-3 rounded-full text-center"
        >
          Information
        </h2>
      </li>
      <li
        class="max-md:text-sm md:font-semibold text-white/70 grid grid-cols-2 mt-2"
        v-for="(item, index) in info"
        :key="index"
      >
        <span class="flex gap-2 items-center text-nowrap">
          <CornerDownRight />
          {{ index.replace("_", ". ").toUpperCase() }}
        </span>
        <span class="text-white text-nowrap">: {{ item }}</span>
      </li>
      <div class="w-full h-[1px] bg-white my-4"></div>
      <li>
        <label
          class="flex items-center gap-2 text-sm font-medium text-white/70 mb-2"
        >
          <File />
          Upload Your Invoice
        </label>
        <input
          type="file"
          id="file-upload"
          class="file-input file-input-bordered w-full max-w-xs"
          required
          @change="handleFileUpload"
        />

        <div class="mt-2">
          <label
            for="file-upload"
            :class="`flex items-center gap-2 cursor-pointer ${
              fileSelected ? 'text-success' : 'text-error underline'
            }`"
          >
            <input
              type="checkbox"
              :class="`checkbox ${
                fileSelected ? 'checkbox-success' : 'checkbox-error'
              }`"
              style="opacity: 1"
              :checked="fileSelected"
              disabled
            />
            {{ fileSelected ? "Uploaded" : "No file uploaded yet!" }}
          </label>
        </div>
      </li>
      <li class="mt-3 flex justify-end">
        <Button
          text="Check Out"
          link="/payment/checkout"
          _class="btn-primary px-10"
        />
      </li>
    </ul>
  </div>
</template>
