<script setup lang="ts">
defineProps<{
  categories: string[]
  activeCategory: string
}>()

const emit = defineEmits<{
  'update:category': [category: string]
}>()
</script>

<template>
  <div class="d-flex gap-2 flex-wrap">
    <button 
      v-for="category in ['Todas', ...categories]" 
      :key="category"
      class="btn"
      :class="activeCategory === category ? 'btn-dark' : 'btn-outline-dark'"
      @click="emit('update:category', category)"
    >
      {{ category }}
    </button>
  </div>
</template>

<style lang="scss" scoped>
.btn {
  @include transition-all;
  
  &:hover:not(:disabled) {
    transform: translateY(-1px);
  }
}
</style> 