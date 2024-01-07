<script setup lang="ts">
const properties = defineProps<{ showModal: boolean }>()
const _showModal = ref(properties.showModal)
</script>

<template>
  <div class="text-xl h-full col mx-7">
    <Modal v-if="showModal" class="px-8 text-justify" @close="_showModal=false">
      <span>En attente d'une réponse...</span>
      <span>La première connexion au serveur peut prendre du temps (30 secondes environ)</span>
    </Modal>
    <div class="col items-center justify-center flex-1">
      <img src="/logo.png" alt="MUSCLE">
    </div>
    <div class="flex-1">
      <slot />
    </div>
    <div class="mt-auto py-4 text-lg text-center">
      <slot name="footer" />
    </div>
  </div>
</template>
