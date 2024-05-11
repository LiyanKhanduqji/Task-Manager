<script setup>
import InputComponent from '@/components/InputComponent.vue'
import { useRouter } from 'vue-router'
import userData from '@/userData.json'
import axios from 'axios'
import { onMounted } from 'vue'
import ButtonComponent from '@/components/ButtonComponent.vue'

import { ref } from 'vue'

const userTasksData = ref(null)
const API_URL = 'https://api.slingacademy.com/v1/sample-data/blog-posts'
const loggedInUser = ref(null)
const router = useRouter()
const emailOrPhone = ref('')
const password = ref('')
const errors = ref({})

const submit = () => {
  errors.value = {}

  if (!emailOrPhone.value) {
    errors.value.emailOrPhone = 'Email or Phone number is required'
  }

  if (!password.value) {
    errors.value.password = 'Password is required'
  }

  // Find the user that email and password values matches him
  if (Object.keys(errors.value).length === 0) {
    const user = userData.find(
      (userData) =>
        (userData.email === emailOrPhone.value || userData.phone === emailOrPhone.value) &&
        userData.password === password.value
    )

    if (user) {
      const userTasks = getUserTasksById(user.id)
      loggedInUser.value = { tasks: userTasks, name: user.firstname, id: user.id }
      localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser.value))
      router.push({
        name: 'home'
      })
    } else {
      if (
        userData.find(
          (userData) =>
            userData.email === emailOrPhone.value || userData.phone === emailOrPhone.value
        )
      ) {
        errors.value.password = 'Invalid password'
      } else {
        errors.value.emailOrPhone = 'Invalid email or phone number'
      }
    }
  }
}
const getUserTasksById = (userId) => {
  return userTasksData.value.filter((task) => task.user_id === userId)
}
onMounted(() => {
  axios
    .get(API_URL)
    .then((response) => {
      userTasksData.value = response.data.blogs
    })
    .catch((error) => {
      console.log(error)
    })
})
</script>

<template>
  <div
    class="login-container m-auto translate-y-28 p-6 rounded-lg bg-white shadow-lg flex flex-col items-center"
  >
    <h3 class="text-darkBlue text-[35px] font-bold text-center">Login</h3>

    <form @submit.prevent="submit">
      <fieldset class="relative mt-4">
        <InputComponent type="text" label="Email or Phone number" v-model="emailOrPhone" />
        <p class="text-red text-xs absolute">{{ errors.emailOrPhone }}</p>
      </fieldset>
      <fieldset class="relative mt-4">
        <InputComponent type="password" label="Password" v-model="password" />
        <p class="text-red text-xs absolute">{{ errors.password }}</p>
      </fieldset>
      <ButtonComponent type="button" label="Login" @click="submit" class="translate-y-5 m-auto" />
      <span
        ><svg class="w-[15px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path
            fill="#ffffff"
            d="M217.9 105.9L340.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L217.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1L32 320c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM352 416l64 0c17.7 0 32-14.3 32-32l0-256c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c53 0 96 43 96 96l0 256c0 53-43 96-96 96l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z"
          /></svg
      ></span>
      <p class="text-lightTextColor text-center py-2 text-[12px]">
        Didn't have an account?
        <router-link to="/signup">
          <span class="cursor-pointer py-2 text-lightTextColor">Sign up</span>
        </router-link>
      </p>
    </form>
  </div>
</template>

<style scoped>
.login-container {
  width: fit-content;
}
</style>
