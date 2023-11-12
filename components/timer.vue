<template>
  <div class="text-3xl flex items-center justify-evenly">
    <span class="border-2 rounded-full p-4 size-2xl leading-4" @click="minus()">-</span>
    <span class="text-center text-6xl">{{ time }}</span>
    <span class="border-2 rounded-full p-4 size-2xl leading-4" @click="plus()">+</span>
  </div>
</template>

<script lang="ts">
export default {
  emits: ['time'],
  data() {
    return {
      seconds: 90
    }
  },
  computed: {
    time() {
      const minutes = Math.floor(this.seconds / 60).toString().padStart(2, '0')
      const seconds = (this.seconds % 60).toString().padStart(2, '0')
      return `${minutes} : ${seconds}`
    }
  },
  beforeMount() {
    this.$emit('time', this.seconds)
  },
  methods: {
    plus() {
      this.seconds += 5
      this.$emit('time', this.seconds)
    },
    minus() {
      this.seconds -= 5
      this.$emit('time', this.seconds)
    }
  }
}
</script>
