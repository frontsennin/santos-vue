<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuthStore } from '../../stores/auth'
import { USER_POINTS } from '../../constants/user'
import { PRODUCTS, PRODUCT_CATEGORIES } from '../../constants/products'
import PageHeader from '../../components/PageHeader.vue'
import CategoryFilter from '../../components/store/CategoryFilter.vue'
import SortSelect from '../../components/store/SortSelect.vue'
import ProductGrid from '../../components/store/ProductGrid.vue'

const authStore = useAuthStore()
const user = authStore.user
const pontos = ref(USER_POINTS)
const produtos = ref(PRODUCTS)

// Filtros
const categorias = computed(() => PRODUCT_CATEGORIES)
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

const comprarComDinheiro = (produtoId: number) => {
  const produto = produtos.value.find(p => p.id === produtoId)
  if (produto) {
    alert(`Compra do produto ${produto.nome} em desenvolvimento`)
  }
}

const comprarComPontos = (produtoId: number) => {
  const produto = produtos.value.find(p => p.id === produtoId)
  if (produto && pontos.value >= produto.pontos) {
    alert(`Compra do produto ${produto.nome} com pontos em desenvolvimento`)
  } else {
    alert('Pontos insuficientes')
  }
}
</script>

<template>
  <div class="store-view">
    <div class="container py-4">
      <PageHeader 
        title="Loja Oficial"
        :subtitle="`Produtos exclusivos para sócios | Seus pontos: ${pontos}`"
      />

      <div class="row mb-4">
        <div class="col-12 col-md-6">
          <CategoryFilter 
            :categories="categorias"
            :active-category="categoriaAtiva"
            @update:category="categoriaAtiva = $event"
          />
        </div>
        <div class="col-12 col-md-6">
          <SortSelect 
            v-model="ordenacao"
          />
        </div>
      </div>

      <ProductGrid 
        :products="produtosFiltrados"
        :user-points="pontos"
        @buy-money="comprarComDinheiro"
        @buy-points="comprarComPontos"
      />
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

  .product-image-container {
    position: relative;
    width: 100%;
    height: 300px;
    overflow: hidden;
  }

  .product-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  .discount-badge {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background-color: $primary-color;
    color: $white;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    font-weight: bold;
  }

  .price-container {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  .prices {
    .original-price {
      font-size: 1.1rem;
      font-weight: 500;
      
      &.has-discount {
        text-decoration: line-through;
        color: $gray-600;
        font-size: 0.9rem;
      }
    }

    .discount-price {
      font-size: 1.2rem;
      font-weight: bold;
      color: #dc3545;
    }
  }

  .points-badge {
    background-color: $gray-200;
    color: $gray-600;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    font-size: 0.9rem;
  }

  .btn {
    @include transition-all;
    
    &:hover:not(:disabled) {
      transform: translateY(-1px);
    }
  }
}
</style> 