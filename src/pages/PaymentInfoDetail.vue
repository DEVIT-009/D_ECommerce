<script setup>
// CSS
import { ChevronLeft, Info, Pencil } from "lucide-vue-next";
// Component
import StepPayment from "../components/StepPayment.vue";
// Hook
import { useUserStore } from "../stores/userData";
import { storeToRefs } from "pinia";
import { reactive } from "vue";

const userStore = useUserStore();
const data = storeToRefs(userStore);
const state = reactive({
  first_name: data.first_name.value,
  last_name: data.last_name.value,
  phone: data.phone.value,
  company: data.company.value,
  location: data.location.value,
});
</script>

<template>
  <div class="w-full flex-1 flex flex-col">
    <!-- Step Method -->
    <div
      class="flex justify-between items-center p-4 rounded-lg ring-1 ring-primary mb-2"
    >
      <RouterLink
        to="/cart"
        class="btn btn-primary flex items-center text-lg gap-2"
      >
        <ChevronLeft />
      </RouterLink>
      <StepPayment />
    </div>
    <!-- info of user -->
    <div class="bg-base-300 rounded-lg pt-6 px-6">
      <h1
        class="text-2xl bg-base-100 rounded-full py-4 px-7 font-bold flex items-center gap-2"
      >
        <Info />
        Reciever Infomations
      </h1>
      <form class="max-w-xl mx-auto py-5">
        <!-- First Name & Last Name -->
        <div class="grid md:grid-cols-2 md:gap-6">
          <div class="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="floating_first_name"
              id="floating_first_name"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              v-model="state.first_name"
              required
              disabled
            />
            <label
              for="floating_first_name"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >First name</label
            >
          </div>
          <div class="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="floating_last_name"
              id="floating_last_name"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              v-model="state.last_name"
              required
              disabled
            />
            <label
              for="floating_last_name"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >Last name</label
            >
          </div>
        </div>
        <div class="grid md:grid-cols-2 md:gap-6">
          <!-- Tel -->
          <div class="relative z-0 w-full mb-5 group">
            <input
              type="tel"
              name="floating_phone"
              id="floating_phone"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              v-model="state.phone"
              required
              disabled
            />
            <label
              for="floating_phone"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >Phone/Tel (096 7234 500)</label
            >
          </div>
          <!-- Location -->
          <div class="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="floating_location"
              id="floating_location"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              v-model="state.location"
              disabled
            />
            <label
              for="floating_location"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >Location</label
            >
          </div>
        </div>

        <div class="flex justify-end gap-2">
          <button class="btn btn-primary btn-soft">
            <Pencil class="w-4 h-4" />
            Update
          </button>
          <RouterLink to="/payment/pay-method" class="btn btn-primary btn-wide">
            Confirm
          </RouterLink>
        </div>
      </form>
    </div>
  </div>
</template>
