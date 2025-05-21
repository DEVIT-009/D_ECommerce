<script setup>
// Style
import { Check, File, Pencil } from "lucide-vue-next";
import { useToast } from "vue-toastification";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
// Pinia
import { useUserStore } from "../stores/userData.js";
// Library
import { reactive } from "vue";
// Service API
import { usePatchUser } from "../services/userService.js";

const { state: userState, patchUser } = usePatchUser();
const toast = useToast();
const userStore = useUserStore();

// Individual edit states for each field
const editStates = reactive({
  first_name: false,
  last_name: false,
  company: false,
  location: false,
});

const formState = reactive({
  first_name: userStore.first_name,
  last_name: userStore.last_name,
  company: userStore.company,
  location: userStore.location,
});

async function handleSubmit(field) {
  // Check if the specific field has changes
  if (formState[field] === userStore[field]) {
    editStates[field] = false;
    return;
  }

  // Create patch data with only the changed field
  const patchData = {
    [field]: formState[field],
  };

  // Patching data
  console.log(userStore.user_id);

  await patchUser(userStore.user_id, patchData);

  if (!userState.error && !userState.isLoading) {
    // Use the appropriate setter based on the field
    switch (field) {
      case "first_name":
        userStore.setFirstName(formState[field]);
        break;
      case "last_name":
        userStore.setLastName(formState[field]);
        break;
      case "company":
        userStore.setCompany(formState[field]);
        break;
      case "location":
        userStore.setLocation(formState[field]);
        break;
    }
    toast.success(
      `${field.replace("_", " ").toUpperCase()} Updated successfully...`
    );
    editStates[field] = false;
  }
}

function toggleEdit(field) {
  editStates[field] = !editStates[field];
  if (!editStates[field]) {
    // Reset the field value if canceling edit
    formState[field] = userStore[field];
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
      <div class="flex md:flex-col flex-wrap gap-4 my-4 px-5">
        <!-- First Name -->
        <div class="flex flex-1 min-w-56 flex-col gap-2">
          <label
            for="fName"
            class="flex md:text-xl items-center gap-2 text-[18px]"
          >
            <File size="25" />
            First Name
          </label>
          <div class="flex gap-2">
            <input
              type="text"
              id="fName"
              placeholder="First Name"
              v-model="formState.first_name"
              class="input w-full"
              :disabled="!editStates.first_name"
              required
            />
            <button
              v-if="!editStates.first_name"
              @click="toggleEdit('first_name')"
              class="btn btn-warning btn-soft"
            >
              <Pencil size="17" />
            </button>
            <button
              v-else
              @click="handleSubmit('first_name')"
              class="btn btn-accent btn-soft"
            >
              <Check size="17" />
            </button>
          </div>
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
          <div class="flex gap-2">
            <input
              type="text"
              id="lName"
              placeholder="Last Name"
              v-model="formState.last_name"
              class="input w-full"
              :disabled="!editStates.last_name"
              required
            />
            <button
              v-if="!editStates.last_name"
              @click="toggleEdit('last_name')"
              class="btn btn-warning btn-soft"
            >
              <Pencil size="17" />
            </button>
            <button
              v-else
              @click="handleSubmit('last_name')"
              class="btn btn-accent btn-soft"
            >
              <Check size="17" />
            </button>
          </div>
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
          <div class="flex gap-2">
            <input
              type="text"
              id="company"
              placeholder="Company"
              v-model="formState.company"
              class="input w-full"
              :disabled="!editStates.company"
            />
            <button
              v-if="!editStates.company"
              @click="toggleEdit('company')"
              class="btn btn-warning btn-soft"
            >
              <Pencil size="17" />
            </button>
            <button
              v-else
              @click="handleSubmit('company')"
              class="btn btn-accent btn-soft"
            >
              <Check size="17" />
            </button>
          </div>
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
          <div class="flex gap-2">
            <input
              type="text"
              id="location"
              placeholder="st-2004/Phnome Penh"
              v-model="formState.location"
              class="input w-full"
              :disabled="!editStates.location"
              required
            />
            <button
              v-if="!editStates.location"
              @click="toggleEdit('location')"
              class="btn btn-warning btn-soft"
            >
              <Pencil size="17" />
            </button>
            <button
              v-else
              @click="handleSubmit('location')"
              class="btn btn-accent btn-soft"
            >
              <Check size="17" />
            </button>
          </div>
        </div>
        <RouterLink to="/manage-account" class="btn btn-accent">
          Manage Account
        </RouterLink>
      </div>
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
            userStore.isActive ? 'ring-accent' : 'ring-red-700'
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
        <h1 class="text-3xl uppercase font-bold text-accent">
          {{ userStore.first_name }}
          {{ userStore.last_name }}
        </h1>
      </div>
    </div>
  </div>
</template>
