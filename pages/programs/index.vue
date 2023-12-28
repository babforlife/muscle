<script setup lang="ts">
import { PlusCircleIcon } from '@heroicons/vue/24/solid'
import { emit } from 'shuutils'
import { programService } from '~/services'
import { Header, Program } from '~/models'

const programs = ref([] as Program[])
const newProgram = ref(new Program())
const showModal = ref(false)

onMounted(async () => {
  emit('header', new Header({ title: 'Programmes', search: true }))
  await get()
})

async function get() {
  await programService.getAll().then(programsUpdate => programs.value = programsUpdate).catch(() => console.log('Failed to get exercises'))
}

async function save() {
  await programService.post(newProgram.value).then(() => get()).catch(() => console.log('Failed to save exercise'))
  showModal.value = false
}
</script>

<template>
  <div class="col h-full relative">
    <div class="col gap-3 flex-1 py-4 overflow-auto">
      <NuxtLink v-for="program in programs" :key="program._id" :to="'/programs/' + program._id" class="list-item">
        <h2>{{ program.name }}</h2>
        <div class="flex flex-wrap text-xs text-gray-500 gap-1 justify-center">
          <div v-for="(exercise, exerciseIndex) in program.exercises" :key="exercise._id" class="flex gap-1">
            <span>{{ exercise.name }}</span>
            <span>{{ exerciseIndex !== program.exercises.length - 1 ? '·' : '' }}</span>
          </div>
        </div>
      </NuxtLink>
      <div class="mb-14" />
    </div>
    <NuxtLink class="absolute bottom-5 right-5 icon-16 text-indigo-500" @click="showModal=true"><PlusCircleIcon /></NuxtLink>
    <Modal v-if="showModal" @close="showModal=false">
      <h2>Création d'un programme</h2>
      <label>Nom
        <input v-model="newProgram.name" v-focus @keyup.enter="save">
      </label>
      <div class="flex gap-3 justify-center">
        <button theme="primary" @click="save">Enregistrer</button>
        <button theme="primary" @click="showModal=false">Fermer</button>
      </div>
    </Modal>
  </div>
</template>
