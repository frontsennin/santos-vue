<script setup lang="ts">
import type { Ticket } from '../../types/dashboard'
import TicketCard from './TicketCard.vue'

defineProps<{
  tickets: Ticket[]
}>()

const emit = defineEmits<{
  'download': [ticketId: number]
}>()
</script>

<template>
  <div class="row g-4">
    <div v-for="ticket in tickets" :key="ticket.id" class="col-12 col-lg-6">
      <TicketCard 
        :ticket="ticket"
        @download="emit('download', $event)"
      />
    </div>
  </div>
</template> 