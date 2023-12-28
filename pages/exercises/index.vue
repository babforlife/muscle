<script setup lang="ts">
import { PlusCircleIcon } from '@heroicons/vue/24/solid'
import { emit } from 'shuutils'
import { exerciseService } from '~/services'
import { Exercise, Header } from '~/models'

const exercises = ref([] as Exercise[])
const newExercise = ref(new Exercise())
const showModal = ref(false)

onMounted(async () => {
  emit('header', new Header({ title: 'Exercices', search: true }))
  await get()
})

async function get() {
  await exerciseService.getAll().then(exercisesUpdate => exercises.value = exercisesUpdate).catch(() => console.log('Failed to get exercises'))
}

async function save() {
  await exerciseService.post(newExercise.value).then(() => get()).catch(() => console.log('Failed to save exercise'))
  showModal.value = false
}
</script>

<template>
  <div class="col h-full relative">
    <div class="col gap-3 flex-1 py-4 overflow-auto">
      <NuxtLink v-for="exercise in exercises" :key="exercise._id" :to="'/exercises/' + exercise._id" class="list-item">
        <h2 class="text-xl">{{ exercise.name }}</h2>
      </NuxtLink>
      <div class="mb-14" />
    </div>
    <NuxtLink class="absolute bottom-5 right-5 icon-16 text-indigo-500" @click="showModal = true"><PlusCircleIcon /></NuxtLink>
    <Modal v-if="showModal" @close="showModal=false">
      <h2>Création d'un exercice</h2>
      <label>Nom
        <input v-model="newExercise.name" v-focus @keyup.enter="save">
      </label>
      <div class="flex gap-3 justify-center">
        <button theme="primary" @click="save">Enregistrer</button>
        <button theme="primary" @click="showModal=false">Fermer</button>
      </div>
    </Modal>
  </div>
</template>
