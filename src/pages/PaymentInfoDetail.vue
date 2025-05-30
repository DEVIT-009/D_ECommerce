<script setup>
// CSS
import { ChevronLeft, ChevronRight, Info } from "lucide-vue-next";
import { useToast } from "vue-toastification";
// Component
import StepPayment from "../components/StepPayment.vue";
// Hook
import { reactive } from "vue";
// Store
import { useUserStore } from "../stores/userData";
import { useCartStore } from "../stores/cartStore.js";
import { useReceiverStore } from "../stores/receiverStore.js";
import { useOrderStore } from "../stores/orderStore.js";
// Router
import rootrouter from "@/routers/rootrouter.js";

const toast = useToast();

const receiverStore = useReceiverStore();
const cartStore = useCartStore();
const orderStore = useOrderStore();
const userStore = useUserStore();

const addressOrPickUp = reactive({
  pickup_date: "",
  address: orderStore.orders.address_deliver,
});
// data local storage
const dataUserReciever = reactive({
  first_name: userStore.first_name,
  last_name: userStore.last_name,
  phone: userStore.phone,
});
const dataOtherReciever = reactive({
  reciever_name: receiverStore.receiver.receiver_name,
  phone: receiverStore.receiver.phone,
});

/**
 * Handle submit information
 * This function is called when the user submits the form.
 */
async function handleSubmitInfo() {
  try {
    cartStore.isDelivery
      ? orderStore.setReceiveInfo("delivery", null, addressOrPickUp.address)
      : orderStore.setReceiveInfo("pickup", addressOrPickUp.pickup_date, "");
    if (receiverStore.isOtherReceiver) {
      receiverStore.setInfoReceiver(
        dataOtherReciever.reciever_name,
        dataOtherReciever.phone
      );
    }
    rootrouter.push("/payment/pay-method");
  } catch (error) {
    toast.error(
      "We're really sorry for has something went wrongs, hope you could try again later..."
    );
  }
}

// Data display
const displayUserReciever = reactive([
  {
    type: "text",
    id: "first_name",
    get value() {
      return dataUserReciever.first_name;
    },
    set value(val) {
      dataUserReciever.first_name = val;
    },
    isDisabled: true,
    labelName: "First Name",
  }, // First Name
  {
    type: "text",
    id: "last_name",
    get value() {
      return dataUserReciever.last_name;
    },
    set value(val) {
      dataUserReciever.last_name = val;
    },
    isDisabled: true,
    labelName: "Last Name",
  }, // Last Name
  {
    type: "text",
    id: "phone",
    get value() {
      return dataUserReciever.phone;
    },
    set value(val) {
      dataUserReciever.phone = val;
    },
    isDisabled: true,
    labelName: "Phone Number",
  }, // Phone
]);
const displayOtherReciever = reactive([
  {
    type: "text",
    id: "reciever_name",
    get value() {
      return dataOtherReciever.reciever_name;
    },
    set value(val) {
      dataOtherReciever.reciever_name = val;
    },
    isDisabled: false,
    labelName: "Reciever Name",
  }, // Receiver name
  {
    type: "text",
    id: "phone",
    get value() {
      return dataOtherReciever.phone;
    },
    set value(val) {
      dataOtherReciever.phone = val;
    },
    isDisabled: false,
    labelName: "Phone",
  }, // Phone
]);
</script>
<template>
  <div class="w-full flex-1 flex flex-col">
    <!-- Step Method -->
    <div
      class="flex justify-between items-center p-4 rounded-lg ring-1 ring-accent mb-2"
    >
      <RouterLink
        to="/cart"
        class="btn btn-accent flex items-center text-lg gap-2"
      >
        <ChevronLeft />
      </RouterLink>
      <StepPayment />
    </div>
    <!-- info of user -->
    <div class="bg-base-300 rounded-lg pt-6 px-6">
      <h1
        class="text-2xl bg-base-100 rounded-full py-4 px-7 font-bold flex items-center gap-2 text-accent"
      >
        <Info />
        Reciever Infomations
      </h1>
      <form class="max-w-xl mx-auto py-5" @submit.prevent="handleSubmitInfo">
        <p class="text-sm text-gray-500 mb-8">
          Please confirm your information before proceeding to the next step or
          your order.
        </p>
        <!-- First Name & Last Name -->
        <div class="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
          <!-- First Name, Last Name, Phone, address : Users -->
          <!-- Receiver name, Phone : other Receiver & address to order -->
          <div
            class="relative z-0 w-full group"
            v-for="item in receiverStore.isOtherReceiver
              ? displayOtherReciever
              : displayUserReciever"
          >
            <input
              :type="item.type"
              :name="item.id"
              :id="item.id"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-accent focus:outline-none focus:ring-0 focus:border-accent peer"
              placeholder=" "
              v-model="item.value"
              required
              :disabled="item.isDisabled"
            />
            <label
              :for="item.id"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-accent peer-focus:dark:text-accent peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              {{ item.labelName }}
            </label>
          </div>
          <!-- PickUp data | Address -->
          <div class="relative z-0 w-full group">
            <!-- Address input -->
            <div v-show="cartStore.isDelivery">
              <input
                type="text"
                name="address"
                id="address"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-accent focus:outline-none focus:ring-0 focus:border-accent peer"
                placeholder=" "
                v-model="addressOrPickUp.address"
                :required="cartStore.isDelivery"
              />
              <label
                for="address"
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-accent peer-focus:dark:text-accent peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Delivery Address
              </label>
            </div>
            <!-- Pickup date input -->
            <div v-show="!cartStore.isDelivery">
              <input
                type="date"
                name="pickup_date"
                id="pickup_date"
                :min="new Date().toISOString().split('T')[0]"
                class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-accent focus:outline-none focus:ring-0 focus:border-accent peer"
                placeholder=" "
                v-model="addressOrPickUp.pickup_date"
                :required="!cartStore.isDelivery"
              />
              <label
                for="pickup_date"
                class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-accent peer-focus:dark:text-accent peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Pickup Date
              </label>
            </div>
          </div>
          <div
            class="col-span-2 flex sm:justify-between max-sm:flex-col items-end gap-2 mb-4"
          >
            <p class="text-sm text-base-content/50 max-w-[35ch]">
              <span class="text-accent font-semibold">Note:</span>
              {{
                receiverStore.isOtherReceiver
                  ? "Keep tick, when you want someone else receive your order!"
                  : "Keep untick, in case you are Receiver!"
              }}
            </p>
            <!-- Confirm Receiver -->
            <div class="flex items-center gap-2">
              <label
                for="reciever"
                class="hover:underline cursor-pointer text-accent"
              >
                Prefer other receive!
              </label>
              <input
                id="reciever"
                type="checkbox"
                :checked="receiverStore.isOtherReceiver"
                class="checkbox checkbox-accent"
                @change="receiverStore.toggleReceiver()"
              />
            </div>
          </div>
        </div>
        <div class="flex justify-end gap-2">
          <button type="submit" class="btn btn-accent sm:btn-wide">
            Confirm
            <ChevronRight class="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
