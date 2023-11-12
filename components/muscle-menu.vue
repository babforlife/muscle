<template>
  <div :class="{ hidden: !open }" class="comp-menu">
    <div class="backdrop" @click="open = false" />
    <div class="fixed flex flex-col p-5 gap-2 h-full border z-20 bg-gray-100 shadow-2xl w-1/2">
      <NuxtLink to="/" @click="open = false">Dashboard</NuxtLink>
      <NuxtLink to="/sessions" @click="open = false">Séances</NuxtLink>
      <NuxtLink to="/exercises" @click="open = false">Exercices</NuxtLink>
    </div>
  </div>
</template>

<script lang="ts">
import { on } from 'shuutils'

export default {
  data() {
    return {
      open: false
    }
  },
  beforeMount() {
    on('toggle-menu', (open: boolean) => (this.open = open))
  }
}
</script>

<style></style>
