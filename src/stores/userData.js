// stores/cartStore.js
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    user_id: "",
    first_name: "",
    last_name: "",
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
    setUserID(value) {
      this.user_id = value;
    },
    setFirstName(value) {
      this.first_name = value;
    },
    setLastName(value) {
      this.last_name = value;
    },
    setCompany(value) {
      this.company = value;
    },
    setLocation(value) {
      this.location = value;
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
    setUserData(value) {
      this.user_id = value.user_id;
      this.first_name = value.first_name;
      this.last_name = value.last_name;
      this.company = value.company;
      this.location = value.location;
      this.phone = value.phone;
      this.email = value.email;
      this.password = value.password;
      this.image = value.image;
      this.position = value.position;
    },
  },
  persist: true,
});
