<template>
  <div class="flex justify-between p-2 shadow-md">
    <h1 class="cursor-pointer" @click="emit('toggle-menu', true)">☰</h1>
    <h1 class="comp-menu">{{ title }}</h1>
    <div />
  </div>
</template>

<script lang="ts">
import { on, emit } from 'shuutils'

export default {
  emits: ['toggle-menu'],
  data() {
    return {
      title: '',
      emit
    }
  },
  beforeMount() {
    on('header-title', (title: string) => (this.title = title))
  }
}
</script>
