<script setup>
// Style Css
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import { Pen, Pencil, RefreshCcw } from "lucide-vue-next";
import { useToast } from "vue-toastification";
// Custom Hook
import { onMounted, reactive, ref } from "vue";
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
  product_id: null,
  product_name: "",
  brand: "",
  price: 0,
  storage: "",
  ram: "",
  color: "",
  os: "",
  chip: "",
  battery: "",
  display: "",
  camera: {
    rear: "",
    front: "",
  },
  description: "",
  release_date: "",
  network: [],
  dimensions: "",
  weight: "",
  image: "",
  in_stock: true,
  quantity: 0,
});

// get data in reactive
onMounted(async () => {
  await getOneProd(id);

  if (
    !state.isLoading &&
    !state.error &&
    state.products &&
    state.products.length > 0
  ) {
    Object.assign(prodState, state.products[0]);
  }
});

function toggleNetwork(value) {
  const index = prodState.network.indexOf(value);
  index == -1
    ? prodState.network.push(value)
    : prodState.network.splice(index, 1);
}

// Handle image upload
function handleImageUpload(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      prodState.image = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}

// Update
async function handleEdit() {
  // Check if the form has not changed
  if (JSON.stringify(prodState) === JSON.stringify(state.products[0])) {
    toast.warning("No changes detected");
    return;
  }

  try {
    await putProd(id, prodState);
    if (!state.isLoading && !state.error) {
      toast.success("Data has been updated successfully...");
    }
  } catch (error) {
    toast.error("Failed to update product");
  }
}

// Data to Display by loop
const dataDisplay = reactive([
  {
    label: "Product Name",
    get value() {
      return prodState.product_name;
    },
    set value(val) {
      prodState.product_name = val;
    },
    inpName: "product_name",
    inpId: "product-name",
    inpType: "text",
    required: true,
  },
  {
    label: "Brand",
    get value() {
      return prodState.brand;
    },
    set value(val) {
      prodState.brand = val;
    },
    inpName: "brand",
    inpId: "brand",
    inpType: "text",
    required: true,
  },
  {
    label: "Price",
    get value() {
      return prodState.price;
    },
    set value(val) {
      prodState.price = val;
    },
    inpName: "price",
    inpId: "price",
    inpType: "number",
    required: true,
  },
  {
    label: "Storage",
    get value() {
      return prodState.storage;
    },
    set value(val) {
      prodState.storage = val;
    },
    inpName: "storage",
    inpId: "storage",
    inpType: "text",
    required: true,
  },
  {
    label: "RAM",
    get value() {
      return prodState.ram;
    },
    set value(val) {
      prodState.ram = val;
    },
    inpName: "ram",
    inpId: "ram",
    inpType: "text",
    required: true,
  },
  {
    label: "Color",
    get value() {
      return prodState.color;
    },
    set value(val) {
      prodState.color = val;
    },
    inpName: "color",
    inpId: "color",
    inpType: "text",
    required: true,
  },
  {
    label: "OS",
    get value() {
      return prodState.os;
    },
    set value(val) {
      prodState.os = val;
    },
    inpName: "os",
    inpId: "os",
    inpType: "text",
    required: true,
  },
  {
    label: "Chip",
    get value() {
      return prodState.chip;
    },
    set value(val) {
      prodState.chip = val;
    },
    inpName: "chip",
    inpId: "chip",
    inpType: "text",
    required: true,
  },
  {
    label: "Battery",
    get value() {
      return prodState.battery;
    },
    set value(val) {
      prodState.battery = val;
    },
    inpName: "battery",
    inpId: "battery",
    inpType: "text",
    required: true,
  },
  {
    label: "Display",
    get value() {
      return prodState.display;
    },
    set value(val) {
      prodState.display = val;
    },
    inpName: "display",
    inpId: "display",
    inpType: "text",
    required: true,
  },
  {
    label: "Dimension",
    get value() {
      return prodState.dimensions;
    },
    set value(val) {
      prodState.dimensions = val;
    },
    inpName: "dimensions",
    inpId: "dimensions",
    inpType: "text",
    required: true,
  },
  {
    label: "Weight",
    get value() {
      return prodState.weight;
    },
    set value(val) {
      prodState.weight = val;
    },
    inpName: "weight",
    inpId: "weight",
    inpType: "text",
    required: true,
  },
  {
    label: "Quantity",
    get value() {
      return prodState.quantity;
    },
    set value(val) {
      prodState.quantity = val;
    },
    inpName: "quantity",
    inpId: "quantity",
    inpType: "number",
    required: true,
  },
]);
</script>
<template>
  <!-- Loading -->
  <div
    v-if="state.isLoading"
    class="fixed inset-0 flex items-center justify-center z-10 bg-base-300/5 backdrop-blur-[3px]"
  >
    <PulseLoader color="#ffffff" />
  </div>
  <div v-else>
    <!-- Show -->
    <h1 class="text-2xl md:text-4xl p-8 rounded-lg bg-base-300 md:font-bold">
      Edit Product
    </h1>
    <form class="mx-auto mt-4" @submit.prevent="handleEdit">
      <div
        class="w-full grid grid-cols-[repeat(auto-fit,minmax(230px,_1fr))] gap-2"
      >
        <!-- Product Name, Brand, Price, Storage, RAM, Color, OS, Chip, Battery, Display, Dimension, Weight, Quantity -->
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
            {{ item.label }}
          </label>
        </div>
      </div>
      <!-- Release date & Camera -->
      <div class="grid sm:grid-cols-2 gap-2">
        <!-- Release Date -->
        <fieldset
          class="fieldset bg-base-100 border-base-300 rounded-box border p-4 flex-1 flex flex-wrap min-w-64"
        >
          <legend class="fieldset-legend">Release Date</legend>
          <div class="relative z-0 w-full mb-5 group">
            <input
              v-model="prodState.release_date"
              type="date"
              name="release_date"
              id="release_date"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
          </div>
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
              name="rear_camera"
              id="rear_camera"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              for="rear_camera"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Rear Camera
            </label>
          </div>
          <!-- Front Camera -->
          <div class="relative z-0 basis-[200px] flex-1 mb-5 group">
            <input
              v-model="prodState.camera.front"
              type="text"
              name="front_camera"
              id="front_camera"
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              for="front_camera"
              class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Front Camera
            </label>
          </div>
        </fieldset>
      </div>
      <!-- Network & In Stock -->
      <div class="grid sm:grid-cols-2 gap-2">
        <!-- Network -->
        <fieldset
          class="fieldset bg-base-100 border-base-300 rounded-box border p-4 flex-1 flex flex-wrap justify-between"
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
        <!-- In Stock -->
        <fieldset
          class="fieldset bg-base-100 border-base-300 rounded-box border p-4 flex-1 flex flex-wrap justify-between"
        >
          <legend class="fieldset-legend">In Stock</legend>
          <label class="label">
            <input
              type="checkbox"
              v-model="prodState.in_stock"
              class="checkbox"
            />
            Available
          </label>
        </fieldset>
      </div>
      <!-- Image Upload -->
      <fieldset
        class="fieldset max-md:col-span-2 bg-base-100 border-base-300 rounded-box border p-4 flex flex-wrap justify-between"
      >
        <legend class="fieldset-legend">Image</legend>
        <div class="flex flex-col items-center gap-4 w-full">
          <img
            v-if="prodState.image"
            :src="prodState.image"
            alt="Product Image"
            class="max-w-[200px] max-h-[200px] object-contain"
          />
          <input
            type="file"
            class="file-input"
            @change="handleImageUpload"
            accept="image/*"
          />
        </div>
      </fieldset>
      <!-- Description -->
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
      <!-- Buttons -->
      <div class="flex justify-end">
        <div class="flex gap-0 py-1">
          <button
            type="button"
            @click="generateSampleData"
            class="btn btn-accent px-20 btn-outline rounded-e-[0] rounded-s-full"
          >
            <RefreshCcw class="w-4 h-4" /> Cancel
          </button>
          <button type="submit" class="btn btn-accent px-14 rounded-s-[0]">
            Edit
            <Pencil class="w-4 h-4" />
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
