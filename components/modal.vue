<script setup lang="ts">
defineProps<{childClass?: string}>()
defineEmits(['close'])
</script>

<template>
  <div class="fixed flex justify-center items-center inset-0 bg-transparent/20" @click.self="$emit('close')">
    <div class="bg-white p-4 rounded-lg shadow-xl col gap-6" :class="childClass" @click.prevent.stop>
      <slot />
    </div>
  </div>
</template>
