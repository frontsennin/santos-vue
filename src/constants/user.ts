export const USER_POINTS = 1250

export const POINTS_HISTORY = [
  {
    id: 1,
    data: '2024-01-15',
    descricao: 'Compra de ingresso Santos x Palmeiras',
    pontos: 60,
    tipo: 'ganho'
  },
  {
    id: 2,
    data: '2024-01-10',
    descricao: 'Compra de camisa oficial',
    pontos: 300,
    tipo: 'ganho'
  },
  {
    id: 3,
    data: '2024-01-05',
    descricao: 'Troca por desconto na loja',
    pontos: -500,
    tipo: 'gasto'
  }
]

export const USER_STATS = {
  jogosAssistidos: 15,
  pontosAcumulados: USER_POINTS,
  produtosComprados: 2,
  ingressosComprados: 8,
  pontosTotaisGanhos: 2000,
  pontosTotaisGastos: 750
} 