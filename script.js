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
  "visualizou",
  "adicionou à lista",
  "avaliou",
  "removeu da lista",
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
  const avaliacaoCount = movie.avaliacao.reviews.length;
  const avaliacaoTotal = movie.avaliacao.reviews.reduce(
    (acc, review) => acc + review.rating,
    0
  );
  const avaliacaoRating = avaliacaoTotal / avaliacaoCount;

  filmes.map((filme) =>
    filme.titulo !== movie.titulo
      ? filme
      : {
          ...movie,
          avaliacao: {
            count: avaliacaoCount,
            rating: avaliacaoRating,
          },
        }
  );
}

function pesquisarPorGenero(genero) {
  const normalized = normalizarString(String(genero));
  return (
    filmes?.filter((filme) => normalizarString(filme.genero) === normalized) ||
    []
  );
}

function pesquisarPorTitulo(query) {
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

  return resultados;
}

function normalizarString(titulo) {
  // tratar a string e retornar
  return titulo
    .normalize("NFD") // separa acentos
    .replace(/[\u0300-\u036f]/g, "") // remove acentos
    .toLowerCase()
    .trim();
}

// #####################################
//
// UTILIZADORES (functions)
//
// #####################################

// Adicionar um novo utilizador no sistema
function criarUser(nome, email, lista) {
  const novoUser = {
    nome,
    email,
    lista,
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

function filmesPendentes() {
  const vistos = [];
  for (let i = 0; i < logs.length; i++) {
    if (logs.acao === "visualizado") vistos.push(logs.filme);
  }
}

const pendentes = [];

// #####################################
//
// LOGS (functions)
//
// #####################################

function criarLog(user, filme, acao) {
  const log = {
    user: user.email,
    filme: filme.titulo,
    acao,
    createdAt: new Date(),
  };

  logs.push(log);
}

function logVisualizouFilme(user, filme) {
  criarLog(user, filme, "visualizou");
}

function logAvaliouFilme(user, filme) {
  criarLog(user, filme, "avaliou");
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

criarUser("Gabriel", "gabriel@gmail.com", []);
criarFilme(
  "Stranger things",
  "Stranger things",
  "https://randomuser.me/api/:",
  2025,
  "Sci-fi"
);
logVisualizouFilme(users[0], filmes[0]);
atualizarUserLista(users[0], filmes[0], "adicionar");
avaliarFilme(users[0], filmes[0], 4);

imprimirTodosUsuarios();
imprimirTodosFilmes();
imprimirTodosLogs();
listarTodosReviews();

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
