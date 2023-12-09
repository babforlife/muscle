<script setup lang="ts">
import { emit, on } from 'shuutils'
import { Exercise, SeriesExercise, Header } from '~/models'
import { exerciseService } from '~/services'

const activities = ref([] as SeriesExercise[])
const exercise = ref(new Exercise())
const newName = ref('')
const showModal = ref('' as undefined | 'delete' | 'edit')
on('edit', () => showModal.value = 'edit')

onMounted(async () => {
  emit('header', new Header({ title: 'Exercice', navigation: true, edit: true }))
  const route = useRoute()
  const id = route.params.id as string

  exercise.value = await exerciseService.get(id).catch(() => { throw new Error('Failed to get exercise') })
  newName.value = exercise.value.name
  activities.value = await exerciseService.getActivities(exercise.value._id)
})

async function save() {
  exercise.value.name = newName.value
  await exerciseService.save(exercise.value).catch(error => console.log('catch error,', error))
  showModal.value = undefined
}

async function remove() {
  await exerciseService.delete(exercise.value).then(async () => await navigateTo('/exercises')).catch(() => console.log('Catch error'))
}
</script>

<template>
  <div class="h-full py-2">
    <h2>{{ exercise.name }}</h2>
    <div v-if="activities.length === 0" class="flex gap-2 text-2xl flex-col justify-center items-center">No data found</div>
    <div v-for="activity in activities" v-else :key="activity._id">
      {{ activity.series }}
    </div>
    <Modal v-if="showModal" class="px-10" @close="showModal=undefined">
      <template v-if="showModal === 'edit'">
        <h2>Modification</h2>
        <label>Nom
          <input v-model="newName" v-focus @keyup.enter="save">
        </label>
        <div class="flex gap-3 justify-center">
          <button theme="primary" @click="save">Enregistrer</button>
          <button theme="primary" @click="showModal=undefined">Fermer</button>
        </div>
        <hr>
        <h2>Supprimer cet exercice</h2>
        <button class="w-fit m-auto" theme="danger" @click="showModal='delete'">Supprimer</button>
      </template>
      <template v-if="showModal === 'delete'">
        <h2>Suppression</h2>
        <span class="text-center">Êtes-vous sûr de vouloir supprimer '{{ exercise.name }}'.
          L'action sera définitive et vous perdrez les rapports relatifs à cet exercice.
        </span>
        <div class="flex gap-3 justify-center text-xl">
          <button theme="danger" @click="remove">Oui</button>
          <button theme="primary" @click="showModal=undefined">Annuler</button>
        </div>
      </template>
    </Modal>
  </div>
</template>
