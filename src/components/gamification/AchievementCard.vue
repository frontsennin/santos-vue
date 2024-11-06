<script setup lang="ts">
import type { Achievement } from '../../types/dashboard'
import ProgressBar from '../ProgressBar.vue'

defineProps<{
  achievement: Achievement
}>()
</script>

<template>
  <div class="card shadow-sm h-100">
    <div class="card-body">
      <div class="d-flex align-items-center mb-3">
        <i :class="['fas', achievement.icon, 'me-2', 'fa-2x']"></i>
        <div>
          <h3 class="h5 mb-1">{{ achievement.nome }}</h3>
          <p class="text-muted mb-0">{{ achievement.descricao }}</p>
        </div>
      </div>
      <ProgressBar 
        class="mb-2"
        :progress="(achievement.progresso / achievement.meta) * 100"
        height="8px"
      />
      <div class="d-flex justify-content-between align-items-center">
        <span class="text-muted">
          {{ achievement.progresso }}/{{ achievement.meta }}
        </span>
        <span class="badge bg-dark">
          {{ achievement.pontos }} pontos
        </span>
      </div>
    </div>
  </div>
</template> 