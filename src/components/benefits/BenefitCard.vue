<script setup lang="ts">
import type { Benefit } from '../../types/dashboard'

defineProps<{
  benefit: Benefit
  userPoints: number
}>()

const emit = defineEmits<{
  'unlock': [benefitId: number]
}>()

</script>

<template>
  <div class="card shadow-sm h-100">
    <div class="card-body">
      <div class="d-flex align-items-center mb-3">
        <div class="benefit-icon me-3">
          <i :class="['fas', benefit.icon, 'fa-2x']"></i>
        </div>
        <div>
          <h3 class="h5 mb-1">{{ benefit.nome }}</h3>
          <p class="text-muted mb-0">{{ benefit.descricao }}</p>
        </div>
      </div>
      
      <div v-if="!benefit.unlocked" class="text-center">
        <p class="mb-2">
          <i class="fas fa-star me-2"></i>
          {{ benefit.pontos }} pontos para desbloquear
        </p>
        <button 
          class="btn btn-dark w-100"
          @click="emit('unlock', benefit.id)"
          :disabled="userPoints < benefit.pontos"
        >
          <i class="fas fa-unlock me-2"></i>Desbloquear
        </button>
      </div>
      <div v-else class="text-center">
        <span class="badge bg-success">
          <i class="fas fa-check me-2"></i>Desbloqueado
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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
</style> 