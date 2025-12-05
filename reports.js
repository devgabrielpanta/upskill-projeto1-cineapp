import { filmes, users, logs, generos } from "./globals.js";

export function imprimirTodosReviews() {
  console.log("Todos os Reviews:");
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

export function imprimirTodosUsuarios() {
  console.log("Todos os Utilizadores:");
  console.table(users);
}

export function imprimirTodosFilmes() {
  console.log("Todos os Filmes:");
  console.table(filmes);
}

export function imprimirTodosLogs() {
  console.log("Todos os Logs:");
  console.table(logs);
}

export function contarPorGenero() {
  console.log("Contagem de Filmes por Gênero:");
  console.table(
    generos.map((gen) => ({
      genero: gen,
      filmesQtde: filmes.filter((filme) => filme.genero === gen).length,
    }))
  );
}
