<script setup lang="ts">
const properties = defineProps<{ seconds: number }>()
defineEmits(['time'])

const time = computed(() => {
  const minutes = Math.floor(properties.seconds / 60).toString().padStart(2, '0')
  const seconds = (properties.seconds % 60).toString().padStart(2, '0')
  return `${minutes} : ${seconds}`
})
</script>

<template>
  <div class="text-3xl flex items-center justify-evenly">
    <span class="border-2 rounded-full p-4 leading-4" @click="$emit('time', seconds - 5)">-</span>
    <span class="text-center">{{ time }}</span>
    <span class="border-2 rounded-full p-4 leading-4" @click="$emit('time', seconds + 5)">+</span>
  </div>
</template>
