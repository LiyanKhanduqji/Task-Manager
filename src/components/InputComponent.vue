<template>
  <div class="my-[13px] flex flex-col relative">
    <label v-if="props.label" :for="uuid" class="text-lightTextColor text-[12px]">
      {{ props.label }}
    </label>
    <input
      v-bind="$attrs"
      :value="props.modelValue"
      :placeholder="props.label"
      :id="uuid"
      @input="$emit('update:modelValue', $event.target.value)"
      :aria-describedby="error ? `${uuid}-error` : null"
      :aria-invalid="error ? true : false"
      class="p-[6px] w-[400px] border-[0.3px] border-lightTextColor rounded outline-none"
    />
    <p v-if="error" :id="`${uuid}-error`" class="text-red text-[12px] absolute bottom-[-16px]">
      {{ props.error }}
    </p>
  </div>
</template>

<script setup>
import UniqueID from '../features/UniqueID'

const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  modelValue: {
    type: [String, Number],
    default: ''
  },
  error: {
    type: String,
    default: ''
  }
})
console.log(props.error)
const uuid = UniqueID().getID()
</script>
