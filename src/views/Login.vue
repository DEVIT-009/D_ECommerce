<script setup>
import banner from "../assets/banner.png";
import { SendHorizontal, ListMinus } from "lucide-vue-next";
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
    email: `eq.${formState.email}`,
    password: `eq.${formState.password}`,
  });

  if (!state.error && state.users && !state.isLoading) {
    const user = state.users[0]; // Get the first matching user

    // Set local
    userStore.setUserData(user);
    userStore.setIsActive(true);

    toast.success("Login successfully...");
    rootrouter.push("/profile");
  } else if (state.error && !state.isLoading) {
    toast.error(state.error);
  } else if (!state.error && (!state.users || state.users.length === 0)) {
    toast.error("Invalid email or password");
  }
};
</script>
<template>
  <!-- Loading -->
  <div
    v-if="state.isLoading"
    class="fixed inset-0 flex items-center justify-center z-10 bg-base-300/5 backdrop-blur-[3px]"
  >
    <PulseLoader color="#ffffff" />
  </div>
  <!-- Done Process -->
  <div
    v-else
    class="max-w-7xl mx-auto w-full p-1 md:grid md:grid-cols-2 grid-cols-1 gap-4 items-center min-h-screen"
  >
    <div class="max-w-lg mx-auto w-full bg-base-300 rounded-lg py-10">
      <h1
        class="max-w-sm mx-auto p-4 w-full text-3xl font-bold rounded-full text-center"
      >
        Login
      </h1>
      <form
        class="max-w-sm mx-auto p-5 rounded-lg"
        @submit.prevent="handleLogin"
      >
        <!-- Email -->
        <div class="relative z-0 w-full mb-5 group">
          <input
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            type="email"
            required
            v-model="formState.email"
            id="email-address-icon"
            placeholder=" "
          />
          <label
            for="email-address-icon"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Your Email *
          </label>
        </div>
        <!-- Password -->
        <div class="relative z-0 w-full mb-5 group">
          <input
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            required
            v-model="formState.password"
            autocomplete
            type="password"
            id="password-icon"
            placeholder=" "
          />
          <label
            for="password-icon"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Your Password *
          </label>
        </div>
        <div class="w-full flex justify-end mt-10">
          <RouterLink
            to="/register"
            class="btn btn-primary px-14 btn-outline rounded-e-[0] rounded-s-full"
          >
            <ListMinus class="w-4 h-4" />Register
          </RouterLink>
          <button type="submit" class="btn btn-primary px-10 rounded-s-[0]">
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
