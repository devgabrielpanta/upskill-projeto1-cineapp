// #####################################
//
// Variáveis globais
//
// #####################################

const filmes = [];
const users = [];
const logs = [];
const reviews = [];
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
      contagem: 0,
      media: 0,
    },
  };
  filmes.push(novoFilme);
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

function avaliarFilme(user, filme, rating) {
  // Cria o review do utilizador
  // Recalcula as avaliações do filme
  // Armazena o log da atividade
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

// console.table(users);
// console.table(filmes);
// console.table(logs);

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



