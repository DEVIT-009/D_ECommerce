<script setup>
import CardContainer from "../../components/CardContainer.vue";
import { useGetProd } from "../../services/ProductService.js";
import { computed, reactive, ref } from "vue";
import { CornerDownRight, ChevronLeft } from "lucide-vue-next";

// get array that store all type without douplicate
const { state: getProd } = useGetProd();
// const prodState = reactive({ ...getProd.products });
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
  <div class="w-full px-2">
    <!-- Product All -->
    <div
      v-if="!eachBrand"
      class="pt-4"
      v-for="(brand, index) in arrBrand"
      :key="index"
    >
      <button @click="() => handleChangeBrand(brand)" class="btn btn-xl">
        <CornerDownRight />
        Filter {{ brand.toUpperCase() }}s
      </button>
      <CardContainer :_showAddCart="false" :_brand="brand" :limit="3" />
    </div>
    <!-- Product One Brand -->
    <div v-else class="pt-4">
      <div class="flex gap-1">
        <button @click="handleResetBrand" class="btn btn-xl">
          <ChevronLeft />
        </button>
        <h2 class="btn btn-xl px-10">{{ eachBrand }}</h2>
      </div>
      <CardContainer :_showAddCart="false" :_brand="eachBrand" />
    </div>
  </div>
</template>
