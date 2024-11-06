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
      <PageHeader 
        title="Sistema de Pontos"
        subtitle="Acumule pontos e desbloqueie benefícios exclusivos!"
      />

      <div class="row g-4">
        <!-- Card de Nível -->
        <div class="col-12">
          <LevelCard 
            :level="nivel"
            :points="pontos"
          />
        </div>

        <!-- Estatísticas -->
        <div class="col-12">
          <StatsCard 
            :progresso-total="progressoTotal"
            :pontos-atuais="pontos"
            :pontos-disponiveis="pontosDisponiveis"
            :nivel-atual="nivel.nome"
          />
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