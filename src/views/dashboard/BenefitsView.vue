<script setup lang="ts">
import { ref } from 'vue'
import type { Benefit, Coupon } from '../../types/dashboard'
import { useAuthStore } from '../../stores/auth'

const authStore = useAuthStore()
const user = authStore.user
const pontos = ref(1250)

// Mock de benefícios
const beneficios = ref<Benefit[]>([
  {
    id: 1,
    nome: 'Desconto Loja',
    descricao: '15% de desconto na loja oficial',
    icon: 'fa-tag',
    unlocked: true,
    pontos: 0
  },
  {
    id: 2,
    nome: 'Prioridade Ingresso',
    descricao: 'Compra antecipada de ingressos',
    icon: 'fa-ticket-alt',
    unlocked: true,
    pontos: 0
  },
  {
    id: 3,
    nome: 'Visita Vila',
    descricao: 'Visita guiada à Vila Belmiro',
    icon: 'fa-building',
    unlocked: false,
    pontos: 2500
  },
  {
    id: 4,
    nome: 'Meet & Greet',
    descricao: 'Encontro com jogadores',
    icon: 'fa-users',
    unlocked: false,
    pontos: 5000
  }
])

// Mock de cupons
const cupons = ref<Coupon[]>([
  {
    id: 1,
    codigo: 'LOJA15',
    descricao: '15% de desconto em qualquer produto da loja',
    desconto: 15,
    validade: '2024-12-31',
    usado: false,
    tipo: 'loja'
  },
  {
    id: 2,
    codigo: 'INGRESSO10',
    descricao: '10% de desconto em ingressos',
    desconto: 10,
    validade: '2024-12-31',
    usado: false,
    tipo: 'ingresso'
  },
  {
    id: 3,
    codigo: 'VILA20',
    descricao: '20% de desconto no tour da Vila',
    desconto: 20,
    validade: '2024-06-30',
    usado: true,
    tipo: 'outros'
  }
])

const copiarCupom = (codigo: string) => {
  navigator.clipboard.writeText(codigo)
  alert('Código copiado para a área de transferência!')
}

const desbloquearBeneficio = (beneficio: Benefit) => {
  if (pontos.value >= beneficio.pontos) {
    alert(`Benefício ${beneficio.nome} desbloqueado!`)
    beneficio.unlocked = true
    pontos.value -= beneficio.pontos
  } else {
    alert('Pontos insuficientes')
  }
}
</script>

<template>
  <div class="benefits-view">
    <div class="container py-4">
      <!-- Cabeçalho -->
      <div class="row mb-4">
        <div class="col-12">
          <h1 class="h3">Benefícios e Cupons</h1>
          <p class="text-muted">
            Seus pontos disponíveis: {{ pontos }}
          </p>
        </div>
      </div>

      <!-- Benefícios -->
      <div class="row mb-5">
        <div class="col-12">
          <h2 class="h4 mb-3">Seus Benefícios</h2>
          <div class="row g-4">
            <div v-for="beneficio in beneficios" :key="beneficio.id" class="col-12 col-md-6 col-lg-4">
              <div class="card shadow-sm h-100">
                <div class="card-body">
                  <div class="d-flex align-items-center mb-3">
                    <div class="benefit-icon me-3">
                      <i :class="['fas', beneficio.icon, 'fa-2x']"></i>
                    </div>
                    <div>
                      <h3 class="h5 mb-1">{{ beneficio.nome }}</h3>
                      <p class="text-muted mb-0">{{ beneficio.descricao }}</p>
                    </div>
                  </div>
                  
                  <div v-if="!beneficio.unlocked" class="text-center">
                    <p class="mb-2">
                      <i class="fas fa-star me-2"></i>
                      {{ beneficio.pontos }} pontos para desbloquear
                    </p>
                    <button 
                      class="btn btn-dark w-100"
                      @click="desbloquearBeneficio(beneficio)"
                      :disabled="pontos < beneficio.pontos"
                    >
                      <i class="fas fa-unlock me-2"></i>Desbloquear
                    </button>
                  </div>
                  <div v-else class="text-center">
                    <span class="badge bg-success">
                      <i class="fas fa-check me-2"></i>Desbloqueado
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Cupons -->
      <div class="row">
        <div class="col-12">
          <h2 class="h4 mb-3">Seus Cupons</h2>
          <div class="row g-4">
            <div v-for="cupom in cupons" :key="cupom.id" class="col-12 col-md-6">
              <div class="card shadow-sm">
                <div class="card-body">
                  <div class="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <h3 class="h5 mb-1">{{ cupom.descricao }}</h3>
                      <p class="text-muted mb-0">
                        Válido até: {{ new Date(cupom.validade).toLocaleDateString() }}
                      </p>
                    </div>
                    <span 
                      class="badge"
                      :class="cupom.usado ? 'bg-secondary' : 'bg-success'"
                    >
                      {{ cupom.usado ? 'Usado' : 'Disponível' }}
                    </span>
                  </div>
                  
                  <div class="coupon-code p-2 bg-light rounded mb-3 text-center">
                    <span class="h4 mb-0 font-monospace">{{ cupom.codigo }}</span>
                  </div>

                  <button 
                    class="btn btn-dark w-100"
                    @click="copiarCupom(cupom.codigo)"
                    :disabled="cupom.usado"
                  >
                    <i class="fas fa-copy me-2"></i>
                    {{ cupom.usado ? 'Cupom Usado' : 'Copiar Código' }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.benefits-view {
  .card {
    @include transition-all;
    
    &:hover {
      transform: translateY(-2px);
    }
  }

  .benefit-icon {
    width: 50px;
    height: 50px;
    background: $gray-100;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $primary-color;
  }

  .coupon-code {
    border: 2px dashed $gray-600;
    letter-spacing: 2px;
  }

  .btn {
    @include transition-all;
    
    &:hover:not(:disabled) {
      transform: translateY(-1px);
    }
  }
}
</style> 