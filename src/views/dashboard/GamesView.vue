<script setup lang="ts">
import { ref, computed } from 'vue'
import { UPCOMING_GAMES } from '../../constants/games'
import StadiumMap from '@/components/stadium/StadiumMap.vue'

interface Game {
  id: number
  mandante: string
  visitante: string
  data: string
  horario: string
  estadio: string
  preco: string
  capacidade?: number
  disponivel: boolean
}

interface Seat {
  setorId: number
  assentoId: string
  numero: number
  setor: string
  preco: number
}

interface Setor {
  id: number
  nome: string
  precoBase: number
  assentos: Array<{
    id: string
    numero: number
    disponivel: boolean
    tipo: string
  }>
}

const proximosJogos = ref<Game[]>(UPCOMING_GAMES)
const modalVisible = ref(false)
const selectedGame = ref<Game | null>(null)
const selectedSeats = ref<Seat[]>([])
const selectedSetor = ref<string | null>(null)

// Mapa de setores e assentos
const setores = ref<Setor[]>([
  {
    id: 1,
    nome: 'Arquibancada',
    precoBase: 50,
    assentos: Array.from({ length: 100 }, (_, i) => ({
      id: `A${i + 1}`,
      numero: i + 1,
      disponivel: Math.random() > 0.3,
      tipo: 'normal'
    }))
  },
  {
    id: 2,
    nome: 'Cadeiras Especiais',
    precoBase: 100,
    assentos: Array.from({ length: 50 }, (_, i) => ({
      id: `E${i + 1}`,
      numero: i + 1,
      disponivel: Math.random() > 0.3,
      tipo: 'especial'
    }))
  },
  {
    id: 3,
    nome: 'Camarote',
    precoBase: 200,
    assentos: Array.from({ length: 20 }, (_, i) => ({
      id: `C${i + 1}`,
      numero: i + 1,
      disponivel: Math.random() > 0.3,
      tipo: 'camarote'
    }))
  }
])

// Mapeamento de setores do estádio para os tipos de ingresso
const setorMapping = {
  norte: 'Arquibancada',
  sul: 'Arquibancada',
  leste: 'Cadeiras Especiais',
  oeste: 'Cadeiras Especiais',
  noroeste: 'Camarote',
  nordeste: 'Camarote',
  sudoeste: 'Camarote',
  sudeste: 'Camarote'
}

const comprarIngresso = (jogo: Game) => {
  selectedGame.value = jogo
  modalVisible.value = true
}

const toggleSeat = (setor: Setor, assento: { id: string; numero: number; disponivel: boolean }) => {
  if (!assento.disponivel) return

  const seatIndex = selectedSeats.value.findIndex(
    s => s.setorId === setor.id && s.assentoId === assento.id
  )

  if (seatIndex === -1) {
    selectedSeats.value.push({
      setorId: setor.id,
      assentoId: assento.id,
      numero: assento.numero,
      setor: setor.nome,
      preco: setor.precoBase
    })
  } else {
    selectedSeats.value.splice(seatIndex, 1)
  }
}

const isSelected = (setor: Setor, assento: { id: string }) => {
  return selectedSeats.value.some(
    s => s.setorId === setor.id && s.assentoId === assento.id
  )
}

const totalValue = computed(() => {
  return selectedSeats.value.reduce((total, seat) => total + seat.preco, 0)
})

const closeModal = () => {
  modalVisible.value = false
  selectedGame.value = null
  selectedSeats.value = []
}

const confirmarCompra = () => {
  if (selectedSeats.value.length === 0) {
    alert('Selecione pelo menos um assento')
    return
  }

  alert('Compra realizada com sucesso!')
  closeModal()
}

const handleSetorSelected = (setorNome: string) => {
  const tipoSetor = setorMapping[setorNome as keyof typeof setorMapping]
  selectedSetor.value = tipoSetor
}

const getSetorInfo = (setorNome: string | null) => {
  if (!setorNome) return null
  return setores.value.find(setor => setor.nome === setorNome)
}

const getSetorAssentos = (setorNome: string | null) => {
  const setor = getSetorInfo(setorNome)
  return setor?.assentos || []
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
                @click="comprarIngresso(jogo)"
              >
                <i class="fas fa-shopping-cart me-2"></i>
                {{ jogo.disponivel ? 'Comprar Ingresso' : 'Esgotado' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de Seleção de Assentos -->
    <div class="seat-modal" v-if="modalVisible">
      <div class="modal-overlay" @click="closeModal"></div>
      <div class="modal-content">
        <div class="modal-header">
          <h3>Selecione seus assentos</h3>
          <button class="close-btn" @click="closeModal">
            <i class="fas fa-times"></i>
          </button>
        </div>

        <div class="modal-body">
          <div class="game-info mb-4" v-if="selectedGame">
            <h4>{{ selectedGame.mandante }} x {{ selectedGame.visitante }}</h4>
            <p>{{ new Date(selectedGame.data).toLocaleDateString() }} - {{ selectedGame.horario }}</p>
            <p>{{ selectedGame.estadio }}</p>
          </div>

          <!-- Mapa do Estádio -->
          <StadiumMap
            :selected-setor="selectedSetor"
            :setores="setores"
            @setor-selected="handleSetorSelected"
          />

          <!-- Seção de Assentos do Setor Selecionado -->
          <div v-if="selectedSetor && getSetorInfo(selectedSetor)" class="setor-details">
            <div class="setor-header">
              <h4>{{ getSetorInfo(selectedSetor)?.nome }}</h4>
              <p class="setor-price">
                Preço: R$ {{ getSetorInfo(selectedSetor)?.precoBase.toFixed(2) }}
              </p>
            </div>

            <div class="assentos-container">
              <div class="assentos-grid">
                <button
                  v-for="assento in getSetorAssentos(selectedSetor)"
                  :key="assento.id"
                  class="assento-btn"
                  :class="{
                    'indisponivel': !assento.disponivel,
                    'selecionado': isSelected(getSetorInfo(selectedSetor)!, assento)
                  }"
                  @click="getSetorInfo(selectedSetor) && toggleSeat(getSetorInfo(selectedSetor)!, assento)"
                  :disabled="!assento.disponivel"
                >
                  {{ assento.numero }}
                </button>
              </div>
            </div>

            <div class="legenda">
              <div class="legenda-item">
                <span class="legenda-box disponivel"></span>
                <span>Disponível</span>
              </div>
              <div class="legenda-item">
                <span class="legenda-box selecionado"></span>
                <span>Selecionado</span>
              </div>
              <div class="legenda-item">
                <span class="legenda-box indisponivel"></span>
                <span>Indisponível</span>
              </div>
            </div>
          </div>

          <!-- Resumo da Seleção -->
          <div class="selected-seats mt-4" v-if="selectedSeats.length > 0">
            <h5>Assentos Selecionados:</h5>
            <ul>
              <li v-for="seat in selectedSeats" :key="`${seat.setorId}-${seat.assentoId}`">
                {{ seat.setor }} - Assento {{ seat.numero }} - R$ {{ seat.preco.toFixed(2) }}
              </li>
            </ul>
            <div class="total-value">
              Total: R$ {{ totalValue.toFixed(2) }}
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button class="btn btn-secondary" @click="closeModal">Cancelar</button>
          <button
            class="btn btn-primary"
            @click="confirmarCompra"
            :disabled="selectedSeats.length === 0"
          >
            Confirmar Compra
          </button>
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

.seat-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;

  .modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .modal-content {
    position: relative;
    width: 90%;
    max-width: 900px;
    max-height: 90vh;
    background: white;
    border-radius: 12px;
    padding: 2rem;
    overflow-y: auto;
    z-index: 1001;

    @media (max-width: 768px) {
      width: 95%;
      padding: 1rem;
    }
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;

    .close-btn {
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      padding: 0.5rem;

      &:hover {
        color: #ff4444;
      }
    }
  }

  .setores-container {
    .setor-section {
      margin-bottom: 2rem;

      h5 {
        margin-bottom: 1rem;
      }
    }
  }

  .assentos-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(40px, 1fr));
    gap: 0.5rem;

    .assento-btn {
      width: 40px;
      height: 40px;
      border: 1px solid #ddd;
      border-radius: 4px;
      background: white;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover:not(.indisponivel) {
        background: #f0f0f0;
      }

      &.indisponivel {
        background: #f5f5f5;
        cursor: not-allowed;
        color: #999;
      }

      &.selecionado {
        background: #4CAF50;
        color: white;
        border-color: #45a049;
      }
    }
  }

  .selected-seats {
    border-top: 1px solid #ddd;
    padding-top: 1rem;

    ul {
      list-style: none;
      padding: 0;
      margin: 1rem 0;
    }

    .total-value {
      font-size: 1.2rem;
      font-weight: bold;
      text-align: right;
    }
  }

  .modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
    margin-top: 2rem;

    .btn {
      padding: 0.5rem 1.5rem;
    }
  }
}

// Legenda dos assentos
.seat-legend {
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
  justify-content: center;

  .legend-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;

    .legend-box {
      width: 20px;
      height: 20px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
  }
}

.setor-details {
  margin-top: 2rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  animation: fadeIn 0.3s ease;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .setor-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;

    h4 {
      margin: 0;
      color: #ffd700;
    }

    .setor-price {
      margin: 0;
      font-weight: 500;
    }
  }

  .assentos-container {
    margin: 1.5rem 0;
  }

  .assentos-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(45px, 1fr));
    gap: 0.5rem;
    margin-bottom: 1.5rem;
  }

  .assento-btn {
    width: 45px;
    height: 45px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background: white;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 0.9rem;

    &:hover:not(.indisponivel) {
      transform: translateY(-2px);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    &.indisponivel {
      background: #f5f5f5;
      cursor: not-allowed;
      color: #999;
    }

    &.selecionado {
      background: #4CAF50;
      color: white;
      border-color: #45a049;
    }
  }

  .legenda {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin-top: 1rem;

    .legenda-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.9rem;

      .legenda-box {
        width: 20px;
        height: 20px;
        border-radius: 4px;
        border: 1px solid #ddd;

        &.disponivel {
          background: white;
        }

        &.selecionado {
          background: #4CAF50;
        }

        &.indisponivel {
          background: #f5f5f5;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .setor-details {
    padding: 1rem;

    .assentos-grid {
      grid-template-columns: repeat(auto-fill, minmax(40px, 1fr));
    }

    .assento-btn {
      width: 40px;
      height: 40px;
    }

    .legenda {
      flex-wrap: wrap;
      gap: 1rem;
    }
  }
}
</style>
