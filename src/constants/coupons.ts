import type { Coupon } from '../types/dashboard'

export const COUPONS: Coupon[] = [
  {
    id: 1,
    codigo: 'LOJA15',
    descricao: '15% de desconto em qualquer produto da loja',
    desconto: 15,
    validade: '2024-12-31',
    usado: false,
    tipo: 'loja'
  },
  {
    id: 2,
    codigo: 'INGRESSO10',
    descricao: '10% de desconto em ingressos',
    desconto: 10,
    validade: '2024-12-31',
    usado: false,
    tipo: 'ingresso'
  },
  {
    id: 3,
    codigo: 'VILA20',
    descricao: '20% de desconto no tour da Vila',
    desconto: 20,
    validade: '2024-06-30',
    usado: true,
    tipo: 'outros'
  }
] 