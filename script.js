// #####################################
//
// Variáveis globais
//
// #####################################

const filmes = [];
const users = [];
const logs = [];
const generos = ["Sci-fi", "Ação", "Aventura"];
const acoes = [
  "assistiu filme",
  "adicionou à lista",
  "avaliou",
  "removeu da lista",
  "pesquisou título",
  "pesquisou género",
];

// #####################################
//
// FILMES (functions)
//
// #####################################

function criarFilme(titulo, descricao, thumbnail, ano, genero) {
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

function removerFilme(filme) {
  filmes.filter((item) => item.titulo !== filme.titulo);
}

function avaliarFilme(utilizador, movie, nota) {
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

function pesquisarPorGenero(user, genero) {
  const normalized = normalizarString(String(genero));
  const filtered =
    filmes?.filter((filme) => normalizarString(filme.genero) === normalized) ||
    [];
  logPesquisouGenero(user, genero);
  return filtered;
}

function pesquisarPorTitulo(user, query) {
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

// #####################################
//
// UTILIZADORES (functions)
//
// #####################################

// Adicionar um novo utilizador no sistema
function criarUser(nome, email) {
  const novoUser = {
    nome,
    email,
    lista: [],
    visualizados: [],
  };
  users.push(novoUser);
}

// Adiciona ou remove um filme à "minha coleção" (lista) do utilizador
function atualizarUserLista(utilizador, filme, action) {
  if (action !== "adicionar" || action !== "remover") return;
  users.map((user) =>
    user.nome !== utilizador.nome
      ? user
      : { ...user, lista: handleUserLista(user.lista, filme, action) }
  );

  logModificouLista(utilizador, filme, action);
}

// Helper que retorna a lista de títulos atualizada com base na ação (adicionar ou remover)
function handleUserLista(lista, filme, action) {
  let updatedLista = lista;
  const titulo = filme.titulo;
  if (action === "adiconar") {
    if (!updatedLista.includes(titulo)) {
      updatedLista.push(titulo);
    }
  } else if (action === "remover") {
    updatedLista.filter((item) => item !== titulo);
  }
  return updatedLista;
}

// Adiciona o título do filme à lista de filmes visualizados do utilizador
function marcarComoVisto(user, filme) {
  users.map((utilizador) =>
    utilizador.nome !== user.nome
      ? utilizador
      : {
          ...utilizador,
          visualizados: utilizador.visualizados.includes(filme.titulo)
            ? utilizador.visualizados
            : [...utilizador.visualizados, filme.titulo],
        }
  );
}

// Lista de filmes que o utilizador ainda não assistiu
function filmesPendentes(user) {
  return filmes.filter((filme) => !user.visualizados.includes(filme.titulo));
}

// #####################################
//
// LOGS (functions)
//
// #####################################

function criarLog(user, filme = null, acao, query = "") {
  const log = {
    user: user.email,
    filme: !filme ? null : filme.titulo,
    query,
    acao,
    createdAt: new Date(),
  };

  logs.push(log);
}

function logAssistiuFilme(user, filme) {
  criarLog(user, filme, "assistiu filme");
}

function logAvaliouFilme(user, filme) {
  criarLog(user, filme, "avaliou");
}

function logPesquisouTitulo(user, query) {
  criarLog(user, null, "pesquisou título", query);
}

function logPesquisouGenero(user, query) {
  criarLog(user, null, "pesquisou género", query);
}

function logModificouLista(user, filme, action) {
  if (action !== "adicionar" || action !== "remover") return;
  criarLog(
    user,
    filme,
    action === "adicionar" ? "adicionou à lista" : "removeu da lista"
  );
}

// #####################################
//
// Relatórios
//
// #####################################

function imprimirTodosReviews() {
  console.table(
    filmes.flatMap((filme) => {
      const reviews = filme.avaliacao.reviews;
      return reviews.map((review) => ({
        filme: filme.titulo,
        user: review.user,
        rating: review.rating,
      }));
    })
  );
}

function imprimirTodosUsuarios() {
  console.table(users);
}

function imprimirTodosFilmes() {
  console.table(filmes);
}

function imprimirTodosLogs() {
  console.table(logs);
}

// #####################################
//
// EXECUÇÃO DO SISTEMA
//
// #####################################

criarUser("Gabriel", "gabriel@gmail.com");
criarFilme(
  "Stranger things",
  "Stranger things",
  "https://randomuser.me/api/:",
  2025,
  "Sci-fi"
);
logAssistiuFilme(users[0], filmes[0]);
atualizarUserLista(users[0], filmes[0], "adicionar");
avaliarFilme(users[0], filmes[0], 4);

imprimirTodosUsuarios();
imprimirTodosFilmes();
imprimirTodosLogs();
imprimirTodosReviews();

console.table(filmes);

// A. Lista vazia?
if (filmes.length == 0) return;

// B. Lista com Itens, mas sem o filme
const filtered = filmes.filter((filme) => filme.titulo === "DARK");
if (filtered === 0) return;

// C Lista com itens, com o filme
const final = filmes.filter((filme) => filme.titulo !== "DARK");

// RECOMENDAÇÁO DE FILMES~

function recomendarFilme() {
  const idAleatorio = Math.floor(Math.random() * filmes.length);
  const filmeRecomendado = filmes[idAleatorio];

  return filmeRecomendado;
}

const recomendacao = recomendarFilme();
console.log("Recomendação de Filme Aleatório:");
