<script setup>
// Style Css
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import { Pen, RefreshCcw } from "lucide-vue-next";
import { useToast } from "vue-toastification";
// Custom Hook
import { onMounted, reactive } from "vue";
import {
  useGetOneProd,
  usePutProd,
  state,
} from "../../services/ProductService.js";
// Router
import { useRoute } from "vue-router";

const { getOneProd } = useGetOneProd();
const route = useRoute();
const id = route.params.id;
const { putProd } = usePutProd();
const toast = useToast();

// Data temp for form
const prodState = reactive({
  camera: {
    rear: "",
    front: "",
  },
});

// get data in reactive
onMounted(async () => {
  await getOneProd(id);

  if (!state.isLoading && !state.error) {
    Object.assign(prodState, state.products);
  }
});

function toggleNetwork(value) {
  const index = prodState.network.indexOf(value);
  index == -1
    ? prodState.network.push(value)
    : prodState.network.splice(index, 1);
}
// Update
async function handleEdit() {
  // Check if the form has not changed
  if (JSON.stringify(prodState) === JSON.stringify(state.products)) {
    return;
  }

  await putProd(id, prodState);

  if (!state.isLoading && !state.error) {
    toast.success("Data has been updated successfully...");
  }
}
</script>
<template>
  <!-- Loading -->
  <div
    v-if="state.isLoading"
    class="fixed inset-0 flex items-center justify-center z-10 bg-base-300/5 backdrop-blur-[3px]"
  >
    <PulseLoader color="#ffffff" />
  </div>
  <div class="p-6" v-else>
    <!-- Show -->
    <h1 class="text-2xl md:text-4xl p-4 rounded-lg bg-base-300">
      Edit Product
    </h1>
    <form class="mx-auto mt-4" @submit.prevent="handleEdit">
      <div
        class="w-full grid grid-cols-[repeat(auto-fit,minmax(200px,_1fr))] gap-2"
      >
        <!-- Name -->
        <div class="relative z-0 w-full mb-5 group">
          <input
            v-model="prodState.name"
            type="name"
            name="name"
            id="name"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            for="name"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >Name</label
          >
        </div>
        <!-- Brand -->
        <div class="relative z-0 w-full mb-5 group">
          <input
            v-model="prodState.brand"
            type="brand"
            name="brand"
            id="brand"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            for="brand"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >Brand</label
          >
        </div>
        <!-- Price -->
        <div class="relative z-0 w-full mb-5 group">
          <input
            v-model="prodState.price"
            type="number"
            name="price"
            id="price"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            for="price"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >Price</label
          >
        </div>
        <!-- Storage -->
        <div class="relative z-0 w-full mb-5 group">
          <input
            v-model="prodState.storage"
            type="text"
            name="storage"
            id="storage"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            for="storage"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >Storage</label
          >
        </div>
        <!-- RAM -->
        <div class="relative z-0 w-full mb-5 group">
          <input
            v-model="prodState.ram"
            type="text"
            name="ram"
            id="ram"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            for="ram"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >RAM</label
          >
        </div>
        <!-- Color -->
        <div class="relative z-0 w-full mb-5 group">
          <input
            v-model="prodState.color"
            type="text"
            name="color"
            id="color"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            for="color"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >Color</label
          >
        </div>
        <!-- OS -->
        <div class="relative z-0 w-full mb-5 group">
          <input
            v-model="prodState.os"
            type="text"
            name="os"
            id="os"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            for="os"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >OS</label
          >
        </div>
        <!-- Chip -->
        <div class="relative z-0 w-full mb-5 group">
          <input
            v-model="prodState.chip"
            type="text"
            name="chip"
            id="chip"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            for="chip"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >Chip</label
          >
        </div>
        <!-- Battery -->
        <div class="relative z-0 w-full mb-5 group">
          <input
            v-model="prodState.battery"
            type="text"
            name="battery"
            id="battery"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            for="battery"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >Battery</label
          >
        </div>
        <!-- Display -->
        <div class="relative z-0 w-full mb-5 group">
          <input
            v-model="prodState.display"
            type="text"
            name="display"
            id="display"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            for="display"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >Display</label
          >
        </div>
        <!-- Release Date -->
        <div class="relative z-0 w-full mb-5 group">
          <input
            v-model="prodState.releaseDate"
            type="date"
            name="releaseDate"
            id="releaseDate"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            for="releaseDate"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Release Date
          </label>
        </div>
        <!-- Dimension -->
        <div class="relative z-0 w-full mb-5 group">
          <input
            v-model="prodState.dimensions"
            type="text"
            name="dimension"
            id="dimension"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            for="dimension"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >Dimension</label
          >
        </div>
        <!-- Weight -->
        <div class="relative z-0 w-full mb-5 group">
          <input
            v-model="prodState.weight"
            type="text"
            name="weight"
            id="weight"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            for="weight"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >Weight</label
          >
        </div>
        <!-- Quantity -->
        <div class="relative z-0 w-full mb-5 group">
          <input
            v-model="prodState.quantity"
            type="number"
            name="quantity"
            id="quantity"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            min="0"
          />
          <label
            for="quantity"
            class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >Quantity</label
          >
        </div>
      </div>
      <!-- Instock & Network & Camera -->
      <div class="flex flex-wrap justify-between items-start gap-2 mb-5">
        <!-- Instock -->
        <fieldset
          class="fieldset bg-base-100 border-base-300 rounded-box w-64 border p-4 flex-1"
        >
          <legend class="fieldset-legend">In Stock</legend>
          <label class="label">
            <input
              type="checkbox"
              v-model="prodState.inStock"
              class="checkbox"
            />
            Available
          </label>
        </fieldset>
        <!-- Network -->
        <fieldset
          class="fieldset bg-base-100 border-base-300 rounded-box w-64 border p-4 flex-1 flex flex-wrap justify-between"
        >
          <legend class="fieldset-legend">Network</legend>
          <label class="label min-w-14 max-w-32 flex-1">
            <input
              @change="toggleNetwork('5G')"
              type="checkbox"
              name="network"
              value="5G"
              class="checkbox"
              :checked="prodState.network && prodState.network.includes('5G')"
            />
            5G
          </label>
          <label class="label min-w-14 max-w-32 flex-1">
            <input
              @change="toggleNetwork('4G LTE')"
              type="checkbox"
              name="network"
              value="4G LTE"
              class="checkbox"
              :checked="
                prodState.network && prodState.network.includes('4G LTE')
              "
            />
            4G LTE
          </label>
          <label class="label min-w-14 max-w-32 flex-1">
            <input
              @change="toggleNetwork('3G')"
              type="checkbox"
              name="network"
              value="3G"
              class="checkbox"
              :checked="prodState.network && prodState.network.includes('3G')"
            />
            3G
          </label>
        </fieldset>
        <!-- Camera -->
        <fieldset
          class="fieldset bg-base-100 border-base-300 rounded-box border p-4 flex-1 flex flex-wrap min-w-64"
        >
          <legend class="fieldset-legend">Camera</legend>
          <!-- Rear Camera -->
          <div class="relative z-0 basis-[200px] flex-1 mb-5 group">
            <input
              v-model="prodState.camera.rear"
              type="text"
              name="rearCamera"
              id="rearCamera"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              for="rearCamera"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >Rear Camera</label
            >
          </div>
          <!-- Front Camera -->
          <div class="relative z-0 basis-[200px] flex-1 mb-5 group">
            <input
              v-model="prodState.camera.front"
              type="text"
              name="frontCamera"
              id="frontCamera"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              for="frontCamera"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >Front Camera</label
            >
          </div>
        </fieldset>
      </div>
      <!-- Desctiption -->
      <div class="relative z-0 w-full mb-5 group">
        <textarea
          v-model="prodState.description"
          name="description"
          id="description"
          rows="4"
          class="block py-2.5 px-0 w-full text-sm min-h-28 max-h-52 text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        ></textarea>
        <label
          for="description"
          class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >Description</label
        >
      </div>
      <!--  -->
      <button type="submit" class="btn btn-warning font-bold px-10 mr-2">
        <Pen class="w-4 h-4" /> Edit
      </button>
      <button
        @click="Object.assign(prodState, state.products)"
        type="button"
        class="btn btn-error font-bold px-10"
      >
        <RefreshCcw class="w-4 h-4" /> Cencel
      </button>
    </form>
  </div>
</template>

<!-- image, rate -->
