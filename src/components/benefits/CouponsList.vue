<script setup lang="ts">
import type { Coupon } from '../../types/dashboard'
import CouponCard from './CouponCard.vue'

defineProps<{
  coupons: Coupon[]
}>()

const emit = defineEmits<{
  'copy': [code: string]
}>()

</script>

<template>
  <div class="row g-4">
    <div v-for="coupon in coupons" :key="coupon.id" class="col-12 col-md-6">
      <CouponCard 
        :coupon="coupon"
        @copy="emit('copy', $event)"
      />
    </div>
  </div>
</template> 