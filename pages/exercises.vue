<script setup lang="ts">
import { emit } from 'shuutils'
import { exerciseService } from '~/services'
import { Exercise } from '~/models'

const exercises = ref([] as Exercise[])
const newExercise = ref(new Exercise())
const showModale = ref(false)

onMounted(async () => {
  exercises.value = await exerciseService.getAll().catch(() => { throw new Error('Failed to get exercises') })
  emit('header-title', 'Exercices')
})

async function save() {
  await exerciseService.save(new Exercise(newExercise.value)).then(() => {
    showModale.value = false
    newExercise.value = new Exercise()
    get()
  }).catch(error => console.log('catch error,', error))
}

async function get() {
  await exerciseService.getAll().then(exercisesUpdate => exercises.value = exercisesUpdate).catch(() => console.log('catch error'))
}

async function remove(exercise: Exercise) {
  await exerciseService.delete(exercise).then(() => get()).catch(() => console.log('catch error'))
}

function openModale(exercise = new Exercise()) {
  newExercise.value = JSON.parse(JSON.stringify(exercise))
  showModale.value = true
}
</script>

<template>
  <div class="page-exercise h-full flex flex-col overflow-auto">
    <Modal v-if="showModale" child-class="p-4 flex flex-col border-2 gap-5 bg-gray-100" @close="showModale = false">
      <div>Nom de l'exercice :</div>
      <input v-model="newExercise.name" v-focus @keyup.enter="save">
      <button @click="save">Enregistrer</button>
    </Modal>
    <div
      v-for="(exercise, index) in exercises"
      :key="exercise._id"
      class="flex justify-between mx-6 py-4"
      :class="{ 'mb-20': index === exercises.length - 1 }"
    >
      <span class="text-xl">- {{ exercise.name }}</span>
      <div class="flex gap-4 items-center px-2">
        <span @click="openModale(exercise)">✎</span>
        <span @click="remove(exercise)">✗</span>
      </div>
    </div>
    <div v-if="exercises.length === 0" class="flex justify-center items-center h-full">
      <span class="text-2xl">Aucun exercice</span>
    </div>
    <div class="absolute bottom-7 right-7 p-2 size-2xl border-2 rounded-full bg-white" @click="openModale()">＋</div>
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
