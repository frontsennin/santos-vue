<template>
  <div class="register-steps">
    <div class="steps-content-wrapper">
      <!-- Indicador de Progresso -->
      <div class="steps-progress">
        <div class="step" :class="{ 'active': currentStep >= 1, 'completed': currentStep > 1 }">
          <div class="step-number">1</div>
          <div class="step-label">Dados Pessoais</div>
        </div>
        <div class="step-line" :class="{ 'active': currentStep > 1 }"></div>
        <div class="step" :class="{ 'active': currentStep >= 2 }">
          <div class="step-number">2</div>
          <div class="step-label">Escolha do Plano</div>
        </div>
      </div>

      <!-- Conteúdo dos Passos -->
      <div class="steps-content">
        <!-- Passo 1: Cadastro -->
        <div v-if="currentStep === 1" class="step-container">
          <RegisterForm @register-success="handleRegisterSuccess" />
        </div>

        <!-- Passo 2: Seleção de Plano -->
        <div v-if="currentStep === 2" class="step-container">
          <PlansView @plan-selected="handlePlanSelection" :hideTitle="true" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useNotificationStore } from '@/stores/notification'
import RegisterForm from '@/components/RegisterForm.vue'
import PlansView from '@/views/PlansView.vue'

const router = useRouter()
const notificationStore = useNotificationStore()
const currentStep = ref(1)

const handleRegisterSuccess = () => {
  currentStep.value = 2
  notificationStore.addNotification(
    'Cadastro realizado com sucesso! Agora escolha seu plano.',
    'success'
  )
}

const handlePlanSelection = async () => {
  notificationStore.addNotification(
    'Plano selecionado com sucesso! Bem-vindo ao clube!',
    'success'
  )
  await router.push('/dashboard')
}
</script>

<style lang="scss">
.register-steps {
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(135deg, #000000 0%, #1c1c1c 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
}

.steps-content-wrapper {
  width: 100%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
    background: transparent;
    backdrop-filter: none;
  }
}

.steps-progress {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 3rem;
  padding: 0 2rem;

  .step {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    z-index: 1;

    .step-number {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.2);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      margin-bottom: 0.5rem;
      transition: all 0.3s ease;
    }

    .step-label {
      color: #fff;
      font-size: 0.9rem;
      transition: all 0.3s ease;
    }

    &.active {
      .step-number {
        background-color: #ffd700;
        color: #000;
      }

      .step-label {
        color: #ffd700;
        font-weight: bold;
      }
    }

    &.completed {
      .step-number {
        background-color: #4CAF50;
        color: white;
      }
    }
  }

  .step-line {
    flex: 1;
    height: 2px;
    background-color: rgba(255, 255, 255, 0.2);
    margin: 0 1rem;
    margin-bottom: 2rem;
    transition: all 0.3s ease;

    &.active {
      background-color: #ffd700;
    }
  }
}

.steps-content {
  .step-container {
    animation: fadeIn 0.3s ease;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
