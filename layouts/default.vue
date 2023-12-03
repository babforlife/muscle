<script setup lang="ts">
import { on } from 'shuutils'

const header = reactive({ navigation: false, search: false, title: '', edit: false })

on('header', (data: {navigation: boolean, search: boolean, title: string, edit: boolean}) => {
  header.navigation = data.navigation
  header.search = data.search
  header.title = data.title
  header.edit = data.edit
})
</script>

<template>
  <div class="h-full col bg-indigo-50">
    <MuscleHeader :navigation="header.navigation" :search="header.search" :title="header.title" :edit="header.edit" />
    <div class="flex-1 overflow-auto">
      <slot />
    </div>
    <MuscleFooter class="border-t-2 border-indigo-100 w-full rounded-t-3xl bg-white py-1" />
  </div>
</template>
