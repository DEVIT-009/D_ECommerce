<script setup>
import { defineProps } from "vue";
import { useCartStore } from "../stores/cartStore.js";
import { RouterLink } from "vue-router";

const props = defineProps({
  showAddCart: {
    type: Boolean,
    default: true,
  },
  product: {
    type: Object,
    required: true,
  },
});

const cartStore = useCartStore();

function handleAddToCart() {
  cartStore.addToCart(props.product);
}
</script>

<template>
  <div class="card bg-base-100 shadow-sm ring-1 ring-slate-900 max-w-md">
    <figure class="relative group">
      <span
        class="bg-base-300/10 backdrop-blur-sm font-bold py-2 px-7 rounded-full text-warning text-xl ring-1 ring-white/20 cursor-default absolute top-2 right-2 group-hover:bg-base-300/50 group-hover:ring-white/90 transition-all"
        >${{ product.price.toLocaleString() }}</span
      >
      <img :src="product.image" :alt="'Phone-' + product.name" />
    </figure>
    <div class="card-body">
      <h2 class="card-title">{{ product.name }}</h2>
      <p class="text-white/80 text-sm">
        {{ product.description.substring(0, 45) }}...
      </p>
      <div class="card-actions justify-start">
        <RouterLink
          :to="`/products/${product.id}`"
          class="btn btn-primary btn-outline"
        >
          Details
        </RouterLink>
        <button
          :class="`btn btn-primary ${props.showAddCart ? 'block' : 'hidden'}`"
          @click="handleAddToCart"
        >
          Add to cart
        </button>
        <RouterLink
          :to="`/d-admin/product/func`"
          :class="`place-items-center btn btn-primary ${
            props.showAddCart ? 'hidden' : 'grid'
          }`"
        >
          Custom
        </RouterLink>
      </div>
    </div>
  </div>
</template>
