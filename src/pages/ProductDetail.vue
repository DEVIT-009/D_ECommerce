<script setup>
import { useRoute } from "vue-router";
import { computed, onMounted, reactive } from "vue";
import { Check } from "lucide-vue-next";
import Button from "../components/Button.vue";
import { Star } from "lucide-vue-next";
import { useCartStore } from "../stores/cartStore.js";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
// Service API
import { useGetOneProd } from "../services/ProductService.js";

const route = useRoute();
const id = route.params.id;

const { state: getProd, getOneProd } = useGetOneProd();

const product = reactive({
  price: "",
  camera: {
    rear: "",
    front: "",
  },
});

onMounted(async () => {
  await getOneProd(id);
  if (!getProd.isLoading && getProd.products && !getProd.error) {
    Object.assign(product, getProd.products[0]); // Fix: Access first item from products array
  }
});

const feature = computed(() => {
  if (!product) return {};
  const {
    product_id,
    product_name,
    price,
    image,
    camera,
    network,
    quantity,
    in_stock,
    description,
    rate,
    ...rest
  } = product;
  return rest;
});

// Add to cart
const cartStore = useCartStore();
function handleAdd() {
  cartStore.addToCart(product);
}
</script>
<template>
  <!-- Loading -->
  <div
    class="fixed inset-0 flex items-center justify-center z-10 bg-base-300/5 backdrop-blur-[3px] min-h-screen"
    v-if="getProd.isLoading"
  >
    <PulseLoader color="#ffffff" />
  </div>
  <!-- Show data -->
  <div
    class="mt-2 max-w-7xl mx-auto flex max-md:flex-col gap-2"
    v-if="product && !getProd.isLoading"
  >
    <div class="flex-1">
      <h1 class="text-warning text-2xl font-bold">
        {{ product.product_name }}
      </h1>
      <div class="border-[1px] border-white/20 my-2"></div>
      <p class="">{{ product.description }}</p>
      <figure class="mt-3">
        <img :src="product.image" alt="product-image" class="rounded-xl" />
      </figure>
    </div>
    <div class="flex-1">
      <div class="collapse collapse-arrow bg-base-100 border border-base-300">
        <input type="radio" name="my-accordion-2" checked="checked" />
        <div class="collapse-title font-semibold">Add to your cart now!</div>
        <div class="collapse-content text-sm flex flex-col gap-2">
          <div
            class="bg-base-300 flex justify-between gap-4 items-center p-2 rounded-lg"
          >
            <span
              class="w-fit bg-warning text-base-100 text-lg py-1 px-5 rounded-full font-bold"
            >
              ${{ product.price.toLocaleString() }}
            </span>
            <div
              class="flex items-center gap-2 text-xl font-bold text-warning py-1 px-5 rounded-xl w-fit"
            >
              <Star class="text-warning" />
              {{ product.rate }}
            </div>
          </div>
          <p class="text-lg text-white/50">
            Only in
            <span class="text-white">{{ product.quantity }} items</span> in in
            stock!
          </p>
          <hr class="bg-white/30 border-none h-[1px]" />
          <Button text="Add to Cart" _class="btn-primary" @click="handleAdd" />
        </div>
      </div>
      <div class="collapse collapse-arrow bg-base-100 border border-base-300">
        <input type="radio" name="my-accordion-2" />
        <div class="collapse-title font-semibold">Camera & Network</div>
        <div class="collapse-content text-sm flex flex-col gap-2">
          <div class="flex flex-col gap-1">
            <p class="text-lg font-bold">Camera</p>
            <p class="flex items-center gap-2">
              <Check class="bg-base-300 rounded-full p-1" /><span>Rear : </span
              ><span class="bg-base-300 rounded-full py-1 px-3">
                {{ product.camera.rear }}
              </span>
            </p>
            <p class="flex items-center gap-2">
              <Check class="bg-base-300 rounded-full p-1" /><span>Front : </span
              ><span class="bg-base-300 rounded-full py-1 px-3">
                {{ product.camera.front }}
              </span>
            </p>
          </div>
          <div class="flex items-center gap-2">
            <p class="text-lg font-bold">Network :</p>
            <span
              class="bg-base-300 rounded-full py-1 px-4"
              v-for="(item, index) in product.network"
              :key="index"
              >{{ item }}</span
            >
          </div>
        </div>
      </div>
      <div class="collapse collapse-arrow bg-base-100 border border-base-300">
        <input type="radio" name="my-accordion-2" />
        <div class="collapse-title font-semibold">Phone feature | Details</div>
        <div class="collapse-content text-sm">
          <ul class="flex flex-col gap-1">
            <li
              v-for="(item, index) in feature"
              :key="index"
              class="flex items-center text-lg"
            >
              <span class="list-feature"
                ><Check class="bg-base-300 rounded-full p-1" />
                {{ index.toUpperCase() }} :
              </span>
              <span class="list-info">{{ item }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@import "tailwindcss";
@plugin "daisyui";
li .list-info {
  @apply bg-base-300 py-1 px-3 rounded-lg ml-1;
}
li .list-feature {
  @apply flex items-center gap-2 text-nowrap;
}
</style>
