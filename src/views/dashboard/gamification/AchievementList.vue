<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Achievement } from '../../../types/dashboard'
import { ACHIEVEMENTS } from '../../../constants/achievements'
import AchievementCard from '../../../components/gamification/AchievementCard.vue'

const achievements = ref(ACHIEVEMENTS)

const progressoTotal = computed(() => {
  const total = achievements.value.reduce((acc, curr) => acc + (curr.progresso / curr.meta), 0)
  return Math.round((total / achievements.value.length) * 100)
})
</script>

<template>
  <div class="row mb-4">
    <div class="col-12">
      <h2 class="h4 mb-3">Suas Conquistas</h2>
      <div class="row g-3">
        <div v-for="achievement in achievements" :key="achievement.id" class="col-12 col-md-6 col-lg-4">
          <AchievementCard :achievement="achievement" />
        </div>
      </div>
    </div>
  </div>
</template> 