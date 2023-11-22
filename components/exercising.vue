<script setup lang="ts">
import { Series, SeriesExercise, Exercise } from '~/models'

const properties = defineProps<{ current: SeriesExercise, remaining: Exercise[]}>()
const emit = defineEmits(['next-series', 'next-exercise'])

const series = ref(new Series({ repetitions: 8, weight: 10 }))
const showDetails = ref(false)
const rest = ref(0)

onMounted(() => {
  const lastSeries = properties.current.series[properties.current.series.length - 1]
  if (!lastSeries) return
  series.value = new Series({ repetitions: lastSeries?.repetitions, weight: lastSeries?.weight })
})

function nextSeries() {
  emit('next-series', new Series(series.value), new Date(Date.now() + rest.value * 1000))
}

function nextExercise() {
  if (properties.current.series.length > 0) nextSeries()
  emit('next-exercise')
}

const nextExerciseDisplay = computed(() => {
  if (properties.remaining.length === 0) return 'Terminer'
  return properties.current.series.length === 0 ? 'Passer l\'exercice' : 'Prochain exercice'
})
</script>

<template>
  <div class="exercising">
    <h1 class="text-center">
      <span>{{ current.exercise.name }}</span>
      <span @click="showDetails = !showDetails">{{ showDetails ? '˄':'˅' }}</span>
    </h1>
    <div v-if="showDetails">
      <span class="underline">Exercices restants :</span>
      <div v-for="exercise in remaining" :key="exercise._id">{{ exercise.name }}</div>
    </div>
    <h3 class="text-center">Série : {{ current.series.length + 1 }}</h3>
    <div class="flex flex-col">
      <h2>Répétitions</h2>
      <input v-model="series.repetitions" class="border-2 h-10 w-1/5 self-center" type="number">
      <h2>Poids</h2>
      <input v-model="series.weight" class="border-2 h-10 w-1/5 self-center" type="number">
    </div>
    <h2 class="text-center text-xl">Temps de repos</h2>
    <Timer :seconds="rest" @time="rest = $event" />
    <button class="border-2 text-3xl p-2" @click="nextSeries()">Suivant</button>
    <button class="border-2 text-3xl p-2" @click="nextExercise()">{{ nextExerciseDisplay }}</button>
  </div>
</template>
