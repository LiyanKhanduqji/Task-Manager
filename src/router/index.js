import { createRouter, createWebHistory } from 'vue-router'

import TodoInputComponentVue from '@/components/TodoInputComponent.vue'
import SignUp from '@/views/SignUp.vue'
import LoginPage from '@/views/LoginPage.vue'
import WelcomePageVue from '@/views/WelcomePage.vue'

const routes = [
  { path: '/', name: 'welcome', component: WelcomePageVue },
  { path: '/home', name: 'home', component: TodoInputComponentVue },
  { path: '/signup', name: 'signup', component: SignUp },
  { path: '/login', name: 'login', component: LoginPage }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
