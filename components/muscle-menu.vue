<script setup lang="ts">
import { on } from 'shuutils'
const open = ref(false)
on('toggle-menu', (openUpdate: boolean) => (open.value = openUpdate))
</script>

<template>
  <div :class="{ hidden: !open }" class="comp-menu">
    <div class="backdrop" @click="open = false" />
    <div class="fixed flex flex-col p-5 gap-2 h-full border z-20 bg-gray-100 shadow-2xl w-1/2">
      <NuxtLink to="/" @click="open = false">Dashboard</NuxtLink>
      <NuxtLink to="/programs" @click="open = false">Programmes</NuxtLink>
      <NuxtLink to="/exercises" @click="open = false">Exercices</NuxtLink>
      <NuxtLink to="/activity" @click="open = false">Activités</NuxtLink>
    </div>
  </div>
</template>
