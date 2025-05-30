<script setup>
// Component
import StepPayment from "../components/StepPayment.vue";
// CSS
import { useToast } from "vue-toastification";
import { SendHorizontal, ChevronLeft } from "lucide-vue-next";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
// Router
import { RouterLink } from "vue-router";
import rootrouter from "../routers/rootrouter.js";
// API fetching | Service
import { usePatchProd } from "../services/ProductService.js";
import { generateOrderId, generateReceiverId } from "../services/generateID.js";
import { usePostOrder } from "../services/orderService.js";
import { usePostOrderDetail } from "../services/orderDetailService.js";
import {
  useGetReceiver,
  usePostReceiver,
} from "../services/receiverService.js";
// Store
import { useCartStore } from "../stores/cartStore.js";
import { useOrderStore } from "../stores/orderStore.js";
import { useReceiverStore } from "../stores/receiverStore.js";
import { useUserStore } from "../stores/userData.js";
// Library
import { storeToRefs } from "pinia";
import { reactive, ref } from "vue";

/**
 * Store
 */
const cartStore = useCartStore(); // Cart
const receiverStore = useReceiverStore(); // Receiver
const orderStore = useOrderStore(); // Order
const userStore = useUserStore(); // User
const { cartItems } = storeToRefs(cartStore); // reactive reference
/**
 * Service
 */
const { state, patchProd } = usePatchProd(); // Product
const { postOrderState, postOrder } = usePostOrder(); // Order
const { postOrderDetailState, postOrderDetail } = usePostOrderDetail(); // OrderDetail
const { receiverState: getReceiverState, getReceiver } = useGetReceiver(); // Receiver
const { receiverState: postReceiverState, postReceiver } = usePostReceiver(); // Receiver
// ID
const { orderIdState, orderId } = generateOrderId(); // Order ID
const { receiverIdState, receiverId } = generateReceiverId(); // Receiver ID

// Data will add to Table
const dataState = reactive({
  orderData: {},
  receiverData: {},
  orderDetailData: [],
});

// Bind loading
const isLoading = ref(
  state.isLoading ||
    postOrderState.isLoading ||
    getReceiverState.isLoading ||
    postReceiverState.isLoading ||
    orderIdState.isLoading ||
    postOrderDetailState.isLoading ||
    receiverIdState.isLoading
    ? true
    : false
);

// CSS Notification
const toast = useToast();
/**
 *  Handle Add receiver
 */
async function handleReceiver() {
  // Generate ID
  await receiverId();
  // Add receiver if user prefer by isOtherReceiver = true
  if (
    receiverStore.isOtherReceiver &&
    !receiverIdState.isLoading &&
    !receiverIdState.error
  ) {
    receiverStore.setIdReceiver(receiverIdState.receiver_id);
    dataState.receiverData = {
      ...receiverStore.receiver,
      user_id: userStore.user_id,
    };
    // console.log(receiverIdState.receiver_id);
    // console.log(dataState.receiverData);
  }
}
/**
 * Handle add order
 */
async function handleOrder() {
  // Generate ID
  await orderId();
  // Declare object as orderData before add to orders service
  orderStore.setIdAndOrderDate(
    orderIdState.order_id,
    new Date().toLocaleDateString()
  );
  dataState.orderData = {
    user_id: userStore.user_id,
    receiver_id: receiverStore.isOtherReceiver
      ? receiverIdState.receiver_id
      : null,
    note: "",
    status: "",
    ...orderStore.orders,
  };
  // console.log(dataState.orderData);
  // console.log(receiverIdState.receiver_id);
}
/**
 * Handle Add Order Details
 */
async function handleOrderDetail() {
  const order_id = orderIdState.order_id;
  dataState.orderDetailData = cartStore.cartItems.map((item) => ({
    order_id: order_id,
    product_id: item.product_id,
    quantity_order: item.qty,
    unit_price: item.price,
  }));
}
/**
 * Handle Submit
 */
async function handleSubmit() {
  try {
    /**
     * Get data into dataState as reactive
     */
    await handleReceiver();
    await handleOrder();
    await handleOrderDetail();
    /**
     * POST orderData, receiverData in dataState
     */
    if (receiverStore.isOtherReceiver) {
      await postReceiver(dataState.receiverData);
    }
    await postOrder(dataState.orderData);
    await postOrderDetail(dataState.orderDetailData);
    /**
     * Stock Reductive
     */
    await Promise.all(
      cartItems.value.map((item) =>
        patchProd(item.product_id, {
          quantity: item.quantity - (item.qty || 0),
        })
      )
    );
    /**
     * Validation
     */
    if (
      patchProd.error ||
      postOrderState.error ||
      postReceiverState.error ||
      postOrderDetailState.error
    ) {
      toast.error(
        "We're sorry for something happened badly, please try again later..."
      );
      return;
    }
    /**
     * All updates successfull
     */
    cartStore.clearCartItems();
    toast.success("Order submitted successfully!");
    rootrouter.push("/payment/success-order");
  } catch (error) {
    toast.error(
      `Failed to process order: ${
        error.message || "Please contact support for assistance."
      }`
    );
  }
}
//
const handleTest = async () => {
  try {
    await handleOrder();
    await handleOrderDetail();

    console.log(dataState.orderDetailData);

    // return;
    await postOrderDetail(dataState.orderDetailData);
  } catch (error) {
    toast.error(
      `Failed to process order: ${
        error.message || "Please contact support for assistance."
      }`
    );
    console.log(error);
  }
};
</script>
<template>
  <!-- Loading -->
  <div
    v-if="isLoading"
    class="fixed inset-0 flex items-center justify-center z-10 bg-base-300/5 backdrop-blur-[3px]"
  >
    <PulseLoader color="#ffffff" />
  </div>
  <div class="flex flex-col items-center justify-center px-1" v-else>
    <!-- Step road map of payment -->
    <div
      class="flex items-center justify-between max-w-2xl w-full rounded-lg ring-1 ring-accent mt-2 p-4"
    >
      <RouterLink
        to="/payment/pay-method"
        class="btn btn-accent flex items-center text-lg gap-2"
      >
        <ChevronLeft />
      </RouterLink>
      <StepPayment limit="3" />
    </div>
    <!-- Checkout Summary -->
    <div class="w-full max-w-2xl bg-base-300 rounded-lg p-6 my-4">
      <!-- Order Summary Header -->
      <h2 class="text-2xl font-bold mb-4">Final Order Summary</h2>

      <!-- Customer Information -->
      <div class="bg-base-200 p-4 rounded-lg mb-4">
        <h3 class="font-semibold mb-2">Receiver Information</h3>
        <div class="grid grid-cols-2 gap-2 text-sm">
          <p>Name:</p>
          <p>
            {{
              receiverStore.isOtherReceiver
                ? receiverStore.receiver.receiver_name
                : userStore.first_name + " " + userStore.last_name
            }}
          </p>
          <p>Phone:</p>
          <p>
            {{
              receiverStore.isOtherReceiver
                ? receiverStore.receiver.phone
                : userStore.phone
            }}
          </p>
        </div>
      </div>

      <!-- More Information -->
      <div class="bg-base-200 p-4 rounded-lg mb-4">
        <h3 class="font-semibold mb-2">More Information</h3>
        <div class="grid grid-cols-2 gap-2 text-sm">
          <p>You prefer to :</p>
          <p class="uppercase">{{ orderStore.orders.receive_method }}</p>
          <p>{{ cartStore.isDelivery ? "Address" : "Pick up Date" }} :</p>
          <p>
            {{
              cartStore.isDelivery
                ? orderStore.orders.address_deliver
                : orderStore.orders.pickup_date
            }}
          </p>
          <p>Payment with :</p>
          <p>
            {{ orderStore.orders.payment_method }}
          </p>
        </div>
      </div>

      <!-- Order Items -->
      <div class="bg-base-200 p-4 rounded-lg mb-4">
        <h3 class="font-semibold mb-2">Order Items</h3>
        <div class="overflow-x-auto">
          <table class="table table-zebra w-full text-sm">
            <thead>
              <tr>
                <th>N°</th>
                <th>Item</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in cartItems" :key="index">
                <td>{{ index < 9 ? "0" + (index + 1) : index + 1 }}</td>
                <td>{{ item.product_name }}</td>
                <td>{{ item.qty }}</td>
                <td>${{ item.price }}</td>
                <td>${{ (item.price * item.qty).toLocaleString() }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Price Summary -->
      <div class="bg-base-200 p-4 rounded-lg">
        <h3 class="font-semibold mb-2">Price Summary</h3>
        <div class="space-y-2 text-sm">
          <div class="flex justify-between">
            <span>Subtotal:</span>
            <span>${{ cartStore.subTotalPrice.toLocaleString() }}</span>
          </div>
          <div class="flex justify-between">
            <span>Tax:</span>
            <span>${{ cartStore.taxValue.toLocaleString() }}</span>
          </div>
          <div v-if="cartStore.isDelivery" class="flex justify-between">
            <span>Delivery Fee:</span>
            <span>${{ cartStore.delivery_price.toLocaleString() }}</span>
          </div>
          <div
            class="flex justify-between font-bold pt-2 border-t border-base-300"
          >
            <span>Total:</span>
            <span>${{ cartStore.grandTotal.toLocaleString() }}</span>
          </div>
        </div>
      </div>
      <!-- Button Submit -->
      <div class="mb-2 max-w-2xl w-full flex justify-between items-center mt-8">
        <p class="text-[12px] md:text-sm">
          Please review your order details before submitting!
        </p>
        <button
          @click="handleSubmit"
          type="button"
          class="btn btn-accent md:px-16 px-10 flex items-center gap-2 text-sm"
        >
          Submit Order
          <SendHorizontal class="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
</template>
