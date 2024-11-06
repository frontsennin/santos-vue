<script setup lang="ts">
import { ref } from 'vue'
import { BENEFITS } from '../../constants/benefits'
import { COUPONS } from '../../constants/coupons'
import { USER_POINTS } from '../../constants/user'
import PageHeader from '../../components/PageHeader.vue'
import BenefitsList from '../../components/benefits/BenefitsList.vue'
import CouponsList from '../../components/benefits/CouponsList.vue'

const beneficios = ref(BENEFITS)
const cupons = ref(COUPONS)
const pontos = ref(USER_POINTS)

const copiarCupom = (codigo: string) => {
  navigator.clipboard.writeText(codigo)
  alert('Código copiado para a área de transferência!')
}

const desbloquearBeneficio = (beneficioId: number) => {
  const beneficio = beneficios.value.find(b => b.id === beneficioId)
  if (beneficio && pontos.value >= beneficio.pontos) {
    beneficio.unlocked = true
    pontos.value -= beneficio.pontos
    alert(`Benefício ${beneficio.nome} desbloqueado!`)
  } else {
    alert('Pontos insuficientes')
  }
}
</script>

<template>
  <div class="benefits-view">
    <div class="container py-4">
      <PageHeader 
        title="Benefícios e Cupons"
        :subtitle="`Seus pontos disponíveis: ${pontos}`"
      />

      <!-- Benefícios -->
      <div class="row mb-5">
        <div class="col-12">
          <h2 class="h4 mb-3">Seus Benefícios</h2>
          <BenefitsList 
            :benefits="beneficios"
            :user-points="pontos"
            @unlock="desbloquearBeneficio"
          />
        </div>
      </div>

      <!-- Cupons -->
      <div class="row">
        <div class="col-12">
          <h2 class="h4 mb-3">Seus Cupons</h2>
          <CouponsList 
            :coupons="cupons"
            @copy="copiarCupom"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.benefits-view {
  .card {
    @include transition-all;
    
    &:hover {
      transform: translateY(-2px);
    }
  }

  .benefit-icon {
    width: 50px;
    height: 50px;
    background: $gray-100;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $primary-color;
  }

  .coupon-code {
    border: 2px dashed $gray-600;
    letter-spacing: 2px;
  }

  .btn {
    @include transition-all;
    
    &:hover:not(:disabled) {
      transform: translateY(-1px);
    }
  }
}
</style> 