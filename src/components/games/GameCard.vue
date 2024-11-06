<script setup lang="ts">
import type { Game } from '../../types/dashboard'

defineProps<{
  game: Game
}>()

const emit = defineEmits<{
  'buy': [gameId: number]
}>()

export default {
  name: 'GameCard'
} 

</script>

<template>
  <div class="card shadow-sm h-100">
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h5 class="card-title mb-0">{{ game.mandante }} x {{ game.visitante }}</h5>
        <span class="badge" :class="game.disponivel ? 'bg-success' : 'bg-danger'">
          {{ game.disponivel ? 'Disponível' : 'Esgotado' }}
        </span>
      </div>
      <div class="game-info mb-3">
        <p class="mb-2">
          <i class="fas fa-calendar me-2"></i>
          {{ new Date(game.data).toLocaleDateString() }}
        </p>
        <p class="mb-2">
          <i class="fas fa-clock me-2"></i>
          {{ game.horario }}
        </p>
        <p class="mb-2">
          <i class="fas fa-map-marker-alt me-2"></i>
          {{ game.estadio }}
        </p>
        <p class="mb-2">
          <i class="fas fa-ticket-alt me-2"></i>
          {{ game.preco }}
        </p>
        <p class="mb-0" v-if="game.disponivel">
          <i class="fas fa-users me-2"></i>
          {{ game.capacidade }} lugares disponíveis
        </p>
      </div>
      <button 
        class="btn btn-dark w-100"
        :disabled="!game.disponivel"
        @click="emit('buy', game.id)"
      >
        <i class="fas fa-shopping-cart me-2"></i>
        {{ game.disponivel ? 'Comprar Ingresso' : 'Esgotado' }}
      </button>
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

.game-info {
  p {
    font-size: 0.9rem;
    color: $gray-600;
    
    @include md {
      font-size: 1rem;
    }
  }
}

.badge {
  font-size: 0.8rem;
  padding: 0.5em 0.8em;
}
</style> 