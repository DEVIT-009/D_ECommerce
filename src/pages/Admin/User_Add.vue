<script setup>
// image
import banner from "@/assets/banner.png";
// ICONs & Style
import { Eye, EyeOff, RefreshCcw, SendHorizontal } from "lucide-vue-next";
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
    class="fixed inset-0 flex items-center justify-center z-20 bg-gradient-to-br from-blue-900/60 to-purple-900/60 backdrop-blur-[4px] min-h-[80vh]"
  >
    <PulseLoader color="#ffffff" />
  </div>

  <!-- Show -->
  <div
    v-else
    class="max-w-7xl mx-auto w-full md:grid md:grid-cols-2 grid-cols-1 gap-8 items-center min-h-[80vh] px-4 py-8"
  >
    <div
      class="login-container max-w-lg mx-auto w-full bg-base-300 dark:bg-base-300/90 shadow-2xl rounded-3xl py-12 px-8 flex flex-col items-center"
    >
      <h1
        class="max-w-sm mx-auto mb-6 w-full text-4xl font-extrabold rounded-full text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-500 drop-shadow-lg"
      >
        Create Account
      </h1>
      <form
        class="max-w-lg mx-auto rounded-lg px-2 w-full"
        @submit.prevent="handleSubmit"
      >
        <div
          class="w-full grid grid-cols-[repeat(auto-fit,minmax(200px,_1fr))] gap-6"
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
              class="block py-3 px-2 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-blue-300 appearance-none dark:text-white dark:border-blue-600 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-purple-600 peer transition-all duration-200"
              placeholder=" "
              :required="item.required"
            />
            <label
              :for="item.inpId"
              class="peer-focus:font-semibold absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-purple-600 peer-focus:dark:text-purple-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
              class="block py-3 px-2 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-blue-300 appearance-none dark:text-white dark:border-blue-600 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-purple-600 peer transition-all duration-200"
              placeholder=""
            />
            <label
              for="password-icon"
              class="peer-focus:font-semibold absolute text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-purple-600 peer-focus:dark:text-purple-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Your Password *
            </label>
            <Eye
              v-if="isShowCode"
              @click="isShowCode = !isShowCode"
              class="w-6 h-6 cursor-pointer absolute inset-y-2 right-2 text-blue-400 hover:text-purple-500 transition"
            />
            <EyeOff
              v-else
              @click="isShowCode = !isShowCode"
              class="w-6 h-6 cursor-pointer absolute inset-y-2 right-2 text-blue-400 hover:text-purple-500 transition"
            />
          </div>
        </div>
        <!-- Position -->
        <div class="relative mb-8">
          <label for="position" class="absolute inset-y-2 right-2.5">
            <ChevronDown class="w-5 h-5 text-blue-400" />
          </label>
          <select
            class="block py-3 px-2 w-full text-base text-gray-700 bg-transparent border-0 border-b-2 border-blue-300 appearance-none dark:text-gray-300 dark:border-blue-600 focus:outline-none focus:ring-0 focus:border-purple-600 peer transition-all duration-200"
            v-model="userState.position"
            id="position"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <!-- Button -->
        <div class="w-full flex justify-end gap-4 mt-10">
          <RouterLink
            to="/login"
            class="btn btn-outline btn-accent px-10 rounded-full border-2 border-blue-400 hover:bg-blue-100 hover:border-purple-500 transition flex items-center gap-2"
          >
            <RefreshCcw class="w-4 h-4" />
            Cancel
          </RouterLink>
          <button
            type="submit"
            class="btn btn-accent px-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 shadow-lg hover:from-purple-600 hover:to-blue-600 transition flex items-center gap-2"
          >
            Register
            <SendHorizontal class="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
    <div class="max-w-lg hidden md:block animate-fade-in">
      <img :src="banner" alt="banner-login" />
    </div>
  </div>
</template>
