<script setup lang="ts">
import { emit } from 'shuutils'
import { Session } from '~/models'
import { sessionsService } from '~/services'

const active = ref(new Session())
const sessions = ref([] as Session[])

onMounted(async () => {
  emit('header-title', 'Dashboard')
  sessions.value = await getAll()
})

async function getAll() {
  return await sessionsService.getAll().catch(() => {
    throw new Error('Failed to get sessions')
  })
}
</script>

<template>
  <div class="flex gap-2 text-2xl flex-col justify-center items-center h-full">
    <span>Choisissez une exercice</span>
    <select v-model="active">
      <option v-for="session in sessions" :key="session._id" :value="session">{{ session.name }}</option>
    </select>
    <NuxtLink v-if="active._id" :to="'/run/' + active._id" class="border-2 p-1 rounded" @click="emit('start-session', active)">Démarrer</NuxtLink>
  </div>
</template>

<style>
.active {
  color: red;
}
</style>
