<script setup lang="ts">
import { AdjustmentsHorizontalIcon, ArrowLeftIcon, MagnifyingGlassIcon } from '@heroicons/vue/24/outline'
import { emit } from 'shuutils'
const properties = defineProps<{ search?: boolean, title: string, navigation?: boolean, edit?:boolean }>()
const show = computed(() => properties.search || properties.title || properties.navigation)
</script>

<template>
  <div v-if="show" class="flex items-center w-full bg-indigo-500 px-3 py-4 bd-shadow z-10">
    <ArrowLeftIcon v-if="navigation" class="icon-8 border rounded text-gray-200 bg-indigo-700" @click="$router.back()" />
    <h2 v-if="title" class="text-xl pl-4 text-gray-200">{{ title }}</h2>
    <MagnifyingGlassIcon v-if="search" class=" ml-auto icon-8 rounded text-gray-200" />
    <AdjustmentsHorizontalIcon v-if="edit" class=" ml-auto icon-8 rounded text-gray-300" @click="emit('edit')" />
  </div>
</template>
