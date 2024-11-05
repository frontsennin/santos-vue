<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuthStore } from './stores/auth'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

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
</style>
