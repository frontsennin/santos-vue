<script setup lang="ts">
import type { UserLevel } from '../../types/dashboard'
import ProgressBar from '../ProgressBar.vue'

defineProps<{
  level: UserLevel
  points: number
}>()
</script>

<template>
  <div class="card shadow-sm">
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h2 class="h4 mb-1">Nível: {{ level.nome }}</h2>
          <p class="text-muted mb-0">{{ points }} pontos acumulados</p>
        </div>
        <div class="text-end">
          <p class="mb-1">Próximo nível: {{ level.proxNivel }}</p>
          <p class="text-muted mb-0">Faltam {{ level.pontosProxNivel - points }} pontos</p>
        </div>
      </div>
      <ProgressBar :progress="level.progresso" />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'LevelCard'
}
</script> 