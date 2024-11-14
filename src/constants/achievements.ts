import type { Achievement } from '../types/dashboard'

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 1,
    nome: 'Torcedor Santástico',
    descricao: 'Compareça a 5 jogos seguidos',
    icon: 'fa-star',
    progresso: 3,
    meta: 5,
    pontos: 500,
    completed: false
  },
  {
    id: 2,
    nome: 'Colecionador',
    descricao: 'Compre 3 produtos oficiais',
    icon: 'fa-shopping-bag',
    progresso: 2,
    meta: 3,
    pontos: 300,
    completed: false
  },
  {
    id: 3,
    nome: 'Rei da Vila',
    descricao: 'Assista a 10 jogos na Vila Belmiro',
    icon: 'fa-crown',
    progresso: 7,
    meta: 10,
    pontos: 1000,
    completed: false
  }
]
