<script setup lang="ts">
import { on, emit } from 'shuutils'
defineEmits(['toggle-menu'])

const title = ref('')
on('header-title', (titleUpdate: string) => (title.value = titleUpdate))
</script>

<template>
  <div class="flex justify-between p-2 shadow-md">
    <h1 class="cursor-pointer" @click="emit('toggle-menu', true)">☰</h1>
    <h1 class="comp-menu">{{ title }}</h1>
    <div />
  </div>
</template>
