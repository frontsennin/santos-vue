<script setup lang="ts">
import type { Benefit } from '../../types/dashboard'
import BenefitCard from './BenefitCard.vue'

defineProps<{
  benefits: Benefit[]
  userPoints: number
}>()

const emit = defineEmits<{
  'unlock': [benefitId: number]
}>()
</script>

<template>
  <div class="row g-4">
    <div v-for="benefit in benefits" :key="benefit.id" class="col-12 col-md-6 col-lg-4">
      <BenefitCard 
        :benefit="benefit"
        :user-points="userPoints"
        @unlock="emit('unlock', $event)"
      />
    </div>
  </div>
</template> 