<script setup lang="ts">
import type { Product } from '../../types/dashboard'
import ProductCard from './ProductCard.vue'

defineProps<{
  products: Product[]
  userPoints: number
}>()

const emit = defineEmits<{
  'buy-money': [productId: number]
  'buy-points': [productId: number]
}>()
</script>

<template>
  <div class="row g-4">
    <div v-for="product in products" :key="product.id" class="col-12 col-md-6 col-lg-4">
      <ProductCard 
        :product="product"
        :user-points="userPoints"
        @buy-money="emit('buy-money', $event)"
        @buy-points="emit('buy-points', $event)"
      />
    </div>
  </div>
</template> 