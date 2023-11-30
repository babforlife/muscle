<script setup lang="ts">
import { emit } from 'shuutils'
import draggable from 'vuedraggable'
import { Exercise, Program } from '~/models'
import { exerciseService, programService } from '~/services'

const exercises = ref([] as Exercise[])
const program = ref(new Program())

onMounted(async () => {
  const route = useRoute()
  const id = route.params.id as string
  if (id !== 'create') program.value = await programService.get(id).catch(() => { throw new Error('Failed to get program') })
  exercises.value = await exerciseService.getAll().catch(() => { throw new Error('Failed to get exercises') })
  emit('header-title', program.value.name)
})

function add(exercise: Exercise) {
  program.value.exercises.push(exercise)
}

function changeColor() {
  program.value.color = Math.random()
}

function color() {
  return `hsl(${360 * program.value.color}, 80%, 60%)`
}

function save() {
  programService.save(program.value)
}

function remove(exercise: Exercise) {
  program.value.exercises = program.value.exercises.filter((ex: Exercise) => ex._id !== exercise._id)
}

const exercisesNotInProgram = computed(() => {
  if (program.value.exercises === undefined) return exercises.value
  return exercises.value.filter((exercise: Exercise) => !program.value.exercises.some((ex: Exercise) => ex._id === exercise._id))
})
</script>

<template>
  <div class="page-program">
    <div class="flex items-center gap-2">
      <input
        v-model="program.name"
        class="h-10 flex-1 px-3 my-3 placeholder-gray-600 border rounded-lg focus:shadow-outline"
        placeholder="Nom de la séance"
      >
      <div class="w-1/6 h-10 rounded-lg border-2 border-gray-200" :style="{ 'background-color': color() }" @click="changeColor()" />
    </div>
    <div class="flex flex-col">
      <draggable v-model="program.exercises" :item-key="program._id">
        <template #item="{element}">
          <div @click="remove(element)">{{ element.name }}</div>
        </template>
      </draggable>
    </div>
    <span class="underline">Ajouter des exercices :</span>
    <div class="flex flex-col">
      <span v-for="exercise in exercisesNotInProgram" :key="exercise._id" @click="add(exercise)">{{ exercise.name }}</span>
    </div>
    <NuxtLink to="/programs"> <button @click="save">Enregistrer</button></NuxtLink>
  </div>
</template>
