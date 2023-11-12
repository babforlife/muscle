<template>
  <div class="flex gap-2 text-2xl flex-col justify-center items-center h-full">
    <span>Choisissez une exercice à démarrer</span>
    <div v-for="session in sessions" :key="session._id" :class="{ active: session._id === active._id }" @click="active = session">
      {{ session.name }}
    </div>
    <NuxtLink v-if="active._id" :to="'/running/' + active._id" class="border-2 p-1 rounded" @click="start">Démarrer</NuxtLink>
  </div>
</template>

<script lang="ts">
import { emit } from 'shuutils'
import type { Session } from '~/models'
import { sessionsService } from '~/services'

export default {
  data() {
    return {
      active: {} as Session,
      sessions: [] as Session[]
    }
  },
  async beforeMount() {
    emit('header-title', 'Dashboard')
    this.sessions = await this.getAll()
  },
  methods: {
    async getAll() {
      return await sessionsService.getAll().catch(() => {
        throw new Error('Failed to get sessions')
      })
    },
    start() {
      emit('start-session', this.active)
    }
  }
}
</script>

<style>
.active {
  color: red;
}
</style>
