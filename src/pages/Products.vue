<script setup>
// Css
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import { CornerDownRight, ChevronLeft } from "lucide-vue-next";
// Component
import CardContainer from "@/components/CardContainer.vue";
// hook
import { computed, ref } from "vue";
// Service
import { useGetProd } from "../services/ProductService.js";

// get array that store all type without douplicate
const { state: getProd } = useGetProd();
const arrBrand = computed(() => {
  return Array.isArray(getProd.products)
    ? [...new Set(getProd.products.map((product) => product.brand))]
    : [];
});
const eachBrand = ref("");

function handleChangeBrand(brand) {
  eachBrand.value = brand;
}
function handleResetBrand() {
  eachBrand.value = "";
}
</script>
<template>
  <div class="w-full">
    <!-- Product All -->
    <div
      v-if="!eachBrand"
      class="pt-4"
      v-for="(brand, index) in arrBrand"
      :key="index"
    >
      <button
        @click="() => handleChangeBrand(brand)"
        class="btn btn-xl md:btn-wide btn-primary"
      >
        <CornerDownRight />
        Filter {{ brand.toUpperCase() }}
      </button>
      <CardContainer :_brand="brand" :limit="4" />
    </div>
    <!-- Product One Brand -->
    <div v-else class="pt-4">
      <div class="flex gap-1">
        <button @click="handleResetBrand" type="button" class="btn btn-xl">
          <ChevronLeft />
        </button>
        <h2 class="btn btn-xl px-10">{{ eachBrand }}</h2>
      </div>
      <CardContainer :_brand="eachBrand" />
    </div>
  </div>
</template>
