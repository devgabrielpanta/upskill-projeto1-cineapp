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

function criarUser(nome, email, lista) {
  const novoUser = {
    nome,
    email,
    lista,
  };
  users.push(novoUser);
}

function criarLog(user, filme, acao) {
  const log = {
    user: user.email,
    filme: filme.titulo,
    acao,
  };

  logs.push(log);
}

criarUser("Gabriel", "gabriel@gmail.com", []);
criarFilme(
  "Stranger things",
  "Stranger things",
  0,
  "https://randomuser.me/api/:",
  2025,
  "Sci-fi"
);
criarLog(users[0], filmes[0], "visualizou");

console.table(users);
console.table(filmes);
console.table(logs);
