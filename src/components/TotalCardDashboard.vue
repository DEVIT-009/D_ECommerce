<script setup>
import { defineProps } from "vue";
import { RouterLink } from "vue-router";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  total: {
    type: String,
    required: true,
  },
  icon: {
    type: Object,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  nameBtn: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <div class="bg-base-300 rounded-lg p-6 shadow-sm">
    <div class="flex items-center gap-4">
      <div :class="`bg-${props.color}/20 p-3 rounded-lg`">
        <component :is="props.icon" :class="`w-6 h-6 text-${props.color}`" />
      </div>
      <div>
        <h3 class="text-lg font-semibold">{{ props.title }}</h3>
        <p class="text-2xl font-bold">
          {{ props.total }}
        </p>
      </div>
    </div>
    <RouterLink
      :to="props.link"
      :class="`btn btn-${props.color} btn-sm mt-4 w-full`"
    >
      {{ props.nameBtn }}
    </RouterLink>
  </div>
</template>
