<script setup lang="ts">
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon, PlusCircleIcon, MinusCircleIcon } from '@heroicons/vue/24/outline'
import { Series, SeriesExercise } from '~/models'

const properties = defineProps<{ current: SeriesExercise}>()
const emit = defineEmits(['register', 'next-exercise'])

const series = ref(new Series({ repetitions: 8, weight: 10 }))
const seriesIndex = ref(0)

onMounted(() => {
  seriesIndex.value = seriesLength.value
  const lastSeries = properties.current.series[seriesLength.value]
  if (!lastSeries) return
  series.value = new Series({ repetitions: lastSeries?.repetitions, weight: lastSeries?.weight })
})

function previous() {
  if (!isSeriesActive.value) register()
  series.value = new Series(properties.current.series[--seriesIndex.value])
}

function next() {
  register()
  series.value = new Series(properties.current.series[++seriesIndex.value])
}

function register() {
  emit('register', seriesIndex.value, new Series(series.value))
}

function nextExercise() {
  register()
  emit('next-exercise')
}

const seriesLength = computed(() => properties.current.series.length)
const isSeriesActive = computed(() => seriesIndex.value === seriesLength.value)
</script>

<template>
  <div class="h-full col gap-4">
    <h1 class="text-center py-1">{{ current.exercise.name }}</h1>
    <h3 class="text-gray-500 pl-4">Série {{ seriesIndex + 1 }} {{ isSeriesActive ? ' · actuel' : '' }}</h3>
    <div class="flex-1 pl-2">
      <div class="flex">
        <h2 class="min-w-[50%] text-left">Répétitions</h2>
        <div class="flex justify-center gap-4">
          <MinusCircleIcon class="icon-8" @click="series.repetitions--" />
          <input v-model="series.repetitions" class="border-2 w-1/3" type="number">
          <PlusCircleIcon class="icon-8" @click="series.repetitions++" />
        </div>
      </div>
      <div class="flex">
        <h2 class="min-w-[50%] text-left">Poids</h2>
        <div class="flex justify-center gap-4">
          <MinusCircleIcon class="icon-8" @click="series.weight--" />
          <input v-model="series.weight" class="border-2 w-1/3" type="number">
          <PlusCircleIcon class="icon-8" @click="series.weight++" />
        </div>
      </div>
    </div>
    <div class="flex justify-center gap-4">
      <ChevronDoubleLeftIcon :class="{ invisible: seriesIndex <= 0 }" class="icon-14" @click="previous" />
      <ChevronDoubleRightIcon class="icon-14" @click="next" />
    </div>
    <button theme="primary" :class="{ invisible: !isSeriesActive }" @click="nextExercise">Prochain exercice</button>
  </div>
</template>
