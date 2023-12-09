<script setup lang="ts">
import { PlusCircleIcon, ChartPieIcon, Cog6ToothIcon, ListBulletIcon, BeakerIcon } from '@heroicons/vue/24/solid'
</script>

<template>
  <div class="flex items-center justify-between px-4 text-xs">
    <NuxtLink active-class="text-indigo-500" to="/exercises" class="col items-center">
      <ListBulletIcon class="icon-8" />
      <span>Exercises</span>
    </NuxtLink>
    <NuxtLink active-class="text-indigo-500" to="/programs" class="col items-center">
      <BeakerIcon class="icon-8" />
      <span>Programmes</span>
    </NuxtLink>
    <NuxtLink to="/" class="col items-center">
      <PlusCircleIcon class="icon-14 text-red-500" />
    </NuxtLink>
    <NuxtLink active-class="text-indigo-500" to="/activity" class="col items-center">
      <ChartPieIcon class="icon-8 " />
      <span>Rapports</span>
    </NuxtLink>
    <NuxtLink active-class="text-indigo-500" to="/settings" class="col items-center">
      <Cog6ToothIcon class="icon-8" />
      <span>Options</span>
    </NuxtLink>
  </div>
</template>

<style scoped>
a:active {
  @apply text-indigo-700;
}
</style>
