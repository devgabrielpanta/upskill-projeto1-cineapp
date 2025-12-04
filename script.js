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

function criarFilme(titulo, descricao, avaliacao, thumbnail, ano, genero) {
  const novoFilme = {
    titulo,
    descricao,
    avaliacao,
    thumbnail,
    ano,
    genero,
  };
  filmes.push(novoFilme);
}

// #####################################
//
// UTILIZADORES (functions)
//
// #####################################

function criarUser(nome, email, lista) {
  const novoUser = {
    nome,
    email,
    lista,
  };
  users.push(novoUser);
}

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
  };

  logs.push(log);
}

function marcarComoVisto(user, filme) {
  criarLog(user, filme, "visualizou");
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
  0,
  "https://randomuser.me/api/:",
  2025,
  "Sci-fi"
);
marcarComoVisto(users[0], filmes[0]);

console.table(users);
console.table(filmes);
console.table(logs);
