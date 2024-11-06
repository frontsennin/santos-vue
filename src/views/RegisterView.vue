<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

// Campos do formulário
const name = ref('')
const cpf = ref('')
const birthDate = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const errorMessage = ref('')
const isLoading = ref(false)

// Formatação do CPF
const formatCPF = (value: string) => {
  const numbers = value.replace(/\D/g, '')
  return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4')
}

const handleCPFInput = (event: Event) => {
  const input = event.target as HTMLInputElement
  let value = input.value.replace(/\D/g, '')
  if (value.length > 11) value = value.slice(0, 11)
  cpf.value = formatCPF(value)
}

// Validações
const validateForm = () => {
  if (!name.value.trim()) {
    errorMessage.value = 'Nome é obrigatório'
    return false
  }

  if (cpf.value.replace(/\D/g, '').length !== 11) {
    errorMessage.value = 'CPF inválido'
    return false
  }

  if (!birthDate.value) {
    errorMessage.value = 'Data de nascimento é obrigatória'
    return false
  }

  // Validar idade mínima (18 anos)
  const today = new Date()
  const birth = new Date(birthDate.value)
  const age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()
  
  if (age < 18 || (age === 18 && monthDiff < 0)) {
    errorMessage.value = 'É necessário ter pelo menos 18 anos'
    return false
  }

  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'As senhas não coincidem'
    return false
  }

  if (password.value.length < 6) {
    errorMessage.value = 'A senha deve ter pelo menos 6 caracteres'
    return false
  }

  return true
}

const handleRegister = async () => {
  try {
    if (!validateForm()) return

    isLoading.value = true
    errorMessage.value = ''
    
    await authStore.register({
      name: name.value,
      cpf: cpf.value.replace(/\D/g, ''),
      birthDate: birthDate.value,
      email: email.value,
      password: password.value
    })
    
    router.push('/login')
  } catch (error) {
    console.error('Erro ao registrar:', error)
    errorMessage.value = 'Ocorreu um erro ao tentar registrar'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="auth-container register-view">
    <div class="auth-card">
      <div class="card-body p-4">
        <div class="text-center mb-4">
          <img src="@/assets/santos-logo.png" alt="Santos FC Logo" class="img-fluid mb-3" style="max-width: 120px;">
          <h2 class="fw-bold">Cadastro Sócio Santos FC</h2>
        </div>
        
        <form @submit.prevent="handleRegister">
          <!-- Nome Completo -->
          <div class="mb-3">
            <label for="name" class="form-label">
              <i class="fas fa-user me-2"></i>Nome Completo
            </label>
            <input 
              id="name"
              v-model="name" 
              type="text" 
              class="form-control"
              placeholder="Digite seu nome completo"
              required
              :disabled="isLoading"
            >
          </div>

          <!-- CPF e Data de Nascimento na mesma linha -->
          <div class="row mb-3">
            <div class="col-md-6 mb-3 mb-md-0">
              <label for="cpf" class="form-label">
                <i class="fas fa-id-card me-2"></i>CPF
              </label>
              <input 
                id="cpf"
                v-model="cpf" 
                type="text" 
                class="form-control"
                placeholder="000.000.000-00"
                required
                :disabled="isLoading"
                @input="handleCPFInput"
                maxlength="14"
              >
            </div>
            <div class="col-md-6">
              <label for="birthDate" class="form-label">
                <i class="fas fa-calendar me-2"></i>Data de Nascimento
              </label>
              <input 
                id="birthDate"
                v-model="birthDate" 
                type="date" 
                class="form-control"
                required
                :disabled="isLoading"
                :max="new Date().toISOString().split('T')[0]"
              >
            </div>
          </div>
          
          <!-- Email -->
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
          
          <!-- Senha e Confirmação na mesma linha -->
          <div class="row mb-3">
            <div class="col-md-6 mb-3 mb-md-0">
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
                minlength="6"
              >
              <small class="form-text text-muted">
                Mínimo de 6 caracteres
              </small>
            </div>
            <div class="col-md-6">
              <label for="confirmPassword" class="form-label">
                <i class="fas fa-lock me-2"></i>Confirme a Senha
              </label>
              <input 
                id="confirmPassword"
                v-model="confirmPassword" 
                type="password" 
                class="form-control"
                placeholder="Confirme sua senha"
                required
                :disabled="isLoading"
              >
            </div>
          </div>

          <!-- Mensagem de Erro -->
          <div v-if="errorMessage" class="alert alert-danger" role="alert">
            <i class="fas fa-exclamation-circle me-2"></i>
            {{ errorMessage }}
          </div>

          <!-- Botão de Submit -->
          <button 
            type="submit" 
            class="btn btn-dark w-100 mb-3"
            :disabled="isLoading"
          >
            <i class="fas fa-user-plus me-2"></i>
            {{ isLoading ? 'Registrando...' : 'Registrar' }}
          </button>
        </form>

        <p class="text-center mb-0">
          Já é sócio? 
          <router-link to="/login" class="text-dark fw-bold text-decoration-none">
            <i class="fas fa-sign-in-alt me-1"></i>Entre aqui
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.form-text {
  font-size: 0.75rem;
  margin-top: 0.25rem;
}

// Ajuste para remover margem inferior do último campo em mobile
@include md {
  .mb-3.mb-md-0 {
    margin-bottom: 0 !important;
  }
}
</style>