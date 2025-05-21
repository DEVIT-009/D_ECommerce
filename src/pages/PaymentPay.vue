<script setup>
import { onMounted, reactive } from "vue";
import { RouterLink } from "vue-router";
import StepPayment from "../components/StepPayment.vue";
import payByBank from "../components/payByBank.vue";
import { CreditCard, Dot, ChevronLeft } from "lucide-vue-next";
import { useCartStore } from "../stores/cartStore.js";

const cartStore = useCartStore();
const dataQR = [
  {
    info: {
      bank: "ABA",
      name: "TEP DEVIT",
      no_dollar: "500 227 669",
      no_kh: "010 861 400",
    },
    img_dollar:
      "https://res.cloudinary.com/dyz2kowij/image/upload/v1744870097/IMG_7542_hn8guk.jpg",
    img_kh:
      "https://res.cloudinary.com/dyz2kowij/image/upload/v1744870099/IMG_7543_q020sn.jpg",
  },
  {
    info: {
      bank: "Wing",
      name: "DEVIT TEP",
      no_dollar: "05 800 803",
      no_kh: "05 800 813",
    },
    img_dollar:
      "https://res.cloudinary.com/dyz2kowij/image/upload/v1744870138/IMG_7544_k6enk7.jpg",
    img_kh:
      "https://res.cloudinary.com/dyz2kowij/image/upload/v1744870138/IMG_7545_ndhs4j.jpg",
  },
  {
    info: {
      bank: "AC",
      name: "TEP DEVIT",
      no_dollar: "096 7234 500",
      no_kh: "096 7234 500",
    },
    img_dollar:
      "https://res.cloudinary.com/dyz2kowij/image/upload/v1744870122/IMG_7546_e7ukwk.jpg",
    img_kh:
      "https://res.cloudinary.com/dyz2kowij/image/upload/v1744870122/IMG_7547_kf3hzt.jpg",
  },
];
const data = reactive({
  info: {},
  img_dollar: "",
  img_kh: "",
});
function handleChangeBank(e) {
  const selectedBank = dataQR.find(
    (item) => item.info.bank.toLocaleLowerCase() == e
  );
  if (selectedBank) {
    data.info = selectedBank.info;
    data.img_dollar = selectedBank.img_dollar;
    data.img_kh = selectedBank.img_kh;
  }
}
onMounted(() => {
  handleChangeBank("aba"); // Set default bank to ABA
});
</script>

<template>
  <div class="w-full flex-1 flex flex-col">
    <!-- Step roadmap -->
    <div
      class="flex justify-between items-center p-4 rounded-lg ring-1 ring-primary mb-2"
    >
      <RouterLink
        to="/payment"
        class="btn btn-primary flex items-center text-lg gap-2"
      >
        <ChevronLeft />
      </RouterLink>
      <StepPayment limit="2" />
    </div>
    <!-- pay place -->
    <div class="bg-base-300 rounded-lg p-6">
      <!-- Heading payment -->
      <h1
        class="text-2xl bg-base-100 rounded-full py-4 px-7 font-bold flex items-center gap-2"
      >
        <CreditCard />
        Payment
      </h1>
      <!-- Payment QR & Number -->
      <div class="w-full">
        <div
          class="w-full mt-5 flex justify-between items-center max-sm:flex-col-reverse"
        >
          <form class="max-w-sm sm:w-1/3 w-full">
            <label
              for="countries"
              class="flex items-center mb-2 max-sm:mt-4 text-sm font-medium text-gray-900 dark:text-white"
            >
              <Dot />
              Payment Bank:
            </label>
            <select
              id="countries"
              class="block bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              @change="(item) => handleChangeBank(item.target.value)"
            >
              <option value="aba">ABA</option>
              <option value="ac">AC</option>
              <option value="wing">Wing</option>
            </select>
          </form>
          <div
            class="sm:w-1/3 px-10 py-4 bg-warning md:font-bold rounded-full text-base-300 w-full"
          >
            <h2 class="text-sm font-bold text-nowrap">
              Grand-Total : ${{ cartStore.grandTotal.toLocaleString() }}
            </h2>
          </div>
        </div>
        <!-- Pay place : QR/Number -->
        <payByBank
          :info="data.info"
          :img_dollar="data.img_dollar"
          :img_kh="data.img_kh"
        />
      </div>
    </div>
  </div>
</template>
