<script setup lang="ts">
import { authenticationService } from '~/services'
import AuthenticationLayout from '~/components/authentication.vue'

definePageMeta({ layout: false })
const router = useRouter()

const email = ref('')
const error = ref('')
const loading = ref(false)
const password = ref('')
const showModal = ref(false)

async function login() {
  loading.value = true
  setTimeout(() => showModal.value = true, 1000)

  await authenticationService.login(email.value, password.value)
    .then(() => router.push('/'))
    .catch(error_ => error.value = error_.message)
    .finally(() => { loading.value = false; showModal.value = false })
}
</script>

<template>
  <AuthenticationLayout :show-modal="showModal && loading">
    <form class="col gap-4" @submit.prevent="login">
      <input v-model="email" placeholder="Email" type="email" autocomplete="email">
      <input v-model="password" placeholder="Password" type="password" autocomplete="current-password">
      <m-button :loading="loading" theme="primary" type="submit">Se connecter</m-button>
      <span class="text-lg text-red-400">{{ error }}</span>
    </form>
    <template #footer>
      Pas encore de compte ?
      <NuxtLink class="font-medium text-indigo-400 hover:underline" to="/login/sign-in">S'inscrire</NuxtLink>.
    </template>
  </AuthenticationLayout>
</template>
