<template>
  <div class="stadium-map">
    <canvas ref="canvasRef" @click="handleCanvasClick"></canvas>
    <div class="stadium-legend">
      <div class="legend-item">
        <span class="color-box arquibancada"></span>
        <span>Arquibancada</span>
      </div>
      <div class="legend-item">
        <span class="color-box cadeiras"></span>
        <span>Cadeiras Especiais</span>
      </div>
      <div class="legend-item">
        <span class="color-box camarote"></span>
        <span>Camarote</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

const props = defineProps<{
  selectedSetor: string | null
  setores: any[]
}>()

const emit = defineEmits<{
  (e: 'setorSelected', setor: string): void
}>()

const canvasRef = ref<HTMLCanvasElement | null>(null)
const ctx = ref<CanvasRenderingContext2D | null>(null)

const cores = {
  arquibancada: '#4CAF50',
  cadeiras: '#2196F3',
  camarote: '#FFC107',
  selecionado: '#FF4444',
  indisponivel: '#999999'
}

const desenharEstadio = () => {
  if (!canvasRef.value || !ctx.value) return

  const canvas = canvasRef.value
  const context = ctx.value

  // Configurar tamanho do canvas
  canvas.width = 800
  canvas.height = 600

  // Limpar canvas
  context.clearRect(0, 0, canvas.width, canvas.height)

  // Desenhar campo
  context.beginPath()
  context.fillStyle = '#90EE90' // Verde claro para o gramado
  context.fillRect(200, 150, 400, 300)

  // Linhas do campo
  context.strokeStyle = 'white'
  context.lineWidth = 2
  context.strokeRect(200, 150, 400, 300)

  // Círculo central
  context.beginPath()
  context.arc(400, 300, 50, 0, Math.PI * 2)
  context.stroke()

  // Desenhar setores
  // Arquibancada (Norte)
  desenharSetor(context, 150, 50, 500, 80, 'arquibancada', 'Norte')

  // Arquibancada (Sul)
  desenharSetor(context, 150, 470, 500, 80, 'arquibancada', 'Sul')

  // Cadeiras Especiais (Leste)
  desenharSetor(context, 620, 150, 80, 300, 'cadeiras', 'Leste')

  // Cadeiras Especiais (Oeste)
  desenharSetor(context, 100, 150, 80, 300, 'cadeiras', 'Oeste')

  // Camarotes (Cantos)
  desenharSetor(context, 100, 50, 80, 80, 'camarote', 'Noroeste')
  desenharSetor(context, 620, 50, 80, 80, 'camarote', 'Nordeste')
  desenharSetor(context, 100, 470, 80, 80, 'camarote', 'Sudoeste')
  desenharSetor(context, 620, 470, 80, 80, 'camarote', 'Sudeste')
}

const desenharSetor = (
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  tipo: keyof typeof cores,
  nome: string
) => {
  context.fillStyle = props.selectedSetor === nome ? cores.selecionado : cores[tipo]
  context.fillRect(x, y, width, height)

  // Borda do setor
  context.strokeStyle = '#000'
  context.lineWidth = 1
  context.strokeRect(x, y, width, height)

  // Nome do setor
  context.fillStyle = '#000'
  context.font = '12px Arial'
  context.textAlign = 'center'
  context.fillText(nome, x + width/2, y + height/2)
}

const handleCanvasClick = (event: MouseEvent) => {
  if (!canvasRef.value) return

  const rect = canvasRef.value.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top

  // Verificar em qual setor foi clicado
  const setores = {
    norte: { x: 150, y: 50, width: 500, height: 80 },
    sul: { x: 150, y: 470, width: 500, height: 80 },
    leste: { x: 620, y: 150, width: 80, height: 300 },
    oeste: { x: 100, y: 150, width: 80, height: 300 },
    noroeste: { x: 100, y: 50, width: 80, height: 80 },
    nordeste: { x: 620, y: 50, width: 80, height: 80 },
    sudoeste: { x: 100, y: 470, width: 80, height: 80 },
    sudeste: { x: 620, y: 470, width: 80, height: 80 }
  }

  for (const [nome, area] of Object.entries(setores)) {
    if (
      x >= area.x &&
      x <= area.x + area.width &&
      y >= area.y &&
      y <= area.y + area.height
    ) {
      emit('setorSelected', nome)
      break
    }
  }
}

onMounted(() => {
  if (canvasRef.value) {
    ctx.value = canvasRef.value.getContext('2d')
    desenharEstadio()
  }
})

watch(() => props.selectedSetor, () => {
  desenharEstadio()
})
</script>

<style lang="scss" scoped>
.stadium-map {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem 0;

  canvas {
    max-width: 100%;
    height: auto;
    border: 1px solid #ddd;
    border-radius: 8px;
    background: #fff;
  }
}

.stadium-legend {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;

  .legend-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    .color-box {
      width: 20px;
      height: 20px;
      border-radius: 4px;

      &.arquibancada { background-color: #4CAF50; }
      &.cadeiras { background-color: #2196F3; }
      &.camarote { background-color: #FFC107; }
    }
  }
}
</style>
