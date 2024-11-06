<script setup lang="ts">
import { POINTS_HISTORY } from '../../constants/user'
import { ref } from 'vue'

const history = ref(POINTS_HISTORY)
</script>

<template>
  <div class="card shadow-sm">
    <div class="card-body">
      <h2 class="h4 mb-3">Histórico de Pontos</h2>
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th>Data</th>
              <th>Descrição</th>
              <th>Pontos</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in history" :key="item.id">
              <td>{{ new Date(item.data).toLocaleDateString() }}</td>
              <td>{{ item.descricao }}</td>
              <td :class="item.tipo === 'ganho' ? 'text-success' : 'text-danger'">
                {{ item.tipo === 'ganho' ? '+' : '-' }}{{ item.pontos }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template> 