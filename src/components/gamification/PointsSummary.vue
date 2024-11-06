<script setup lang="ts">
import { USER_STATS } from '../../constants/user'
import { ref } from 'vue'

const stats = ref(USER_STATS)
</script>

<template>
  <div class="card shadow-sm">
    <div class="card-body">
      <h2 class="h4 mb-3">Resumo de Pontos</h2>
      <div class="row g-3">
        <div class="col-6 col-md-3">
          <div class="text-center">
            <h3 class="h2 mb-1">{{ stats.pontosTotaisGanhos }}</h3>
            <p class="text-muted mb-0">Pontos Ganhos</p>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="text-center">
            <h3 class="h2 mb-1">{{ stats.pontosTotaisGastos }}</h3>
            <p class="text-muted mb-0">Pontos Gastos</p>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="text-center">
            <h3 class="h2 mb-1">{{ stats.pontosAcumulados }}</h3>
            <p class="text-muted mb-0">Pontos Disponíveis</p>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="text-center">
            <h3 class="h2 mb-1">{{ stats.jogosAssistidos }}</h3>
            <p class="text-muted mb-0">Jogos Assistidos</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 