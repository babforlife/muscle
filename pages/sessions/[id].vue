<template>
  <div v-if="loading"></div>
  <div v-else class="page-session">
    <div class="flex items-center gap-2">
      <input
        v-model="session.name"
        class="h-10 flex-1 px-3 my-3 placeholder-gray-600 border rounded-lg focus:shadow-outline"
        placeholder="Nom de la séance"
      />
      <div class="w-1/6 h-10 rounded-lg border-2 border-gray-200" :style="{ 'background-color': color() }" @click="changeColor()"></div>
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

<script lang="ts">
import { emit } from 'shuutils'
import { Exercise, Session } from '~/models'
import { exercisesService, sessionsService } from '~/services'

export default {
  data() {
    return {
      exercises: [] as Exercise[],
      loading: true,
      session: {} as Session,
    }
  },
  computed: {
    exercisesNotInSession() {
      if (this.session.exercises === undefined) return this.exercises
      return this.exercises.filter((exercise: Exercise) => !this.session.exercises.some((ex: Exercise) => ex._id === exercise._id))
    },
  },
  async beforeMount() {
    const id = this.$route.params.id as string
    this.session = id === 'create' ? new Session() : await this.getSession(id)
    this.exercises = await this.getExercises()
    emit('header-title', this.session.name)
    this.loading = false
  },
  methods: {
    add(exercise: Exercise) {
      this.session.exercises.push(exercise)
    },
    changeColor() {
      this.session.color = Math.random()
    },
    color() {
      return `hsl(${360 * this.session.color}, 80%, 60%)`
    },
    async getExercises() {
      return await exercisesService.getAll().catch(() => {
        throw new Error('Failed to get exercises')
      })
    },
    async getSession(id: string) {
      return await sessionsService.get(id).catch(() => {
        throw new Error('Failed to get session')
      })
    },
    save() {
      sessionsService.save(this.session)
    },
    remove(exercise: Exercise) {
      this.session.exercises = this.session.exercises.filter((ex: Exercise) => ex._id !== exercise._id)
    },
  },
}
</script>
