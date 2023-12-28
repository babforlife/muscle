<script setup lang="ts">
import { emit } from 'shuutils'
import { Header, Program } from '~/models'
import { programService, localStorageService } from '~/services'

const active = ref(new Program())
const programs = ref([] as Program[])
const showModal = ref(false)

onMounted(async () => {
  emit('header', new Header({ title: 'Démarrer une session' }))
  programs.value = await getAll()
})

async function getAll() {
  return await programService.getAll().catch(() => { throw new Error('Failed to get programs') })
}

async function start() {
  if (unfinishedSession()) return showModal.value = true
  await confirm()
}

async function confirm() {
  localStorageService.removeItem('session')
  await navigateTo(`/session/${active.value._id}`)
}

function unfinishedSession() {
  return !!localStorageService.getItem('session')
}
</script>

<template>
  <div class="col h-full items-center py-4 gap-3">
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
    <button :disabled="!active._id" theme="primary" @click="start">Démarrer</button>
    <button v-if="unfinishedSession()" theme="primary"><NuxtLink to="/session/resume">Reprendre la dernière session</NuxtLink></button>
    <Modal v-if="showModal" class="px-10" @close="showModal=false">
      <h2>Lancer un nouvel exercice supprimera la dernière sessions en cours, confirmer ?</h2>
      <div class="flex gap-3 justify-center">
        <button theme="primary" @click="confirm">Oui</button>
        <button theme="primary" @click="showModal=false">Non</button>
      </div>
    </Modal>
  </div>
</template>

<style>
button:disabled {
  pointer-events: none;
}
</style>
