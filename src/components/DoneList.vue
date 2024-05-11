<script setup lang="ts">
import { ref } from 'vue'

export interface List {
  title: String
  description: String
  finishedAt: Date
}

const props = defineProps<{
  doneLists: Array<List>
}>()
</script>
<template>
  <div
    class="doneList rounded-[20px] bg-[#d4b7a838] mt-[40px] min-h-[300px] w-[235px] overflow-hidden flex-auto shadow-md"
  >
    <ul>
      <h3
        class="text-[15px] font-bold bg-[#8d99ae] m-auto text-white p-[15px] text-center w-full flex items-center justify-center"
      >
        Done
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path
            fill="#ffffff"
            d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
          />
        </svg>
      </h3>
      <li
        v-for="(doneTask, index) in doneLists"
        :key="index"
        class="flex flex-col text-[13px] font-bold text-[#112750] bg-[#04fd041f] py-1 px-3 rounded-[6px] m-[10px] border-l-2 border-[#05b305] break-words"
      >
        {{ doneTask.title }}
        <p class="break-words">{{ doneTask.description }}</p>
        <p class="font-bold text-right">Finished at : {{ doneTask.finishedAt }}</p>
      </li>
    </ul>
    <p class="text-center m-auto mt-[50%] text-[#adadad]" v-if="!doneLists.length">
      There is no done tasks yet!
    </p>
  </div>
</template>

<style scoped>
svg {
  width: 18px;
  padding-left: 5px;
}
</style>
