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
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/',
    redirect: '/login'
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
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'dashboard-home',
        component: () => import('../views/dashboard/HomeView.vue')
      },
      {
        path: 'gamification',
        name: 'gamification',
        component: () => import('../views/dashboard/GamificationView.vue')
      },
      {
        path: 'games',
        name: 'games',
        component: () => import('../views/dashboard/GamesView.vue')
      },
      {
        path: 'tickets',
        name: 'tickets',
        component: () => import('../views/dashboard/TicketHistoryView.vue')
      },
      {
        path: 'store',
        name: 'store',
        component: () => import('../views/dashboard/StoreView.vue')
      },
      {
        path: 'benefits',
        name: 'benefits',
        component: () => import('../views/dashboard/BenefitsView.vue')
      }
    ]
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
