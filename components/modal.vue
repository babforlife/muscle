<template>
  <div class="fixed flex justify-center items-center inset-0 bg-cyan-100/25" @click.self="$emit('close')">
    <div :class="childClass" @click.prevent.stop>
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    active: {
      type: Boolean,
      default: false
    },
    childClass: {
      type: String,
      default: ''
    }
  },
  emits: ['close'],
  data() {
    return {}
  }
}
</script>

<style></style>
