<script setup lang="ts">
import { authenticationService } from '~/services'

function logout() {
  authenticationService.logout()
}
</script>

<template>
  <div>
    <button theme="primary" @click="logout">Déconnexion</button>
  </div>
</template>
