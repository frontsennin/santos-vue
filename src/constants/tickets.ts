import type { Ticket } from '../types/dashboard'
import { UPCOMING_GAMES } from './games'

export const USER_TICKETS: Ticket[] = [
  {
    id: 1,
    jogo: UPCOMING_GAMES[0],
    dataCompra: '2024-01-15',
    setor: 'Arquibancada',
    valor: 60.00,
    status: 'ativo',
    codigoQR: 'qr-code-1'
  },
  {
    id: 2,
    jogo: {
      id: 5,
      mandante: 'Santos',
      visitante: 'São Paulo',
      data: '2023-12-20',
      horario: '18:30',
      estadio: 'Vila Belmiro',
      preco: 'R$ 80,00',
      disponivel: false,
      setor: 'Cadeiras'
    },
    dataCompra: '2023-12-15',
    setor: 'Cadeiras',
    valor: 80.00,
    status: 'usado',
    codigoQR: 'qr-code-2'
  },
  {
    id: 3,
    jogo: {
      id: 6,
      mandante: 'Santos',
      visitante: 'Corinthians',
      data: '2023-11-15',
      horario: '21:00',
      estadio: 'Vila Belmiro',
      preco: 'R$ 100,00',
      disponivel: false,
      setor: 'Arquibancada'
    },
    dataCompra: '2023-11-10',
    setor: 'Arquibancada',
    valor: 100.00,
    status: 'usado',
    codigoQR: 'qr-code-3'
  }
] 