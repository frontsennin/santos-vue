import type { UserLevel } from '../types/dashboard'

export const USER_LEVELS: Record<string, UserLevel> = {
  BRONZE: {
    nome: 'Peixe Bronze',
    proxNivel: 'Peixe Prata',
    pontosProxNivel: 1000,
    progresso: 0,
    beneficios: [
      'Acesso ao programa de pontos',
      'Carteirinha digital de sócio'
    ]
  },
  PRATA: {
    nome: 'Peixe Prata',
    proxNivel: 'Peixe Ouro',
    pontosProxNivel: 2000,
    progresso: 62.5,
    beneficios: [
      'Desconto de 15% na loja oficial',
      'Prioridade na compra de ingressos',
      'Acesso ao programa de pontos'
    ]
  },
  OURO: {
    nome: 'Peixe Ouro',
    proxNivel: 'Peixe Diamante',
    pontosProxNivel: 5000,
    progresso: 0,
    beneficios: [
      'Desconto de 25% na loja oficial',
      'Prioridade máxima na compra de ingressos',
      'Acesso a eventos exclusivos',
      'Visita guiada à Vila Belmiro'
    ]
  },
  DIAMANTE: {
    nome: 'Peixe Diamante',
    proxNivel: '',
    pontosProxNivel: 0,
    progresso: 100,
    beneficios: [
      'Desconto de 35% na loja oficial',
      'Prioridade máxima na compra de ingressos',
      'Acesso a eventos exclusivos',
      'Visita guiada à Vila Belmiro',
      'Meet & Greet com jogadores',
      'Camarote exclusivo em jogos selecionados'
    ]
  }
}

export const calculateUserLevel = (points: number): UserLevel => {
  if (points >= 5000) return USER_LEVELS.DIAMANTE
  if (points >= 2000) return USER_LEVELS.OURO
  if (points >= 1000) return USER_LEVELS.PRATA
  return USER_LEVELS.BRONZE
} 