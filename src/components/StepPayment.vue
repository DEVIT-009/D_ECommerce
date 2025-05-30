<script setup>
import { defineProps } from "vue";

const props = defineProps({
  limit: {
    default: 1,
  },
});
</script>
<template>
  <ul class="steps min-w-72 text-[12px] md:text-sm">
    <li class="step step-accent">Information</li>
    <li :class="`step ${props.limit >= 2 ? 'step-accent' : ''}`">Payment</li>
    <li :class="`step ${props.limit == 3 ? 'step-accent' : ''}`">Check Out</li>
  </ul>
</template>
