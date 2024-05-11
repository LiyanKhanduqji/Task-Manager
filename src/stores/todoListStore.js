import { defineStore } from 'pinia'
import { ref } from 'vue'
import { fetchAllTasks } from '@/utils/callAPI'

export const useTodoListStore = defineStore('todoList', () => {
  const tasks = ref(null)

  const initializeStore = async () => {
    try {
      const response = await fetchAllTasks()
      tasks.value = response.data.blogs

    } catch (error) {
      console.error('Error initializing store:', error)
      throw error
    }
  }

  return {
    tasks,
    initializeStore
  }
})
