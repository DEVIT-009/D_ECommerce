<script setup>
// Component
// import Button from "../components/Button.vue";
import Invoice from "../components/Invoice.vue";
import StepPayment from "../components/StepPayment.vue";
// API fetching
import { usePatchProd } from "../services/ProductService.js";
// CSS
import { useToast } from "vue-toastification";
import { SendHorizontal, ChevronLeft } from "lucide-vue-next";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
// Router
import { RouterLink } from "vue-router";
import rootrouter from "../routers/rootrouter.js";
// Custom hook
import { useCartStore } from "../stores/cartStore.js";
// Library
import { storeToRefs } from "pinia";

const { state, patchProd } = usePatchProd();
const cartStore = useCartStore();
const { cartItems } = storeToRefs(cartStore); // reactive reference

// CSS Notification
const toast = useToast();
const updateQuantity = async () => {
  await Promise.all(
    cartItems.value.map((item) =>
      patchProd(item.product_id, {
        quantity: item.quantity - (item.qty || 0),
      })
    )
  );

  if (!state.isLoading && !state.error) {
    cartStore.clearCartItems();
    toast.success("Submit Successfully...");
    rootrouter.push("/payment/success-order");
  } else if (state.error) {
    toast.error(
      "Submit fail! there is an error please contact us for more information."
    );
    console.log(state.error);
  }
};
</script>
<template>
  <div class="flex flex-col items-center justify-center px-1">
    <!-- Loading -->
    <div
      v-if="state.isLoading"
      class="fixed inset-0 flex items-center justify-center z-10 bg-base-300/5 backdrop-blur-[3px]"
    >
      <PulseLoader color="#ffffff" />
    </div>
    <!-- Step road map of payment -->
    <div
      class="flex items-center justify-between max-w-2xl w-full rounded-lg ring-1 ring-primary mt-2 p-4"
    >
      <RouterLink
        to="/payment/pay-method"
        class="btn btn-primary flex items-center text-lg gap-2"
      >
        <ChevronLeft />
      </RouterLink>
      <StepPayment limit="3" />
    </div>
    <!-- Invoice -->
    <Invoice />
    <!-- Button Submit -->
    <div class="mb-2 max-w-2xl w-full flex justify-between items-center">
      <p class="text-[12px] md:text-sm">
        Confirm the Invoice and submit this Invoice to us!
      </p>
      <button
        @click="updateQuantity"
        type="button"
        class="btn btn-primary md:px-16 px-10 flex items-center gap-2 md:text-[20px] text-sm"
      >
        Submit
        <SendHorizontal />
      </button>
    </div>
  </div>
</template>
