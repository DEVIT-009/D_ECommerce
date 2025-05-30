<script setup>
// Style css
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import {
  CornerRightDown,
  Ellipsis,
  RotateCw,
  UserRound,
} from "lucide-vue-next";
import { useToast } from "vue-toastification";
// Service API
import {
  state,
  useDeleteUser,
  useGetUser,
  usePatchUser,
} from "@/services/userService";
// local storage
import { useUserStore } from "@/stores/userData.js";
import { computed, ref } from "vue";
import { RouterLink } from "vue-router";

const toast = useToast();
const userStore = useUserStore();
const { getUser } = useGetUser();
const { deleteUser } = useDeleteUser();
const { patchUser } = usePatchUser();
const isShowPosition = ref(false);

const positions = computed(() => {
  return Array.isArray(state.users)
    ? [...new Set(state.users.map((item) => item.position))]
    : [];
});

const handleRemove = async (id) => {
  // Confirmation
  const confirmDelete = confirm("Are you sure you want to remove this user?");
  if (!confirmDelete) return;

  await deleteUser(id);
  if (!state.isLoading && !state.error) {
    toast.success("User has been Removed successfully...");
    await getUser();
  }
};

const handleUpdatePosition = async (id, userName, value) => {
  // Confirmation
  const confirmDelete = confirm(
    "Are you sure to update " + userName + " to " + value + "!"
  );
  if (!confirmDelete) return;

  const adminCount = state.users.filter(
    (user) => user.position === "admin"
  ).length;
  if (adminCount === 1 && value !== "admin") {
    toast.error("There must be at least one admin user.");
    return;
  }

  await patchUser(id, { position: value });
  if (!state.isLoading && !state.error) {
    toast.success(
      userName + " has been update to be " + value.toUpperCase() + "!"
    );
    await getUser();
    isShowPosition.value = false;
  }
};
</script>
<template>
  <div
    class="w-full p-4 border border-gray-200 rounded-lg shadow-sm sm:p-8 dark:bg-base-300 dark:border-gray-700"
  >
    <!-- Loading -->
    <div
      v-if="state.isLoading"
      class="fixed inset-0 flex items-center justify-center z-10 bg-base-300/5 backdrop-blur-[3px]"
    >
      <PulseLoader color="#ffffff" />
    </div>
    <!-- Heading of table -->
    <div class="flex items-center gap-2 justify-between mb-4">
      <!-- Heading Left side -->
      <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">
        Users Listing
      </h5>
      <!-- Button Edit Position -->
      <button
        type="button"
        v-if="!isShowPosition"
        class="btn btn-primary max-md:btn-sm"
        @click="isShowPosition = !isShowPosition"
      >
        Edit Position
      </button>
      <!-- Button Cancel -->
      <button
        v-else
        class="btn btn-accent max-md:btn-sm"
        type="button"
        @click="isShowPosition = !isShowPosition"
      >
        <RotateCw class="w-4 h-4" />
      </button>
    </div>
    <!-- Listing Container -->
    <div class="flow-root" v-if="!state.isLoading">
      <!-- Listing -->
      <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
        <!-- Items -->
        <li
          v-for="(item, index) in state.users"
          :key="index"
          class="py-3 sm:py-4"
        >
          <div class="flex items-center gap-2">
            <!-- Image -->
            <div class="shrink-0">
              <img
                class="w-12 md:w-16 h-12 md:h-16 rounded-full object-cover"
                :src="item.image || userStore.imgDefault"
                :alt="`profile-img-${item.last_name}`"
              />
            </div>
            <!-- information -->
            <div class="flex-1 min-w-0 ms-4">
              <p
                class="text-sm font-medium text-gray-900 truncate dark:text-white"
              >
                {{ item.first_name + " " + item.last_name }}
              </p>
              <p
                class="text-sm w-fit text-gray-500 truncate dark:text-gray-400"
              >
                {{ item.email }}
              </p>
            </div>
            <!-- Options -->
            <div
              class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white"
            >
              <!-- ================================================================================================================= -->
              <!-- Position Ourse-->
              <div class="" v-if="isShowPosition">
                <div
                  v-if="item.user_id === userStore.user_id"
                  class="btn rounded-full btn-accent w-28 uppercase flex justify-between cursor-default"
                >
                  {{ item.position }} <UserRound class="w-4 h-4" />
                </div>
                <div class="dropdown dropdown-end" v-else>
                  <div
                    tabindex="0"
                    role="button"
                    :class="`${
                      item.position == 'admin' ? 'btn-accent' : 'btn-info'
                    } btn btn-soft w-28 uppercase flex justify-between`"
                  >
                    {{ item.position }} <CornerRightDown class="w-4 h-4" />
                  </div>
                  <ul
                    tabindex="0"
                    class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
                  >
                    <div v-for="(position, index) in positions" :key="index">
                      <li v-if="position !== item.position">
                        <button
                          type="button"
                          @click="
                            handleUpdatePosition(
                              item.user_id,
                              item.last_name,
                              position
                            )
                          "
                        >
                          Update to {{ position.toUpperCase() }}
                        </button>
                      </li>
                    </div>
                  </ul>
                </div>
              </div>
              <!-- ================================================================================================================= -->
              <!-- Btn more -->
              <div class="" v-else>
                <RouterLink
                  :to="`/d-admin/user/${item.user_id}`"
                  class="btn btn-accent rounded-full"
                  v-if="item.user_id === userStore.user_id"
                >
                  <UserRound class="w-4 h-4" />
                </RouterLink>
                <div class="" v-else>
                  <button
                    class="btn btn-circle btn-soft btn-accent"
                    :popovertarget="`popover-${index + 1}`"
                    :style="`anchor-name: --anchor-${index + 1}`"
                  >
                    <Ellipsis />
                  </button>
                  <ul
                    class="dropdown dropdown-left menu min-w-32 rounded-box bg-base-100 shadow-sm md:translate-y-[25%] translate-y-[10%]"
                    popover
                    :id="`popover-${index + 1}`"
                    :style="`position-anchor: --anchor-${index + 1}`"
                  >
                    <li class="">
                      <RouterLink :to="`/d-admin/user/${item.user_id}`">
                        Detail
                      </RouterLink>
                    </li>
                    <li class="text-error">
                      <button type="button" @click="handleRemove(item.user_id)">
                        Remove
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              <!-- ================================================================================================================= -->
            </div>
          </div>
        </li>
      </ul>
    </div>
    <!-- count -->
    <div class="py-5 text-white/70">
      <p class="">
        There are
        {{
          state.users.length <= 1
            ? state.users.length + " User"
            : state.users.length + " Users"
        }}.
      </p>
    </div>
  </div>
</template>
