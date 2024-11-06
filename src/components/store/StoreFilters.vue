<script setup lang="ts">
defineProps<{
  categories: string[]
  activeCategory: string
  sortBy: string
}>()

const emit = defineEmits<{
  'update:activeCategory': [value: string]
  'update:sortBy': [value: string]
}>()

const handleSortChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  if (target) {
    emit('update:sortBy', target.value)
  }
}
</script>

<template>
  <div class="row mb-4">
    <div class="col-12 col-md-6">
      <div class="d-flex gap-2">
        <button 
          v-for="categoria in ['Todas', ...categories]" 
          :key="categoria"
          class="btn"
          :class="activeCategory === categoria ? 'btn-dark' : 'btn-outline-dark'"
          @click="$emit('update:activeCategory', categoria)"
        >
          {{ categoria }}
        </button>
      </div>
    </div>
    <div class="col-12 col-md-6">
      <select 
        :value="sortBy"
        @change="handleSortChange"
        class="form-select"
      >
        <option value="preco-menor">Menor Preço</option>
        <option value="preco-maior">Maior Preço</option>
        <option value="pontos-menor">Menos Pontos</option>
        <option value="pontos-maior">Mais Pontos</option>
      </select>
    </div>
  </div>
</template> 