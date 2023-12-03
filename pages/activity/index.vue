<script setup lang="ts">
import { emit } from 'shuutils'
import { Activity } from '~/models'
import { activityService } from '~/services'
import { dateToString } from '~/utils'

const activities = ref([] as Activity[])

onMounted(() => {
  emit('header', { title: 'Activités' })
  activityService.getAll().then(activitiesGet => activities.value = activitiesGet).catch(() => { throw new Error('Failed to get activities') })
})
</script>

<template>
  <div class="col h-full">
    <div class="col gap-3 overflow-auto flex-1">
      <NuxtLink v-for="activity in activities" :key="activity._id" :to="`/activity/${activity._id}`" class="border py-2 px-1">
        <h1 class="text-xl">{{ activity.name }}</h1>
        <span class="text-xs pl-2 italic">Activité du {{ dateToString(activity.start) }}</span>
      </NuxtLink>
    </div>
  </div>
</template>
