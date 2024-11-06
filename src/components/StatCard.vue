<script setup lang="ts">
defineProps<{
  title: string
  value: string | number
  icon: string
}>()
</script>

<template>
  <div class="text-center">
    <h3 class="h2 mb-1">{{ value }}</h3>
    <p class="text-muted mb-0">
      <i :class="['fas', icon, 'me-2']"></i>{{ title }}
    </p>
  </div>
</template> 