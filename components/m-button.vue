<script setup lang="ts">
const properties = defineProps({ loading: { default: false, type: Boolean } })
</script>

<template>
  <button class="flex items-center" :loading="properties.loading">
    <m-loader v-if="properties.loading" />
    <slot />
  </button>
</template>
