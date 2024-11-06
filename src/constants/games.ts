import type { Game } from '../types/dashboard'

export const UPCOMING_GAMES: Game[] = [
  {
    id: 1,
    mandante: 'Santos',
    visitante: 'Palmeiras',
    data: '2024-01-20',
    horario: '16:00',
    estadio: 'Vila Belmiro',
    preco: 'A partir de R$ 60,00',
    disponivel: true,
    setor: 'Arquibancada',
    capacidade: 200
  },
  {
    id: 2,
    mandante: 'Santos',
    visitante: 'São Paulo',
    data: '2024-01-27',
    horario: '18:30',
    estadio: 'Vila Belmiro',
    preco: 'A partir de R$ 80,00',
    disponivel: true,
    setor: 'Cadeiras',
    capacidade: 150
  },
  {
    id: 3,
    mandante: 'Corinthians',
    visitante: 'Santos',
    data: '2024-02-03',
    horario: '21:00',
    estadio: 'Neo Química Arena',
    preco: 'A partir de R$ 100,00',
    disponivel: false,
    setor: 'Visitante',
    capacidade: 0
  }
] 