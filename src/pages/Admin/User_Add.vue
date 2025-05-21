<script setup>
// image
import banner from "@/assets/banner.png";
// ICONs & Style
import { Eye, EyeOff, SendHorizontal } from "lucide-vue-next";
import { useToast } from "vue-toastification";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
// Hook
import { reactive, ref } from "vue";
import { useUserStore } from "@/stores/userData.js";
// Service API
import { state, useGetUser, usePostUser } from "@/services/userService.js";
import { id_state, generateUserId } from "@/services/generateID.js";
// Router
import rootrouter from "@/routers/rootrouter.js";

const toast = useToast();
const isShowCode = ref(true);
const userStore = useUserStore();

const { getUser } = useGetUser();
const { postUser } = usePostUser();

const userState = reactive({
  user_id: null,
  first_name: "",
  last_name: "",
  phone: "",
  company: "",
  email: "",
  password: "",
  image: "",
  location: "",
  position: "user",
});

async function handleSubmit() {
  // Get all users for check any condition
  await getUser();
  if (!state.isLoading && !state.error) {
    // Prevent Duplicate Tel & Email
    let error = "";
    if (state.users.find((item) => item.phone === userState.phone)) {
      error = "This phone number is already used...";
    } else if (state.users.find((item) => item.email === userState.email)) {
      error = "This email is already used...";
    }

    if (error) {
      toast.error(error);
      return;
    }
  }
  // Generate user ID before posting
  await generateUserId();
  userState.user_id = id_state.id;

  if (
    !id_state.isLoading &&
    !id_state.error &&
    !state.isLoading &&
    !state.error
  ) {
    // ADD User
    await postUser(userState);

    if (!state.error && !state.isLoading) {
      // Notifcation
      toast.success("User added successfully...");
      // Route to Profile after added
      rootrouter.push(`/d-admin/user/${id_state.id}`);
    } else {
      toast.error("There's something went wrong...");
      console.error("Cannot add, error : ", state.error);
    }
  }
}
</script>
<template>
  <div
    class="max-w-7xl mx-auto w-full p-1 md:grid md:grid-cols-2 grid-cols-1 gap-4 items-center"
  >
    <!-- Loading -->
    <div
      v-if="state.isLoading || id_state.isLoading"
      class="fixed inset-0 flex items-center justify-center z-10 bg-base-300/5 backdrop-blur-[3px]"
    >
      <PulseLoader color="#ffffff" />
    </div>
    <!-- Show -->
    <div
      class="login-container max-w-lg mx-auto w-full bg-base-300 rounded-lg py-4"
    >
      <h1
        class="max-w-sm mx-auto p-4 w-full text-3xl font-bold rounded-full text-center"
      >
        Create Account
      </h1>
      <form
        class="max-w-sm mx-auto p-5 rounded-lg"
        @submit.prevent="handleSubmit"
      >
        <!-- User Name -->
        <div class="mb-5 flex gap-5 max-sm:flex-col">
          <!-- First Name -->
          <div class="flex-1">
            <label for="first-name" class="flex items-center gap-2">
              First Name:
            </label>
            <input
              v-model="userState.first_name"
              type="text"
              required
              id="first-name"
              class="input w-full"
              placeholder="Sok"
            />
          </div>
          <!-- Last Name -->
          <div class="flex-1">
            <label for="last-name" class="flex items-center gap-2">
              Last Name:
            </label>
            <input
              v-model="userState.last_name"
              type="text"
              required
              id="last-name"
              class="input w-full"
              placeholder="Pisey"
            />
          </div>
        </div>
        <!-- Tel & Company -->
        <div class="mb-5 flex gap-5 max-sm:flex-col">
          <!-- Phone Number -->
          <div class="flex-1">
            <label for="phone-number" class="flex items-center gap-2">
              Phone Number:
            </label>
            <input
              v-model="userState.phone"
              type="tel"
              required
              id="phone-number"
              class="input w-full"
              placeholder="0967234500"
            />
          </div>
          <!-- Company -->
          <div class="flex-1">
            <label for="company" class="flex items-center gap-2">
              Company (optional):
            </label>
            <input
              v-model="userState.company"
              type="text"
              id="company"
              class="input w-full"
              placeholder="DCAMPhone"
            />
          </div>
        </div>
        <!-- Email -->
        <div class="mb-5 flex-1">
          <label for="email-address-icon" class="flex items-center gap-2">
            Your Email:
          </label>
          <input
            v-model="userState.email"
            type="email"
            required
            id="email-address-icon"
            class="input w-full"
            placeholder="example@dcamphone.com"
          />
        </div>
        <!-- Password -->
        <div class="mb-5 flex-1">
          <label for="password-icon" class="flex items-center gap-2">
            Your Password:
          </label>
          <div class="flex items-center justify-between gap-2">
            <input
              v-model="userState.password"
              required
              autocomplete
              :type="isShowCode ? 'password' : 'text'"
              id="password-icon"
              class="input w-full"
              placeholder="example123"
            />
            <Eye
              v-if="isShowCode"
              @click="isShowCode = !isShowCode"
              class="input py-2 w-fit cursor-pointer"
            />
            <EyeOff
              v-else
              @click="isShowCode = !isShowCode"
              class="input py-2 w-fit cursor-pointer"
            />
          </div>
        </div>
        <!-- Address -->
        <div class="mb-5 flex-1">
          <label for="location" class="flex items-center gap-2">
            Your Location:
          </label>
          <input
            v-model="userState.location"
            type="text"
            required
            id="location"
            class="input w-full"
            placeholder="St-2004/Phnom Penh"
          />
        </div>
        <!-- Position -->
        <div class="mb-5 flex-1">
          <label for="position" class="flex items-center gap-2">
            Your Position:
          </label>
          <select
            v-model="userState.position"
            id="position"
            class="input w-full"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div class="w-full flex justify-end gap-2">
          <button type="submit" class="btn btn-primary">
            Register
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
