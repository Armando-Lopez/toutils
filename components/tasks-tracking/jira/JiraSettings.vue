<script setup lang="ts">
import { SETTINGS_PATH } from '~/constants/firebaseConstants'

const { createDocOrUpdateIfExists, getDoc, updateDoc } = useFirestore()

const jiraIssueUpdateIntervalInSeconds = [
  { text: 'Cada munito', value: 60 },
  { text: 'Cada 3 munitos', value: 60 * 3 },
  { text: 'Cada 5 munitos', value: 60 * 5 },
  { text: 'Cada 10 munitos', value: 60 * 10 },
  { text: 'Cada 15 munitos', value: 60 * 15 },
  { text: 'Cada 30 munitos', value: 60 * 30 },
  { text: 'Cada 45 munitos', value: 60 * 45 },
  { text: 'Cada hora', value: 60 * 60 },
  { text: 'Cada 2 horas', value: 60 * (60 * 2) }
]

const jiraSettings = useState('jiraSettings', () => ({
  autoMoveIssueToProgress: false,
  jiraUpdateIntervalInSeconds: jiraIssueUpdateIntervalInSeconds[0].value,
  path: ''
}))
const formRef = ref(null)
const settingsModal = ref(false)

onMounted(() => {
  getSettings()
})

async function getSettings () {
  const { data } = await getDoc(SETTINGS_PATH)
  if (data) {
    formRef.value.setValues({
      autoMoveIssueToProgress: data?.autoMoveIssueToProgress || jiraSettings.value.autoMoveIssueToProgress,
      jiraUpdateIntervalInSeconds: data?.jiraUpdateIntervalInSeconds || jiraSettings.value.jiraUpdateIntervalInSeconds,
      path: data?.path || ''
    })
  } else {
    await createDocOrUpdateIfExists(SETTINGS_PATH, jiraSettings.value)
  }
}

async function saveSettings () {
  if (jiraSettings.value.path) {
    await updateDoc(jiraSettings.value.path, jiraSettings.value)
  }
}
</script>

<template>
  <AppModal v-model="settingsModal" eager>
    <template #activator="{ toggle }">
      <button class="btn btn-sm btn-secondary" @click="toggle">
        <AppIcon icon="fluent:settings-28-filled" width="25" />
        <span class="hidden md:block">Preferencias</span>
      </button>
    </template>
    <p class="text-lg font-bold">
      Preferencias para JIRA
    </p>
    <AppForm ref="formRef" v-model="jiraSettings" class="grid gap-4" @on-update="saveSettings">
      <AppSelect
        name="jiraUpdateIntervalInSeconds"
        :items="jiraIssueUpdateIntervalInSeconds"
        label="Actualizar automaticamente el registro de tiempo en JIRA cada:"
        item-text="text"
        item-value="value"
      />
      <div class="flex items-center gap-2">
        <input
          id="move"
          type="checkbox"
          class="toggle toggle-md toggle-primary"
          :checked="jiraSettings.autoMoveIssueToProgress"
          @change="formRef.setFieldValue('autoMoveIssueToProgress', $event.target.checked)"
        >
        <label for="move" class="cursor-pointer">
          Mover la insidencia a <strong class="text-secondary">En curso</strong> al iniciar el conteo
        </label>
      </div>
    </AppForm>
  </AppModal>
</template>
