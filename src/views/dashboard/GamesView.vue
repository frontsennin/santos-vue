<script setup lang="ts">
import { ref } from 'vue'
import { UPCOMING_GAMES } from '../../constants/games'

const proximosJogos = ref(UPCOMING_GAMES)

const comprarIngresso = (jogoId: number) => {
  alert('Funcionalidade de compra em desenvolvimento')
}
</script>

<template>
  <div class="games-view">
    <div class="container py-4">
      <!-- Cabeçalho -->
      <div class="row mb-4">
        <div class="col-12">
          <h1 class="h3">Próximos Jogos</h1>
          <p class="text-muted">Confira os próximos jogos do Santos e garanta seu ingresso!</p>
        </div>
      </div>

      <!-- Lista de Jogos -->
      <div class="row g-4">
        <div v-for="jogo in proximosJogos" :key="jogo.id" class="col-12 col-md-6 col-lg-4">
          <div class="card shadow-sm h-100">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <h5 class="card-title mb-0">{{ jogo.mandante }} x {{ jogo.visitante }}</h5>
                <span class="badge" :class="jogo.disponivel ? 'bg-success' : 'bg-danger'">
                  {{ jogo.disponivel ? 'Disponível' : 'Esgotado' }}
                </span>
              </div>
              <div class="game-info mb-3">
                <p class="mb-2">
                  <i class="fas fa-calendar me-2"></i>
                  {{ new Date(jogo.data).toLocaleDateString() }}
                </p>
                <p class="mb-2">
                  <i class="fas fa-clock me-2"></i>
                  {{ jogo.horario }}
                </p>
                <p class="mb-2">
                  <i class="fas fa-map-marker-alt me-2"></i>
                  {{ jogo.estadio }}
                </p>
                <p class="mb-2">
                  <i class="fas fa-ticket-alt me-2"></i>
                  {{ jogo.preco }}
                </p>
                <p class="mb-0" v-if="jogo.disponivel">
                  <i class="fas fa-users me-2"></i>
                  {{ jogo.capacidade }} lugares disponíveis
                </p>
              </div>
              <button 
                class="btn btn-dark w-100"
                :disabled="!jogo.disponivel"
                @click="comprarIngresso(jogo.id)"
              >
                <i class="fas fa-shopping-cart me-2"></i>
                {{ jogo.disponivel ? 'Comprar Ingresso' : 'Esgotado' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.games-view {
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
}
</style> 