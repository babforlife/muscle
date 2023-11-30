<script setup lang="ts">
import { emit } from 'shuutils'
import { Exercise, SeriesExercise } from '~/models'
import { exerciseService } from '~/services'

const exercise = ref(new Exercise())
const activities = ref([] as SeriesExercise[])

onMounted(async () => {
  const route = useRoute()
  const id = route.params.id as string
  if (id !== 'create') {
    exercise.value = await exerciseService.get(id).catch(() => { throw new Error('Failed to get exercise') })
    activities.value = await exerciseService.getActivities(exercise.value._id)
  }
  emit('header-title', exercise.value.name)
})

async function save() {
  await exerciseService.save(exercise.value).catch(error => console.log('catch error,', error))
}

</script>

<template>
  <div>
    <div>Nom de l'exercice :</div>
    <input v-model="exercise.name" v-focus @keyup.enter="save">
    <button @click="save">Enregistrer</button>
    <div v-for="activity in activities" :key="activity._id">
      {{ activity.series }}
    </div>
  </div>
</template>
