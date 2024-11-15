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
          <div class="dropdown">
            <button
              class="btn btn-link dropdown-toggle user-dropdown-btn"
              type="button"
              @click="toggleUserMenu"
              :class="{ 'show': isUserMenuOpen }"
            >
              <i class="fas fa-user text-light me-2"></i>
              <span class="text-light">{{ user?.name?.split(' ')[0] }}</span>
            </button>

            <div class="dropdown-menu dropdown-menu-end" :class="{ 'show': isUserMenuOpen }">
              <router-link to="/dashboard/profile" class="dropdown-item">
                <i class="fas fa-user-circle me-2"></i>Perfil
              </router-link>
              <router-link to="/dashboard/plan-management" class="dropdown-item">
                <i class="fas fa-crown me-2"></i>Gerenciar Plano
              </router-link>
              <router-link to="/dashboard/payment-methods" class="dropdown-item">
                <i class="fas fa-credit-card me-2"></i>Métodos de Pagamento
              </router-link>
              <div class="dropdown-divider"></div>
              <button class="dropdown-item text-danger" @click="handleLogout">
                <i class="fas fa-sign-out-alt me-2"></i>Sair
              </button>
            </div>
          </div>
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
const isUserMenuOpen = ref(false)

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

const toggleUserMenu = () => {
  isUserMenuOpen.value = !isUserMenuOpen.value
}

// Fechar menu ao clicar fora
onMounted(() => {
  router.afterEach(handleRouteChange)
  document.addEventListener('click', (event) => {
    const dropdown = document.querySelector('.user-dropdown-btn')
    if (!dropdown?.contains(event.target as Node)) {
      isUserMenuOpen.value = false
    }
  })
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

.user-dropdown-btn {
  color: white !important;
  text-decoration: none;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  white-space: nowrap;
  min-width: fit-content;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }

  &:after {
    margin-left: 0.5rem;
  }
}

.dropdown-menu {
  background: #343a40;
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: 0.5rem;
  min-width: fit-content;
  white-space: nowrap;
  right: 10px !important;

  .dropdown-item {
    color: #fff;
    padding: 0.75rem 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    i {
      width: 1.2rem;
      text-align: center;
    }

    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    &.text-danger:hover {
      background: rgba(220, 53, 69, 0.1);
    }
  }

  .dropdown-divider {
    border-color: rgba(255, 255, 255, 0.1);
  }
}

@media (max-width: 991px) {
  .dropdown-menu {
    position: static !important;
    width: 100%;
    margin-top: 1rem;
    transform: none !important;
  }
}
</style>
