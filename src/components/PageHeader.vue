<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
  rightContent?: boolean
}>()
</script>

<template>
  <div class="row mb-4">
    <div class="col-12">
      <div class="d-flex justify-content-between align-items-start">
        <div>
          <h1 class="h3">{{ title }}</h1>
          <p v-if="subtitle" class="text-muted mb-0">{{ subtitle }}</p>
        </div>
        <slot name="right" v-if="rightContent" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'PageHeader'
}
</script> 