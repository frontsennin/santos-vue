import type { Product } from '../types/dashboard'

export const PRODUCTS: Product[] = [
  {
    id: 1,
    nome: 'Camisa Santos I 23/24',
    descricao: 'Camisa oficial do Santos FC temporada 23/24',
    preco: 299.90,
    pontos: 2000,
    imagem: 'https://umbro.vtexassets.com/arquivos/ids/469228/U31S02633_212.jpg?v=638491325285470000',
    categoria: 'Uniformes',
    disponivel: true,
    desconto: 15
  },
  {
    id: 2,
    nome: 'Camisa Santos II 23/24',
    descricao: 'Camisa oficial away do Santos FC temporada 23/24',
    preco: 299.90,
    pontos: 2000,
    imagem: 'https://d1ulmyt8kny60e.cloudfront.net/Custom/Content/Products/49/03/49030_camisa-masc-umbro-santos-of-2-2024-jogador-s-n-pto-bco-dord-pr-16049-9005_m1_638486859173917323.jpg',
    categoria: 'Uniformes',
    disponivel: true
  },
  {
    id: 3,
    nome: 'Boné Santos New Era',
    descricao: 'Boné oficial do Santos FC',
    preco: 149.90,
    pontos: 1000,
    imagem: 'https://procopioshop.fbitsstatic.net/img/p/bone-new-era-santos-fc-91122/285939.jpg?w=420&h=420&v=no-change&qs=ignore',
    categoria: 'Acessórios',
    disponivel: true,
    desconto: 10
  }
]

export const PRODUCT_CATEGORIES = ['Uniformes', 'Acessórios', 'Colecionáveis'] 