<template>
  <div class="plans-container">
    <h1>Escolha seu Plano de Sócio</h1>
    <p class="plans-subtitle">Selecione o melhor plano para você</p>

    <!-- Comparador de Planos -->
    <div class="plans-comparison">
      <button class="compare-btn" @click="showComparison = !showComparison">
        {{ showComparison ? 'Ocultar Comparação' : 'Comparar Planos' }}
      </button>
      <div v-if="showComparison" class="comparison-table">
        <table>
          <thead>
            <tr>
              <th>Benefícios</th>
              <th>Gratuito</th>
              <th>Bronze</th>
              <th>Prata</th>
              <th>Ouro</th>
              <th>Black</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="benefit in allBenefits" :key="benefit">
              <td>{{ benefit }}</td>
              <td v-for="plan in plans" :key="plan.type">
                <template v-if="plan.benefits.includes(benefit)">
                  <i class="fas fa-check text-success"></i>
                </template>
                <template v-else>
                  <span class="dash-icon">-</span>
                </template>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="plans-grid">
      <div v-for="plan in plans" :key="plan.type"
           class="plan-card" :class="[plan.type.toLowerCase(), {'most-popular': plan.type === 'Ouro'}]">
        <div class="plan-badge" v-if="plan.badge">{{ plan.badge }}</div>
        <div class="plan-header">
          <h2>{{ plan.type }}</h2>
          <div class="plan-price">
            <select v-model="plan.selectedPeriod" class="period-select">
              <option v-for="period in periods" :key="period.value" :value="period.value">
                {{ period.label }}
              </option>
            </select>
            <div class="price">
              <span class="currency">R$</span>
              <span class="amount">{{ calculatePrice(plan.basePrice, plan.selectedPeriod) }}</span>
              <span class="period">/{{ plan.selectedPeriod }}</span>
            </div>
            <div class="discount" v-if="getDiscount(plan.selectedPeriod)">
              Economia de {{ getDiscount(plan.selectedPeriod) }}%
            </div>
          </div>
        </div>

        <div class="plan-features">
          <ul>
            <li v-for="benefit in plan.benefits" :key="benefit">{{ benefit }}</li>
          </ul>
        </div>

        <button class="select-plan-btn"
                @click="selectPlan(plan)"
                :class="{ 'loading': isProcessing && selectedPlan?.type === plan.type }">
          <span v-if="isProcessing && selectedPlan?.type === plan.type">
            <i class="fas fa-spinner fa-spin"></i> Processando...
          </span>
          <span v-else>
            {{ plan.basePrice === 0 ? 'Começar Agora' : 'Assinar Plano' }}
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useNotificationStore } from '@/stores/notification'

export default defineComponent({
  name: 'PlansView',
  setup() {
    const router = useRouter()
    const authStore = useAuthStore()
    const notificationStore = useNotificationStore()

    const showComparison = ref(false)
    const isProcessing = ref(false)

    interface Plan {
      type: string
      basePrice: number
      selectedPeriod: string
      benefits: string[]
      badge?: string
    }

    const selectedPlan = ref<Plan | null>(null)

    const periods = [
      { value: 'mensal', label: 'Mensal', discount: 0 },
      { value: 'trimestral', label: 'Trimestral', discount: 10 },
      { value: 'semestral', label: 'Semestral', discount: 15 },
      { value: 'anual', label: 'Anual', discount: 20 }
    ]

    const plans = ref([
      {
        type: 'Gratuito',
        basePrice: 0,
        selectedPeriod: 'mensal',
        benefits: [
          'Acesso básico ao conteúdo',
          'Newsletter mensal',
          'Participação na comunidade'
        ]
      },
      {
        type: 'Bronze',
        basePrice: 29.90,
        selectedPeriod: 'mensal',
        benefits: [
          'Acesso básico ao conteúdo',
          'Newsletter mensal',
          'Participação na comunidade',
          'Desconto em produtos oficiais',
          'Carteirinha digital de sócio'
        ]
      },
      {
        type: 'Prata',
        basePrice: 49.90,
        selectedPeriod: 'mensal',
        benefits: [
          'Todos os benefícios do Bronze',
          'Prioridade na compra de ingressos',
          'Descontos exclusivos em parceiros',
          'Participação em sorteios mensais'
        ]
      },
      {
        type: 'Ouro',
        basePrice: 89.90,
        selectedPeriod: 'mensal',
        badge: 'Mais Popular',
        benefits: [
          'Todos os benefícios do Prata',
          'Acesso ao camarote em jogos',
          'Meet & Greet com jogadores',
          'Kit exclusivo de boas-vindas',
          'Votação em decisões do clube'
        ]
      },
      {
        type: 'Black',
        basePrice: 199.90,
        selectedPeriod: 'mensal',
        benefits: [
          'Todos os benefícios do Ouro',
          'Cadeira cativa no estádio',
          'Acesso VIP a eventos do clube',
          'Experiências exclusivas',
          'Atendimento personalizado 24/7',
          'Cartão Black personalizado'
        ]
      }
    ])

    const allBenefits = computed(() => {
      const benefits = new Set<string>()
      plans.value.forEach(plan => {
        plan.benefits.forEach(benefit => benefits.add(benefit))
      })
      return Array.from(benefits)
    })

    const calculatePrice = (basePrice: number, period: string) => {
      if (basePrice === 0) return '0,00'

      const periodData = periods.find(p => p.value === period)
      const discount = periodData?.discount || 0
      const finalPrice = basePrice * (1 - discount/100)

      return finalPrice.toFixed(2).replace('.', ',')
    }

    const getDiscount = (period: string) => {
      return periods.find(p => p.value === period)?.discount || 0
    }

    const selectPlan = async (plan: any) => {
      try {
        if (!authStore.isAuthenticated) {
          await router.push({
            name: 'login',
            query: { redirect: 'plans', planType: plan.type.toLowerCase() }
          })
          return
        }

        isProcessing.value = true
        selectedPlan.value = plan

        // Simulação de processamento
        await new Promise(resolve => setTimeout(resolve, 1500))

        notificationStore.addNotification(
          `Plano ${plan.type} selecionado com sucesso!`,
          'success'
        )
        await router.push('/dashboard')
      } catch (error) {
        console.error('Erro ao selecionar plano:', error)
        notificationStore.addNotification(
          'Erro ao selecionar o plano. Tente novamente.',
          'error'
        )
      } finally {
        isProcessing.value = false
        selectedPlan.value = null
      }
    }

    return {
      showComparison,
      isProcessing,
      selectedPlan,
      periods,
      plans,
      allBenefits,
      calculatePrice,
      getDiscount,
      selectPlan
    }
  }
})
</script>

<style lang="scss">
.plans-container {
  margin: 0 auto;
  padding: 2rem;

  h1 {
    text-align: center;
    margin-bottom: 1rem;
    color: #ffffff;
    font-size: 2.5rem;
  }

  .plans-subtitle {
    text-align: center;
    color: #e8e8e8;
    margin-bottom: 3rem;
  }
}

.plans-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
  justify-content: center;
  padding: 1rem;
  width: 100%;

  @media (max-width: 1400px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.plan-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-width: 0;

  &:hover {
    transform: translateY(-5px);
  }

  &.gratuito { border-top: 4px solid #9e9e9e; }
  &.bronze { border-top: 4px solid #cd7f32; }
  &.prata { border-top: 4px solid #c0c0c0; }
  &.ouro { border-top: 4px solid #ffd700; }
  &.black {
    border-top: 4px solid #000;
    background: linear-gradient(145deg, #1a1a1a, #333);
    color: white;
  }

  .plan-header {
    text-align: center;
    margin-bottom: 2rem;

    h2 {
      font-size: 1.4rem;
      margin-bottom: 1rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .plan-price {
      .price {
        font-size: 2rem;
        font-weight: bold;
        white-space: nowrap;
      }

      .period {
        color: #666;
      }
    }
  }
}

.plan-features {
  flex: 1;
  margin: 1.5rem 0;

  ul {
    list-style: none;
    padding: 0;

    li {
      font-size: 0.9rem;
      line-height: 1.4;
      margin-bottom: 0.5rem;
      word-wrap: break-word;
    }
  }
}

.select-plan-btn {
  width: 100%;
  padding: 1rem;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1.1rem;
  transition: background 0.3s ease;

  &:hover {
    background: #45a049;
  }
}

@media (max-width: 768px) {
  .plans-container {
    padding: 1rem;

    h1 {
      font-size: 2rem;
    }
  }

  .plans-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}

// Novos estilos para as funcionalidades adicionais
.plans-comparison {
  margin-bottom: 3rem;

  .compare-btn {
    margin: 0 auto 1rem;
    display: block;
    padding: 0.5rem 1rem;
    background: #333;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background: #444;
    }
  }
}

.comparison-table {
  overflow-x: auto;
  margin: 2rem 0;

  table {
    width: 100%;
    border-collapse: collapse;

    th, td {
      padding: 1rem;
      text-align: center;
      border: 1px solid #ddd;
      color: #ffffff;
    }

    th {
      background: #f5f5f5;
      font-weight: 600;
    }

    .text-success {
      color: #4CAF50;
      font-size: 1.1rem;
    }

    .dash-icon {
      color: #999;
      font-weight: 500;
      font-size: 1.2rem;
      opacity: 0.5;
    }
  }
}

.plan-badge {
  position: absolute;
  top: -10px;
  right: 10px;
  background: #ff9800;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: bold;
}

.most-popular {
  transform: scale(1.05);
  border: 2px solid #ff9800;

  &:hover {
    transform: scale(1.08);
  }
}

.period-select {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;

  &:focus {
    outline: none;
    border-color: #4CAF50;
  }
}

.discount {
  color: #4CAF50;
  font-size: 0.9rem;
  margin-top: 0.5rem;
}

// Animações
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.loading {
  opacity: 0.8;
  cursor: not-allowed;

  .fa-spinner {
    animation: spin 1s linear infinite;
  }
}
</style>
