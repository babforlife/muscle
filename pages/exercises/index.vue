<script setup lang="ts">
import { emit } from 'shuutils'
import { exerciseService } from '~/services'
import { Exercise } from '~/models'

const exercises = ref([] as Exercise[])

onMounted(async () => {
  exercises.value = await exerciseService.getAll().catch(() => { throw new Error('Failed to get exercises') })
  emit('header-title', 'Exercices')
})

async function get() {
  await exerciseService.getAll().then(exercisesUpdate => exercises.value = exercisesUpdate).catch(() => console.log('catch error'))
}

async function remove(exercise: Exercise) {
  await exerciseService.delete(exercise).then(() => get()).catch(() => console.log('catch error'))
}
</script>

<template>
  <div class="page-exercise h-full flex flex-col">
    <div
      v-for="(exercise, index) in exercises"
      :key="exercise._id"
      class="flex justify-between mx-6 py-4"
      :class="{ 'mb-20': index === exercises.length - 1 }"
    >
      <span class="text-xl">- {{ exercise.name }}</span>
      <div class="flex gap-4 items-center px-2">
        <NuxtLink :to="'/exercises/' + exercise._id">✎</NuxtLink>
        <span @click="remove(exercise)">✗</span>
      </div>
    </div>
    <div v-if="exercises.length === 0" class="flex justify-center items-center h-full">
      <span class="text-2xl">Aucun exercice</span>
    </div>
    <NuxtLink to="/exercises/create" class="absolute bottom-7 right-7 p-2 size-2xl border-2 rounded-full">＋</NuxtLink>
  </div>
</template>

<style>
input {
  border: 1px solid black;
  border-radius: 5px;
  padding: 5px;
  font-size: 1.2rem;
}
</style>
