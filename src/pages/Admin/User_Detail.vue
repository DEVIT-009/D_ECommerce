<script setup>
import { onMounted, reactive, ref } from "vue";
import { useGetOneUser } from "../../services/userService";
import { useRoute } from "vue-router";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import { File } from "lucide-vue-next";

const route = useRoute();
const id = route.params.id;
const { state, getOneUser } = useGetOneUser();
const formState = reactive({
  first_name: "",
  last_name: "",
  company: "",
  location: "",
  phone: "",
  email: "",
  password: "",
  image: "",
  position: "",
});
const imgDefault = ref(
  "https://res.cloudinary.com/dyz2kowij/image/upload/v1745334747/profile_default_uhhkrw.jpg"
);

onMounted(async () => {
  await getOneUser(id);

  if (!state.isLoading && !state.error) {
    Object.assign(formState, state.users[0]);
  }
});
</script>
<template>
  <div class="max-w-7xl mx-auto w-full mt-2 flex max-md:flex-col-reverse">
    <!-- Loading ... -->
    <div
      v-if="state.isLoading"
      class="fixed inset-0 flex items-center justify-center z-10 bg-base-300/5 backdrop-blur-[3px]"
    >
      <PulseLoader color="#ffffff" />
    </div>
    <!-- information -->
    <div class="md:w-1/2 w-full" v-if="!state.isLoading">
      <h2 class="text-5xl p-5 font-bold">Profile</h2>
      <form action="" class="flex md:flex-col flex-wrap gap-4 my-4 px-5">
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
            v-model="formState.first_name"
            class="input w-full"
            disabled
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
            v-model="formState.last_name"
            class="input w-full"
            disabled
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
            disabled
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
            disabled
            required
          />
        </div>
        <!-- Phone -->
        <div class="flex flex-1 min-w-56 flex-col gap-2">
          <label
            for="phone"
            class="flex md:text-xl items-center gap-2 text-[18px]"
          >
            <File size="25" />
            Phone
          </label>
          <input
            type="text"
            id="phone"
            placeholder="Phone"
            v-model="formState.phone"
            class="input w-full"
            disabled
            required
          />
        </div>
        <!-- Email -->
        <div class="flex flex-1 min-w-56 flex-col gap-2">
          <label
            for="email"
            class="flex md:text-xl items-center gap-2 text-[18px]"
          >
            <File size="25" />
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            v-model="formState.email"
            class="input w-full"
            disabled
            required
          />
        </div>
        <!-- Position -->
        <div class="flex flex-1 min-w-56 flex-col gap-2">
          <label
            for="position"
            class="flex md:text-xl items-center gap-2 text-[18px]"
          >
            <File size="25" />
            Position
          </label>
          <input
            type="text"
            id="position"
            placeholder="Position"
            v-model="formState.position"
            class="input w-full uppercase"
            disabled
            required
          />
        </div>
      </form>
    </div>
    <!-- Profile -->
    <div
      class="md:w-1/2 w-full flex items-center justify-center flex-col"
      v-if="!state.isLoading"
    >
      <!-- Avartar -->
      <div class="avatar max-w-100 w-full">
        <div
          class="w-full ring-primary ring-offset-base-100 rounded-full ring-2 ring-offset-2"
        >
          <img :src="formState.image || imgDefault" alt="img-profile" />
        </div>
      </div>
      <!-- Name -->
      <div
        class="mt-4 w-full max-w-100 bg-base-300 text-center py-4 rounded-lg"
      >
        <h1 class="text-3xl uppercase font-bold text-primary">
          {{ formState.first_name }}
          {{ formState.last_name }}
        </h1>
      </div>
    </div>
  </div>
</template>
