<script setup lang="ts">
import { on } from 'shuutils'
import { Header } from '~/models/header.model'

const header = ref(new Header())

on('header', (data: Header) => header.value = data)
</script>

<template>
  <div class="h-full col bg-indigo-50">
    <m-header v-if="!header.hidden" :navigation="header.navigation" :search="header.search" :title="header.title" :edit="header.edit" />
    <div class="flex-1 overflow-auto">
      <slot />
    </div>
    <m-footer class="border-t-2 border-indigo-100 w-full rounded-t-3xl bg-white py-1" />
  </div>
</template>
