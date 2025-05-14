<script setup>
import { Eye, EyeOff, RotateCw } from "lucide-vue-next";
import { ref, reactive } from "vue";
import { useUserStore } from "../stores/userData.js";
import { usePatchUser } from "../services/userService.js";
import {
  useUploadCloudinary,
  imgState,
} from "../services/cloudinaryService.js";
import { useToast } from "vue-toastification";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";

const userStore = useUserStore();
const { state: userState, patchUser } = usePatchUser();
const { uploadCloudinary } = useUploadCloudinary();
const toast = useToast();

// Reactive state for profile form
const userInfo = reactive({
  f_name: userStore.f_name,
  l_name: userStore.l_name,
  company: userStore.company,
  location: userStore.location,
  phone: userStore.phone,
});

// Reactive state for profile image
const image = reactive({
  raw: null,
  profile: userStore.image || userStore.imgDefault,
});

// Environment variables
const CLOUDINARY_URL = import.meta.env.VITE_CLOUDINARY_UPLOAD_IMG_URL;

// Reactive state for password form
const passwords = reactive({
  current: userStore.password,
  new: "",
  confirm: "",
});

// Reactive state for password visibility toggles
const passwordShow = reactive({
  current: false,
  new: false,
  confirm: false,
});

// Loading state
const isLoading = ref(false);

// Reset profile form to original values
function resetProfileForm() {
  userInfo.firstName = userStore.f_name;
  userInfo.lastName = userStore.l_name;
  userInfo.company = userStore.company;
  userInfo.location = userStore.location;
  userInfo.phone = userStore.phone;

  image.raw = null;
  image.profile = userStore.image || userStore.imgDefault;

  passwords.current = userStore.password;
  passwords.new = "";
  passwords.confirm = "";
}

// Handle profile image change
function handleChangeImage(e) {
  image.raw = e.target.files[0];
  image.profile = URL.createObjectURL(image.raw);
}

// Handle profile info update
async function handleUpdateInfo() {
  // Check if form has no changes
  if (
    userInfo.f_name == userStore.f_name &&
    userInfo.l_name == userStore.l_name &&
    userInfo.company == userStore.company &&
    userInfo.location == userStore.location &&
    userInfo.phone == userStore.phone
  ) {
    return;
  }

  //Update user info
  await patchUser(userStore.id, {
    f_name: userInfo.f_name,
    l_name: userInfo.l_name,
    company: userInfo.company,
    location: userInfo.location,
    phone: userInfo.phone,
  });

  if (!userState.error && !userState.isLoading) {
    userStore.setUserData(userInfo);
    userStore.setPhone(userInfo.phone);
    toast.success("User info updated successfully");
  } else {
    toast.error("Failed to update user info");
    console.log(userState.error);
  }
}

// Handle profile image update
async function handleUpdateProfile() {
  // Check if selected image is valid
  if (image.raw) {
    await uploadCloudinary(CLOUDINARY_URL, image.raw, "User_Profile");
  } else {
    toast.error("Please select an image");
    return;
  }

  // Update user profile image
  if (imgState.imgUrl && !imgState.isLoading && !imgState.error) {
    await patchUser(userStore.id, {
      image: imgState.imgUrl,
    });

    if (!userState.error && !userState.isLoading) {
      userStore.setImage(imgState.imgUrl);
      toast.success("Profile image updated successfully");
    } else {
      toast.error("Failed to update profile image");
      console.log(userState.error);
    }
  } else if (imgState.error) {
    toast.error("Failed to update profile image");
    console.log(imgState.error);
  }
}

// Handle password update
async function handleUpdatePassword() {
  // Check if passwords match
  if (passwords.new !== passwords.confirm) {
    toast.error("Confirm password doesn't match");
    return;
  }

  // Check is current password is the same with new password
  if (passwords.new === passwords.current) {
    toast.error("New password cannot be the same as the current password");
    return;
  }

  // Update user password
  await patchUser(userStore.id, {
    password: passwords.new,
  });

  // check if password is updated successfully
  if (!userState.error && !userState.isLoading) {
    userStore.setPassword(passwords.new);
    toast.success("Password updated successfully");
  } else if (userState.error) {
    toast.error("Failed to update password");
    console.log(userState.error);
  }

  // Reset password form
  passwords.current = userStore.password;
  passwords.new = "";
  passwords.confirm = "";
}
</script>
<template>
  <div class="min-h-screen bg-base-100 text-white mt-4">
    <div class="max-w-6xl mx-auto">
      <div
        v-if="userState.isLoading || imgState.isLoading"
        class="fixed inset-0 flex items-center justify-center z-10 bg-base-300/5 backdrop-blur-[3px]"
      >
        <PulseLoader color="#ffffff" />
      </div>
      <!-- Heading -->
      <div
        class="flex items-center justify-between mb-8 dark:bg-base-300 border border-accent rounded-lg p-6"
      >
        <h1 class="text-4xl font-bold">Account Settings</h1>
        <button
          class="bg-accent dark:text-base-300 p-3 rounded-full transition shadow-md hover:scale-105 hover:shadow-accent/50 duration-300 cursor-pointer"
          @click="resetProfileForm"
        >
          <RotateCw class="" />
        </button>
      </div>
      <!-- Left side: Profile Information -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <!-- Profile Information -->
        <div class="md:col-span-2 rounded-lg">
          <div class="p-6 rounded-lg dark:bg-base-300 ring-1 ring-accent">
            <h2 class="text-xl font-semibold mb-6">Profile Information</h2>
            <form
              class="grid grid-cols-1 md:grid-cols-2 gap-4"
              @submit.prevent="handleUpdateInfo"
            >
              <!-- First Name Input -->
              <div>
                <label for="first-name" class="block mb-1 text-sm"
                  >First Name</label
                >
                <input
                  id="first-name"
                  type="text"
                  required
                  v-model="userInfo.f_name"
                  class="input w-full"
                />
              </div>

              <!-- Last Name Input -->
              <div>
                <label for="last-name" class="block mb-1 text-sm"
                  >Last Name</label
                >
                <input
                  id="last-name"
                  type="text"
                  required
                  v-model="userInfo.l_name"
                  class="input w-full"
                />
              </div>

              <!-- Location Input -->
              <div>
                <label for="location" class="block mb-1 text-sm"
                  >Location</label
                >
                <input
                  id="location"
                  type="text"
                  required
                  v-model="userInfo.location"
                  class="input w-full"
                />
              </div>

              <!-- Phone Number Input -->
              <div>
                <label for="phone" class="block mb-1 text-sm"
                  >Phone Number</label
                >
                <input
                  id="phone"
                  type="tel"
                  required
                  v-model="userInfo.phone"
                  class="input w-full"
                />
              </div>

              <!-- Company Input -->
              <div>
                <label for="company" class="block mb-1 text-sm">Company</label>
                <input
                  id="company"
                  type="text"
                  v-model="userInfo.company"
                  class="input w-full"
                />
              </div>
              <div class="md:col-span-2 mt-4">
                <button type="submit" class="btn btn-accent w-full">
                  Update Information
                </button>
              </div>
            </form>
          </div>
        </div>
        <!-- Profile Picture & Change Password -->
        <div class="flex flex-col gap-8">
          <!-- Profile Picture -->
          <form
            action=""
            class="border border-accent rounded-lg p-6 flex flex-col items-center dark:bg-base-300"
            @submit.prevent="handleUpdateProfile"
          >
            <h2 class="text-xl font-semibold mb-6">Profile Picture</h2>
            <div class="avatar">
              <div
                class="ring-accent ring-offset-base-100 w-36 rounded-full ring-2 ring-offset-2 group"
              >
                <img
                  :src="image.profile"
                  alt="Profile"
                  @click="$refs.fileInput.click()"
                  class="group-hover:scale-105 group-hover:hue-rotate-50 group-hover:contrast-110 transition-all duration-300 cursor-pointer"
                />
                <input
                  type="file"
                  class="hidden"
                  ref="fileInput"
                  @change="handleChangeImage"
                />
              </div>
            </div>
            <p class="text-xs text-gray-400 my-4 text-center">
              Recommended: Square image, at least 400x400 pixels
            </p>
            <button class="btn btn-accent w-full btn-circle">
              Update Profile
            </button>
          </form>

          <!-- Change Password -->
          <div class="border border-accent rounded-lg p-6 dark:bg-base-300">
            <h2 class="text-xl font-semibold mb-4">Change Password</h2>
            <form
              class="flex flex-col gap-4"
              @submit.prevent="handleUpdatePassword"
            >
              <!-- Current Password -->
              <div>
                <label class="block mb-1 text-sm">Current Password</label>
                <div class="relative">
                  <input
                    :type="passwordShow.current ? 'text' : 'password'"
                    v-model="passwords.current"
                    class="input pr-10"
                    disabled
                    required
                  />
                  <button
                    type="button"
                    @click="passwordShow.current = !passwordShow.current"
                    class="absolute z-10 inset-y-0 right-3 text-gray-400 cursor-pointer"
                  >
                    <Eye
                      v-if="passwordShow.current"
                      class="cursor-pointer h-5 w-5"
                    />
                    <EyeOff v-else class="cursor-pointer h-5 w-5" />
                  </button>
                </div>
              </div>
              <!-- New Password -->
              <div>
                <label class="block mb-1 text-sm">New Password</label>
                <div class="relative">
                  <input
                    :type="passwordShow.new ? 'text' : 'password'"
                    v-model="passwords.new"
                    placeholder="example123"
                    class="input pr-10"
                    required
                  />
                  <button
                    type="button"
                    @click="passwordShow.new = !passwordShow.new"
                    class="absolute z-10 inset-y-0 right-3 text-gray-400 cursor-pointer"
                  >
                    <Eye v-if="passwordShow.new" class="h-5 w-5" />
                    <EyeOff v-else class="h-5 w-5" />
                  </button>
                </div>
              </div>
              <div>
                <label class="block mb-1 text-sm">Confirm New Password</label>
                <div class="relative">
                  <input
                    :type="passwordShow.confirm ? 'text' : 'password'"
                    v-model="passwords.confirm"
                    placeholder="example123"
                    class="input pr-10"
                    required
                  />
                  <button
                    type="button"
                    @click="passwordShow.confirm = !passwordShow.confirm"
                    class="absolute z-10 inset-y-0 right-3 text-gray-400"
                  >
                    <Eye v-if="passwordShow.confirm" class="h-5 w-5" />
                    <EyeOff v-else class="h-5 w-5" />
                  </button>
                </div>
              </div>
              <button type="submit" class="btn btn-accent w-full mt-2">
                Update Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
