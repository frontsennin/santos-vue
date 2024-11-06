<script setup lang="ts">
import type { Product } from '../../types/dashboard'

defineProps<{
    product: Product
    userPoints: number
}>()

const emit = defineEmits<{
    'buy-money': [productId: number]
    'buy-points': [productId: number]
}>()

const getPrecoComDesconto = (produto: Product) => {
    if (!produto.desconto) return produto.preco
    return produto.preco * (1 - produto.desconto / 100)
}
</script>

<template>
    <div class="card shadow-sm h-100">
        <div class="product-image-container">
            <img :src="product.imagem" :alt="product.nome" class="product-image">
            <div v-if="product.desconto" class="discount-badge">
                -{{ product.desconto }}%
            </div>
        </div>
        <div class="card-body d-flex flex-column">
            <h5 class="card-title">{{ product.nome }}</h5>
            <p class="card-text text-muted flex-grow-1">{{ product.descricao }}</p>

            <div class="price-container mb-3">
                <div class="prices">
                    <p class="original-price mb-0" :class="{ 'has-discount': product.desconto }">
                        R$ {{ product.preco.toFixed(2) }}
                    </p>
                    <p v-if="product.desconto" class="discount-price mb-0">
                        R$ {{ getPrecoComDesconto(product).toFixed(2) }}
                    </p>
                </div>
                <span class="points-badge">
                    {{ product.pontos }} pontos
                </span>
            </div>

            <div class="d-flex gap-2">
                <button class="btn btn-dark flex-grow-1" @click="emit('buy-money', product.id)"
                    :disabled="!product.disponivel">
                    <i class="fas fa-shopping-cart me-2"></i>Comprar
                </button>
                <button class="btn btn-outline-dark flex-grow-1" @click="emit('buy-points', product.id)"
                    :disabled="!product.disponivel || userPoints < product.pontos">
                    <i class="fas fa-star me-2"></i>Usar Pontos
                </button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
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
</style>