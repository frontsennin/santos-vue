<script setup lang="ts">
defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const handleChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <select 
    class="form-select"
    :value="modelValue"
    @change="handleChange"
  >
    <option value="preco-menor">Menor Preço</option>
    <option value="preco-maior">Maior Preço</option>
    <option value="pontos-menor">Menos Pontos</option>
    <option value="pontos-maior">Mais Pontos</option>
  </select>
</template>

<script lang="ts">
export default {
  name: 'SortSelect'
}
</script> 