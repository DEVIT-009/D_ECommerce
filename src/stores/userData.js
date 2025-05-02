// stores/cartStore.js
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    id: "",
    f_name: "",
    l_name: "",
    company: "",
    location: "",

    phone: "",
    email: "",
    password: "",
    image: "",
    position: "",

    isActive: false,
    imgDefault:
      "https://res.cloudinary.com/dyz2kowij/image/upload/v1745334747/profile_default_uhhkrw.jpg",
  }),
  actions: {
    setID(value) {
      this.id = value;
    },
    setUserData(userData) {
      this.f_name = userData.f_name;
      this.l_name = userData.l_name;
      this.company = userData.company;
      this.location = userData.location;
    },
    setPhone(value) {
      this.phone = value;
    },
    setEmail(value) {
      this.email = value;
    },
    setPassword(value) {
      this.password = value;
    },
    setImage(value) {
      this.image = value;
    },
    setPosition(value) {
      this.position = value;
    },
    setIsActive(value) {
      this.isActive = value;
    },
  },
  persist: true,
});
