<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuthStore } from '../../stores/auth'
import type { Game, UserLevel, Benefit } from '../../types/dashboard'

const authStore = useAuthStore()
const user = authStore.user

// Mock de dados para próximos jogos
const proximosJogos = ref<Game[]>([
  {
    id: 1,
    mandante: 'Santos',
    visitante: 'Palmeiras',
    data: '2024-01-20',
    horario: '16:00',
    estadio: 'Vila Belmiro',
    preco: 'A partir de R$ 60,00',
    disponivel: true,
    setor: 'Arquibancada',
    capacidade: 200
  },
  {
    id: 2,
    mandante: 'Santos',
    visitante: 'São Paulo',
    data: '2024-01-27',
    horario: '18:30',
    estadio: 'Vila Belmiro',
    preco: 'A partir de R$ 80,00',
    disponivel: true,
    setor: 'Cadeiras',
    capacidade: 150
  }
])

// Sistema de níveis e pontos
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

// Benefícios desbloqueados
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
  }
])

const proximosBeneficios = computed(() => {
  return beneficios.value.filter(b => !b.unlocked)
})
</script>

<template>
  <div class="container py-4">
    <div class="row g-4">
      <!-- Card de Boas-vindas e Nível -->
      <div class="col-12">
        <div class="card shadow-sm">
          <div class="card-body responsive-padding">
            <div class="d-flex justify-content-between align-items-center flex-wrap">
              <div>
                <h1 class="h3 mb-2">Bem-vindo, {{ user?.name }}!</h1>
                <p class="text-muted mb-0">
                  Você é um sócio {{ nivel.nome }}
                </p>
              </div>
              <div class="text-end">
                <h2 class="h4 mb-2">{{ pontos }} pontos</h2>
                <p class="text-muted mb-0">
                  Próximo nível: {{ nivel.proxNivel }} ({{ nivel.pontosProxNivel - pontos }} pontos restantes)
                </p>
              </div>
            </div>
            <div class="progress mt-3" style="height: 10px;">
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

      <!-- Próximos Jogos -->
      <div class="col-12">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h2 class="h4 mb-0">Próximos Jogos</h2>
          <router-link to="/dashboard/games" class="btn btn-outline-dark btn-sm">
            <i class="fas fa-list me-2"></i>Ver Todos
          </router-link>
        </div>
        <div class="row g-3">
          <div v-for="jogo in proximosJogos" :key="jogo.id" class="col-12 col-md-6">
            <div class="card shadow-sm h-100">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <h5 class="card-title mb-0">{{ jogo.mandante }} x {{ jogo.visitante }}</h5>
                  <span class="badge" :class="jogo.disponivel ? 'bg-success' : 'bg-danger'">
                    {{ jogo.disponivel ? 'Disponível' : 'Esgotado' }}
                  </span>
                </div>
                <p class="card-text">
                  <i class="fas fa-calendar me-2"></i>{{ new Date(jogo.data).toLocaleDateString() }}<br>
                  <i class="fas fa-clock me-2"></i>{{ jogo.horario }}<br>
                  <i class="fas fa-map-marker-alt me-2"></i>{{ jogo.estadio }}<br>
                  <i class="fas fa-ticket-alt me-2"></i>{{ jogo.preco }}
                </p>
                <router-link 
                  :to="`/dashboard/games`"
                  class="btn btn-dark w-100"
                >
                  <i class="fas fa-shopping-cart me-2"></i>Comprar Ingresso
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Links Rápidos -->
      <div class="col-12">
        <h2 class="h4 mb-3">Acesso Rápido</h2>
        <div class="row g-3">
          <div class="col-12 col-md-4">
            <router-link to="/dashboard/tickets" class="text-decoration-none">
              <div class="card shadow-sm h-100">
                <div class="card-body">
                  <h5 class="card-title">
                    <i class="fas fa-ticket-alt me-2"></i>Meus Ingressos
                  </h5>
                  <p class="card-text">Acesse seus ingressos e histórico de jogos.</p>
                </div>
              </div>
            </router-link>
          </div>

          <div class="col-12 col-md-4">
            <router-link to="/dashboard/store" class="text-decoration-none">
              <div class="card shadow-sm h-100">
                <div class="card-body">
                  <h5 class="card-title">
                    <i class="fas fa-store me-2"></i>Loja Oficial
                  </h5>
                  <p class="card-text">Confira produtos exclusivos para sócios.</p>
                </div>
              </div>
            </router-link>
          </div>

          <div class="col-12 col-md-4">
            <router-link to="/dashboard/benefits" class="text-decoration-none">
              <div class="card shadow-sm h-100">
                <div class="card-body">
                  <h5 class="card-title">
                    <i class="fas fa-gift me-2"></i>Benefícios
                  </h5>
                  <p class="card-text">Veja todos os benefícios do seu plano.</p>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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

a.text-decoration-none {
  color: inherit;

  &:hover {
    .card {
      border-color: $primary-color;
    }
  }
}
</style> 