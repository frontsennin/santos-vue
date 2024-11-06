<script setup lang="ts">
defineProps<{
  stats: {
    jogosAssistidos: number
    pontosAcumulados: number
    produtosComprados: number
    ingressosComprados: number
  }
}>()
</script>

<template>
  <div class="card shadow-sm">
    <div class="card-body">
      <h2 class="h4 mb-3">Estatísticas</h2>
      <div class="row g-3">
        <div class="col-6 col-md-3">
          <div class="text-center">
            <h3 class="h2 mb-1">{{ stats.jogosAssistidos }}</h3>
            <p class="text-muted mb-0">Jogos Assistidos</p>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="text-center">
            <h3 class="h2 mb-1">{{ stats.pontosAcumulados }}</h3>
            <p class="text-muted mb-0">Pontos Acumulados</p>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="text-center">
            <h3 class="h2 mb-1">{{ stats.produtosComprados }}</h3>
            <p class="text-muted mb-0">Produtos Comprados</p>
          </div>
        </div>
        <div class="col-6 col-md-3">
          <div class="text-center">
            <h3 class="h2 mb-1">{{ stats.ingressosComprados }}</h3>
            <p class="text-muted mb-0">Ingressos Comprados</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 