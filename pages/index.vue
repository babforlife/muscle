<script setup lang="ts">
import { emit, on } from 'shuutils'
import { Program } from '~/models'
import { programService } from '~/services'

const active = ref(new Program())
const programs = ref([] as Program[])

onMounted(async () => {
  emit('header', { title: 'Démarrer une session' })
  programs.value = await getAll()
})

async function getAll() {
  return await programService.getAll().catch(() => { throw new Error('Failed to get programs') })
}
</script>

<template>
  <div class="col h-full items-center py-4">
    <div class="col items-center gap-6">
      <h2>Sélectionner un programme</h2>
      <select v-model="active">
        <option v-for="program in programs" :key="program._id" :value="program">{{ program.name }}</option>
      </select>
    </div>
    <div class="flex-1 col gap-3 justify-center">
      <div v-for="exercise in active.exercises" :key="exercise._id">
        <h3>{{ exercise.name }}</h3>
      </div>
    </div>
    <button :disabled="!active._id" theme="primary"><NuxtLink :to="'/session/' + active._id">Démarrer</NuxtLink></button>
  </div>
</template>

<style>
button:disabled {
  pointer-events: none;
}
</style>
