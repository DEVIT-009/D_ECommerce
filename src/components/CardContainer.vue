<script setup>
import CardPhone from "./CardPhone.vue";
import { computed } from "vue";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
// Service API
import { useGetProd } from "../services/ProductService";

const { state } = useGetProd();

const props = defineProps({
  _showAddCart: {
    type: Boolean,
    default: true,
  },
  limit: Number,
  _brand: {
    default: "",
  },
});

const dataFilter = computed(() => {
  return state.products.filter(
    (item) => item.brand.toLowerCase() == props._brand.toLowerCase()
  );
});
</script>

<template>
  <!-- Loading -->
  <div
    v-if="state.isLoading"
    class="fixed inset-0 flex items-center justify-center z-10 bg-base-300/5 backdrop-blur-[3px] min-h-screen"
  >
    <PulseLoader color="#ffffff" />
  </div>
  <!-- Content -->
  <div
    v-else
    class="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 py-2"
  >
    <!-- Card list all -->
    <CardPhone
      v-if="!_brand"
      v-for="product in state.products.slice(0, limit || state.products.length)"
      :key="product.product_id"
      :product="product"
      :showAddCart="props._showAddCart"
    />
    <!-- Card list by brand -->
    <CardPhone
      v-else
      v-for="(product, index) in dataFilter.slice(
        0,
        limit || state.products.length
      )"
      :key="index"
      :product="product"
      :showAddCart="props._showAddCart"
    />
  </div>
</template>
