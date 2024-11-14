<script setup lang="ts">
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()
const user = authStore.user

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}

const goToHome = () => {
  router.push('/dashboard')
}
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
    <div class="container-fluid">
      <a class="navbar-brand" href="#" @click.prevent="goToHome">
        <img src="@/assets/santos-logo.png" alt="Santos FC Logo" class="navbar-logo">
      </a>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link
              class="nav-link py-2"
              :class="{ active: $route.name === 'dashboard-home' }"
              to="/dashboard"
            >
              <i class="fas fa-home me-2"></i>Início
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link py-2"
              :class="{ active: $route.name === 'games' }"
              to="/dashboard/games"
            >
              <i class="fas fa-ticket-alt me-2"></i>Jogos
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link py-2"
              :class="{ active: $route.name === 'tickets' }"
              to="/dashboard/tickets"
            >
              <i class="fas fa-history me-2"></i>Meus Ingressos
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link py-2"
              :class="{ active: $route.name === 'store' }"
              to="/dashboard/store"
            >
              <i class="fas fa-store me-2"></i>Loja
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link py-2"
              :class="{ active: $route.name === 'benefits' }"
              to="/dashboard/benefits"
            >
              <i class="fas fa-gift me-2"></i>Benefícios
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link py-2"
              :class="{ active: $route.name === 'gamification' }"
              to="/dashboard/gamification"
            >
              <i class="fas fa-star me-2"></i>Pontos
            </router-link>
          </li>
        </ul>

        <div class="d-flex align-items-center">
          <span class="text-light me-3">
            <i class="fas fa-user me-2"></i>{{ user?.name?.split(' ')[0] }}
          </span>
          <button
            class="btn btn-outline-light"
            @click="handleLogout"
          >
            <i class="fas fa-sign-out-alt me-2"></i>Sair
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.navbar-logo {
  height: 30px;
  cursor: pointer;

  @include sm {
    height: 35px;
  }

  @include md {
    height: 40px;
  }
}

.nav-link {
  @include transition-all;

  &:hover {
    color: $white !important;
  }

  &.active {
    color: $white !important;
    font-weight: bold;
  }
}

.btn {
  @include transition-all;

  &:hover {
    transform: translateY(-1px);
  }
}
</style>
