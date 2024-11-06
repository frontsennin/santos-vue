<script setup lang="ts">
import type { Ticket } from '../../types/dashboard'

defineProps<{
  ticket: Ticket
}>()

const emit = defineEmits<{
  'download': [ticketId: number]
}>()

const getStatusBadgeClass = (status: string) => {
  switch (status) {
    case 'ativo':
      return 'bg-success'
    case 'usado':
      return 'bg-secondary'
    case 'cancelado':
      return 'bg-danger'
    default:
      return 'bg-primary'
  }
}
</script>

<template>
  <div class="card shadow-sm">
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h5 class="card-title mb-0">
          {{ ticket.jogo.mandante }} x {{ ticket.jogo.visitante }}
        </h5>
        <span class="badge" :class="getStatusBadgeClass(ticket.status)">
          {{ ticket.status.toUpperCase() }}
        </span>
      </div>

      <div class="ticket-info mb-3">
        <p class="mb-2">
          <i class="fas fa-calendar me-2"></i>
          {{ new Date(ticket.jogo.data).toLocaleDateString() }}
          <span class="ms-2">
            <i class="fas fa-clock me-2"></i>
            {{ ticket.jogo.horario }}
          </span>
        </p>
        <p class="mb-2">
          <i class="fas fa-map-marker-alt me-2"></i>
          {{ ticket.jogo.estadio }}
        </p>
        <p class="mb-2">
          <i class="fas fa-couch me-2"></i>
          Setor: {{ ticket.setor }}
        </p>
        <p class="mb-2">
          <i class="fas fa-shopping-cart me-2"></i>
          Comprado em: {{ new Date(ticket.dataCompra).toLocaleDateString() }}
        </p>
        <p class="mb-0">
          <i class="fas fa-money-bill me-2"></i>
          Valor: R$ {{ ticket.valor.toFixed(2) }}
        </p>
      </div>

      <button 
        class="btn btn-dark w-100"
        @click="emit('download', ticket.id)"
        :disabled="ticket.status !== 'ativo'"
      >
        <i class="fas fa-download me-2"></i>
        Baixar Ingresso
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ticket-info {
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