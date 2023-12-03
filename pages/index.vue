<script setup lang="ts">
import { Program } from '~/models'
import { programService } from '~/services'

const active = ref(new Program())
const programs = ref([] as Program[])

onMounted(async () => programs.value = await getAll())

async function getAll() {
  return await programService.getAll().catch(() => { throw new Error('Failed to get programs') })
}
</script>

<template>
  <div class="flex gap-2 text-2xl flex-col justify-center items-center h-full">
    <span>Choisissez une exercice</span>
    <select v-model="active">
      <option v-for="program in programs" :key="program._id" :value="program">{{ program.name }}</option>
    </select>
    <NuxtLink v-if="active._id" :to="'/session/' + active._id" class="border-2 p-1 rounded">Démarrer</NuxtLink>
  </div>
</template>

<style>
.active {
  color: red;
}
</style>
