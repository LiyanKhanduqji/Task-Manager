<template>
  <button
    class="rounded text-white font-bold bg-blueBackground flex items-center gap-1 h-[40px] w-[115px] justify-center mb-1 shadow-sm"
  >
    {{ props.label }}
  </button>
</template>

<script setup>
const props = defineProps({
  label: String
})
</script>
