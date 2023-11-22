<script setup lang="ts">
const properties = defineProps<{ time: Date }>()
const emit = defineEmits(['done', 'add'])

const remaining = ref(0)

onMounted(() => {
  update()
  setInterval(() => update(), 1000)
})

const display = computed(() => {
  const minutes = Math.floor(remaining.value / 60).toString().padStart(2, '0')
  const seconds = (remaining.value % 60).toString().padStart(2, '0')
  return `${minutes} : ${seconds}`
})

function update() {
  remaining.value = Math.round((properties.time.getTime() - Date.now()) / 1000)
  if (remaining.value <= 0) emit('done')
}

function add() {
  remaining.value += 15
  emit('add', new Date(properties.time.getTime() + 15 * 1000))
}
</script>

<template>
  <div class="w-full h-full flex items-center flex-col gap-8">
    <span class="text-2xl">Temps de repos</span>
    <span class="text-8xl">{{ display }}</span>
    <div class="flex flex-col gap-3">
      <button class="border-2 p-2" @click="add()">Ajouter 15 secondes</button>
      <button class="border-2 p-2" @click="$emit('done')">Passer</button>
    </div>
  </div>
</template>
