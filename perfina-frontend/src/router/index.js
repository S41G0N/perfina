import { createRouter, createWebHistory } from 'vue-router'
import MainView from '@/views/MainView.vue'
import DashboardView from '@/views/DashboardView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: MainView,
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: DashboardView,
      meta: { requiresAuth: true },
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: LoginView,
    },

    {
      path: '/register',
      name: 'Register',
      component: RegisterView,
    },
  ],
})

// Prevents users without Auth Tokens to access protected routes
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const token = localStorage.getItem('token')
    if (!token) {
      next({ name: 'SignIn' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
