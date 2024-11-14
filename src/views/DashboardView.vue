<script setup lang="ts">
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'
import { ref, computed } from 'vue'
import type { Game, UserLevel, Benefit, Achievement } from '../types/dashboard'
import DashboardNavbar from '../components/DashboardNavbar.vue'

const authStore = useAuthStore()
const router = useRouter()
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
  },
  {
    id: 3,
    mandante: 'Corinthians',
    visitante: 'Santos',
    data: '2024-02-03',
    horario: '21:00',
    estadio: 'Neo Química Arena',
    preco: 'A partir de R$ 100,00',
    disponivel: false,
    setor: 'Visitante',
    capacidade: 0
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

// Conquistas do usuário
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

// Benefícios desbloqueados e a desbloquear
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
    icon: 'fa-stadium',
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

// Estatísticas do usuário
const estatisticas = ref({
  jogosAssistidos: 15,
  pontosAcumulados: pontos.value,
  produtosComprados: 2,
  ingressosComprados: 8
})

// Computados
const proximosBeneficios = computed(() => {
  return beneficios.value.filter(b => !b.unlocked)
})

const progressoTotal = computed(() => {
  const total = achievements.value.reduce((acc, curr) => acc + (curr.progresso / curr.meta), 0)
  return (total / achievements.value.length) * 100
})

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}

const comprarIngresso = (jogoId: number) => {
  // Aqui implementaríamos a lógica de compra
  alert('Funcionalidade de compra em desenvolvimento')
}
</script>

<template>
  <div class="dashboard-view">
    <DashboardNavbar />

    <main class="dashboard-content">
      <router-view v-if="$route.name !== 'dashboard'" />

      <template v-else>
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
                    <div class="progress-bar bg-dark" role="progressbar" :style="{ width: `${nivel.progresso}%` }"
                      :aria-valuenow="nivel.progresso" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Próximos Jogos -->
            <div class="col-12">
              <h2 class="h4 mb-3">Próximos Jogos</h2>
              <div class="row g-3">
                <div v-for="jogo in proximosJogos" :key="jogo.id" class="col-12 col-md-6 col-lg-4">
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
                      <button class="btn btn-dark w-100" :disabled="!jogo.disponivel">
                        <i class="fas fa-shopping-cart me-2"></i>Comprar Ingresso
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Benefícios -->
            <div class="col-12">
              <h2 class="h4 mb-3">Seus Benefícios</h2>
              <div class="row g-3">
                <div v-for="beneficio in beneficios" :key="beneficio.id" class="col-12 col-md-4">
                  <div class="card shadow-sm h-100">
                    <div class="card-body">
                      <h5 class="card-title">
                        <i :class="['fas', beneficio.icon, 'me-2']"></i>{{ beneficio.nome }}
                      </h5>
                      <p class="card-text">{{ beneficio.descricao }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Atalhos Rápidos -->
            <div class="col-12 col-md-6 col-lg-4">
              <div class="card shadow-sm h-100">
                <div class="card-body">
                  <h5 class="card-title">
                    <i class="fas fa-ticket-alt me-2"></i>Ingressos
                  </h5>
                  <p class="card-text">Acesse seus ingressos e histórico de jogos.</p>
                  <button class="btn btn-outline-dark w-100">
                    <i class="fas fa-history me-2"></i>Ver Histórico
                  </button>
                </div>
              </div>
            </div>

            <div class="col-12 col-md-6 col-lg-4">
              <div class="card shadow-sm h-100">
                <div class="card-body">
                  <h5 class="card-title">
                    <i class="fas fa-store me-2"></i>Loja
                  </h5>
                  <p class="card-text">Confira produtos exclusivos para sócios.</p>
                  <button class="btn btn-outline-dark w-100">
                    <i class="fas fa-shopping-bag me-2"></i>Ir para Loja
                  </button>
                </div>
              </div>
            </div>

            <div class="col-12 col-md-6 col-lg-4">
              <div class="card shadow-sm h-100">
                <div class="card-body">
                  <h5 class="card-title">
                    <i class="fas fa-percentage me-2"></i>Benefícios
                  </h5>
                  <p class="card-text">Veja todos os benefícios do seu plano.</p>
                  <button class="btn btn-outline-dark w-100">
                    <i class="fas fa-gift me-2"></i>Ver Benefícios
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.navbar-logo {
  height: 30px;

  @include sm {
    height: 35px;
  }

  @include md {
    height: 40px;
  }

  @include lg {
    height: 45px;
  }
}

.dashboard-content {
  min-height: calc(100vh - 56px);
  background-color: $gray-100;

  @include md {
    min-height: calc(100vh - 64px);
  }
}

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

.card-title {
  font-size: 1.1rem;
  margin-bottom: 1rem;

  @include md {
    font-size: 1.25rem;
  }
}

.card-text {
  font-size: 0.9rem;
  color: $gray-600;

  @include md {
    font-size: 1rem;
  }
}

.btn {
  @include transition-all;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
  }
}
</style>
