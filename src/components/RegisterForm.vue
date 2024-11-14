<template>
  <div class="register-form">
    <h2>Criar Conta</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="name">Nome Completo</label>
        <input type="text" id="name" v-model="name" required :class="{ 'error': errors.name }"
          placeholder="Digite seu nome completo">
        <span class="error-message" v-if="errors.name">{{ errors.name }}</span>
      </div>

      <div class="form-group">
        <label for="cpf">CPF</label>
        <input type="text" id="cpf" v-model="cpf" v-maska="'###.###.###-##'" required :class="{ 'error': errors.cpf }"
          placeholder="000.000.000-00">
        <span class="error-message" v-if="errors.cpf">{{ errors.cpf }}</span>
      </div>

      <div class="form-group">
        <label for="birthDate">Data de Nascimento</label>
        <input type="text" id="birthDate" v-model="birthDate" v-maska="'##/##/####'" required
          :class="{ 'error': errors.birthDate }" placeholder="DD/MM/AAAA">
        <span class="error-message" v-if="errors.birthDate">{{ errors.birthDate }}</span>
      </div>

      <div class="form-group">
        <label for="email">E-mail</label>
        <input type="email" id="email" v-model="email" required :class="{ 'error': errors.email }"
          placeholder="seu@email.com">
        <span class="error-message" v-if="errors.email">{{ errors.email }}</span>
      </div>

      <div class="form-group">
        <label for="password">Senha</label>
        <input type="password" id="password" v-model="password" required :class="{ 'error': errors.password }"
          placeholder="Mínimo 6 caracteres">
        <span class="error-message" v-if="errors.password">{{ errors.password }}</span>
      </div>

      <div class="form-actions">
        <button type="submit" class="submit-btn" :disabled="isLoading">
          <span v-if="isLoading">
            <i class="fas fa-spinner fa-spin"></i> Processando...
          </span>
          <span v-else>Continuar</span>
        </button>

        <p class="error-message" v-if="errorMessage">{{ errorMessage }}</p>

        <div class="login-link-container">
          <p class="login-link">
            Já tem uma conta?
            <router-link to="/login" class="back-to-login">
              Faça login aqui
            </router-link>
          </p>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { vMaska } from "maska/vue"

export default defineComponent({
  name: 'RegisterForm',
  emits: ['register-success'],
  setup(_, { emit }) {
    const authStore = useAuthStore()

    const name = ref('')
    const cpf = ref('')
    const birthDate = ref('')
    const email = ref('')
    const password = ref('')
    const isLoading = ref(false)
    const errorMessage = ref('')
    const errors = ref({
      name: '',
      cpf: '',
      birthDate: '',
      email: '',
      password: ''
    })

    const validateDate = (date: string) => {
      if (!date || date.length !== 10) return false

      const [day, month, year] = date.split('/')
      const dateObj = new Date(Number(year), Number(month) - 1, Number(day))

      // Validações adicionais
      const currentDate = new Date()
      const minDate = new Date()
      minDate.setFullYear(currentDate.getFullYear() - 120) // Idade máxima de 120 anos
      const maxDate = new Date()
      maxDate.setFullYear(currentDate.getFullYear() - 18) // Idade mínima de 18 anos

      return dateObj instanceof Date &&
        !isNaN(dateObj.getTime()) &&
        dateObj.getDate() === Number(day) &&
        dateObj.getMonth() === Number(month) - 1 &&
        dateObj.getFullYear() === Number(year) &&
        dateObj >= minDate &&
        dateObj <= maxDate
    }

    const validateCPF = (cpf: string) => {
      const cleanCPF = cpf.replace(/\D/g, '')
      if (cleanCPF.length !== 11) return false

      // Verifica se todos os dígitos são iguais
      if (/^(\d)\1+$/.test(cleanCPF)) return false

      // Validação dos dígitos verificadores
      let sum = 0
      let remainder

      for (let i = 1; i <= 9; i++) {
        sum += parseInt(cleanCPF.substring(i - 1, i)) * (11 - i)
      }

      remainder = (sum * 10) % 11
      if (remainder === 10 || remainder === 11) remainder = 0
      if (remainder !== parseInt(cleanCPF.substring(9, 10))) return false

      sum = 0
      for (let i = 1; i <= 10; i++) {
        sum += parseInt(cleanCPF.substring(i - 1, i)) * (12 - i)
      }

      remainder = (sum * 10) % 11
      if (remainder === 10 || remainder === 11) remainder = 0
      if (remainder !== parseInt(cleanCPF.substring(10, 11))) return false

      return true
    }

    const validateForm = () => {
      let isValid = true
      errors.value = {
        name: '',
        cpf: '',
        birthDate: '',
        email: '',
        password: ''
      }

      if (!name.value || name.value.trim().length < 3) {
        errors.value.name = 'Nome deve ter no mínimo 3 caracteres'
        isValid = false
      }

      if (!validateCPF(cpf.value)) {
        errors.value.cpf = 'CPF inválido'
        isValid = false
      }

      if (!validateDate(birthDate.value)) {
        errors.value.birthDate = 'Data de nascimento inválida'
        isValid = false
      }

      if (!email.value || !email.value.includes('@')) {
        errors.value.email = 'E-mail inválido'
        isValid = false
      }

      if (!password.value || password.value.length < 6) {
        errors.value.password = 'Senha deve ter no mínimo 6 caracteres'
        isValid = false
      }

      return isValid
    }

    const handleSubmit = async () => {
      try {
        if (!validateForm()) return

        isLoading.value = true
        errorMessage.value = ''

        // Converte a data do formato DD/MM/YYYY para YYYY-MM-DD
        const [day, month, year] = birthDate.value.split('/')
        const formattedDate = `${year}-${month}-${day}`

        await authStore.register({
          name: name.value,
          cpf: cpf.value.replace(/\D/g, ''),
          birthDate: formattedDate,
          email: email.value,
          password: password.value
        })

        emit('register-success')
      } catch (error) {
        console.error('Erro ao registrar:', error)
        errorMessage.value = 'Ocorreu um erro ao tentar registrar'
      } finally {
        isLoading.value = false
      }
    }

    return {
      name,
      cpf,
      birthDate,
      email,
      password,
      isLoading,
      errorMessage,
      errors,
      validateDate,
      validateCPF,
      validateForm,
      handleSubmit
    }
  }
})
</script>

<style lang="scss" scoped>
.register-form {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2.5rem;
  background: rgba(28, 28, 28, 0.9);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);

  @media (max-width: 1024px) {
    width: 95%;
    padding: 2rem;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 1.5rem;
    background: rgba(28, 28, 28, 0.95);
  }

  h2 {
    text-align: center;
    margin-bottom: 2.5rem;
    color: #fff;
    font-size: 2rem;

    @media (max-width: 768px) {
      margin-bottom: 2rem;
      font-size: 1.8rem;
    }
  }
}

.form-group {
  margin-bottom: 1.5rem;
  width: 100%;

  label {
    display: block;
    margin-bottom: 0.5rem;
    color: #fff;
    font-size: 1rem;
  }

  input {
    width: 100%;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    font-size: 1rem;
    color: #fff;
    transition: all 0.3s ease;

    @media (max-width: 768px) {
      padding: 0.9rem;
      font-size: 16px;
    }

    &::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }

    &:focus {
      outline: none;
      border-color: #ffd700;
      background: rgba(255, 255, 255, 0.15);
    }

    &.error {
      border-color: #ff4444;
      background: rgba(255, 68, 68, 0.1);
    }
  }
}

.error-message {
  color: #ff4444;
  font-size: 0.85rem;
  margin-top: 0.5rem;
}

.submit-btn {
  width: 100%;
  padding: 1rem;
  background: #ffd700;
  color: #000;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;

  @media (max-width: 768px) {
    padding: 0.9rem;
    font-size: 1rem;
  }

  &:hover:not(:disabled) {
    background: #ffed4a;
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
}

@media (min-width: 768px) {
  form {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;

    .form-group {
      margin-bottom: 1.5rem;
    }

    .form-group:nth-child(5),
    .submit-btn,
    .error-message {
      grid-column: 1 / -1;
    }
  }
}

input[type="date"] {
  color-scheme: dark;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.register-form {
  animation: fadeInUp 0.5s ease-out;
}

.form-actions {
  grid-column: 1 / -1; // Garante que ocupe toda a largura no grid
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.login-link-container {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
}

.login-link {
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.95rem;
  margin: 0;

  .back-to-login {
    color: #ffd700;
    text-decoration: none;
    margin-left: 0.5rem;
    transition: all 0.3s ease;

    &:hover {
      color: #ffed4a;
      text-decoration: underline;
    }
  }
}

.system-title {
  text-align: center;
  color: #ffd700;
  font-size: 2.5rem;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
}

.form-subtitle {
  text-align: center;
  color: #fff;
  font-size: 1.5rem;
  margin-bottom: 2rem;
  font-weight: normal;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
}
</style>
