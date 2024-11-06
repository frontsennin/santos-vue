<script setup lang="ts">
import type { Achievement } from '../../types/dashboard'
import AchievementCard from './AchievementCard.vue'

defineProps<{
  achievements: Achievement[]
}>()
</script>

<template>
  <div class="row g-3">
    <div v-for="achievement in achievements" :key="achievement.id" class="col-12 col-md-6 col-lg-4">
      <AchievementCard :achievement="achievement" />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'AchievementList'
}
</script> 