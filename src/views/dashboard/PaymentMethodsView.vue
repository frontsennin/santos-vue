<template>
  <div class="container py-4">
    <h1 class="h3 mb-4">Métodos de Pagamento</h1>

    <div class="row g-4">
      <!-- Cartões Salvos -->
      <div class="col-12">
        <div class="card shadow-sm">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center mb-4">
              <h5 class="card-title mb-0">Cartões Salvos</h5>
              <button class="btn btn-dark btn-sm" @click="showAddCard = true">
                <i class="fas fa-plus me-2"></i>Adicionar Cartão
              </button>
            </div>

            <div class="row g-3">
              <div v-for="card in savedCards" :key="card.id" class="col-12 col-md-6 col-lg-4">
                <div class="payment-card">
                  <div class="card-info">
                    <i :class="['fab', getCardIcon(card.brand)]"></i>
                    <span>•••• {{ card.lastDigits }}</span>
                  </div>
                  <button class="btn btn-link text-danger" @click="removeCard(card.id)">
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Histórico de Débitos -->
    <div class="row mt-4">
      <div class="col-12">
        <div class="card shadow-sm">
          <div class="card-body">
            <h5 class="card-title mb-4">Histórico de Débitos</h5>

            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr>
                    <th>Data</th>
                    <th>Descrição</th>
                    <th>Método</th>
                    <th>Valor</th>
                    <th>Status</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  <template v-for="transaction in transactions" :key="transaction.id">
                    <tr :class="{ 'border-bottom-0': transaction.type === 'store' && transaction.isExpanded }">
                      <td>{{ formatDate(transaction.date) }}</td>
                      <td>
                        <div class="d-flex align-items-center">
                          {{ transaction.description }}
                          <button
                            v-if="transaction.type === 'store'"
                            class="btn btn-link btn-sm ms-2"
                            @click="toggleDetails(transaction)"
                          >
                            <i :class="['fas', transaction.isExpanded ? 'fa-chevron-up' : 'fa-chevron-down']"></i>
                          </button>
                        </div>
                      </td>
                      <td>
                        <i v-if="transaction.method === 'pix'" class="fas fa-qrcode" title="PIX"></i>
                        <i v-else-if="transaction.method === 'visa'" class="fab fa-cc-visa" title="Visa"></i>
                        <i v-else-if="transaction.method === 'mastercard'" class="fab fa-cc-mastercard" title="Mastercard"></i>
                        <i v-else-if="transaction.method === 'amex'" class="fab fa-cc-amex" title="American Express"></i>
                        <i v-else class="fas fa-credit-card" title="Cartão"></i>
                      </td>
                      <td>R$ {{ transaction.total.toFixed(2) }}</td>
                      <td>
                        <span :class="['badge', getStatusClass(transaction.status)]">
                          {{ transaction.status }}
                        </span>
                      </td>
                      <td>
                        <button
                          class="btn btn-outline-dark btn-sm"
                          @click="downloadInvoice(transaction.id)"
                          title="Baixar Nota Fiscal"
                        >
                          <i class="fas fa-file-download"></i>
                        </button>
                      </td>
                    </tr>
                    <!-- Detalhes dos produtos para compras na loja -->
                    <tr v-if="transaction.type === 'store' && transaction.isExpanded">
                      <td colspan="6" class="details-cell">
                        <div class="products-details">
                          <h6 class="mb-3">Produtos Comprados</h6>
                          <div class="products-list">
                            <div v-for="product in transaction.products" :key="product.id" class="product-item">
                              <div class="product-info">
                                <img :src="product.image" :alt="product.name" class="product-image">
                                <div>
                                  <p class="product-name">{{ product.name }}</p>
                                  <p class="product-quantity">Quantidade: {{ product.quantity }}</p>
                                </div>
                              </div>
                              <p class="product-price">R$ {{ product.price.toFixed(2) }}</p>
                            </div>
                          </div>
                          <div class="products-summary">
                            <div class="summary-item">
                              <span>Subtotal:</span>
                              <span>R$ {{ calculateSubtotal(transaction?.products || []).toFixed(2) }}</span>
                            </div>
                            <div class="summary-item">
                              <span>Frete:</span>
                              <span>R$ {{ transaction?.shipping?.toFixed(2) }}</span>
                            </div>
                            <div class="summary-item total">
                              <span>Total:</span>
                              <span>R$ {{ transaction.total.toFixed(2) }}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </template>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useNotificationStore } from '@/stores/notification'

const savedCards = ref([
  { id: 1, brand: 'visa', lastDigits: '4242' },
  { id: 2, brand: 'mastercard', lastDigits: '5555' }
])

const showAddCard = ref(false)

const getCardIcon = (brand: string) => {
  const icons = {
    visa: 'fa-cc-visa',
    mastercard: 'fa-cc-mastercard',
    amex: 'fa-cc-amex'
  }
  return icons[brand as keyof typeof icons]
}

const removeCard = (cardId: number) => {
  // Implementar remoção do cartão
  alert('Funcionalidade em desenvolvimento')
}

interface Product {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

interface Transaction {
  id: number
  date: Date
  description: string
  method: string
  total: number
  status: string
  type: 'store' | 'ticket' | 'subscription'
  isExpanded?: boolean
  products?: Product[]
  shipping?: number
}

const notificationStore = useNotificationStore()

const transactions = ref<Transaction[]>([
  {
    id: 1,
    date: new Date('2024-01-15'),
    description: 'Compra na Loja Oficial',
    method: 'visa',
    total: 349.90,
    status: 'Aprovado',
    type: 'store',
    isExpanded: false,
    shipping: 29.90,
    products: [
      {
        id: 1,
        name: 'Camisa Oficial Santos FC 2024',
        price: 299.90,
        quantity: 1,
        image: 'https://d1ulmyt8kny60e.cloudfront.net/Custom/Content/Products/49/03/49030_camisa-masc-umbro-santos-of-2-2024-jogador-s-n-pto-bco-dord-pr-16049-9005_m1_638486859173917323.jpg'
      },
      {
        id: 2,
        name: 'Chaveiro Santos FC',
        price: 20.10,
        quantity: 1,
        image: 'https://d1ulmyt8kny60e.cloudfront.net/Custom/Content/Products/46/67/46674_chaveiro-escudo-santos-fc-pr-16049-8371_m1_637922809840816492.jpg'
      }
    ]
  },
  {
    id: 2,
    date: new Date('2024-01-10'),
    description: 'Ingresso Santos x Palmeiras',
    method: 'mastercard',
    total: 120.00,
    status: 'Aprovado',
    type: 'ticket'
  },
  {
    id: 3,
    date: new Date('2024-01-01'),
    description: 'Mensalidade Sócio Prata',
    method: 'pix',
    total: 49.90,
    status: 'Aprovado',
    type: 'subscription'
  }
])

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('pt-BR').format(date)
}

const getPaymentIcon = (method: string) => {
  const icons = {
    visa: 'fab fa-cc-visa',
    mastercard: 'fab fa-cc-mastercard',
    amex: 'fab fa-cc-amex',
    pix: 'fas fa-qrcode'
  }
  return icons[method as keyof typeof icons] || 'fas fa-credit-card'
}

const getStatusClass = (status: string) => {
  const classes = {
    'Aprovado': 'bg-success',
    'Pendente': 'bg-warning',
    'Recusado': 'bg-danger'
  }
  return classes[status as keyof typeof classes] || 'bg-secondary'
}

const toggleDetails = (transaction: Transaction) => {
  transaction.isExpanded = !transaction.isExpanded
}

const calculateSubtotal = (products: Product[]) => {
  return products.reduce((total, product) => total + (product.price * product.quantity), 0)
}

const downloadInvoice = (transactionId: number) => {
  // Implementar download da nota fiscal
  notificationStore.addNotification('Download da nota fiscal iniciado', 'success')
}
</script>

<style lang="scss" scoped>
.payment-card {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .card-info {
    display: flex;
    align-items: center;
    gap: 1rem;

    i {
      font-size: 1.5rem;
    }
  }
}

.details-cell {
  background-color: #f8f9fa;
  padding: 1.5rem !important;
}

.products-details {
  h6 {
    color: #666;
  }
}

.products-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.product-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.product-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.product-image {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 4px;
}

.product-name {
  margin: 0;
  font-weight: 500;
}

.product-quantity {
  margin: 0;
  font-size: 0.9rem;
  color: #666;
}

.product-price {
  margin: 0;
  font-weight: 500;
}

.products-summary {
  border-top: 1px solid #dee2e6;
  padding-top: 1rem;
  margin-top: 1rem;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;

  &.total {
    font-weight: bold;
    font-size: 1.1rem;
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid #dee2e6;
  }
}

.badge {
  padding: 0.5em 0.8em;
}

.table {
  th, td {
    vertical-align: middle;
  }
}

@media (max-width: 768px) {
  .product-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .product-price {
    align-self: flex-end;
  }
}

.fas, .fab {
  font-size: 1.2rem;

  &.fa-cc-visa { color: #1a1f71; }
  &.fa-cc-mastercard { color: #eb001b; }
  &.fa-cc-amex { color: #006fcf; }
  &.fa-qrcode { color: #32bcad; }
}
</style>
