<script setup>
import { ref, computed, onMounted } from 'vue'
import DoneList from './DoneList.vue'
import userData from '@/userData.json'
import ButtonComponent from './ButtonComponent.vue'
import { useTodoListStore } from '@/stores/todoListStore'

const currentUserName = ref(null)
const currentUserID = ref(null)
const header = ref('To Do List')
const items = ref([])
const taskCollection = useTodoListStore()
const taskObject = ref({
  id: '',
  title: '',
  clicked: false,
  highPriority: '',
  description: '',
  userId: currentUserID.value,
  finishedAt: null
})
const errorMessage = ref('')
const showError = ref(false)
const editing = ref(false)
const doneTasks = ref([])
const showAllTasks = ref(false)
const allTasks = ref(null)

const toggleTasksView = () => {
  showAllTasks.value = !showAllTasks.value

  const newTasks = items.value.filter(
    (task) => task.userId === '' || task.userId === currentUserID.value
  )
  if (showAllTasks.value) {
    items.value = [...allTasks.value, ...newTasks]
  } else {
    items.value = [
      ...allTasks.value.filter((item) => item.user_id === currentUserID.value && !item.clicked),
      ...newTasks
    ]
  }
}

// Sorting items depending on priorities
const reversedItems = computed(() => {
  const sortedItems = [...items.value].sort((a, b) => {
    if (a.highPriority && !b.highPriority) {
      return -1
    } else if (!a.highPriority && b.highPriority) {
      return 1
    } else {
      return 0
    }
  })
  return sortedItems
})
const addItem = (newTaskObject) => {
  if (newTaskObject.description === '' && newTaskObject.title === '') {
    showError.value = true
    errorMessage.value = 'Please enter title and description!'
    return
  } else if (newTaskObject.description === '' && !newTaskObject.title === '') {
    showError.value = true
    errorMessage.value = 'Please enter task description!'
    return
  } else if (!newTaskObject.description === '' && newTaskObject.title === '') {
    showError.value = true
    errorMessage.value = 'Please enter task title!'
    return
  }

  const titleWords = newTaskObject.title.split(' ')
  if (titleWords.length < 2 || newTaskObject.title.length < 3 || /\d/.test(newTaskObject.title)) {
    showError.value = true
    errorMessage.value =
      titleWords.length < 2
        ? 'Title must have at least two words!'
        : /\d/.test(newTaskObject.title)
          ? 'Numbers are not allowed in the title!'
          : 'Title must have at least three characters!'
    return
  }

  if (newTaskObject.description === '') {
    showError.value = true
    errorMessage.value = 'Please enter task description!'
    return
  }

  items.value.unshift({
    ...newTaskObject,
    userId: parseInt(currentUserID.value)
  })

  // reset taskObject
  taskObject.value = {
    id: '',
    title: '',
    clicked: false,
    highPriority: '',
    description: '',
    userId: currentUserID.value,
    finishedAt: null
  }
  showError.value = false
}

const addTask = (e) => {
  editing.value = e
}

const Finished = (item) => {
  if (item.user_id === currentUserID.value || item.userId === currentUserID.value) {
    item.clicked = true

    if (item.clicked) {
      const index = items.value.indexOf(item)
      if (index !== -1) {
        items.value.splice(index, 1)
        item.finishedAt = new Date().toLocaleDateString()
        doneTasks.value.unshift(item)
      }
    }
  }
}

const deleteTask = (item) => {
  if (item.user_id === currentUserID.value || item.userId === currentUserID.value) {
    item.clicked = true

    if (item.clicked) {
      const index = items.value.indexOf(item)
      if (index !== -1) {
        item.finishedAt = new Date()
        items.value.splice(index, 1)
      }
    }
  }
}
let loggedInUser = localStorage.getItem('loggedInUser')
const storedUser = JSON.parse(loggedInUser)
if (storedUser) {
  currentUserName.value = storedUser
}
onMounted(async () => {
  if (storedUser) {
    const user = storedUser
    currentUserName.value = user.name
    currentUserID.value = user.id
    items.value = user.tasks
    console.log(user.tasks)
  }
  try {
    await taskCollection.initializeStore()
    allTasks.value = taskCollection.tasks
  } catch (error) {
    console.error(error)
  }
})
</script>
<!-------------------------------- Template -------------------------------->
<template>
  <div class="bg-white rounded-3xl translate-y-5 m-auto p-[40px]">
    <div class="header flex justify-between items-center py-5 px-2 mb-2 relative">
      <h1 class="header-title relative text-white p-[15px] font-bold text-[35px]">
        {{ header }}
      </h1>
      <div class="flex gap-2 items-center">
        <ButtonComponent
          label="Cancel"
          class="bg-lightPink"
          v-if="editing"
          @click="addTask(false)"
        />
        <ButtonComponent label="Add Task" v-else @click="addTask(true)" />
        <router-link to="/">
          <ButtonComponent label="Sign Out" />
        </router-link>
      </div>
    </div>
    <div class="flex justify-between gap-4 min-h-[450px]">
      <div
        class="to-do bg-[#d4b7a838] rounded-[20px] bg-opacity-70 bg-gray-300 shadow-md mt-10 w-[235px] flex-auto overflow-hidden"
      >
        <h3
          class="bg-[#8d99ae] text-[15px] text-bold m-auto text-white p-[15px] text-center flex items-center justify-center w-full"
        >
          To Do
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
            <path
              fill="#ffffff"
              d="M32 32C32 14.3 46.3 0 64 0H320c17.7 0 32 14.3 32 32s-14.3 32-32 32H290.5l11.4 148.2c36.7 19.9 65.7 53.2 79.5 94.7l1 3c3.3 9.8 1.6 20.5-4.4 28.8s-15.7 13.3-26 13.3H32c-10.3 0-19.9-4.9-26-13.3s-7.7-19.1-4.4-28.8l1-3c13.8-41.5 42.8-74.8 79.5-94.7L93.5 64H64C46.3 64 32 49.7 32 32zM160 384h64v96c0 17.7-14.3 32-32 32s-32-14.3-32-32V384z"
            />
          </svg>
        </h3>
        <p
          @click="toggleTasksView"
          class="text-right cursor-pointer text-blueBackground underline px-2 py-1 text-[12px]"
        >
          {{ showAllTasks ? 'My Tasks' : 'All Tasks' }}
        </p>
        <ul>
          <li
            v-for="(item, index) in reversedItems"
            :key="index"
            :class="
              item.highPriority
                ? 'text-[#8b0505bf] border-l-2 bg-[#ff000012] border-[#8b0505bf]'
                : 'text-[#112750] border-l-2 bg-[#0000ff14] border-[#112750]'
            "
          >
            <div class="flex flex-col flex-wrap font-bold break-words max-w-full">
              <p class="font-bold">{{ item.title }}</p>
              <p class="flex flex-col flex-wrap break-words max-w-full">{{ item.description }}</p>
              <p
                class="bg-blueBackground text-white px-[8px] translate-y-[5px] rounded username"
                v-if="item.userId === currentUserID || item.user_id === currentUserID"
              >
                Assigned to me
              </p>
              <p class="bg-darkBlue text-white px-[8px] mt-2 rounded username" v-else>
                Assigned to
                {{ userData?.find((el) => el.id === item.user_id)?.firstname }}
              </p>
            </div>
            <div
              class="icons flex w-full justify-end gap-2 items-center"
              v-if="item.userId === currentUserID || item.user_id === currentUserID"
            >
              <div class="doneTask" @click="Finished(item)">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path
                    d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"
                  />
                </svg>
              </div>
              <div class="deleteTask" @click="deleteTask(item)">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path
                    fill="#ab0707"
                    d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
                  />
                </svg>
              </div>
            </div>
          </li>
        </ul>
        <p class="text-center m-auto mt-[40%] text-lightTextColor" v-if="!items.length">
          Nothing to show here!
        </p>
      </div>

      <div class="add-item-form rounded-[20px] mt-[40px] bg-[#d4b7a838] overflow-hidden shadow-md">
        <h3
          class="text-[15px] text-bold m-auto text-white p-[15px] text-center flex items-center justify-center w-full bg-[#00296b]"
        >
          Task
        </h3>
        <form
          @submit.prevent="addItem(taskObject)"
          v-if="editing"
          class="text-center px-[30px] mt-[20px] relative"
        >
          <div>
            <div class="flex flex-col items-start">
              <label for="title" class="text-[14px] ml-10px">Title</label>
              <input
                type="text"
                id="title"
                placeholder="Add task title"
                v-model="taskObject.title"
                class="p-4 rounded border-[.3px] border-lightTextColor focus:outline-none w-full mb-6"
              />
            </div>
            <div class="flex flex-col items-start">
              <label for="description" class="text-[14px] ml-10px">Description</label>
              <input
                type="text"
                id="description"
                placeholder="Add task description"
                v-model="taskObject.description"
                class="p-4 rounded border-[.3px] border-lightTextColor focus:outline-none w-full mb-6"
              />
            </div>
            <p
              v-if="showError"
              class="text-blueBackground text-xs absolute ml-[50%] translate-x-[-65%]"
            >
              {{ errorMessage }}
            </p>
          </div>
          <div class="buttons mt-[45px]">
            <label>
              <input type="checkbox" v-model="taskObject.highPriority" />
              High Priority
            </label>
            <ButtonComponent type="submit" label="Save" class="m-auto mt-1" />
          </div>
        </form>
      </div>
      <DoneList :doneLists="doneTasks" :finishedAt="finishedAt" />
    </div>
  </div>
</template>
<!-------------------------------- Styling -------------------------------->
<style scoped>
.header-title::before {
  content: '';
  position: absolute;
  background-image: url('../assets/images/stroke.png');
  background-size: cover;
  top: -19px;
  left: 0;
  height: 150%;
  width: 150%;
  background-position: center;
  z-index: -1;
}
.header::after {
  content: '';
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 1px;
  background-color: #b9b9b9;
}
.add-item-form {
  flex: 5;
}
form {
  flex: 1;
}
svg {
  width: 18px;
  height: 18px;
  padding-left: 5px;
}
li {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  cursor: pointer;
  height: min-content;
  list-style: none;
  height: max-content;
  font-size: 13px;
  font-weight: bold;
  padding: 5px 10px;
  border-radius: 6px;
  margin: 10px;
  max-width: 100%;
  padding: 10px;
  flex-wrap: wrap;
}
.username {
  width: fit-content;
}
</style>
