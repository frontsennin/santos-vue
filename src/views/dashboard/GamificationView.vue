<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Achievement, UserLevel } from '../../types/dashboard'
import { useAuthStore } from '../../stores/auth'

const authStore = useAuthStore()
const user = authStore.user

const pontos = ref(1250)
const nivel = ref<UserLevel>({
  nome: 'Peixe Prata',
  proxNivel: 'Peixe Ouro',
  pontosProxNivel: 2000,
  progresso: 62.5,
  beneficios: [
    'Desconto de 15% na loja oficial',
    'Prioridade na compra de ingressos',
    'Acesso ao programa de pontos'
  ]
})

const achievements = ref<Achievement[]>([
  {
    id: 1,
    nome: 'Torcedor Fiel',
    descricao: 'Compareça a 5 jogos seguidos',
    icon: 'fa-star',
    progresso: 3,
    meta: 5,
    pontos: 500,
    completed: false
  },
  {
    id: 2,
    nome: 'Colecionador',
    descricao: 'Compre 3 produtos oficiais',
    icon: 'fa-shopping-bag',
    progresso: 2,
    meta: 3,
    pontos: 300,
    completed: false
  },
  {
    id: 3,
    nome: 'Rei da Vila',
    descricao: 'Assista a 10 jogos na Vila Belmiro',
    icon: 'fa-crown',
    progresso: 7,
    meta: 10,
    pontos: 1000,
    completed: false
  }
])

const progressoTotal = computed(() => {
  const total = achievements.value.reduce((acc, curr) => acc + (curr.progresso / curr.meta), 0)
  return Math.round((total / achievements.value.length) * 100)
})

const pontosDisponiveis = computed(() => {
  return achievements.value.reduce((acc, curr) => {
    if (!curr.completed) {
      return acc + curr.pontos
    }
    return acc
  }, 0)
})
</script>

<template>
  <div class="gamification-view">
    <div class="container py-4">
      <!-- Cabeçalho -->
      <div class="row mb-4">
        <div class="col-12">
          <h1 class="h3">Sistema de Pontos</h1>
          <p class="text-muted">Acumule pontos e desbloqueie benefícios exclusivos!</p>
        </div>
      </div>

      <!-- Card de Nível -->
      <div class="row mb-4">
        <div class="col-12">
          <div class="card shadow-sm">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <h2 class="h4 mb-1">Nível: {{ nivel.nome }}</h2>
                  <p class="text-muted mb-0">{{ pontos }} pontos acumulados</p>
                </div>
                <div class="text-end">
                  <p class="mb-1">Próximo nível: {{ nivel.proxNivel }}</p>
                  <p class="text-muted mb-0">Faltam {{ nivel.pontosProxNivel - pontos }} pontos</p>
                </div>
              </div>
              <div class="progress" style="height: 10px;">
                <div 
                  class="progress-bar bg-dark" 
                  role="progressbar" 
                  :style="{ width: `${nivel.progresso}%` }"
                  :aria-valuenow="nivel.progresso" 
                  aria-valuemin="0" 
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Conquistas -->
      <div class="row mb-4">
        <div class="col-12">
          <h2 class="h4 mb-3">Suas Conquistas</h2>
          <div class="row g-3">
            <div v-for="achievement in achievements" :key="achievement.id" class="col-12 col-md-6 col-lg-4">
              <div class="card shadow-sm h-100">
                <div class="card-body">
                  <div class="d-flex align-items-center mb-3">
                    <i :class="['fas', achievement.icon, 'me-2', 'fa-2x']"></i>
                    <div>
                      <h3 class="h5 mb-1">{{ achievement.nome }}</h3>
                      <p class="text-muted mb-0">{{ achievement.descricao }}</p>
                    </div>
                  </div>
                  <div class="progress mb-2" style="height: 8px;">
                    <div 
                      class="progress-bar bg-dark" 
                      role="progressbar" 
                      :style="{ width: `${(achievement.progresso / achievement.meta) * 100}%` }"
                      :aria-valuenow="(achievement.progresso / achievement.meta) * 100" 
                      aria-valuemin="0" 
                      aria-valuemax="100"
                    ></div>
                  </div>
                  <div class="d-flex justify-content-between align-items-center">
                    <span class="text-muted">{{ achievement.progresso }}/{{ achievement.meta }}</span>
                    <span class="badge bg-dark">{{ achievement.pontos }} pontos</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Estatísticas -->
      <div class="row">
        <div class="col-12">
          <div class="card shadow-sm">
            <div class="card-body">
              <h2 class="h4 mb-3">Estatísticas</h2>
              <div class="row g-3">
                <div class="col-6 col-md-3">
                  <div class="text-center">
                    <h3 class="h2 mb-1">{{ progressoTotal }}%</h3>
                    <p class="text-muted mb-0">Progresso Total</p>
                  </div>
                </div>
                <div class="col-6 col-md-3">
                  <div class="text-center">
                    <h3 class="h2 mb-1">{{ pontos }}</h3>
                    <p class="text-muted mb-0">Pontos Atuais</p>
                  </div>
                </div>
                <div class="col-6 col-md-3">
                  <div class="text-center">
                    <h3 class="h2 mb-1">{{ pontosDisponiveis }}</h3>
                    <p class="text-muted mb-0">Pontos Disponíveis</p>
                  </div>
                </div>
                <div class="col-6 col-md-3">
                  <div class="text-center">
                    <h3 class="h2 mb-1">{{ nivel.nome }}</h3>
                    <p class="text-muted mb-0">Nível Atual</p>
                  </div>
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
.gamification-view {
  .card {
    @include transition-all;
    
    &:hover {
      transform: translateY(-2px);
    }
  }

  .progress {
    background-color: $gray-200;
    border-radius: 1rem;
    overflow: hidden;

    .progress-bar {
      @include transition-all;
    }
  }

  .badge {
    font-size: 0.8rem;
    padding: 0.5em 0.8em;
  }
}
</style> 