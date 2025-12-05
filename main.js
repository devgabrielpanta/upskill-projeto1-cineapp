import { filmes, users } from "./globals.js";
import {
  criarFilme,
  removerFilme,
  avaliarFilme,
  pesquisarPorGenero,
  pesquisarPorTitulo,
} from "./filmes.js";
import {
  criarUser,
  atualizarUserLista,
  marcarComoVisto,
  filmesPendentes,
} from "./users.js";
import {
  imprimirTodosUsuarios,
  imprimirTodosFilmes,
  imprimirTodosLogs,
  imprimirTodosReviews,
  contarPorGenero,
} from "./reports.js";

function main() {
  // Adicionar um novo filme ao sistema
  criarFilme(
    "Stranger things",
    "Na década de 1980, um grupo de amigos se envolve em uma série de eventos sobrenaturais na pacata cidade de Hawkins. Eles enfrentam criaturas monstruosas, agências secretas do governo e se aventuram em dimensões paralelas.",
    "https://dnm.nflximg.net/api/v6/BvVbc2Wxr2w6QuoANoSpJKEIWjQ/AAAAQeJh0c8-gsn8qo65ZHPEeNNozlTyqxrpsw_T04yLZJNki2Hu5eEtJRawETs5Oef74YXAh2vWgEALKRmumoxgxIw5bfUib8ybW_6J2x_9KdUP6JWVs5I6y5gYl7s-s3KdGtZHIyS8PA5qZXb_huMu.jpg",
    2025,
    "Sci-fi"
  );

  // Remover um filme do sistema
  criarFilme(
    "Strangers in the things",
    "Na década de 1980, um grupo de amigos se envolve em uma série de eventos sobrenaturais na pacata cidade de Hawkins. Eles enfrentam criaturas monstruosas, agências secretas do governo e se aventuram em dimensões paralelas.",
    "https://dnm.nflximg.net/api/v6/BvVbc2Wxr2w6QuoANoSpJKEIWjQ/AAAAQeJh0c8-gsn8qo65ZHPEeNNozlTyqxrpsw_T04yLZJNki2Hu5eEtJRawETs5Oef74YXAh2vWgEALKRmumoxgxIw5bfUib8ybW_6J2x_9KdUP6JWVs5I6y5gYl7s-s3KdGtZHIyS8PA5qZXb_huMu.jpg",
    2025,
    "Sci-fi"
  );
  removerFilme(filmes[1]);

  // Adicionar um novo utilizador no sistema
  criarUser("Gabriel", "gabriel@gmail.com");

  // Adiciona ou remove um filme à "minha coleção" (lista) do utilizador
  atualizarUserLista(users[0], filmes[0], "adicionar");
  atualizarUserLista(users[0], filmes[0], "remover");

  // Adiciona o título do filme à lista de filmes visualizados do utilizador
  marcarComoVisto(users[0], filmes[0]);

  // Lista de filmes que o utilizador ainda não assistiu
  filmesPendentes(users[0]);

  // Adicionar ou atualizar a avaliação de um filme por um utilizador
  avaliarFilme(users[0], filmes[0], 4);

  // Pesquisar filmes por género
  pesquisarPorGenero(users[0], "Sci-fi");

  // Pesquisar filmes por título (total ou parcial)
  pesquisarPorTitulo(users[0], "stranger things");

  // Relatórios
  imprimirTodosUsuarios();
  imprimirTodosFilmes();
  imprimirTodosLogs();
  imprimirTodosReviews();
  contarPorGenero();
}
main();
