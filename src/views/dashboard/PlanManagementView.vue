<template>
  <div class="container py-4">
    <h1 class="h3 mb-4">Gerenciar Plano</h1>
    <div class="row g-4">
      <div class="col-12 col-lg-4">
        <div class="card shadow-sm">
          <div class="card-body">
            <h5 class="card-title">Plano Atual</h5>
            <p class="card-text">
              <strong>{{ userPlan.nome }}</strong><br>
              Próxima cobrança: {{ nextBillingDate }}<br>
              Valor: R$ {{ planPrice }}
            </p>
          </div>
        </div>
      </div>

      <div class="col-12 col-lg-8">
        <div class="card shadow-sm">
          <div class="card-body">
            <h5 class="card-title">Histórico de Pagamentos</h5>
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr>
                    <th>Data</th>
                    <th>Valor</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="payment in paymentHistory" :key="payment.id">
                    <td>{{ payment.date }}</td>
                    <td>R$ {{ payment.amount }}</td>
                    <td>
                      <span :class="['badge', payment.status === 'Pago' ? 'bg-success' : 'bg-danger']">
                        {{ payment.status }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div class="col-12">
        <div class="card shadow-sm">
          <div class="card-body">
            <h5 class="card-title mb-4">Próxima Cobrança</h5>

            <div class="row g-4">
              <div class="col-md-4">
                <div class="payment-info">
                  <h6 class="text-muted mb-3">Detalhes</h6>
                  <p class="mb-2">
                    <strong>Data:</strong> {{ nextBillingDate }}
                  </p>
                  <p class="mb-2">
                    <strong>Valor:</strong> R$ {{ planPrice }}
                  </p>
                  <p class="mb-0">
                    <strong>Status:</strong>
                    <span class="badge bg-warning">Pendente</span>
                  </p>
                </div>
              </div>

              <div class="col-md-8">
                <h6 class="text-muted mb-3">Formas de Pagamento</h6>

                <div class="payment-methods">
                  <div class="payment-option" :class="{ 'active': selectedPayment === 'credit' }" @click="selectedPayment = 'credit'">
                    <div class="payment-option-header">
                      <i class="fas fa-credit-card"></i>
                      <span>Cartão de Crédito</span>
                    </div>
                    <div class="payment-option-content" v-if="selectedPayment === 'credit'">
                      <select class="form-select mb-3">
                        <option value="">Selecione um cartão</option>
                        <option value="1">•••• •••• •••• 4242</option>
                        <option value="2">•••• •••• •••• 5555</option>
                      </select>
                      <button class="btn btn-sm btn-outline-dark">
                        <i class="fas fa-plus me-2"></i>Adicionar novo cartão
                      </button>
                    </div>
                  </div>

                  <div class="payment-option" :class="{ 'active': selectedPayment === 'debit' }" @click="selectedPayment = 'debit'">
                    <div class="payment-option-header">
                      <i class="fas fa-money-check"></i>
                      <span>Cartão de Débito</span>
                    </div>
                    <div class="payment-option-content" v-if="selectedPayment === 'debit'">
                      <select class="form-select mb-3">
                        <option value="">Selecione um cartão</option>
                        <option value="1">•••• •••• •••• 4242</option>
                        <option value="2">•••• •••• •••• 5555</option>
                      </select>
                      <button class="btn btn-sm btn-outline-dark">
                        <i class="fas fa-plus me-2"></i>Adicionar novo cartão
                      </button>
                    </div>
                  </div>

                  <div class="payment-option" :class="{ 'active': selectedPayment === 'pix' }" @click="selectedPayment = 'pix'">
                    <div class="payment-option-header">
                      <i class="fas fa-qrcode"></i>
                      <span>PIX</span>
                    </div>
                    <div class="payment-option-content" v-if="selectedPayment === 'pix'">
                      <div class="text-center">
                        <img src="@/assets/qr-code-example.png" alt="QR Code" class="qr-code mb-2">
                        <p class="mb-2">Escaneie o QR Code ou copie a chave PIX</p>
                        <button class="btn btn-sm btn-outline-dark">
                          <i class="fas fa-copy me-2"></i>Copiar Chave PIX
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="mt-4 text-end">
                  <button class="btn btn-dark" :disabled="!selectedPayment">
                    Confirmar Pagamento
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row mt-4">
      <div class="col-12">
        <UpgradePlansCard
          v-if="planosUpgrade.length > 0"
          :current-plan="userPlan.nome"
          :available-plans="planosUpgrade"
          @upgrade="handleUpgrade"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import UpgradePlansCard from '@/components/dashboard/UpgradePlansCard.vue'
import { useNotificationStore } from '@/stores/notification'

interface UserPlan {
  nome: string
  preco: number
  dataRenovacao: Date
}

// Mock do plano do usuário
const userPlan = ref<UserPlan>({
  nome: 'Peixe Prata',
  preco: 49.90,
  dataRenovacao: new Date()
})

const nextBillingDate = computed(() => {
  return userPlan.value.dataRenovacao.toLocaleDateString()
})

const planPrice = computed(() => {
  return userPlan.value.preco.toFixed(2)
})

const paymentHistory = ref([
  { id: 1, date: '01/01/2024', amount: '49.90', status: 'Pago' },
  { id: 2, date: '01/12/2023', amount: '49.90', status: 'Pago' },
  { id: 3, date: '01/11/2023', amount: '49.90', status: 'Pago' }
])

const selectedPayment = ref<string>('')

// Dados dos planos disponíveis
const planosDisponiveis = ref([
  {
    nome: 'Peixe Bronze',
    classe: 'bronze',
    preco: '29,90',
    beneficios: [
      'Desconto de 10% na loja oficial',
      'Prioridade na compra de ingressos',
      'Carteirinha digital'
    ]
  },
  {
    nome: 'Peixe Prata',
    classe: 'prata',
    preco: '49,90',
    beneficios: [
      'Todos os benefícios do Bronze',
      'Desconto de 15% na loja oficial',
      'Acesso a eventos exclusivos',
      'Programa de pontos'
    ]
  },
  {
    nome: 'Peixe Ouro',
    classe: 'ouro',
    preco: '89,90',
    beneficios: [
      'Todos os benefícios do Prata',
      'Desconto de 20% na loja oficial',
      'Acesso ao camarote',
      'Meet & Greet com jogadores'
    ]
  },
  {
    nome: 'Peixe Black',
    classe: 'black',
    preco: '199,90',
    beneficios: [
      'Todos os benefícios do Ouro',
      'Desconto de 25% na loja oficial',
      'Cadeira cativa',
      'Experiências VIP exclusivas',
      'Atendimento prioritário'
    ]
  }
])

// Computed para filtrar apenas planos superiores ao atual
const planosUpgrade = computed(() => {
  const planoAtual = userPlan.value.nome.toLowerCase()
  return planosDisponiveis.value.filter(plano =>
    plano.nome.toLowerCase() !== planoAtual
  )
})

const notificationStore = useNotificationStore()

const handleUpgrade = (plano: any) => {
  notificationStore.addNotification(
    `Solicitação de upgrade para ${plano.nome} em processamento`,
    'info'
  )
  // Aqui você implementaria a lógica real de upgrade
}
</script>

<style lang="scss" scoped>
.badge {
  padding: 0.5em 0.8em;
}

.table {
  margin-bottom: 0;

  th, td {
    vertical-align: middle;
  }
}

.card {
  height: 100%;
}

.payment-methods {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.payment-option {
  border: 1px solid #dee2e6;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #adb5bd;
  }

  &.active {
    border-color: #212529;
    box-shadow: 0 0 0 1px #212529;
  }

  .payment-option-header {
    padding: 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    background-color: #f8f9fa;

    i {
      font-size: 1.2rem;
    }
  }

  .payment-option-content {
    padding: 1rem;
    border-top: 1px solid #dee2e6;
    background-color: #fff;
  }
}

.qr-code {
  width: 150px;
  height: 150px;
  object-fit: contain;
}

.payment-info {
  background-color: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
}

@media (max-width: 768px) {
  .payment-option {
    .payment-option-header {
      padding: 0.75rem;
    }

    .payment-option-content {
      padding: 0.75rem;
    }
  }
}

.mt-4 {
  margin-top: 2rem;
}
</style>
