<template>
  <div class="card shadow-sm upgrade-section">
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 class="h4 mb-2">Mude seu Plano</h2>
          <p class="text-muted mb-0">Conheça os benefícios dos planos superiores</p>
        </div>
        <span class="badge bg-primary current-plan">Seu plano atual: {{ currentPlan }}</span>
      </div>

      <div class="plans-grid">
        <div v-for="plano in availablePlans" :key="plano.nome" class="plan-card">
          <div class="plan-header" :class="plano.classe">
            <h3>{{ plano.nome }}</h3>
            <div class="plan-price">
              <span class="currency">R$</span>
              <span class="amount">{{ plano.preco }}</span>
              <span class="period">/mês</span>
            </div>
          </div>
          <div class="plan-features">
            <ul>
              <li v-for="beneficio in plano.beneficios" :key="beneficio">
                {{ beneficio }}
              </li>
            </ul>
          </div>
          <button class="btn btn-dark w-100" @click="handleUpgrade(plano)">
            Fazer Upgrade
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Plan {
  nome: string
  classe: string
  preco: string
  beneficios: string[]
}

defineProps<{
  currentPlan: string
  availablePlans: Plan[]
}>()

const emit = defineEmits<{
  (e: 'upgrade', plan: Plan): void
}>()

const handleUpgrade = (plan: Plan) => {
  emit('upgrade', plan)
}
</script>

<style lang="scss" scoped>
.upgrade-section {
  .current-plan {
    font-size: 0.9rem;
    padding: 0.5rem 1rem;
  }
}

.plans-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.plan-card {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
}

.plan-header {
  padding: 1.5rem;
  text-align: center;
  color: white;

  &.bronze {
    background: linear-gradient(135deg, #cd7f32, #8b4513);
  }

  &.prata {
    background: linear-gradient(135deg, #c0c0c0, #808080);
  }

  &.ouro {
    background: linear-gradient(135deg, #ffd700, #daa520);
  }

  &.black {
    background: linear-gradient(135deg, #000000, #2c2c2c);
  }

  h3 {
    margin: 0;
    font-size: 1.5rem;
    font-weight: bold;
  }

  .plan-price {
    margin-top: 1rem;

    .currency {
      font-size: 1.2rem;
      vertical-align: top;
    }

    .amount {
      font-size: 2.5rem;
      font-weight: bold;
    }

    .period {
      font-size: 1rem;
      opacity: 0.8;
    }
  }
}

.plan-features {
  padding: 1.5rem;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      padding-left: 1.5rem;
      position: relative;
      margin-bottom: 0.8rem;
      font-size: 0.95rem;

      &:before {
        content: "✓";
        position: absolute;
        left: 0;
        color: #4CAF50;
        font-weight: bold;
      }
    }
  }
}

@media (max-width: 768px) {
  .plans-grid {
    grid-template-columns: 1fr;
  }

  .current-plan {
    margin-top: 1rem;
  }
}
</style>
