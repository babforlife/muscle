<script setup lang="ts">
import { emit } from 'shuutils'
import { programService } from '~/services'
import { Program } from '~/models'
import { hueToColor } from '~/utils'

const programs = ref([] as Program[])
const showModale = ref(false)

onMounted(async () => {
  programs.value = await programService.getAll().catch(() => { throw new Error('Failed to get programs') })
  emit('header-title', 'Séances')
})
</script>

<template>
  <div class="page-programs h-full flex flex-col gap-4 mt-4">
    <NuxtLink
      v-for="(program, index) in programs"
      :key="program._id"
      :to="'/programs/' + program._id"
      class="flex flex-col justify-between items-center p-4 mx-4 border-2 rounded-xl border-gray-300"
      :class="{ 'mb-20': index === programs.length - 1 }"
      :style="{ 'background-color': hueToColor(program.color) }"
    >
      <h2 class="text-xl">{{ program.name }}</h2>
      <div class="flex flex-wrap text-xs text-gray-500 gap-1 justify-center">
        <div v-for="(exercise, exerciseIndex) in program.exercises" :key="exercise._id" class="flex gap-1">
          <span>{{ exercise.name }}</span>
          <span>{{ exerciseIndex !== program.exercises.length - 1 ? '·' : '' }}</span>
        </div>
      </div>
    </NuxtLink>
    <NuxtLink to="/programs/create" class="absolute bottom-7 right-7 p-2 size-2xl border-2 rounded-full" @click="showModale = true">＋</NuxtLink>
  </div>
</template>
