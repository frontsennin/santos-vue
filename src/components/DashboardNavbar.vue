<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
    <div class="container-fluid">
      <a class="navbar-brand" href="#" @click.prevent="goToHome">
        <img src="@/assets/santos-logo.png" alt="Santos FC Logo" class="navbar-logo">
      </a>

      <button
        class="navbar-toggler"
        type="button"
        @click="toggleMenu"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div
        class="collapse navbar-collapse"
        :class="{ 'show': isMenuOpen }"
        id="navbarNav"
      >
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link py-2" :class="{ active: $route.name === 'dashboard-home' }" to="/dashboard">
              <i class="fas fa-home me-2"></i>Início
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link py-2" :class="{ active: $route.name === 'games' }" to="/dashboard/games">
              <i class="fas fa-ticket-alt me-2"></i>Jogos
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link py-2" :class="{ active: $route.name === 'tickets' }" to="/dashboard/tickets">
              <i class="fas fa-history me-2"></i>Meus Ingressos
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link py-2" :class="{ active: $route.name === 'store' }" to="/dashboard/store">
              <i class="fas fa-store me-2"></i>Loja
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link py-2" :class="{ active: $route.name === 'benefits' }" to="/dashboard/benefits">
              <i class="fas fa-gift me-2"></i>Benefícios
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link py-2" :class="{ active: $route.name === 'gamification' }"
              to="/dashboard/gamification">
              <i class="fas fa-star me-2"></i>Pontos
            </router-link>
          </li>
        </ul>

        <div class="d-flex align-items-center user-section">
          <i class="fas fa-user text-light me-2"></i>
          <span class="text-light me-3">
            {{ user?.name?.split(' ')[0] }}
          </span>
          <button class="btn btn-outline-light" @click="handleLogout">
            <i class="fas fa-sign-out-alt me-2"></i>Sair
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()
const user = authStore.user
const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

const handleLogout = () => {
  closeMenu()
  authStore.logout()
  router.push('/login')
}

const goToHome = () => {
  closeMenu()
  router.push('/dashboard')
}

// Fechar menu ao clicar em links
const handleRouteChange = () => {
  closeMenu()
}

onMounted(() => {
  router.afterEach(handleRouteChange)
})

onBeforeUnmount(() => {
  router.afterEach(handleRouteChange)
})
</script>

<style lang="scss" scoped>
.navbar {
  .container-fluid {
    @media (max-width: 991px) {
      padding: 0.5rem 1rem;
    }
  }
}

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

.navbar-collapse {
  @media (max-width: 991px) {
    background: #343a40;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    padding: 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 1000;

    &.show {
      display: block;
    }
  }
}

.user-section {
  @media (max-width: 991px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);

    .btn {
      width: 100%;
    }
  }
}

.navbar-nav {
  @media (max-width: 991px) {
    .nav-item {
      width: 100%;

      .nav-link {
        padding: 0.75rem 0;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);

        &:last-child {
          border-bottom: none;
        }
      }
    }
  }
}
</style>
