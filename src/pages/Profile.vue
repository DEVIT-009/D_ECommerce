<script setup>
// Style
import { File } from "lucide-vue-next";
import { useToast } from "vue-toastification";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
// Pinia
import { useUserStore } from "../stores/userData.js";
// Library
import { reactive, ref } from "vue";
// Service API
import { usePatchUser } from "../services/userService.js";

const { state: userState, patchUser } = usePatchUser();
const toast = useToast();
const userStore = useUserStore();
const isEdit = ref(false);

const formState = reactive({
  f_name: userStore.f_name,
  l_name: userStore.l_name,
  company: userStore.company,
  location: userStore.location,
});

async function handleSubmit() {
  // Check if formState has changes
  const hasChanges = Object.keys(formState).some(
    (key) => formState[key] !== userStore[key]
  );

  if (!hasChanges) {
    return;
  }

  // Patching data
  await patchUser(userStore.id, formState);

  if (!userState.error) {
    userStore.setID(userState.id);
    userStore.setUserData(formState);
    toast.success("Update successfully...");
    isEdit.value = false;
  }
}
</script>

<template>
  <div class="max-w-7xl mx-auto w-full mt-2 flex max-md:flex-col-reverse">
    <!-- Loading ... -->
    <div
      v-if="userState.isLoading"
      class="fixed inset-0 flex items-center justify-center z-10 bg-base-300/5 backdrop-blur-[3px]"
    >
      <PulseLoader color="#ffffff" />
    </div>
    <!-- information -->
    <div class="md:w-1/2 w-full">
      <h2 class="text-5xl p-5 font-bold">Profile</h2>
      <form
        @submit.prevent="handleSubmit"
        action=""
        class="flex md:flex-col flex-wrap gap-4 my-4 px-5"
      >
        <!-- First Name -->
        <div class="flex flex-1 min-w-56 flex-col gap-2">
          <label
            for="fName"
            class="flex md:text-xl items-center gap-2 text-[18px]"
          >
            <File size="25" />
            First Name
          </label>
          <input
            type="text"
            id="fName"
            placeholder="First Name"
            v-model="formState.f_name"
            class="input w-full"
            :disabled="!isEdit"
            required
          />
        </div>
        <!-- Last Name -->
        <div class="flex flex-1 min-w-56 flex-col gap-2">
          <label
            for="lName"
            class="flex md:text-xl items-center gap-2 text-[18px]"
          >
            <File size="25" />
            Last Name
          </label>
          <input
            type="text"
            id="lName"
            placeholder="Last Name"
            v-model="formState.l_name"
            class="input w-full"
            :disabled="!isEdit"
            required
          />
        </div>
        <!-- Company -->
        <div class="flex flex-1 min-w-56 flex-col gap-2">
          <label
            for="company"
            class="flex md:text-xl items-center gap-2 text-[18px]"
          >
            <File size="25" />
            Company
          </label>
          <input
            type="text"
            id="company"
            placeholder="Company"
            v-model="formState.company"
            class="input w-full"
            :disabled="!isEdit"
          />
        </div>
        <!-- Location -->
        <div class="flex flex-1 min-w-56 flex-col gap-2">
          <label
            for="location"
            class="flex md:text-xl items-center gap-2 text-[18px]"
          >
            <File size="25" />
            Location
          </label>
          <input
            type="text"
            id="location"
            placeholder="st-2004/Phnome Penh"
            v-model="formState.location"
            class="input w-full"
            :disabled="!isEdit"
            required
          />
        </div>
        <button
          type="submit"
          class="btn btn-lg btn-primary px-10 w-full"
          v-if="isEdit"
        >
          Done
        </button>
        <button
          class="btn btn-lg btn-warning px-10 w-full"
          @click="isEdit = !isEdit"
          v-if="!isEdit"
        >
          Edit
        </button>
      </form>
    </div>
    <!-- Profile -->
    <div class="md:w-1/2 w-full flex items-center justify-center flex-col">
      <!-- Avartar -->
      <div
        :class="`avatar max-w-100 w-full ${
          userStore.isActive ? 'avatar-online' : 'avatar-offline'
        }`"
      >
        <div
          :class="`${
            userStore.isActive ? 'ring-success' : 'ring-red-700'
          } ring-offset-base-100 rounded-full ring ring-offset-2 w-full`"
        >
          <img
            alt="profile-user"
            :src="userStore.image || userStore.imgDefault"
          />
        </div>
      </div>
      <!-- Name -->
      <div
        class="mt-4 w-full max-w-100 bg-base-300 text-center py-4 rounded-lg"
      >
        <h1 class="text-3xl uppercase font-bold text-success">
          {{ userStore.f_name }}
          {{ userStore.l_name }}
        </h1>
      </div>
    </div>
  </div>
</template>
