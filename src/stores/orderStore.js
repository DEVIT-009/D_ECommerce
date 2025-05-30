// stores/cartStore.js
import { defineStore } from "pinia";
// CSS import
// import { useToast } from "vue-toastification";

// Notification CSS
// const Toast = useToast();
export const useOrderStore = defineStore("order", {
  state: () => ({
    orders: {
      order_id: null,
      order_date: "",
      address_deliver: "",
      payment_method: "",
      receive_method: "",
      pickup_date: "",
    },
  }),
  actions: {
    clearCartItems() {
      this.orders = {}; // Clear the orders
    },
    setIdAndOrderDate(order_id, order_date) {
      this.orders.order_id = order_id;
      this.orders.order_date = order_date;
    },
    setReceiveInfo(method, date, address) {
      this.orders.receive_method = method;
      this.orders.pickup_date = date;
      this.orders.address_deliver = address;
    },
    setAddr(value) {
      this.orders.address_deliver = value;
    },
    setPaymentMethod(value) {
      this.orders.payment_method = value;
    },
    addMoreAttribute(obj) {
      this.orders = { ...obj, ...this.orders };
    },
  },
  persist: true,
});
