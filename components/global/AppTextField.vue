<script setup lang="ts">
const props = defineProps({
  name: { type: String, required: true },
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: '' },
  label: { type: String, default: '' },
  rules: { type: String, default: '' }
})

const formContext = inject('appForm')
onMounted(() => {
  // @ts-ignore
  formContext.registerInput(props.name as string)
})
watch(() => props.rules, (newValue) => {
  if (newValue) {
    // @ts-ignore
    formContext.setRules({
      inputName: props.name,
      rules: props.rules
    })
  }
}, { immediate: true })

const error = ref('')
// @ts-ignore
watch(formContext.errors, value => (error.value = value[props.name]))
</script>

<template>
  <div>
    <label v-if="props.label" :for="props.name" class="label">
      <span class="label-text" :class="{ 'text-error': !!error }">{{ props.label }}</span>
    </label>
    <input
      :id="props.name"
      v-bind="formContext.inputsBindings[props.name]"
      :name="props.name"
      :type="props.type"
      :placeholder="props.placeholder"
      class="input input-bordered input-primary w-full"
      :class="{ 'input-error': !!error }"
    >
    <label :for="props.name" class="label">
      <span class="label-text-alt text-error">{{ error }}</span>
    </label>
  </div>
</template>