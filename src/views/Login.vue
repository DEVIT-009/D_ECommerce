<script setup>
import banner from "../assets/banner.png";
import { Mail, KeyRound, SendHorizontal } from "lucide-vue-next";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";

import { useToast } from "vue-toastification";
import { useUserStore } from "../stores/userData.js";
import rootrouter from "../routers/rootrouter.js";
import { reactive } from "vue";
import { RouterLink } from "vue-router";
import { useCheckUser } from "../services/userService.js";

const formState = reactive({
  email: "",
  password: "",
});

const toast = useToast();
const userStore = useUserStore();
const { state, checkUser } = useCheckUser();

const handleLogin = async () => {
  await checkUser({
    email: formState.email,
    password: formState.password,
  });

  if (!state.error && state.users && !state.isLoading) {
    const { users } = state;
    // Set local
    userStore.setID(users.id);

    userStore.setUserData(users); // assign data :id, f name, l name, company, location
    userStore.setPhone(users.phone);
    userStore.setEmail(users.email);
    userStore.setPassword(users.password);
    userStore.setImage(users.image);
    userStore.setPosition(users.position);

    userStore.setIsActive(true);
    toast.success("Login successfully...");
    rootrouter.push("/profile");
  } else if (state.error && !state.isLoading) {
    toast.error(state.error);
  }
};
</script>
<template>
  <div
    class="max-w-7xl mx-auto w-full p-1 md:grid md:grid-cols-2 grid-cols-1 gap-4 items-center"
  >
    <!-- Loading -->
    <div
      v-if="state.isLoading"
      class="fixed inset-0 flex items-center justify-center z-10 bg-base-300/5 backdrop-blur-[3px]"
    >
      <PulseLoader color="#ffffff" />
    </div>
    <!-- Done Process -->
    <div
      class="login-container max-w-lg mx-auto w-full bg-base-300 rounded-lg py-4"
    >
      <h1
        class="max-w-sm mx-auto p-4 w-full text-3xl font-bold rounded-full text-center"
      >
        Login Form
      </h1>
      <form
        class="max-w-sm mx-auto p-5 rounded-lg"
        @submit.prevent="handleLogin"
      >
        <!-- Email -->
        <div class="mb-5">
          <label
            for="email-address-icon"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your Email:
          </label>
          <div class="relative">
            <div
              class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none"
            >
              <Mail class="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </div>
            <input
              type="email"
              required
              v-model="formState.email"
              id="email-address-icon"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="example@dcamphone.com"
            />
          </div>
        </div>
        <!-- Password -->
        <div class="mb-5">
          <label
            for="password-icon"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your Password:
          </label>
          <div class="relative">
            <div
              class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none"
            >
              <KeyRound class="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </div>
            <input
              required
              v-model="formState.password"
              autocomplete
              type="password"
              id="password-icon"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="example123"
            />
          </div>
        </div>
        <div class="w-full flex justify-end gap-2">
          <RouterLink to="/register" class="btn btn-primary btn-outline">
            Register
          </RouterLink>
          <button type="submit" class="btn btn-primary">
            Login
            <SendHorizontal class="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
    <div class="max-w-lg hidden md:block">
      <img :src="banner" alt="banner-login" />
    </div>
  </div>
</template>
