<template>
  <div class="exercise-page h-full flex flex-col">
    <modal v-show="showModale" child-class="p-4 flex flex-col border-2 gap-5" @close="showModale = false">
      <div>Nom de l'exercice :</div>
      <input v-model="newExercise" />
      <button @click="save">Enregistrer</button>
    </modal>
    <div v-for="exercise in exercises" :key="exercise._id" class="flex justify-between py-4">
      <span class="ml-4">{{ exercise.name }}</span>
      <span>modifier</span>
      <span @click="remove(exercise)">supprimer</span>
    </div>
    <div class="mt-auto ml-auto p-2 border-2 rounded-full" @click="showModale = true">+</div>
  </div>
</template>

<script lang="ts">
import { exercisesService } from '~/services'
import { Exercise } from '~/models'

export default {
  data() {
    return {
      exercises: [] as Exercise[],
      newExercise: '',
      showModale: false,
    }
  },
  beforeMount() {
    this.get()
  },
  methods: {
    async save() {
      const exercise = new Exercise({ name: this.newExercise })
      await exercisesService
        .save(exercise)
        .then(() => {
          this.showModale = false
          this.newExercise = ''
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
  },
}
</script>
