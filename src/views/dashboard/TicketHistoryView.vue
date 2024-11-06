<script setup lang="ts">
import { ref } from 'vue'
import type { Ticket } from '../../types/dashboard'

const tickets = ref<Ticket[]>([
  {
    id: 1,
    jogo: {
      id: 1,
      mandante: 'Santos',
      visitante: 'Palmeiras',
      data: '2024-01-20',
      horario: '16:00',
      estadio: 'Vila Belmiro',
      preco: 'R$ 60,00',
      disponivel: true,
      setor: 'Arquibancada'
    },
    dataCompra: '2024-01-15',
    setor: 'Arquibancada',
    valor: 60.00,
    status: 'ativo',
    codigoQR: 'qr-code-1'
  },
  {
    id: 2,
    jogo: {
      id: 2,
      mandante: 'Santos',
      visitante: 'São Paulo',
      data: '2023-12-20',
      horario: '18:30',
      estadio: 'Vila Belmiro',
      preco: 'R$ 80,00',
      disponivel: false,
      setor: 'Cadeiras'
    },
    dataCompra: '2023-12-15',
    setor: 'Cadeiras',
    valor: 80.00,
    status: 'usado',
    codigoQR: 'qr-code-2'
  }
])

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

const downloadTicket = (ticketId: number) => {
  alert('Download do ingresso em desenvolvimento')
}
</script>

<template>
  <div class="tickets-view">
    <div class="container py-4">
      <!-- Cabeçalho -->
      <div class="row mb-4">
        <div class="col-12">
          <h1 class="h3">Meus Ingressos</h1>
          <p class="text-muted">Gerencie seus ingressos e acesse o histórico de jogos</p>
        </div>
      </div>

      <!-- Lista de Ingressos -->
      <div class="row g-4">
        <div v-for="ticket in tickets" :key="ticket.id" class="col-12 col-lg-6">
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

              <div class="d-flex gap-2">
                <button 
                  class="btn btn-dark flex-grow-1"
                  @click="downloadTicket(ticket.id)"
                  :disabled="ticket.status !== 'ativo'"
                >
                  <i class="fas fa-download me-2"></i>
                  Baixar Ingresso
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tickets-view {
  .card {
    @include transition-all;
    
    &:hover {
      transform: translateY(-2px);
    }
  }

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
}
</style> 