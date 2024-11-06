<script setup lang="ts">
defineProps<{
  progress: number
  height?: string
}>()
</script>

<template>
  <div class="progress" :style="{ height: height || '10px' }">
    <div 
      class="progress-bar bg-dark" 
      role="progressbar" 
      :style="{ width: `${progress}%` }"
      :aria-valuenow="progress" 
      aria-valuemin="0" 
      aria-valuemax="100"
    ></div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ProgressBar'
}
</script>

<style lang="scss" scoped>
.progress {
  background-color: $gray-200;
  border-radius: 1rem;
  overflow: hidden;

  .progress-bar {
    @include transition-all;
  }
}
</style> 