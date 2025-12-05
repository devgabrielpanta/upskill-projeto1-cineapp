import { filmes } from "./globals.js";
import {
  logAvaliouFilme,
  logPesquisouTitulo,
  logPesquisouGenero,
} from "./logs.js";
import { filmesPendentes } from "./users.js";

// Adicionar um novo filme ao sistema
export function criarFilme(titulo, descricao, thumbnail, ano, genero) {
  const novoFilme = {
    titulo,
    descricao,
    thumbnail,
    ano,
    genero,
    avaliacao: {
      count: 0,
      rating: 0,
      reviews: [],
    },
  };
  filmes.push(novoFilme);
}

// Remover um filme do sistema
export function removerFilme(filme) {
  if (!filme || !filme.titulo) return;

  const index = filmes.findIndex((item) => item.titulo === filme.titulo);
  if (index !== -1) {
    filmes.splice(index, 1);
  }
}

// Adicionar ou atualizar a avaliação de um filme por um utilizador
export function avaliarFilme(utilizador, movie, nota) {
  const exists = filmes.some((filme) =>
    filme.avaliacao.reviews.some((review) => review.user === utilizador.email)
  );

  filmes.map((filme) =>
    filme.titulo !== movie.titulo
      ? filme
      : exists
      ? atualizarReview(utilizador, movie, nota)
      : adicionarReview(utilizador, movie, nota)
  );

  atualizarAvalicao(movie);
  logAvaliouFilme(utilizador, movie);
}

// Pesquisar filmes por género
export function pesquisarPorGenero(user, genero) {
  const normalized = normalizarString(String(genero));
  const filtered =
    filmes?.filter((filme) => normalizarString(filme.genero) === normalized) ||
    [];
  logPesquisouGenero(user, genero);
  return filtered;
}

// Pesquisar filmes por título (total ou parcial)
export function pesquisarPorTitulo(user, query) {
  const queryNormalizada = normalizarString(query);

  // lista de títulos normalizados com índice preservado
  const titulosNormalizados = filmes.map((filme) =>
    normalizarString(filme.titulo)
  );

  // encontrar todos os filmes cujo título contém total ou parcialmente a query
  const resultados = titulosNormalizados
    .map((titulo, index) => {
      if (titulo.includes(queryNormalizada)) {
        return filmes[index]; // retorna o filme original
      }
      return null;
    })
    .filter(Boolean);

  logPesquisouTitulo(user, query);
  return resultados;
}

// Recomendar filme (transformar em função)
export function recomendarFilme(user) {
  const pendentes = filmesPendentes(user);
  if (pendentes.length === 0) return null;

  const idAleatorio = Math.floor(Math.random() * pendentes.length);
  let filmeRecomendado = pendentes[idAleatorio];
  if (!filmeRecomendado || !("titulo" in filmeRecomendado)) {
    filmeRecomendado = pendentes[0];
  }

  return filmeRecomendado;
}

// #####################################
//
// HELPERS
//
// #####################################

// Helper que atualiza o review de um utilizador em um filme
function atualizarReview(utilizador, movie, nota) {
  return {
    ...movie,
    reviews: movie.avaliacao.reviews.map((review) =>
      review.user !== utilizador.email
        ? review
        : { ...review, rating: Number(nota) }
    ),
  };
}

// Helper que adiciona review de um utilizador à um filme
function adicionarReview(utilizador, movie, nota) {
  return {
    ...movie,
    reviews: movie.avaliacao.reviews.push({
      user: utilizador.email,
      rating: Number(nota),
    }),
  };
}

// Helper que recalcula a avalição de um filme
function atualizarAvalicao(movie) {
  let avaliacaoCount = 0;
  let avaliacaoTotal = 0;
  let avaliacaoRating = 0;

  const currentReviews = movie.avaliacao.reviews;
  if (currentReviews.length > 0) {
    avaliacaoCount = currentReviews.length;
    avaliacaoTotal = currentReviews.reduce(
      (acc, review) => acc + review.rating,
      0
    );
    avaliacaoRating = avaliacaoTotal / avaliacaoCount;
  }

  filmes.map((filme) =>
    filme.titulo !== movie.titulo
      ? filme
      : {
          ...movie,
          avaliacao: {
            ...filme.avaliacao,
            count: avaliacaoCount,
            rating: avaliacaoRating,
          },
        }
  );
}

// Helper que evita conflitos por incosistências (ex.: Ação == acao)
function normalizarString(texto) {
  return (
    String(texto)
      .normalize("NFD") // separa acentos
      .replace(/[\u0300-\u036f]/g, "") // remove acentos
      // remove pontuação que atrapalha comparações (hífen, barras, parênteses, etc.)
      .replace(/[^\p{L}\p{N}\s]/gu, " ")
      .toLowerCase()
      .replace(/\s+/g, " ") // equivalente a trim + normaliza múltiplos espaços
      .trim()
  );
}
