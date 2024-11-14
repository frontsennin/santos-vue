<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const isLoading = ref(false)

const handleLogin = async () => {
  try {
    isLoading.value = true
    errorMessage.value = ''

    const success = await authStore.login(email.value, password.value)

    if (success) {
      router.push('/dashboard')
    } else {
      errorMessage.value = 'Email ou senha inválidos'
    }
  } catch (error) {
    console.error('Erro ao fazer login:', error)
    errorMessage.value = 'Ocorreu um erro ao tentar fazer login'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="auth-container login-view">
    <div class="auth-card">
      <div class="card-body p-4">
        <div class="text-center mb-4">
          <img src="@/assets/santos-logo.png" alt="Santos FC Logo" class="img-fluid mb-3" style="max-width: 120px;">
          <h2 class="fw-bold">Login Sócio Santos FC</h2>
        </div>

        <form @submit.prevent="handleLogin">
          <div class="mb-3">
            <label for="email" class="form-label">
              <i class="fas fa-envelope me-2"></i>E-mail
            </label>
            <input
              id="email"
              v-model="email"
              type="email"
              class="form-control"
              placeholder="Digite seu e-mail"
              required
              :disabled="isLoading"
            >
          </div>

          <div class="mb-3">
            <label for="password" class="form-label">
              <i class="fas fa-lock me-2"></i>Senha
            </label>
            <input
              id="password"
              v-model="password"
              type="password"
              class="form-control"
              placeholder="Digite sua senha"
              required
              :disabled="isLoading"
            >
          </div>

          <div v-if="errorMessage" class="alert alert-danger" role="alert">
            <i class="fas fa-exclamation-circle me-2"></i>
            {{ errorMessage }}
          </div>

          <button
            type="submit"
            class="btn btn-dark w-100 mb-3"
            :disabled="isLoading"
          >
            <i class="fas fa-sign-in-alt me-2"></i>
            {{ isLoading ? 'Entrando...' : 'Entrar' }}
          </button>
        </form>

        <p class="text-center mb-0">
          Ainda não é sócio?
          <router-link to="/register" class="text-dark fw-bold text-decoration-none">
            <i class="fas fa-user-plus me-1"></i>Cadastre-se aqui
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>
