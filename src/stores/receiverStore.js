import { defineStore } from "pinia";

export const useReceiverStore = defineStore("receiver", {
  state: () => ({
    receiver: {
      receiver_id: null,
      receiver_name: "",
      phone: "",
    },
    isOtherReceiver: false,
  }),
  actions: {
    setIdReceiver(value) {
      this.receiver.receiver_id = value;
    },
    setInfoReceiver(receiver_name, phone) {
      this.receiver.receiver_name = receiver_name;
      this.receiver.phone = phone;
    },
    toggleReceiver() {
      this.isOtherReceiver = !this.isOtherReceiver;
    },
  },
  persist: true,
});
