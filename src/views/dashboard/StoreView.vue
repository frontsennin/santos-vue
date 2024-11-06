<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Product } from '../../types/dashboard'
import { useAuthStore } from '../../stores/auth'

const authStore = useAuthStore()
const user = authStore.user
const pontos = ref(1250) // Mock de pontos do usuário

// Mock de produtos
const produtos = ref<Product[]>([
  {
    id: 1,
    nome: 'Camisa Santos I 23/24',
    descricao: 'Camisa oficial do Santos FC temporada 23/24',
    preco: 299.90,
    pontos: 2000,
    imagem: 'https://exemplo.com/camisa.jpg',
    categoria: 'Uniformes',
    disponivel: true,
    desconto: 15
  },
  {
    id: 2,
    nome: 'Camisa Santos II 23/24',
    descricao: 'Camisa oficial away do Santos FC temporada 23/24',
    preco: 299.90,
    pontos: 2000,
    imagem: 'https://exemplo.com/camisa2.jpg',
    categoria: 'Uniformes',
    disponivel: true
  },
  {
    id: 3,
    nome: 'Boné Santos New Era',
    descricao: 'Boné oficial do Santos FC',
    preco: 149.90,
    pontos: 1000,
    imagem: 'https://exemplo.com/bone.jpg',
    categoria: 'Acessórios',
    disponivel: true,
    desconto: 10
  }
])

// Filtros
const categorias = computed(() => {
  const cats = new Set(produtos.value.map(p => p.categoria))
  return Array.from(cats)
})

const categoriaAtiva = ref('Todas')
const ordenacao = ref('preco-menor')

const produtosFiltrados = computed(() => {
  let filtered = [...produtos.value]
  
  if (categoriaAtiva.value !== 'Todas') {
    filtered = filtered.filter(p => p.categoria === categoriaAtiva.value)
  }
  
  switch (ordenacao.value) {
    case 'preco-menor':
      filtered.sort((a, b) => a.preco - b.preco)
      break
    case 'preco-maior':
      filtered.sort((a, b) => b.preco - a.preco)
      break
    case 'pontos-menor':
      filtered.sort((a, b) => a.pontos - b.pontos)
      break
    case 'pontos-maior':
      filtered.sort((a, b) => b.pontos - a.pontos)
      break
  }
  
  return filtered
})

const comprarComDinheiro = (produto: Product) => {
  alert(`Compra do produto ${produto.nome} em desenvolvimento`)
}

const comprarComPontos = (produto: Product) => {
  if (pontos.value >= produto.pontos) {
    alert(`Compra do produto ${produto.nome} com pontos em desenvolvimento`)
  } else {
    alert('Pontos insuficientes')
  }
}

const getPrecoComDesconto = (produto: Product) => {
  if (!produto.desconto) return produto.preco
  return produto.preco * (1 - produto.desconto / 100)
}
</script>

<template>
  <div class="store-view">
    <div class="container py-4">
      <!-- Cabeçalho -->
      <div class="row mb-4">
        <div class="col-12">
          <h1 class="h3">Loja Oficial</h1>
          <p class="text-muted">
            Produtos exclusivos para sócios | Seus pontos: {{ pontos }}
          </p>
        </div>
      </div>

      <!-- Filtros -->
      <div class="row mb-4">
        <div class="col-12 col-md-6">
          <div class="d-flex gap-2">
            <button 
              v-for="categoria in ['Todas', ...categorias]" 
              :key="categoria"
              class="btn"
              :class="categoriaAtiva === categoria ? 'btn-dark' : 'btn-outline-dark'"
              @click="categoriaAtiva = categoria"
            >
              {{ categoria }}
            </button>
          </div>
        </div>
        <div class="col-12 col-md-6">
          <select v-model="ordenacao" class="form-select">
            <option value="preco-menor">Menor Preço</option>
            <option value="preco-maior">Maior Preço</option>
            <option value="pontos-menor">Menos Pontos</option>
            <option value="pontos-maior">Mais Pontos</option>
          </select>
        </div>
      </div>

      <!-- Lista de Produtos -->
      <div class="row g-4">
        <div v-for="produto in produtosFiltrados" :key="produto.id" class="col-12 col-md-6 col-lg-4">
          <div class="card shadow-sm h-100">
            <div class="position-relative">
              <img 
                :src="produto.imagem" 
                :alt="produto.nome"
                class="card-img-top"
                style="height: 200px; object-fit: cover;"
              >
              <div 
                v-if="produto.desconto" 
                class="position-absolute top-0 end-0 bg-danger text-white p-2 m-2 rounded"
              >
                -{{ produto.desconto }}%
              </div>
            </div>
            <div class="card-body">
              <h5 class="card-title">{{ produto.nome }}</h5>
              <p class="card-text text-muted">{{ produto.descricao }}</p>
              
              <div class="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <p class="mb-0" :class="{ 'text-decoration-line-through': produto.desconto }">
                    R$ {{ produto.preco.toFixed(2) }}
                  </p>
                  <p v-if="produto.desconto" class="mb-0 text-danger fw-bold">
                    R$ {{ getPrecoComDesconto(produto).toFixed(2) }}
                  </p>
                </div>
                <span class="badge bg-dark">
                  {{ produto.pontos }} pontos
                </span>
              </div>

              <div class="d-flex gap-2">
                <button 
                  class="btn btn-dark flex-grow-1"
                  @click="comprarComDinheiro(produto)"
                  :disabled="!produto.disponivel"
                >
                  <i class="fas fa-shopping-cart me-2"></i>Comprar
                </button>
                <button 
                  class="btn btn-outline-dark flex-grow-1"
                  @click="comprarComPontos(produto)"
                  :disabled="!produto.disponivel || pontos < produto.pontos"
                >
                  <i class="fas fa-star me-2"></i>Usar Pontos
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.store-view {
  .card {
    @include transition-all;
    
    &:hover {
      transform: translateY(-2px);
    }
  }

  .btn {
    @include transition-all;
    
    &:hover:not(:disabled) {
      transform: translateY(-1px);
    }
  }
}
</style> 