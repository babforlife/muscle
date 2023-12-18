<script setup lang="ts">
import { emit, on } from 'shuutils'
import { Header, Series, Session } from '~/models'
import { programService, activityService } from '~/services'

const session = ref(new Session())
const restUntil = ref(new Date())
const restTime = ref(0)
const modalState = ref(false)

on('edit', () => modalState.value = true)

onBeforeMount(async () => {
  await load()
  emit('header', new Header({ title: session.value.name, edit: true }))
})

async function load() {
  restUntil.value = new Date(JSON.parse(localStorage.getItem('restUntil') as string))
  restTime.value = +(localStorage.getItem('restTime') ?? 90)

  const state = localStorage.getItem('session') as string
  if (state) return session.value = new Session(JSON.parse(state))

  const route = useRoute()
  const program = await programService.get(route.params.id).catch(() => { throw new Error('Failed to get program') })
  session.value = new Session({ remaining: program.exercises, start: new Date(), name: program.name })
  nextExercise()
}

function nextExercise() {
  session.value.next()
  save()
}

function register(index: number, series: Series) {
  if (session.value.active.series.length === index) setRest(new Date(Date.now() + restTime.value * 1000))
  session.value.active.series[index] = series
  save()
}

function setRest(setRest: Date) {
  localStorage.setItem('restUntil', JSON.stringify(setRest))
  restUntil.value = setRest
  save()
}

function resetRest() {
  restUntil.value = new Date()
  localStorage.removeItem('restUntil')
}

function saveRestTime() {
  localStorage.setItem('restTime', String(restTime.value))
  modalState.value = false
}

function save() {
  localStorage.setItem('session', JSON.stringify(session.value))
}

const state = computed((): 'loading' | 'exercise' | 'resting' | 'finished' => {
  if (!session.value.start) return 'loading'
  if (session.value.finished.length > 0 && session.value.finished.length === session.value.total) return 'finished'
  if (session.value.active?.exercise._id && restUntil.value && restUntil.value.getTime() > Date.now()) return 'resting'
  return 'exercise'
})

const progress = computed(() => {
  const doneExercises = session.value.finished?.length
  const doneSeries = Math.min(1, session.value.active?.series.length / 5)
  return `${(doneExercises + doneSeries) / session.value.total * 100}%`
})

watchEffect(() => {
  if (state.value !== 'finished') return
  activityService.saveWithSession(session.value)
  localStorage.removeItem('session')
  localStorage.removeItem('restTime')
})

</script>

<template>
  <div class="h-full">
    <Exercising v-if="state === 'exercise'" :current="session.active" @register="register" @next-exercise="nextExercise" />
    <Rest v-else-if="state === 'resting'" :time="restUntil" @done="resetRest()" @add="setRest($event)" />
    <span v-else-if="state === 'finished'">Terminé!</span>
    <div :style="{ width: progress}" class="h-5 w-full bg-slate-200 bottom-0 fixed" />
    <Modal v-if="modalState" class="px-10 modal" child-class="w-full" :state="modalState" @close="modalState=false">
      <template v-if="modalState === true">
        <h2>Temps de repos</h2>
        <Timer :seconds="restTime" @time="restTime = $event" />
        <div class="flex gap-3 justify-center">
          <button theme="primary" @click="saveRestTime">Enregistrer</button>
          <button theme="primary" @click="modalState=false">Fermer</button>
        </div>
      </template>
    </Modal>
  </div>
</template>
