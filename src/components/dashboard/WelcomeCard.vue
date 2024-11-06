<script setup lang="ts">
import type { UserLevel } from '../../types/dashboard'
import ProgressBar from '../ProgressBar.vue'

defineProps<{
  userName: string
  userLevel: UserLevel
  points: number
}>()
</script>

<template>
  <div class="card shadow-sm">
    <div class="card-body responsive-padding">
      <div class="d-flex justify-content-between align-items-center flex-wrap">
        <div>
          <h1 class="h3 mb-2">Bem-vindo, {{ userName }}!</h1>
          <p class="text-muted mb-0">
            Você é um sócio {{ userLevel.nome }}
          </p>
        </div>
        <div class="text-end">
          <h2 class="h4 mb-2">{{ points }} pontos</h2>
          <p class="text-muted mb-0">
            Próximo nível: {{ userLevel.proxNivel }} 
            ({{ userLevel.pontosProxNivel - points }} pontos restantes)
          </p>
        </div>
      </div>
      <ProgressBar 
        class="mt-3"
        :progress="userLevel.progresso"
      />
    </div>
  </div>
</template> 