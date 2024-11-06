<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuthStore } from './stores/auth'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

const authStore = useAuthStore()

onMounted(async () => {
  await authStore.init()
})
</script>

<template>
  <router-view />
</template>

<style lang="scss">
@use './styles/main';

// Garantir que os ícones do Font Awesome sejam exibidos corretamente
.fas {
  display: inline-block;
  width: 1em;
  text-align: center;
}
</style>
