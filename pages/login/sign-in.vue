<script setup lang="ts">
import { authenticationService } from '~/services'
import AuthenticationLayout from '~/components/authentication.vue'

definePageMeta({ layout: false })
const router = useRouter()

const email = ref('')
const error = ref('')
const loading = ref(false)
const password = ref('')
const repeatPassword = ref('')
const showModal = ref(false)

async function register() {
  loading.value = true
  setTimeout(() => showModal.value = true, 2000)

  await authenticationService.register(email.value, password.value, repeatPassword.value)
    .then(() => router.push('/'))
    .catch(error_ => error.value = error_.message)
    .finally(() => { loading.value = false; showModal.value = false })
}
</script>

<template>
  <AuthenticationLayout :show-modal="showModal && loading">
    <form class="col gap-4" @submit.prevent="register">
      <input v-model="email" placeholder="Email" type="email" autocomplete="email">
      <input v-model="password" placeholder="Password" type="password" autocomplete="new-password">
      <input v-model="repeatPassword" placeholder="Repeat Password" type="password" autocomplete="new-password">
      <m-button :loading="loading" theme="primary" type="submit">S'inscrire</m-button>
      <span class="text-lg text-red-400">{{ error }}</span>
    </form>
    <template #footer>
      <div class="col gap-2">
        <span>
          Essayer hors connexion ?
          <span class="text-lg text-center text-indigo-400 font-medium">Par ici</span>.
        </span>
        <hr>
        <span>
          Déjà un compte ?
          <NuxtLink class="font-medium text-indigo-400 hover:underline" to="/login">Se connecter</NuxtLink>.
        </span>
      </div>
    </template>
  </AuthenticationLayout>
</template>
