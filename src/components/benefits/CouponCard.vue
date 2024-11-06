<script setup lang="ts">
import type { Coupon } from '../../types/dashboard'

defineProps<{
  coupon: Coupon
}>()

const emit = defineEmits<{
  'copy': [code: string]
}>()

</script>

<template>
  <div class="card shadow-sm">
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-start mb-3">
        <div>
          <h3 class="h5 mb-1">{{ coupon.descricao }}</h3>
          <p class="text-muted mb-0">
            Válido até: {{ new Date(coupon.validade).toLocaleDateString() }}
          </p>
        </div>
        <span 
          class="badge"
          :class="coupon.usado ? 'bg-secondary' : 'bg-success'"
        >
          {{ coupon.usado ? 'Usado' : 'Disponível' }}
        </span>
      </div>
      
      <div class="coupon-code p-2 bg-light rounded mb-3 text-center">
        <span class="h4 mb-0 font-monospace">{{ coupon.codigo }}</span>
      </div>

      <button 
        class="btn btn-dark w-100"
        @click="emit('copy', coupon.codigo)"
        :disabled="coupon.usado"
      >
        <i class="fas fa-copy me-2"></i>
        {{ coupon.usado ? 'Cupom Usado' : 'Copiar Código' }}
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.coupon-code {
  border: 2px dashed $gray-600;
  letter-spacing: 2px;
}
</style> 