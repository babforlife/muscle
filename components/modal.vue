<script setup lang="ts">
defineProps<{childClass: string}>()
defineEmits(['close'])
</script>

<template>
  <div class="fixed flex justify-center items-center inset-0 bg-cyan-100/25" @click.self="$emit('close')">
    <div :class="childClass" @click.prevent.stop>
      <slot />
    </div>
  </div>
</template>
