<script setup lang="ts">
defineProps<{
  progressoTotal: number
  pontosAtuais: number
  pontosDisponiveis: number
  nivelAtual: string
}>()
</script>

<template>
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
            <h3 class="h2 mb-1">{{ pontosAtuais }}</h3>
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
            <h3 class="h2 mb-1">{{ nivelAtual }}</h3>
            <p class="text-muted mb-0">Nível Atual</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'StatsCard'
}
</script> 