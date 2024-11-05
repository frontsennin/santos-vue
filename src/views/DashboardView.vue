<script setup lang="ts">
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <div class="dashboard-view">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          <img src="@/assets/santos-logo.png" alt="Santos FC Logo" height="40">
        </a>
        <button 
          class="btn btn-outline-light"
          @click="handleLogout"
        >
          <i class="fas fa-sign-out-alt me-2"></i>Sair
        </button>
      </div>
    </nav>

    <main class="container py-4">
      <div class="row">
        <div class="col-12">
          <div class="card shadow-sm">
            <div class="card-body">
              <h1 class="h3 mb-3">
                <i class="fas fa-user me-2"></i>Bem-vindo, Sócio!
              </h1>
              <p class="text-muted">
                <i class="fas fa-info-circle me-2"></i>Esta é sua área exclusiva.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template> 