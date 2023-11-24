<script setup lang="ts">
import { SeriesExercise } from '~/models'

const properties = defineProps<{exercise: SeriesExercise}>()

const options = {
  chart: {
    height: 300,
    type: 'line'
  },
  plotOptions: {
    series: {
      dataLabels: {
        enabled: true
      }
    }
  },
  title: { text: properties.exercise.exercise.name },
  xAxis: [{
    categories: Array.from({ length: properties.exercise.series.length }, (_, index) => index + 1),
    crosshair: true
  }],
  yAxis: [{
    title: { text: 'Poids' },
    allowDecimals: false,
    visible: false,
    labels: { format: '{value} kg' }
  }, {
    title: { text: 'Répétitions' },
    allowDecimals: false,
    visible: false,
    opposite: true

  }],
  tooltip: { shared: true },
  series: [{
    name: 'Poids',
    threshold: Math.min(...properties.exercise.series.map(serie => serie.weight)) - 1,
    type: 'column',
    data: properties.exercise.series.map(serie => serie.weight),
    tooltip: { valueSuffix: ' kg' }
  }, {
    yAxis: 1,
    threshold: 7,
    name: 'Répétitions',
    type: 'spline',
    data: properties.exercise.series.map(serie => serie.repetitions)
  }],
  credits: { enabled: false }
}
</script>

<template>
  <highcharts :options="options" />
</template>
