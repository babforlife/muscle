<script setup lang="ts">
import { Series, Session } from '~/models'
import { programService, sessionService } from '~/services'

const session = ref(new Session())
const rest = ref(new Date())

onMounted(async () => {
  rest.value = new Date(JSON.parse(localStorage.getItem('rest') as string))

  const state = localStorage.getItem('session') as string
  if (state) return session.value = new Session(JSON.parse(state))

  const route = useRoute()
  const sessionData = await programService.get(route.params.id).catch(() => { throw new Error('Failed to get program') })
  session.value = new Session({ remaining: sessionData.exercises, start: new Date() })
  nextExercise()
})

const state = computed((): 'loading' | 'exercise' | 'resting' | 'finished' => {
  if (!session.value.start) return 'loading'
  if (session.value.finished.length === session.value.total) return 'finished'
  if (session.value.active?.exercise._id && rest.value && rest.value.getTime() > Date.now()) return 'resting'
  return 'exercise'
})

watchEffect(() => {
  if (state.value !== 'finished') return
  sessionService.save(session.value)
  localStorage.removeItem('session')
})

const progress = computed(() => {
  const doneExercises = session.value.finished?.length
  const doneSeries = Math.min(1, session.value.active?.series.length / 5)
  return `${(doneExercises + doneSeries) / session.value.total * 100}%`
})

function nextExercise() {
  session.value.next()
  save()
}

function nextSeries(series: Series, rest: Date) {
  setRest(rest)
  session.value.active.series.push(series)
  save()
}

function setRest(setRest: Date) {
  rest.value = setRest
  save()
}

function resetRest() {
  rest.value = new Date()
  localStorage.removeItem('rest')
}

function save() {
  localStorage.setItem('session', JSON.stringify(session.value))
}
</script>

<template>
  <div class="h-full">
    <Exercising
      v-if="state === 'exercise'"
      :current="session.active"
      :remaining="session.remaining"
      @next-series="nextSeries"
      @next-exercise="nextExercise"
    />
    <Rest v-else-if="state === 'resting'" :time="rest" @done="resetRest()" @add="setRest($event)" />
    <span v-else-if="state === 'finished'">Terminé!</span>
    <div :style="{ width: progress}" class="h-5 w-full bg-slate-200 bottom-0 fixed" />
  </div>
</template>
