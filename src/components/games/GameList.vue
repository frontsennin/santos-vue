<script setup lang="ts">
import type { Game } from '../../types/dashboard'
import GameCard from './GameCard.vue'

defineProps<{
  games: Game[]
}>()

const emit = defineEmits<{
  'buy': [gameId: number]
}>()
</script>

<template>
  <div class="row g-4">
    <div v-for="game in games" :key="game.id" class="col-12 col-md-6 col-lg-4">
      <GameCard 
        :game="game"
        @buy="emit('buy', $event)"
      />
    </div>
  </div>
</template> 