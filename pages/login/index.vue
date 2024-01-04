<script setup lang="ts">
import { authenticationService } from '~/services'
import AuthenticationLayout from '~/components/authentication.vue'

definePageMeta({ layout: false })
const router = useRouter()

const email = ref('')
const password = ref('')
const error = ref('')

async function login() {
  await authenticationService.login(email.value, password.value)
    .then(() => router.push('/'))
    .catch(error_ => error.value = error_.message)
}
</script>

<template>
  <AuthenticationLayout>
    <form class="col gap-4" @submit.prevent="login">
      <input v-model="email" placeholder="Email" type="email" autocomplete="email">
      <input v-model="password" placeholder="Password" type="password" autocomplete="current-password">
      <button theme="primary" type="submit">Login</button>
      <span class="text-lg text-red-400">{{ error }}</span>
    </form>
    <template #footer>
      Pas encore de compte ?
      <NuxtLink class="font-medium text-indigo-400 hover:underline" to="/login/sign-in">S'inscrire</NuxtLink>.
    </template>
  </AuthenticationLayout>
</template>
