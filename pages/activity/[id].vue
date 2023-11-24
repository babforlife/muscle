<script setup lang="ts">
import { Activity } from '~/models'
import { activityService } from '~/services'
import { dateToString } from '~/utils'

const activity = ref(new Activity())

onMounted(async () => {
  const route = useRoute()
  activity.value = await activityService.get(route.params.id).catch(() => { throw new Error('Failed to get activity') })
})
</script>

<template>
  <div v-if="activity._id" class="activity">
    <h1 class="text-xl">{{ activity.name }}</h1>
    <span class="text-xs pl-2 italic">Activité du {{ dateToString(activity.start) }}</span>
    <div v-for="exercise in activity.session" :key="exercise.exercise._id">
      <charts-exercise :exercise="exercise" />
    </div>
  </div>
</template>
