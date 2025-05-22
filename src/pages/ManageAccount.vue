<script setup>
import { RotateCw } from "lucide-vue-next";
import { reactive } from "vue";
import { useUserStore } from "../stores/userData.js";
import { usePatchUser } from "../services/userService.js";
import {
  useUploadCloudinary,
  imgState,
} from "../services/cloudinaryService.js";
import { useToast } from "vue-toastification";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";

// Environment variables
const CLOUDINARY_URL = import.meta.env.VITE_CLOUDINARY_UPLOAD_IMG_URL;

const userStore = useUserStore();
const { state: userState, patchUser } = usePatchUser();
const { uploadCloudinary } = useUploadCloudinary();
const toast = useToast();

// info initial information
const userInfo = reactive({
  first_name: userStore.first_name,
  last_name: userStore.last_name,
  location: userStore.location,
  phone: userStore.phone,
  company: userStore.company,
});
// initial password
const passwords = reactive({
  current: userStore.password,
  new: "",
  confirm: "",
});
// initial profile image
const image = reactive({
  raw: null,
  profile: userStore.image || userStore.imgDefault,
});

// Reset profile form to original values
function resetProfileForm() {
  userInfo.first_name = userStore.first_name;
  userInfo.last_name = userStore.last_name;
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
  const hasChanges =
    userInfo.first_name !== userStore.first_name ||
    userInfo.last_name !== userStore.last_name ||
    userInfo.company !== userStore.company ||
    userInfo.location !== userStore.location ||
    userInfo.phone !== userStore.phone;

  if (!hasChanges) {
    toast.info("No changes to update");
    return;
  }

  //Update user info
  await patchUser(userStore.user_id, {
    first_name: userInfo.first_name,
    last_name: userInfo.last_name,
    company: userInfo.company,
    location: userInfo.location,
    phone: userInfo.phone,
  });

  if (!userState.error && !userState.isLoading) {
    userStore.setFirstName(userInfo.first_name);
    userStore.setLastName(userInfo.last_name);
    userStore.setCompany(userInfo.company);
    userStore.setLocation(userInfo.location);
    userStore.setPhone(userInfo.phone);
    toast.success("User info updated successfully");
  } else {
    toast.error("Failed to update user info");
    console.error("Update error:", userState.error);
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
    await patchUser(userStore.user_id, {
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
  await patchUser(userStore.user_id, {
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

// Display data
const infoData = reactive([
  {
    label: "First Name",
    get value() {
      return userInfo.first_name;
    },
    set value(val) {
      userInfo.first_name = val;
    },
    inpName: "first_name",
    inpId: "first-name",
    inpType: "text",
    required: true,
    placeholder: " ",
  },
  {
    label: "Last Name",
    get value() {
      return userInfo.last_name;
    },
    set value(val) {
      userInfo.last_name = val;
    },
    inpName: "last_name",
    inpId: "last-name",
    inpType: "text",
    required: true,
    placeholder: " ",
  },
  {
    label: "Location",
    get value() {
      return userInfo.location;
    },
    set value(val) {
      userInfo.location = val;
    },
    inpName: "location",
    inpId: "location",
    inpType: "text",
    required: true,
    placeholder: " ",
  },
  {
    label: "Phone Number",
    get value() {
      return userInfo.phone;
    },
    set value(val) {
      userInfo.phone = val;
    },
    inpName: "phone",
    inpId: "phone",
    inpType: "tel",
    required: true,
    placeholder: " ",
  },
  {
    label: "Company",
    get value() {
      return userInfo.company;
    },
    set value(val) {
      userInfo.company = val;
    },
    inpName: "company",
    inpId: "company",
    inpType: "text",
    required: true,
    placeholder: " ",
  },
]);
const passwordData = reactive([
  {
    label: "Current Password",
    get value() {
      return passwords.current;
    },
    set value(val) {
      passwords.current = val;
    },
    inpName: "current",
    inpId: "current",
    inpType: false,
    required: true,
    placeholder: " ",
    disabled: true,
    autocomplete: "current-password",
  },
  {
    label: "New Password",
    get value() {
      return passwords.new;
    },
    set value(val) {
      passwords.new = val;
    },
    inpName: "new",
    inpId: "new",
    inpType: false,
    required: true,
    placeholder: " ",
    disabled: false,
    autocomplete: "new-password",
  },
  {
    label: "Confirm New Password",
    get value() {
      return passwords.confirm;
    },
    set value(val) {
      passwords.confirm = val;
    },
    inpName: "confirm",
    inpId: "confirm",
    inpType: false,
    required: true,
    placeholder: " ",
    disabled: false,
    autocomplete: "new-password",
  },
]);
</script>
<template>
  <div class="w-full min-h-screen bg-base-100 text-white">
    <div class="max-w-7xl mx-auto w-full">
      <!-- Loading -->
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
          <RotateCw class="w-6 h-6" />
        </button>
      </div>
      <!-- Left side: Profile Information and Password -->
      <div class="flex gap-4 max-sm:flex-wrap max-sm:flex-col-reverse">
        <div class="w-full sm:w-1/2 md:w-2/3 flex flex-col gap-4">
          <!-- Profile Information -->
          <div class="p-6 rounded-lg dark:bg-base-300 ring-1 ring-accent">
            <h2 class="text-xl font-semibold mb-6">Profile Information</h2>
            <form class="w-full" @submit.prevent="handleUpdateInfo">
              <div
                class="w-full grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4"
              >
                <!-- info data : First name, Last Name, Location, Phone Number, Company -->
                <div
                  class="relative z-0 w-full mb-5 group"
                  v-for="data in infoData"
                >
                  <input
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer disabled:opacity-50 disabled:cursor-not-allowed"
                    v-model="data.value"
                    :type="data.inpType"
                    :name="data.inpName"
                    :id="data.inpId"
                    :required="data.required"
                    :disabled="data.disabled"
                    :placeholder="data.placeholder"
                  />
                  <label
                    :for="data.inpId"
                    class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    {{ data.label }}
                  </label>
                </div>
              </div>
              <!-- Submit info user -->
              <div class="mt-4 w-full">
                <button type="submit" class="btn btn-accent w-full">
                  Update Information
                </button>
              </div>
            </form>
          </div>

          <!-- Change Password -->
          <div class="border border-accent rounded-lg p-6 dark:bg-base-300">
            <h2 class="text-xl font-semibold mb-4">Change Password</h2>
            <form class="w-full" @submit.prevent="handleUpdatePassword">
              <!-- Hidden username field for password managers -->
              <input
                type="text"
                name="username"
                :value="userStore.email"
                autocomplete="username"
                class="hidden"
              />
              <div
                class="w-full grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4"
              >
                <!-- Current, New, Confirm Password -->
                <div
                  class="relative z-0 w-full mb-5 group"
                  v-for="data in passwordData"
                  :key="data.label"
                >
                  <input
                    v-model="data.value"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer disabled:opacity-50 disabled:cursor-not-allowed"
                    :id="data.inpId"
                    :name="data.inpName"
                    :type="data.inpType ? 'text' : 'password'"
                    :required="data.required"
                    :disabled="data.disabled"
                    :placeholder="data.placeholder"
                    :autocomplete="data.autocomplete"
                  />
                  <label
                    :for="data.inpId"
                    class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    {{ data.label }}
                  </label>
                </div>
              </div>
              <button
                type="submit"
                class="col-span-2 btn btn-accent w-full mt-4"
              >
                Change Password
              </button>
            </form>
          </div>
        </div>
        <!-- Profile Picture -->
        <div class="w-full sm:w-1/2 md:w-1/3">
          <form
            action=""
            class="border border-accent rounded-lg p-6 flex flex-col items-center dark:bg-base-300"
            @submit.prevent="handleUpdateProfile"
          >
            <h2 class="text-xl font-semibold mb-6">Profile Picture</h2>
            <div class="avatar">
              <div
                class="ring-accent ring-offset-base-100 w-40 rounded-full ring-2 ring-offset-2 group"
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
            <div class="tooltip">
              <div class="tooltip-content">
                <div
                  class="animate-bounce text-accent -rotate-5 text-2xl font-black"
                >
                  This will change your Profile Picture!
                </div>
              </div>
              <button class="btn btn-accent">Change profile</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
