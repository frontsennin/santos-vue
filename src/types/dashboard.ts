export interface Game {
  id: number;
  mandante: string;
  visitante: string;
  data: string;
  horario: string;
  estadio: string;
  preco: string;
  disponivel: boolean;
  capacidade?: number;
  setor?: string;
}

export interface UserLevel {
  nome: string;
  proxNivel: string;
  pontosProxNivel: number;
  progresso: number;
  beneficios: string[];
}

export interface Benefit {
  id: number;
  nome: string;
  descricao: string;
  icon: string;
  unlocked: boolean;
  pontos: number;
}

export interface Achievement {
  id: number;
  nome: string;
  descricao: string;
  icon: string;
  progresso: number;
  meta: number;
  pontos: number;
  completed: boolean;
}

export interface Product {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  pontos: number;
  imagem: string;
  categoria: string;
  disponivel: boolean;
  desconto?: number;
}

export interface Coupon {
  id: number;
  codigo: string;
  descricao: string;
  desconto: number;
  validade: string;
  usado: boolean;
  tipo: 'loja' | 'ingresso' | 'outros';
}

export interface Ticket {
  id: number;
  jogo: Game;
  dataCompra: string;
  setor: string;
  valor: number;
  status: 'ativo' | 'usado' | 'cancelado';
  codigoQR?: string;
} 