import { logs } from "./globals.js";

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

export function logAssistiuFilme(user, filme) {
  criarLog(user, filme, "assistiu filme");
}

export function logAvaliouFilme(user, filme) {
  criarLog(user, filme, "avaliou");
}

export function logPesquisouTitulo(user, query) {
  criarLog(user, null, "pesquisou título", query);
}

export function logPesquisouGenero(user, query) {
  criarLog(user, null, "pesquisou género", query);
}

export function logModificouLista(user, filme, action) {
  if (action !== "adicionar" || action !== "remover") return;
  criarLog(
    user,
    filme,
    action === "adicionar" ? "adicionou à lista" : "removeu da lista"
  );
}
