import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '../stores/auth'
import LoginView from '../views/LoginView.vue'

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
  }
}

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/RegisterView.vue')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../views/DashboardView.vue'),
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory('/'),
  routes
})

router.beforeEach((to, from, next) => {
  const store = useAuthStore()
  const { isAuthenticated } = storeToRefs(store)
  
  if (to.meta.requiresAuth && !isAuthenticated.value) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router
