<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuthStore } from '../../stores/auth'
import { USER_POINTS } from '../../constants/user'
import { ACHIEVEMENTS } from '../../constants/achievements'
import { calculateUserLevel } from '../../constants/levels'
import PageHeader from '../../components/PageHeader.vue'
import LevelCard from '../../components/gamification/LevelCard.vue'
import StatsCard from '../../components/gamification/StatsCard.vue'
import AchievementList from '../../components/gamification/AchievementList.vue'

const authStore = useAuthStore()
const user = authStore.user

const pontos = ref(USER_POINTS)
const nivel = ref(calculateUserLevel(USER_POINTS))
const achievements = ref(ACHIEVEMENTS)

// Definição dos níveis
const niveis = ref([
  {
    nome: 'Iniciante',
    pontosNecessarios: 0,
    cor: '#4CAF50',
    icone: 'fa-star',
    beneficios: [
      'Acesso básico ao conteúdo',
      'Participação na comunidade'
    ]
  },
  {
    nome: 'Bronze',
    pontosNecessarios: 100,
    cor: '#CD7F32',
    icone: 'fa-medal',
    beneficios: [
      'Desconto em produtos oficiais',
      'Carteirinha digital exclusiva'
    ]
  },
  {
    nome: 'Prata',
    pontosNecessarios: 300,
    cor: '#C0C0C0',
    icone: 'fa-award',
    beneficios: [
      'Prioridade na compra de ingressos',
      'Descontos exclusivos em parceiros'
    ]
  },
  {
    nome: 'Ouro',
    pontosNecessarios: 600,
    cor: '#FFD700',
    icone: 'fa-crown',
    beneficios: [
      'Acesso ao camarote em jogos',
      'Meet & Greet com jogadores'
    ]
  },
  {
    nome: 'Black',
    pontosNecessarios: 1000,
    cor: '#000000',
    icone: 'fa-gem',
    beneficios: [
      'Cadeira cativa no estádio',
      'Experiências VIP exclusivas'
    ]
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

const getNivelAtual = (pontosAtuais: number) => {
  return niveis.value.reduce((atual, nivel) => {
    if (pontosAtuais >= nivel.pontosNecessarios) {
      return nivel
    }
    return atual
  })
}

const getProximoNivel = (pontosAtuais: number) => {
  return niveis.value.find(nivel => nivel.pontosNecessarios > pontosAtuais)
}

const calcularProgresso = (pontosAtuais: number, nivelAtual: any, proximoNivel: any) => {
  if (!proximoNivel) return 100
  const pontosNecessarios = proximoNivel.pontosNecessarios - nivelAtual.pontosNecessarios
  const pontosObtidos = pontosAtuais - nivelAtual.pontosNecessarios
  return Math.min(Math.round((pontosObtidos / pontosNecessarios) * 100), 100)
}
</script>

<template>
  <div class="gamification-view">
    <div class="container py-4">
      <PageHeader
        title="Sistema de Pontos"
        subtitle="Acumule pontos e desbloqueie benefícios exclusivos!"
      />

      <div class="row g-4">
        <!-- Cards existentes -->
        <div class="col-12">
          <LevelCard
            :level="nivel"
            :points="pontos"
          />
        </div>

        <div class="col-12">
          <StatsCard
            :progresso-total="progressoTotal"
            :pontos-atuais="pontos"
            :pontos-disponiveis="pontosDisponiveis"
            :nivel-atual="nivel.nome"
          />
        </div>

        <!-- Níveis de Pontuação -->
        <div class="col-12">
          <h2 class="h4 mb-3">Níveis de Pontuação</h2>
          <div class="row g-4">
            <div v-for="(nivel, index) in niveis" :key="index" class="col-md-6 col-lg-4">
              <div class="nivel-card" :class="{ 'nivel-atual': pontos >= nivel.pontosNecessarios }">
                <div class="nivel-header" :style="{ backgroundColor: nivel.cor }">
                  <i :class="['fas', nivel.icone]"></i>
                  <h3>{{ nivel.nome }}</h3>
                  <p>{{ nivel.pontosNecessarios }} pontos</p>
                </div>
                <div class="nivel-content">
                  <h4>Benefícios:</h4>
                  <ul>
                    <li v-for="(beneficio, idx) in nivel.beneficios" :key="idx">
                      {{ beneficio }}
                    </li>
                  </ul>
                  <div class="nivel-progress">
                    <div class="progress">
                      <div
                        class="progress-bar"
                        :style="{
                          width: `${calcularProgresso(pontos, getNivelAtual(pontos), getProximoNivel(pontos))}%`,
                          backgroundColor: nivel.cor
                        }"
                      ></div>
                    </div>
                    <span class="progress-text">
                      {{ pontos >= nivel.pontosNecessarios ? 'Nível Alcançado!' : `Faltam ${nivel.pontosNecessarios - pontos} pontos` }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Conquistas -->
        <div class="col-12">
          <h2 class="h4 mb-3">Suas Conquistas</h2>
          <AchievementList :achievements="achievements" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.gamification-view {
  .nivel-card {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    height: 100%;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
    }

    &.nivel-atual {
      border: 2px solid #4CAF50;
    }

    .nivel-header {
      padding: 1.5rem;
      text-align: center;
      color: white;

      i {
        font-size: 2rem;
        margin-bottom: 1rem;
      }

      h3 {
        margin: 0;
        font-size: 1.5rem;
      }

      p {
        margin: 0.5rem 0 0;
        opacity: 0.9;
      }
    }

    .nivel-content {
      padding: 1.5rem;

      h4 {
        font-size: 1.1rem;
        margin-bottom: 1rem;
      }

      ul {
        list-style: none;
        padding: 0;
        margin: 0 0 1.5rem;

        li {
          margin-bottom: 0.5rem;
          padding-left: 1.5rem;
          position: relative;

          &:before {
            content: "✓";
            position: absolute;
            left: 0;
            color: #4CAF50;
          }
        }
      }
    }

    .nivel-progress {
      .progress {
        height: 8px;
        background-color: #f5f5f5;
        border-radius: 4px;
        margin-bottom: 0.5rem;

        .progress-bar {
          transition: width 0.3s ease;
        }
      }

      .progress-text {
        font-size: 0.9rem;
        color: #666;
      }
    }
  }
}
</style>
