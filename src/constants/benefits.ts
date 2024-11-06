import type { Benefit } from '../types/dashboard'

export const BENEFITS: Benefit[] = [
  {
    id: 1,
    nome: 'Desconto Loja',
    descricao: '15% de desconto na loja oficial',
    icon: 'fa-tag',
    unlocked: true,
    pontos: 0
  },
  {
    id: 2,
    nome: 'Prioridade Ingresso',
    descricao: 'Compra antecipada de ingressos',
    icon: 'fa-ticket-alt',
    unlocked: true,
    pontos: 0
  },
  {
    id: 3,
    nome: 'Visita Vila',
    descricao: 'Visita guiada à Vila Belmiro',
    icon: 'fa-building',
    unlocked: false,
    pontos: 2500
  },
  {
    id: 4,
    nome: 'Meet & Greet',
    descricao: 'Encontro com jogadores',
    icon: 'fa-users',
    unlocked: false,
    pontos: 5000
  }
] 