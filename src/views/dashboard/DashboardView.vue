<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../../stores/auth'
import { useRouter } from 'vue-router'
import { USER_POINTS, USER_STATS } from '../../constants/user'
import { UPCOMING_GAMES } from '../../constants/games'
import { BENEFITS } from '../../constants/benefits'
import { calculateUserLevel } from '../../constants/levels'
import DashboardNavbar from '../../components/DashboardNavbar.vue'
import WelcomeCard from '../../components/dashboard/WelcomeCard.vue'
import GameList from '../../components/games/GameList.vue'
import BenefitList from '../../components/benefits/BenefitList.vue'

const authStore = useAuthStore()
const router = useRouter()
const user = authStore.user

const pontos = ref(USER_POINTS)
const nivel = ref(calculateUserLevel(USER_POINTS))
const proximosJogos = ref(UPCOMING_GAMES.slice(0, 3))
const beneficios = ref(BENEFITS)
const estatisticas = ref(USER_STATS)

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}

const comprarIngresso = (jogoId: number) => {
  alert('Funcionalidade de compra em desenvolvimento')
}
</script>

<template>
  <div class="dashboard-view">
    <DashboardNavbar />

    <main class="dashboard-content">
      <router-view v-if="$route.name !== 'dashboard-home'" />
      
      <template v-else>
        <div class="container py-4">
          <div class="row g-4">
            <!-- Card de Boas-vindas -->
            <div class="col-12">
              <WelcomeCard 
                :user-name="user?.name || ''"
                :user-level="nivel"
                :points="pontos"
              />
            </div>

            <!-- Próximos Jogos -->
            <div class="col-12">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <h2 class="h4 mb-0">Próximos Jogos</h2>
                <router-link to="/dashboard/games" class="btn btn-outline-dark btn-sm">
                  <i class="fas fa-list me-2"></i>Ver Todos
                </router-link>
              </div>
              <GameList 
                :games="proximosJogos"
                @buy="comprarIngresso"
              />
            </div>

            <!-- Benefícios -->
            <div class="col-12">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <h2 class="h4 mb-0">Seus Benefícios</h2>
                <router-link to="/dashboard/benefits" class="btn btn-outline-dark btn-sm">
                  <i class="fas fa-gift me-2"></i>Ver Todos
                </router-link>
              </div>
              <BenefitList 
                :benefits="beneficios"
                :user-points="pontos"
              />
            </div>
          </div>
        </div>
      </template>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.dashboard-content {
  min-height: calc(100vh - 56px);
  background-color: $gray-100;

  @include md {
    min-height: calc(100vh - 64px);
  }
}
</style> 