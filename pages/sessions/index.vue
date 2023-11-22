<script setup lang="ts">
import { emit } from 'shuutils'
import { sessionsService } from '~/services'
import { Session } from '~/models'

const sessions = ref([] as Session[])
const showModale = ref(false)

onMounted(async () => {
  sessions.value = await sessionsService.getAll().catch(() => { throw new Error('Failed to get session') })
  emit('header-title', 'Séances')
})

function color(hue: number) {
  return `hsl(${360 * hue}, 100%, 95%)`
}
</script>

<template>
  <div class="page-sessions h-full flex flex-col overflow-auto gap-4 mt-4">
    <NuxtLink
      v-for="(session, index) in sessions"
      :key="session._id"
      :to="'/sessions/' + session._id"
      class="flex flex-col justify-between items-center p-4 mx-4 border-2 rounded-xl border-gray-300"
      :class="{ 'mb-20': index === sessions.length - 1 }"
      :style="{ 'background-color': color(session.color) }"
    >
      <h2 class="text-xl">{{ session.name }}</h2>
      <div class="flex flex-wrap text-xs text-gray-500 gap-1 justify-center">
        <div v-for="(exercise, exerciseIndex) in session.exercises" :key="exercise._id" class="flex gap-1">
          <span>{{ exercise.name }}</span>
          <span>{{ exerciseIndex !== session.exercises.length - 1 ? '·' : '' }}</span>
        </div>
      </div>
    </NuxtLink>
    <NuxtLink to="/sessions/create" class="absolute bottom-7 right-7 p-2 size-2xl border-2 rounded-full" @click="showModale = true">＋</NuxtLink>
  </div>
</template>
