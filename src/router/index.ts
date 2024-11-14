import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '../stores/auth'
import LoginView from '../views/LoginView.vue'
import RegisterStepsView from '@/views/RegisterStepsView.vue'

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
    name: 'Register',
    component: RegisterStepsView
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

router.beforeEach(async (to, from, next) => {
  const store = useAuthStore()

  // Se não está autenticado, tenta recuperar a sessão
  if (!store.isAuthenticated) {
    await store.init()
  }

  // Se está autenticado e tenta acessar login/register
  if (store.isAuthenticated && (to.name === 'login' || to.name === 'Register')) {
    // Se veio de uma rota do dashboard, mantém na rota atual
    if (from.matched.some(record => record.path.startsWith('/dashboard'))) {
      return next(false)
    }
    // Senão, vai para o dashboard
    return next({ name: 'dashboard-home' })
  }

  // Se precisa de auth e não está autenticado
  if (to.meta.requiresAuth && !store.isAuthenticated) {
    return next({
      name: 'login',
      query: { redirect: to.fullPath }
    })
  }

  // Se está autenticado e está em uma rota do dashboard
  if (store.isAuthenticated && to.matched.some(record => record.path.startsWith('/dashboard'))) {
    // Salva a última rota do dashboard
    localStorage.setItem('lastDashboardRoute', to.fullPath)
  }

  next()
})

// Adicione isso após a criação do router
router.beforeResolve(async (to, from, next) => {
  const store = useAuthStore()

  // Se está autenticado e está tentando acessar o dashboard
  if (store.isAuthenticated && to.path === '/dashboard') {
    // Recupera a última rota do dashboard
    const lastRoute = localStorage.getItem('lastDashboardRoute')
    if (lastRoute && lastRoute !== '/dashboard') {
      return next(lastRoute)
    }
  }

  next()
})

export default router
