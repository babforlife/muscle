<template>
  <div class="exercise-page h-full flex flex-col overflow-auto">
    <modal v-show="showModale" child-class="p-4 flex flex-col border-2 gap-5" @close="showModale = false">
      <div>Nom de l'exercice :</div>
      <input v-model="newExercise.name" />
      <button @click="save">Enregistrer</button>
    </modal>
    <div v-for="exercise in exercises" :key="exercise._id" class="flex justify-between overflow-wrap-anywhere mx-6 py-4 text-xl">
      <span class="text-xl">- {{ exercise.name }}</span>
      <div class="flex gap-4 items-center px-2">
        <span @click="update(exercise)">✎</span>
        <span @click="remove(exercise)">✗</span>
      </div>
    </div>
    <div v-if="exercises.length === 0" class="flex justify-center items-center h-full">
      <span class="text-2xl">Aucun exercice</span>
    </div>
    <div class="absolute bottom-7 right-7 p-2 size-2xl border-2 rounded-full" @click="showModale = true">＋</div>
  </div>
</template>

<script lang="ts">
import { emit } from 'shuutils'
import { exercisesService } from '~/services'
import { Exercise } from '~/models'

export default {
  data() {
    return {
      exercises: [] as Exercise[],
      newExercise: new Exercise(),
      showModale: false,
    }
  },
  beforeMount() {
    this.get()
    emit('header-title', 'Exercices')
  },
  methods: {
    async save() {
      await exercisesService
        .save(this.newExercise)
        .then(() => {
          this.showModale = false
          this.newExercise = new Exercise()
          this.get()
        })
        .catch((error) => console.log('catch error,', error))
    },
    async get() {
      await exercisesService
        .getAll()
        .then((exercises) => (this.exercises = exercises))
        .catch(() => console.log('catch error'))
    },
    async remove(exercise: Exercise) {
      await exercisesService
        .delete(exercise)
        .then(() => this.get())
        .catch(() => console.log('catch error'))
    },
    update(exercise: Exercise) {
      console.log('test :', exercise)
      this.newExercise = JSON.parse(JSON.stringify(exercise))
      this.showModale = true
    },
  },
}
</script>
