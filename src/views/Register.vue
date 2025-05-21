<script setup>
// image
import banner from "@/assets/banner.png";
// ICONs & Style
import {
  ChevronDown,
  Eye,
  EyeOff,
  KeyRound,
  SendHorizontal,
} from "lucide-vue-next";
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
      // Add local storage
      userStore.setUserData(userState);
      userStore.setIsActive(true);
      // Notifcation
      toast.success("User added successfully...");
      // Route to Profile after added
      rootrouter.push("/profile");
    } else {
      toast.error("There's something went wrong...");
      console.error("Cannot add, error : ", state.error);
    }
  }
}

// Data Display
const dataDisplay = ref([
  {
    label: "First Name",
    get value() {
      return userState.first_name;
    },
    set value(val) {
      userState.first_name = val;
    },
    inpType: "text",
    inpId: "first-name",
    inpName: "first_name",
    required: true,
  },
  {
    label: "Last Name",
    get value() {
      return userState.last_name;
    },
    set value(val) {
      userState.last_name = val;
    },
    inpType: "text",
    inpId: "last-name",
    inpName: "last_name",
    required: true,
  },
  {
    label: "Phone Number",
    get value() {
      return userState.phone;
    },
    set value(val) {
      userState.phone = val;
    },
    inpType: "tel",
    inpId: "phone-number",
    inpName: "phone",
    required: true,
  },
  {
    label: "Company",
    get value() {
      return userState.company;
    },
    set value(val) {
      userState.company = val;
    },
    inpType: "text",
    inpId: "company",
    inpName: "company",
    required: false,
  },
  {
    label: "Location",
    get value() {
      return userState.location;
    },
    set value(val) {
      userState.location = val;
    },
    inpType: "text",
    inpId: "location",
    inpName: "location",
    required: true,
  },
  {
    label: "Email",
    get value() {
      return userState.email;
    },
    set value(val) {
      userState.email = val;
    },
    inpType: "email",
    inpId: "email",
    inpName: "email",
    required: true,
  },
]);
</script>
<template>
  <!-- Loading -->
  <div
    v-if="state.isLoading || id_state.isLoading"
    class="fixed inset-0 flex items-center justify-center z-10 bg-base-300/5 backdrop-blur-[3px] min-h-screen"
  >
    <PulseLoader color="#ffffff" />
  </div>

  <!-- Show -->
  <div
    v-else
    class="max-w-7xl mx-auto w-full md:grid md:grid-cols-2 grid-cols-1 gap-4 items-center min-h-screen"
  >
    <div
      class="login-container max-w-lg mx-auto w-full bg-base-300 rounded-lg py-10"
    >
      <h1
        class="max-w-sm mx-auto p-4 w-full text-3xl font-bold rounded-full text-center"
      >
        Create Account
      </h1>
      <form
        class="max-w-lg mx-auto rounded-lg px-10"
        @submit.prevent="handleSubmit"
      >
        <div
          class="w-full grid grid-cols-[repeat(auto-fit,minmax(200px,_1fr))] gap-4"
        >
          <!-- First Name, Last Name, Phone Number, Company, Location, Email -->
          <div
            class="relative z-0 w-full mb-5 group"
            v-for="item in dataDisplay"
            :key="item.label"
          >
            <input
              v-model="item.value"
              :type="item.inpType"
              :id="item.inpId"
              :name="item.inpName"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              :required="item.required"
            />
            <label
              :for="item.inpId"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              {{ item.label }} {{ item.required ? "*" : "" }}
            </label>
          </div>
        </div>
        <!-- Password -->
        <div class="mb-5 flex-1">
          <div class="relative z-0 w-full mb-5 group">
            <input
              v-model="userState.password"
              required
              autocomplete
              :type="isShowCode ? 'password' : 'text'"
              id="password-icon"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=""
            />
            <label
              for="password-icon"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Your Password *
            </label>
            <Eye
              v-if="isShowCode"
              @click="isShowCode = !isShowCode"
              class="w-6 h-6 cursor-pointer absolute inset-y-2 right-2 text-base-content/50"
            />
            <EyeOff
              v-else
              @click="isShowCode = !isShowCode"
              class="w-6 h-6 cursor-pointer absolute inset-y-2 right-2 text-base-content/50"
            />
          </div>
        </div>
        <!-- Position -->
        <div class="relative">
          <label for="position" class="absolute inset-y-2 right-2.5">
            <ChevronDown class="w-5 h-5 text-base-content/50" />
          </label>
          <select
            class="block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
            v-model="userState.position"
            id="position"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <!-- Button -->
        <div class="w-full flex justify-end mt-10">
          <RouterLink
            to="/login"
            class="btn btn-primary px-14 btn-outline rounded-e-[0] rounded-s-full"
          >
            <KeyRound class="w-4 h-4" />Login
          </RouterLink>
          <button type="submit" class="btn btn-primary px-10 rounded-s-[0]">
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
