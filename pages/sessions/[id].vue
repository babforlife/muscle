<script setup lang="ts">
import { emit } from 'shuutils'
import { Exercise, Session } from '~/models'
import { exercisesService, sessionsService } from '~/services'

const exercises = ref([] as Exercise[])
const session = ref(new Session())

onMounted(async () => {
  const route = useRoute()
  const id = route.params.id as string
  session.value = id === 'create' ? new Session() : (await sessionsService.get(id).catch(() => { throw new Error('Failed to get session') }))
  exercises.value = await exercisesService.getAll().catch(() => { throw new Error('Failed to get exercises') })
  emit('header-title', session.value.name)
})

function add(exercise: Exercise) {
  session.value.exercises.push(exercise)
}

function changeColor() {
  session.value.color = Math.random()
}

function color() {
  return `hsl(${360 * session.value.color}, 80%, 60%)`
}

function save() {
  sessionsService.save(session.value)
}

function remove(exercise: Exercise) {
  session.value.exercises = session.value.exercises.filter((ex: Exercise) => ex._id !== exercise._id)
}

const exercisesNotInSession = computed(() => {
  if (session.value.exercises === undefined) return exercises.value
  return exercises.value.filter((exercise: Exercise) => !session.value.exercises.some((ex: Exercise) => ex._id === exercise._id))
})
</script>

<template>
  <div class="page-session">
    <div class="flex items-center gap-2">
      <input
        v-model="session.name"
        class="h-10 flex-1 px-3 my-3 placeholder-gray-600 border rounded-lg focus:shadow-outline"
        placeholder="Nom de la séance"
      >
      <div class="w-1/6 h-10 rounded-lg border-2 border-gray-200" :style="{ 'background-color': color() }" @click="changeColor()" />
    </div>
    <div class="flex flex-col">
      <span v-for="exercise in session.exercises" :key="exercise._id" @click="remove(exercise)">{{ exercise.name }}</span>
    </div>
    <span class="underline">Ajouter des exercices :</span>
    <div class="flex flex-col">
      <span v-for="exercise in exercisesNotInSession" :key="exercise._id" @click="add(exercise)">{{ exercise.name }}</span>
    </div>
    <NuxtLink to="/sessions"> <button @click="save">Enregistrer</button></NuxtLink>
  </div>
</template>
