<script setup>
import { defineProps } from "vue";
import { RouterLink } from "vue-router";
const props = defineProps({
  link: String,
  text: { type: String, required: true },
  _class: String,
  _type: { type: String, default: "" },
});
</script>

<template>
  <button
    v-if="link && _type"
    :class="`btn ${_class}`"
    :type="_type ? _type : ''"
  >
    <RouterLink :to="link">
      {{ text }}
    </RouterLink>
  </button>
  <RouterLink v-else-if="link" :to="link" :class="`btn ${_class}`">
    {{ text }}
  </RouterLink>
  <button v-else :class="`btn ${_class}`" :type="_type">
    {{ text }}
  </button>
</template>
