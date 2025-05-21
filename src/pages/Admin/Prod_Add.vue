<script setup>
// Service
import { imgState, useUploadCloudinary } from "@/services/cloudinaryService";
import { usePostProd } from "@/services/ProductService.js";
import { generateProductId } from "@/services/generateID.js";
// Style & Library
import { reactive, ref, onMounted } from "vue";
import { useToast } from "vue-toastification";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
// Router
import rootrouter from "@/routers/rootrouter.js";
import { SendHorizontal, Wand } from "lucide-vue-next";

// Data temporary with reactive
const formData = reactive({
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
  rate: 0,
});

const rawImage = ref(null);

const uploadUrl = import.meta.env.VITE_CLOUDINARY_UPLOAD_IMG_URL;
const { state, postProd } = usePostProd();
const { uploadCloudinary } = useUploadCloudinary();

// Network Function to add item into Network
function toggleNetwork(value) {
  const index = formData.network.indexOf(value);
  index == -1
    ? formData.network.push(value)
    : formData.network.splice(index, 1);
}
// Image OnChange
function handleChangeImg(event) {
  rawImage.value = event.target.files[0];
}
// Notification
const toast = useToast();
// Get unique ID
onMounted(async () => {
  formData.product_id = await generateProductId();
});
// Add data
async function handleAdd() {
  try {
    if (rawImage.value) {
      await uploadCloudinary(uploadUrl, rawImage.value, "Phone_Product");
      if (imgState.error) {
        toast.error("Failed to upload image");
        return;
      }
      formData.image = imgState.imgUrl;
    }

    await postProd(formData);

    if (state.error) {
      toast.error("Failed to add product");
      return;
    }

    if (!state.isLoading) {
      toast.success("Data has been added successfully...");
      // Navigate to the product detail page using the product_id from the response
      if (state.products && state.products.length > 0) {
        rootrouter.push(`/products/${state.products[0].product_id}`);
      }
    }
  } catch (error) {
    console.error("Error adding product:", error);
    toast.error("An error occurred while adding the product");
  }
}

// Function to generate sample data
function generateSampleData() {
  formData.product_name = "iPhone 15 Pro Max";
  formData.brand = "Apple";
  formData.price = 1199;
  formData.storage = "512GB";
  formData.ram = "8GB";
  formData.color = "Natural Titanium";
  formData.os = "iOS 17";
  formData.chip = "A17 Pro";
  formData.battery = "4422mAh";
  formData.display = "6.7-inch Super Retina XDR";
  formData.camera = {
    rear: "48MP + 12MP + 12MP",
    front: "12MP",
  };
  formData.description =
    "The iPhone 15 Pro Max features a titanium design, the powerful A17 Pro chip, and an advanced camera system with 5x optical zoom.";
  formData.release_date = "2023-09-22";
  formData.network = ["5G", "4G LTE", "3G"];
  formData.dimensions = "159.9 x 76.7 x 7.85 mm";
  formData.weight = "221g";
  formData.quantity = 100;
  formData.rate = 4.8;
  formData.in_stock = true;
}

// Data to Display by loop
const dataDisplay = reactive([
  {
    label: "Product Name",
    get value() {
      return formData.product_name;
    },
    set value(val) {
      formData.product_name = val;
    },
    inpName: "product_name",
    inpId: "product-name",
    inpType: "text",
    required: true,
  },
  {
    label: "Brand",
    get value() {
      return formData.brand;
    },
    set value(val) {
      formData.brand = val;
    },
    inpName: "brand",
    inpId: "brand",
    inpType: "text",
    required: true,
  },
  {
    label: "Price",
    get value() {
      return formData.price;
    },
    set value(val) {
      formData.price = val;
    },
    inpName: "price",
    inpId: "price",
    inpType: "number",
    required: true,
  },
  {
    label: "Storage",
    get value() {
      return formData.storage;
    },
    set value(val) {
      formData.storage = val;
    },
    inpName: "storage",
    inpId: "storage",
    inpType: "text",
    required: true,
  },
  {
    label: "RAM",
    get value() {
      return formData.ram;
    },
    set value(val) {
      formData.ram = val;
    },
    inpName: "ram",
    inpId: "ram",
    inpType: "text",
    required: true,
  },
  {
    label: "Color",
    get value() {
      return formData.color;
    },
    set value(val) {
      formData.color = val;
    },
    inpName: "color",
    inpId: "color",
    inpType: "text",
    required: true,
  },
  {
    label: "OS",
    get value() {
      return formData.os;
    },
    set value(val) {
      formData.os = val;
    },
    inpName: "os",
    inpId: "os",
    inpType: "text",
    required: true,
  },
  {
    label: "Chip",
    get value() {
      return formData.chip;
    },
    set value(val) {
      formData.chip = val;
    },
    inpName: "chip",
    inpId: "chip",
    inpType: "text",
    required: true,
  },
  {
    label: "Battery",
    get value() {
      return formData.battery;
    },
    set value(val) {
      formData.battery = val;
    },
    inpName: "battery",
    inpId: "battery",
    inpType: "text",
    required: true,
  },
  {
    label: "Display",
    get value() {
      return formData.display;
    },
    set value(val) {
      formData.display = val;
    },
    inpName: "display",
    inpId: "display",
    inpType: "text",
    required: true,
  },
  {
    label: "Dimension",
    get value() {
      return formData.dimensions;
    },
    set value(val) {
      formData.dimensions = val;
    },
    inpName: "dimensions",
    inpId: "dimensions",
    inpType: "text",
    required: true,
  },
  {
    label: "Weight",
    get value() {
      return formData.weight;
    },
    set value(val) {
      formData.weight = val;
    },
    inpName: "weight",
    inpId: "weight",
    inpType: "text",
    required: true,
  },
  {
    label: "Quantity",
    get value() {
      return formData.quantity;
    },
    set value(val) {
      formData.quantity = val;
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
    v-if="state.isLoading || imgState.isLoading"
    class="fixed inset-0 flex items-center justify-center z-10 bg-base-300/5 backdrop-blur-[3px]"
  >
    <PulseLoader color="#ffffff" />
  </div>
  <div v-else>
    <!-- Show -->
    <h1 class="text-2xl md:text-4xl p-8 rounded-lg bg-base-300 md:font-bold">
      Add Products
    </h1>
    <form class="mx-auto mt-4" @submit.prevent="handleAdd">
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
              v-model="formData.release_date"
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
              v-model="formData.camera.rear"
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
              v-model="formData.camera.front"
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
              >Front Camera</label
            >
          </div>
        </fieldset>
      </div>
      <!-- Instock & Network & Image -->
      <div class="grid md:grid-cols-3 grid-cols-2 gap-2 mb-5">
        <!-- Instock -->
        <fieldset
          class="fieldset bg-base-100 border-base-300 rounded-box border p-4"
        >
          <legend class="fieldset-legend">In Stock</legend>
          <label class="label">
            <input
              type="checkbox"
              v-model="formData.in_stock"
              class="checkbox"
            />
            Available
          </label>
        </fieldset>
        <!-- Network -->
        <fieldset
          class="fieldset bg-base-100 border-base-300 rounded-box border p-4 flex flex-wrap justify-between"
        >
          <legend class="fieldset-legend">Network</legend>
          <label class="label min-w-14 max-w-32 flex-1">
            <input
              @change="toggleNetwork('5G')"
              :checked="formData.network.includes('5G')"
              type="checkbox"
              name="network"
              value="5G"
              class="checkbox"
            />
            5G
          </label>
          <label class="label min-w-20 max-w-32 flex-1">
            <input
              @change="toggleNetwork('4G LTE')"
              :checked="formData.network.includes('4G LTE')"
              type="checkbox"
              name="network"
              value="4G LTE"
              class="checkbox"
            />
            4G LTE
          </label>
          <label class="label min-w-14 max-w-32 flex-1">
            <input
              @change="toggleNetwork('3G')"
              :checked="formData.network.includes('3G')"
              type="checkbox"
              name="network"
              value="3G"
              class="checkbox"
            />
            3G
          </label>
        </fieldset>
        <!-- Img -->
        <fieldset
          class="fieldset max-md:col-span-2 bg-base-100 border-base-300 rounded-box border p-4 flex flex-wrap justify-between"
        >
          <legend class="fieldset-legend">Image</legend>
          <input
            type="file"
            class="file-input"
            @change="handleChangeImg"
            accept="image/*"
            required
          />
        </fieldset>
      </div>
      <!-- Desctiption -->
      <div class="relative z-0 w-full mb-5 group">
        <textarea
          v-model="formData.description"
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
        >
          Description
        </label>
      </div>
      <!-- Button -->
      <div class="flex justify-end">
        <div class="flex gap-0 py-1">
          <button
            type="button"
            @click="generateSampleData"
            class="btn btn-primary px-10 btn-outline rounded-e-[0] rounded-s-full"
          >
            <Wand class="w-4 h-4" /> Generate Sample Data
          </button>
          <button type="submit" class="btn btn-primary px-10 rounded-s-[0]">
            Submit <SendHorizontal class="w-4 h-4" />
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
