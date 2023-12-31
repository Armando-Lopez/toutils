<script setup lang="ts">
import { useFormField } from '~/composables/useFormField'

const props = defineProps({
  hint: { type: String, default: '' },
  hintTop: { type: Boolean, default: false },
  itemText: { type: String, default: 'name' },
  itemValue: { type: String, default: 'id' },
  items: { type: Array, required: true },
  label: { type: String, default: '' },
  name: { type: String, required: true },
  rules: { type: [String, Object], default: '' }
})

const { formContext, error, isRequired } = useFormField({
  name: props.name,
  rules: props.rules
})
</script>

<template>
  <div>
    <label v-if="props.label" :for="props.name" class="label">
      <span class="label-text" :class="{ 'text-error': !!error }">
        {{ props.label }}
        <strong v-if="isRequired" class="text-info text-lg">*</strong>
      </span>
    </label>
    <span v-if="props.hintTop" class="empty:hidden block mb-2 opacity-80 text-sm">
      <slot name="hint">
        {{ props.hint }}
      </slot>
    </span>
    <select
      :id="props.name"
      :class="{ 'select-error': !!error }"
      :name="props.name"
      class="select select-bordered select-primary w-full"
      v-bind="formContext.inputsBindings[props.name]"
    >
      <option v-for="item in props.items" :key="item.name" :value="item[props.itemValue]">
        {{ item[props.itemText] }}
      </option>
    </select>
    <span v-if="!props.hintTop" class="empty:hidden block mt-2 opacity-80 text-sm">
      <slot name="hint">
        {{ props.hint }}
      </slot>
    </span>
    <label :for="props.name" class="label">
      <span class="label-text-alt text-error">{{ error }}</span>
    </label>
  </div>
</template>
