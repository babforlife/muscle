<script setup lang="ts">
import { ChevronUpDownIcon, TrashIcon } from '@heroicons/vue/24/solid'
import { emit, on } from 'shuutils'
import draggable from 'vuedraggable'
import { Exercise, Header, Program } from '~/models'
import { exerciseService, programService } from '~/services'
import { romanize } from '~/utils'

const exercises = ref([] as Exercise[])
const program = ref(new Program())
const modalState = ref('' as undefined | 'delete' | 'edit' | 'add')
const edit = ref(false)

const updateName = ref('')
const exercisesNotInProgram = ref([] as { _id: string, name: string, checked: boolean }[])
on('edit', () => modalState.value = 'edit')

onMounted(async () => {
  emit('header', new Header({ title: 'Programme', navigation: true, edit: true }))
  const route = useRoute()
  program.value = await programService.get(route.params.id).catch(() => { throw new Error('Failed to get program') })
  exercises.value = await exerciseService.getAll().catch(() => { throw new Error('Failed to get exercises') })
  updateName.value = program.value.name
  setExercisesNotInProgram()
})

const exercisesChecked = computed(() => exercisesNotInProgram.value.filter(exercise => exercise.checked))

function setExercisesNotInProgram() {
  exercisesNotInProgram.value = exercises.value
    .filter((exercise: Exercise) => !program.value.exercises.some((ex: Exercise) => ex._id === exercise._id))
    .map(exercise => ({ ...exercise, checked: false }))
}

async function addExercises() {
  program.value.exercises.push(...exercisesChecked.value)
  await programService.save(program.value).catch(error => console.log('catch error,', error))
  modalState.value = undefined
  setExercisesNotInProgram()
}

function removeExercise(exercise: Exercise) {
  program.value.exercises = program.value.exercises.filter(ex => ex._id !== exercise._id)
}

async function save() {
  program.value.name = updateName.value
  await programService.save(program.value).catch(error => console.log('catch error,', error))
  modalState.value = undefined
}

async function remove() {
  await programService.delete(program.value).then(async () => await navigateTo('/programs')).catch(() => console.log('Catch error'))
}
</script>

<template>
  <div class="col overflow-hidden h-full py-2">
    <h2>{{ program.name }}</h2>
    <draggable v-model="program.exercises" :disabled="!edit" :item-key="program._id" class="col gap-3 w-full min-w-[80%] flex-1 overflow-auto">
      <template #item="{element, index}">
        <div class="row w-full items-center justify-around px-4">
          <ChevronUpDownIcon v-if="edit" class="icon-8" />
          <span class="bg-indigo-200 font-bold w-12 h-12 rounded-full relative left-3 flex justify-center items-center">{{ romanize(index+1) }}</span>
          <span class="row text-gray-700 rounded-r-xl bg-indigo-200 w-full justify-center items-center py-1">
            {{ element.name }}</span>
          <TrashIcon v-if="edit" class="icon-8" @click="removeExercise(element)" />
        </div>
      </template>
    </draggable>
    <div class="px-2 row justify-evenly">
      <button theme="primary" @click="edit=!edit">{{ edit? 'Annuler' : 'Modifier' }}</button>
      <button v-if="edit" theme="primary" @click="() => {save(); edit=false}">Valider</button>
      <button v-if="!edit" theme="primary" @click="modalState = 'add'">Ajouter un exercice</button>
    </div>
    <Modal v-if="modalState" class="px-10 modal" child-class="w-full" :state="modalState" @close="modalState=undefined">
      <template v-if="modalState === 'edit'">
        <h2>Modification</h2>
        <label>Nom
          <input v-model="updateName" v-focus @keyup.enter="save">
        </label>
        <div class="flex gap-3 justify-center">
          <button theme="primary" @click="save">Enregistrer</button>
          <button theme="primary" @click="modalState=undefined">Fermer</button>
        </div>
        <hr>
        <h2>Supprimer ce programme</h2>
        <button class="w-fit m-auto" theme="danger" @click="modalState='delete'">Supprimer</button>
      </template>
      <template v-if="modalState === 'add'">
        <h2>Cliquer sur un exercice pour le sélectionner</h2>
        <div class="col flex-1 overflow-auto text-lg">
          <div v-for="exercise in exercisesNotInProgram" :key="exercise._id" class="cursor-pointer" @click="exercise.checked=!exercise.checked">
            <span class="custom-checkbox" :selected="exercise.checked">
              {{ exercise.name }}
            </span>
          </div>
        </div>
        <button :disabled="exercisesChecked.length === 0" theme="primary" @click="addExercises">Ajouter</button>
        <button theme="primary" @click="modalState=undefined">Fermer</button>
      </template>
      <template v-if="modalState === 'delete'">
        <h2>Suppression</h2>
        <span class="text-center">Êtes-vous sûr de vouloir supprimer le programme '{{ program.name }}' ?
        </span>
        <div class="flex gap-3 justify-center text-xl">
          <button theme="danger" @click="remove">Oui</button>
          <button theme="primary" @click="modalState=undefined">Annuler</button>
        </div>
      </template>
    </Modal>
  </div>
</template>

<style>
.modal[state="add"]>div {
  max-height: 75%;
  overflow: hidden;
}

.custom-checkbox[selected="true"] {
  @apply text-indigo-500 font-medium;
}

.custom-checkbox[selected="false"] {
  @apply text-gray-400;
}
</style>
